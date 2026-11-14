import { Yokohama as Yokohama2025 } from "../../2025/yokohama/region";
import { INSTITUTION_REGION_MAP } from "../../institutions/institution";
import { type Regional, RegionalStatus } from "../../types";
// import { INSTITUTION_REGION_MAP } from "../institution";
import {
  countTeams,
  countUniversities,
  type RegionScoreArgs,
  regionScore,
} from "../regionScore";

import prelimsStandings from "./Japan2026OnlineFirstRoundStandings.json";
import regionalStandings from "./Yokohama2026Standings.json";

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
  contestDate: "2025-12-07",
  site: "Yokohama",
  region: "JPN",
  dates: { start: "2025-12-06", end: "2025-12-07" },
  location: "Yokohama, Japan",
  venue: {
    name: "Yokohama Sanbo Hall (横浜産貿ホール)",
    address: "2 Yamashita-cho, Naka-ku, Yokohama, 231-0023 Japan",
  },
  icpcCode: "Yokohama-2026",
  url: "https://icpc.jp/2025/",
  status: RegionalStatus.regionalsFinished,
  score: regionScore(JAPAN_REGION_SCORE),
  scoreDetails: JAPAN_REGION_SCORE,
  scoreboard: regionalStandings,
  lastYear: Yokohama2025,
};
