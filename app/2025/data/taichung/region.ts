import { institutionRegionMap } from "../institution";
import {
  countTeams,
  countUniversities,
  regionScore,
  RegionScoreArgs,
} from "../regionScore";
import { Region, RegionStatus } from "../types";

import regionalStandings from "./Taichung2025Standings.json";

import prelimsOnlineStandings from "./Taiwan2025OnlineStandings.json";
import prelimsPrivateUSStandings from "./Taiwan2025PrivateUStandings.json";
import prelimsTechUSStandings from "./Taiwan2025TechUStandings.json";

const TAIWAN_PRELIMS_ALL_STANDINGS = [
  ...prelimsOnlineStandings,
  ...prelimsPrivateUSStandings,
  ...prelimsTechUSStandings,
];

const TAIWAN_REGION_SCORE: RegionScoreArgs = {
  univs: countUniversities(regionalStandings),
  teams: countTeams(regionalStandings),
  foreignTeams: countTeams(
    regionalStandings.filter(
      (team) => institutionRegionMap.get(team.institution) !== "TWN"
    )
  ),
  teamsPrelim: countTeams(TAIWAN_PRELIMS_ALL_STANDINGS),
  univsPrelim: countUniversities(TAIWAN_PRELIMS_ALL_STANDINGS),
};

export const Taichung: Region = {
  site: "Taichung",
  region: "TWN",
  url: "https://hpc.asia.edu.tw/icpc2024/",
  status: RegionStatus.regionalsFinished,
  score: regionScore(TAIWAN_REGION_SCORE),
  scoreDetails: TAIWAN_REGION_SCORE,
  scoreboard: regionalStandings,
};
