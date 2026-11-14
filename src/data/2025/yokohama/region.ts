import { INSTITUTION_REGION_MAP } from "../../institutions/institution";
import { type Regional, RegionalStatus } from "../../types";
import {
  countTeams,
  countUniversities,
  type RegionScoreArgs,
  regionScore,
} from "../regionScore";

import prelimsStandings from "./Japan2025OnlineFirstRoundStandings.json";

import regionalStandings from "./Yokohama2025Standings.json";

const JAPAN_REGION_SCORE: RegionScoreArgs = {
  univs: countUniversities(regionalStandings),
  teams: countTeams(regionalStandings),
  foreignTeams: countTeams(
    regionalStandings.filter(
      (team) => INSTITUTION_REGION_MAP.get(team.institution) !== "JPN",
    ),
  ),
  teamsPrelim: countTeams(prelimsStandings),
  univsPrelim: countUniversities(prelimsStandings),
};

export const Yokohama: Regional = {
  site: "Yokohama",
  region: "JPN",
  url: "https://icpc.jp/2025/",
  status: RegionalStatus.regionalsFinished,
  score: regionScore(JAPAN_REGION_SCORE),
  scoreDetails: JAPAN_REGION_SCORE,
  scoreboard: regionalStandings,
  disclaimer:
    "Scoreboard are not published yet in the ICPC system, but retrieved from: https://icpcsec.firebaseapp.com/standings/",
};
