import { Seoul as Seoul2026 } from "../../2026/seoul/region";
import { INSTITUTION_REGION_MAP } from "../../institutions/institution";
import { type Regional, RegionalStatus } from "../../types";
import {
  countTeams,
  countUniversities,
  type RegionScoreArgs,
  regionScore,
} from "../regionScore";
import prelimsStandings from "./Korea2027NationalFirstStandings.json";
import regionalStandings from "./Seoul2027Standings.json";

// `Seoul2027DomesticTeams.json` and `Seoul2027ForeignTeams.json` are the
// team lists announced before the contest, kept as a record.

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
  contestDate: "2026-11-14",
  site: "Seoul",
  region: "KOR",
  dates: { start: "2026-11-13", end: "2026-11-14" },
  location: "Goyang, Korea",
  venue: {
    name: "KINTEX Exhibition Center 2, 4th floor",
    address: "217-60 Kintex-ro, Ilsanseo-gu, Goyang-si, Gyeonggi-do, Korea",
  },
  icpcCode: "Seoul-2027",
  url: "https://icpckorea.org/2026-seoul/2026-regional/",
  status: RegionalStatus.regionalsFinished,
  score: regionScore(KOREA_REGION_SCORE),
  scoreDetails: KOREA_REGION_SCORE,
  scoreboard: regionalStandings,
  lastYear: Seoul2026,
};
