import { Yokohama as Yokohama2025 } from "../../../2025/data/yokohama/region";
// import { INSTITUTION_REGION_MAP } from "../institution";
import {
  countTeamNames,
  countTeams,
  countUniversities,
  regionScore,
  RegionScoreArgs,
} from "../regionScore";
import { Regional, RegionalStatus } from "../types";

import prelimsStandings from "./Japan2026OnlineFirstRoundStandings.json";
import domesticTeams from "./Yokohama2026DomesticTeams.json";
import foreignTeams from "./Yokohama2026ForeignTeams.json";
// import regionalStandings from "./Seoul2025Standings.json";

// Expected # of domestic teams is 78.
// see https://icpckorea.org/archives/3356
// `domesticTeams` is generated from the list from the above page.

const JAPAN_REGION_SCORE: RegionScoreArgs = {
  univs: countUniversities(foreignTeams, domesticTeams),
  teams: countTeamNames(foreignTeams, domesticTeams),
  // foreignTeams: countTeams(
  //   regionalStandings.filter(
  //     (team) => INSTITUTION_REGION_MAP.get(team.institution) !== "KOR"
  //   )
  // ),
  foreignTeams: countTeamNames(foreignTeams),
  teamsPrelim: countTeams(prelimsStandings),
  univsPrelim: countUniversities(prelimsStandings),
};

export const Yokohama: Regional = {
  contestDate: "2025-12-07",
  site: "Yokohama",
  region: "JPN",
  url: "https://icpc.jp/2025/",
  status: RegionalStatus.preliminariesFinished,
  score: regionScore(JAPAN_REGION_SCORE),
  scoreDetails: JAPAN_REGION_SCORE,
  regionalTeams: [...foreignTeams, ...domesticTeams],
  lastYear: Yokohama2025,
  disclaimer: (
    <>
      Regional domestic team list is converted from:{" "}
      <a href="https://icpc.jp/2025/domestic/results/">
        https://icpc.jp/2025/domestic/results/
      </a>
      .
    </>
  ),
};
