import { INSTITUTION_REGION_MAP } from "@/app/data/institutions/institution";
import { Yokohama as Yokohama2025 } from "../../../2025/data/yokohama/region";
// import { INSTITUTION_REGION_MAP } from "../institution";
import {
  countTeams,
  countUniversities,
  regionScore,
  RegionScoreArgs,
} from "../regionScore";
import { Regional, RegionalStatus } from "../types";

import prelimsStandings from "./Japan2026OnlineFirstRoundStandings.json";
import regionalStandings from "./Yokohama2026Standings.json";

const JAPAN_REGION_SCORE: RegionScoreArgs = {
  univs: countUniversities(regionalStandings),
  teams: countTeams(regionalStandings),
  foreignTeams: countTeams(
    regionalStandings.filter(
      (team) => INSTITUTION_REGION_MAP.get(team.institution) !== "JPN"
    )
  ),
  teamsPrelim: countTeams(prelimsStandings),
  univsPrelim: countUniversities(prelimsStandings),
};

export const Yokohama: Regional = {
  contestDate: "2025-12-07",
  site: "Yokohama",
  region: "JPN",
  url: "https://icpc.jp/2025/",
  status: RegionalStatus.regionalsFinished,
  score: regionScore(JAPAN_REGION_SCORE),
  scoreDetails: JAPAN_REGION_SCORE,
  scoreboard: regionalStandings,
  lastYear: Yokohama2025,
  disclaimer: (
    <>
      Scoreboard is not yet published in the ICPC system. It is converted from:{" "}
      <a href="https://icpcsec.firebaseapp.com/standings/">
        https://icpcsec.firebaseapp.com/standings/
      </a>{" "}
      at 25-12-07.
    </>
  ),
};
