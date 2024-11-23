import { institutionRegionMap } from "../institution";
import {
  countTeams,
  countUniversities,
  regionScore,
  RegionScoreArgs,
} from "../regionScore";
import { Region, RegionStatus } from "../types";

import regionalTeams from "./Jakarta2025Teams.json";
// TODO replace this with official ICPC data
// import prelimsTeams from "./Indonesia2025INCTeams.json";

const INDONESIA_REGION_SCORE: RegionScoreArgs = {
  // Last year's numbers
  univs: countUniversities(regionalTeams),
  teams: countTeams(regionalTeams),
  foreignTeams: countTeams(
    regionalTeams.filter(
      (team) => institutionRegionMap.get(team.institution) !== "IDN"
    )
  ),
  // Calculated from https://competition.binus.ac.id/inc2024/
  // (excl. teams with 0 solves)
  teamsPrelim: 716,
  univsPrelim: 20,
};

export const Jakarta: Region = {
  site: "Jakarta",
  region: "IDN",
  url: "https://competition.binus.ac.id/icpc2024/",
  status: RegionStatus.preliminariesFinished,
  score: regionScore(INDONESIA_REGION_SCORE),
  scoreDetails: INDONESIA_REGION_SCORE,
  regionalTeams,
};
