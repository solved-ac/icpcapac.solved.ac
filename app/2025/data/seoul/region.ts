import { INSTITUTION_REGION_MAP } from "@/app/data/institutions/institution";
import {
  countTeams,
  countUniversities,
  regionScore,
  RegionScoreArgs,
} from "../regionScore";
import { Region, RegionStatus } from "../types";

import prelimsStandings from "./Korea2025NationalFirstStandings.json";
import regionalStandings from "./Seoul2025Standings.json";

const KOREA_REGION_SCORE: RegionScoreArgs = {
  univs: countUniversities(regionalStandings),
  teams: countTeams(regionalStandings),
  foreignTeams: countTeams(
    regionalStandings.filter(
      (team) => INSTITUTION_REGION_MAP.get(team.institution) !== "KOR"
    )
  ),
  teamsPrelim: countTeams(prelimsStandings),
  univsPrelim: countUniversities(prelimsStandings),
};

export const Seoul: Region = {
  site: "Seoul",
  region: "KOR",
  url: "https://icpckorea.org/2024-seoul/regional",
  status: RegionStatus.regionalsFinished,
  score: regionScore(KOREA_REGION_SCORE),
  scoreDetails: KOREA_REGION_SCORE,
  // TODO replace with ICPC official scoreboard
  scoreboard: regionalStandings,
};
