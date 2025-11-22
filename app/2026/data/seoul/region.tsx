import { INSTITUTION_REGION_MAP } from "@/app/data/institutions/institution";
import { Seoul as Seoul2025 } from "../../../2025/data/seoul/region";
// import { INSTITUTION_REGION_MAP } from "../institution";
import {
  countTeams,
  countUniversities,
  regionScore,
  RegionScoreArgs,
} from "../regionScore";
import { Regional, RegionalStatus } from "../types";

import prelimsStandings from "./Korea2026NationalFirstStandings.json";
import regionalStandings from "./Seoul2026Standings.json";

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

export const Seoul: Regional = {
  contestDate: "2025-11-21",
  site: "Seoul",
  region: "KOR",
  url: "https://icpckorea.org/2025-seoul/regional",
  status: RegionalStatus.regionalsFinished,
  score: regionScore(KOREA_REGION_SCORE),
  scoreDetails: KOREA_REGION_SCORE,
  scoreboard: regionalStandings,
  lastYear: Seoul2025,
  disclaimer: (
    <>
      Scoreboard is not yet published in the ICPC system, but is official since
      I am in the technical committee.
    </>
  ),
};
