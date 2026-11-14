import { INSTITUTION_REGION_MAP } from "../institutions/institution";
import {
  type TeamInFilteredStandingsLike,
  type TeamInStandingsLike,
  TeamRankStatus,
} from "../types";
import winnerInstitutionsJson from "./winnerInstitutions.json";

// Typed here because the list starts the season empty, which TypeScript
// would otherwise read as a list that can never hold anything.
const winnersInOtherRegions: string[] = winnerInstitutionsJson;

/**
 * Q in the 2026-2027 rules (C2): the most teams one university can send to
 * the Championship. New this season; it was 3 for every university before.
 * It would be 3 for a university that medalled at the previous World Finals,
 * but none is held before the 2027 Championship, so it is 2 for all.
 */
export const MAX_TEAMS_PER_UNIVERSITY = 2;

export const asiaPacificRegions = new Set([
  "BRN",
  "KHM",
  "IDN",
  "JPN",
  "KOR",
  "LAO",
  "MMR",
  "MYS",
  "PHL",
  "PNG",
  "SGP",
  "THA",
  "TWN",
  "VNM",
]);

export const filterRegionalTeams = <T extends TeamInStandingsLike>(
  teams: T[],
): (TeamInFilteredStandingsLike & T)[] => {
  const winnerInstitutions = new Set(winnersInOtherRegions);
  const institutionOccurCount = new Map<string, number>();

  const ret = teams.map((team) => ({
    ...team,
    status: TeamRankStatus.NONE,
    recalculatedRank: -1,
  }));

  ret.forEach((x) => {
    // Even if `x` is in `winnersInOtherRegions`,
    // it should be not removed from the ranking list.
    if (x.rank === 1) return;

    const region = INSTITUTION_REGION_MAP.get(x.institution);
    if (!region || !asiaPacificRegions.has(region)) {
      x.status = TeamRankStatus.D3_1;
      return;
    }
    if (x.problemsSolved === 0) {
      x.status = TeamRankStatus.D3_2;
      return;
    }
    if (winnerInstitutions.has(x.institution)) {
      x.status = TeamRankStatus.D3_3;
      return;
    }
    const institutionCount = institutionOccurCount.get(x.institution) || 0;
    if (institutionCount >= MAX_TEAMS_PER_UNIVERSITY) {
      x.status = TeamRankStatus.D3_4;
      return;
    }
    institutionOccurCount.set(x.institution, institutionCount + 1);
  });

  // (D4-3): we have to remove #1s from each region,
  // but since we want to include them in the displayed teams list,
  // we'll just consider the rank as 0
  let recaulculatedRank = 0;
  ret.forEach((x) => {
    if (x.status === TeamRankStatus.NONE) {
      x.recalculatedRank = recaulculatedRank++;
    }
  });

  return ret;
};
