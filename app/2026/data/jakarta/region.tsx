import { INSTITUTION_REGION_MAP } from "@/app/data/institutions/institution";
import { Jakarta as Jakarta2025 } from "../../../2025/data/jakarta/region";
import {
  countTeams,
  countUniversities,
  regionScore,
  RegionScoreArgs,
} from "../regionScore";
import { Regional, RegionalStatus } from "../types";

// TODO replace this with official ICPC data
// import regionalStandings from "./Jakarta2025Standings.json";
import regionalStandings from "./Jakarta2026Standings.json";

const INDONESIA_REGION_SCORE: RegionScoreArgs = {
  univs: countUniversities(regionalStandings),
  teams: countTeams(regionalStandings),
  foreignTeams: countTeams(
    regionalStandings.filter(
      (team) => INSTITUTION_REGION_MAP.get(team.institution) !== "IDN"
    )
  ),
  // Calculated from https://competition.binus.ac.id/inc2025/
  // (excl. teams with 0 solves)
  teamsPrelim: 436,
  univsPrelim: 25,
};

export const Jakarta: Regional = {
  contestDate: "2025-11-24",
  site: "Jakarta",
  region: "IDN",
  url: "https://competition.binus.ac.id/icpc2025/",
  status: RegionalStatus.regionalsFinished,
  score: regionScore(INDONESIA_REGION_SCORE),
  scoreDetails: INDONESIA_REGION_SCORE,
  scoreboard: regionalStandings,
  lastYear: Jakarta2025,
  disclaimer: (
    <>
      Preliminary teams list is converted from:{" "}
      <a href="https://competition.binus.ac.id/inc2025/">
        https://competition.binus.ac.id/inc2025/
      </a>
      , excluding teams with 0 solves.
    </>
  ),
};
