import { institutionRegionMap } from "../institution";
import {
  countTeams,
  countUniversities,
  regionScore,
  RegionScoreArgs,
} from "../regionScore";
import { Region, RegionStatus } from "../types";

import prelimsStandings from "./Japan2025OnlineFirstRoundStandings.json";

import regionalTeams from "./Yokohama2025Teams.json";

const JAPAN_REGION_SCORE: RegionScoreArgs = {
  univs: countUniversities(regionalTeams),
  teams: countTeams(regionalTeams),
  foreignTeams: countTeams(
    regionalTeams.filter(
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
  status: RegionStatus.preliminariesFinished,
  score: regionScore(JAPAN_REGION_SCORE),
  scoreDetails: JAPAN_REGION_SCORE,
  regionalTeams: regionalTeams,
};
