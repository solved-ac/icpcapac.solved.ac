import { Seoul as Seoul2025 } from "../../../2025/data/seoul/region";
// import { INSTITUTION_REGION_MAP } from "../institution";
import {
  countTeamNames,
  countTeams,
  countUniversities,
  regionScore,
  RegionScoreArgs,
} from "../regionScore";
import { Regional, RegionalStatus } from "../types";

import prelimsStandings from "./Korea2026NationalFirstStandings.json";
import foreignTeams from "./Seoul2026ForeignTeams.json";
import domesticTeams from "./Seoul2026DomesticTeams.json";
// import regionalStandings from "./Seoul2025Standings.json";

// Expected # of domestic teams is 78.
// see https://icpckorea.org/archives/3356
// `domesticTeams` is generated from the list from the above page.

const KOREA_REGION_SCORE: RegionScoreArgs = {
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

export const Seoul: Regional = {
  contestDate: "2025-11-21",
  site: "Seoul",
  region: "KOR",
  url: "https://icpckorea.org/2025-seoul/regional",
  status: RegionalStatus.preliminariesFinished,
  score: regionScore(KOREA_REGION_SCORE),
  scoreDetails: KOREA_REGION_SCORE,
  regionalTeams: [...foreignTeams, ...domesticTeams],
  lastYear: Seoul2025,
  disclaimer: (
    <>
      Regional domestic team list is converted from:{" "}
      <a href="https://icpckorea.org/archives/3356">
        https://icpckorea.org/archives/3356
      </a>
      .
    </>
  ),
};
