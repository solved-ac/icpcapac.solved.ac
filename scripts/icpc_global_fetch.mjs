#!/usr/bin/env node
// Fetches public data from icpc.global: the contests under a super-regional
// and a contest's official standings, in the shape `src/data` stores them.
//
//   node scripts/icpc_global_fetch.mjs tree APSEPC-2027
//       Every regional under the Asia Pacific Championship of ICPC year 2027
//       (contests held in 2026), with its preliminaries, dates, number of
//       accepted teams and number of rows in its published standings.
//
//   node scripts/icpc_global_fetch.mjs standings Seoul-2027 [out.json]
//       A contest's standings. Prints JSON, or writes it to `out.json`.
//       Takes a contest code (`Seoul-2027`) or a numeric contest id.
//
// A contest code is `<abbreviation>-<ICPC year>`, as in the address of its
// page: https://icpc.global/regionals/finder/Seoul-2027. The ICPC year is the
// year of the World Finals the contest leads to, one after the contest's own.
//
// Team lists (who registered, before a contest is held) are not public: the
// site only serves them to a signed-in account. Standings are public once
// the regional director publishes them.

import { writeFile } from "node:fs/promises";

const API = "https://icpc.global/api/contest/public";

const STANDINGS_FIELDS = [
  "teamId",
  "rank",
  "medalCitation",
  "problemsSolved",
  "totalTime",
  "lastProblemTime",
  "siteCitation",
  "citation",
  "teamName",
  "institution",
];

async function get(path) {
  const response = await fetch(`${API}/${path}`, {
    headers: { "User-Agent": "icpc-global-fetch", Accept: "application/json" },
  });
  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}: ${path}`);
  }
  return response.json();
}

/** A contest by code, or `null` when icpc.global has none. */
const contestInfo = (code) => get(encodeURIComponent(code));

/** Standings by numeric contest id. Empty until results are published. */
async function standings(contestId) {
  const pageSize = 1000;
  const rows = [];
  for (let page = 1; ; page++) {
    const query = `proj:${STANDINGS_FIELDS.join(",")};sort:rank asc;`;
    const batch =
      (await get(
        `search/contest/${contestId}?q=${encodeURIComponent(query)}&page=${page}&size=${pageSize}`,
      )) ?? [];
    rows.push(...batch);
    if (batch.length < pageSize) break;
  }
  return rows;
}

async function resolveContestId(codeOrId) {
  if (/^\d+$/.test(codeOrId)) return Number(codeOrId);
  const info = await contestInfo(codeOrId);
  if (!info) throw new Error(`No contest with code ${codeOrId}`);
  return info.id;
}

async function describe(code, depth) {
  const info = await contestInfo(code);
  const indent = "  ".repeat(depth);
  if (!info) {
    console.log(`${indent}${code}: not found`);
    return;
  }
  const [rows, accepted] = await Promise.all([
    standings(info.id),
    get(`${encodeURIComponent(code)}/acceptedTeams`),
  ]);
  const teams = (accepted ?? []).reduce((sum, site) => sum + site.teamCount, 0);
  console.log(
    `${indent}${code} (id ${info.id}) ${info.startDate}..${info.endDate} | ` +
      `${teams} accepted teams | ${rows.length} standings rows | ${info.name}`,
  );
}

async function tree(code, depth = 0) {
  const children = (await get(`subcontests/${encodeURIComponent(code)}`)) ?? [];
  const year = code.slice(code.lastIndexOf("-") + 1);
  for (const child of children) {
    const childCode = `${child.id}-${year}`;
    await describe(childCode, depth);
    await tree(childCode, depth + 1);
  }
}

const [command, target, outFile] = process.argv.slice(2);

if (command === "tree" && target) {
  await tree(target);
} else if (command === "standings" && target) {
  const rows = await standings(await resolveContestId(target));
  const json = `${JSON.stringify(rows, null, 2)}\n`;
  if (outFile) {
    await writeFile(outFile, json);
    console.error(`${rows.length} rows -> ${outFile}`);
  } else {
    process.stdout.write(json);
  }
} else {
  console.error(
    "usage: icpc_global_fetch.mjs tree <code> | standings <code|id> [out.json]",
  );
  process.exit(1);
}
