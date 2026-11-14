import { INSTITUTION_REGION_MAP } from "../../institutions/institution";
import {
  countTeams,
  countUniversities,
  type RegionScoreArgs,
  regionScore,
} from "../../regionScore";
import { type Regional, RegionalStatus } from "../../types";

// TODO replace this with official ICPC data
import regionalStandings from "./Jakarta2025Standings.json";

const INDONESIA_REGION_SCORE: RegionScoreArgs = {
  univs: countUniversities(regionalStandings),
  teams: countTeams(regionalStandings),
  foreignTeams: countTeams(
    regionalStandings.filter(
      (team) => INSTITUTION_REGION_MAP.get(team.institution) !== "IDN",
    ),
  ),
  // Calculated from https://competition.binus.ac.id/inc2024/
  // (excl. teams with 0 solves)
  teamsPrelim: 716,
  univsPrelim: 20,
};

export const Jakarta: Regional = {
  site: "Jakarta",
  region: "IDN",
  url: "https://competition.binus.ac.id/icpc2024/",
  status: RegionalStatus.regionalsFinished,
  score: regionScore(INDONESIA_REGION_SCORE),
  scoreDetails: INDONESIA_REGION_SCORE,
  // TODO replace with ICPC official scoreboard
  scoreboard: regionalStandings,
};
