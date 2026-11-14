import { INSTITUTION_REGION_MAP } from "../../institutions/institution";
import { type Regional, RegionalStatus } from "../../types";
import {
  countTeams,
  countUniversities,
  type RegionScoreArgs,
  regionScore,
} from "../regionScore";

import prelimsStandings from "./Korea2025NationalFirstStandings.json";
import regionalStandings from "./Seoul2025Standings.json";

const KOREA_REGION_SCORE: RegionScoreArgs = {
  univs: countUniversities(regionalStandings),
  teams: countTeams(regionalStandings),
  foreignTeams: countTeams(
    regionalStandings.filter(
      (team) => INSTITUTION_REGION_MAP.get(team.institution) !== "KOR",
    ),
  ),
  teamsPrelim: countTeams(prelimsStandings),
  univsPrelim: countUniversities(prelimsStandings),
};

export const Seoul: Regional = {
  site: "Seoul",
  region: "KOR",
  url: "https://icpckorea.org/2024-seoul/regional",
  status: RegionalStatus.regionalsFinished,
  score: regionScore(KOREA_REGION_SCORE),
  scoreDetails: KOREA_REGION_SCORE,
  // TODO replace with ICPC official scoreboard
  scoreboard: regionalStandings,
};
