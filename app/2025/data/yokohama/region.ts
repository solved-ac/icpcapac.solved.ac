import { institutionRegionMap } from "../institution";
import {
  countTeams,
  countUniversities,
  regionScore,
  RegionScoreArgs,
} from "../regionScore";
import { Region, RegionStatus } from "../types";

import prelimsStandings from "./Japan2025OnlineFirstRoundStandings.json";

import regionalStandings from "./Yokohama2025Standings.json";

const JAPAN_REGION_SCORE: RegionScoreArgs = {
  univs: countUniversities(regionalStandings),
  teams: countTeams(regionalStandings),
  foreignTeams: countTeams(
    regionalStandings.filter(
      (team) => institutionRegionMap.get(team.institution) !== "JPN"
    )
  ),
  teamsPrelim: countTeams(prelimsStandings),
  univsPrelim: countUniversities(prelimsStandings),
};

export const Yokohama: Region = {
  site: "Yokohama",
  region: "JPN",
  url: "https://icpc.iisf.or.jp/2024-yokohama/",
  status: RegionStatus.regionalsFinished,
  score: regionScore(JAPAN_REGION_SCORE),
  scoreDetails: JAPAN_REGION_SCORE,
  scoreboard: regionalStandings,
};
