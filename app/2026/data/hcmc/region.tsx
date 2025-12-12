import { Regional, RegionalStatus } from "../types";
import { isVNMHighSchool } from "@/app/data/institutions/institution";
import {
  countTeams,
  countUniversities,
  regionScore,
  RegionScoreArgs,
} from "../regionScore";

import { Hanoi as Hanoi2025 } from "@/app/2025/data/hanoi/region";

import regionalStandings from "./Vietnam2026NationalScoreboard.json";
import foreignTeams from "./HCMC2026ForeignTeams.json";

const VIETNAM_PRELIM_TEAMS = regionalStandings.filter(
  (team) => !isVNMHighSchool(team.institution)
);

const VIETNAM_REGION_SCORE: RegionScoreArgs = {
  univs: 61, //countUniversities(regionalStandings),
  teams: 129, //countTeams(regionalStandings),
  // foreignTeams: countTeams(
  //   regionalStandings.filter(
  //     (team) => INSTITUTION_REGION_MAP.get(team.institution) !== "VNM"
  //   )
  // ),
  foreignTeams: foreignTeams.length,
  teamsPrelim: countTeams(VIETNAM_PRELIM_TEAMS),
  univsPrelim: countUniversities(VIETNAM_PRELIM_TEAMS),
};

export const HCMC: Regional = {
  contestDate: "2025-12-11",
  site: "HCMC",
  region: "VNM",
  url: "https://acm-icpc.olp.vn/",
  status: RegionalStatus.preparing,
  score: regionScore(VIETNAM_REGION_SCORE),
  scoreDetails: VIETNAM_REGION_SCORE,
  lastYear: Hanoi2025,
  disclaimer: <>It is confirmed that 130 teams from 62 univs will attend.</>,
};
