import { Hanoi as Hanoi2025 } from "../../2025/hanoi/region";
import {
  INSTITUTION_REGION_MAP,
  isVNMHighSchool,
} from "../../institutions/institution";
import { type Regional, RegionalStatus } from "../../types";
import {
  countTeams,
  countUniversities,
  type RegionScoreArgs,
  regionScore,
} from "../regionScore";

import regionalStandings from "./HCMC2026Standings.json";
import prelimsStandings from "./Vietnam2026NationalScoreboard.json";

const VIETNAM_PRELIM_TEAMS = prelimsStandings.filter(
  (team) => !isVNMHighSchool(team.institution),
);

const VIETNAM_REGION_SCORE: RegionScoreArgs = {
  univs: countUniversities(regionalStandings),
  teams: countTeams(regionalStandings),
  foreignTeams: countTeams(
    regionalStandings.filter(
      (team) => INSTITUTION_REGION_MAP.get(team.institution) !== "VNM",
    ),
  ),
  teamsPrelim: countTeams(VIETNAM_PRELIM_TEAMS),
  univsPrelim: countUniversities(VIETNAM_PRELIM_TEAMS),
};

export const HCMC: Regional = {
  contestDate: "2025-12-11",
  site: "HCMC",
  region: "VNM",
  url: "https://acm-icpc.olp.vn/",
  status: RegionalStatus.regionalsFinished,
  score: regionScore(VIETNAM_REGION_SCORE),
  scoreDetails: VIETNAM_REGION_SCORE,
  scoreboard: regionalStandings,
  lastYear: Hanoi2025,
};
