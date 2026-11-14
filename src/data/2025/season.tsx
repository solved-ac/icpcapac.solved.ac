import type { Season } from "../season";
import { Hanoi } from "./hanoi/region";
import { Jakarta } from "./jakarta/region";
import { instutiteRequireValueMap, mergedTeams } from "./mergedTeams";
import { REGION_SCORE_WEIGHTS } from "./regionScore";
import { filterRegionalTeams } from "./regionScoreboard";
import { Seoul } from "./seoul/region";
import { Taichung } from "./taichung/region";
import winnerInstitutions from "./winnerInstitutions.json";
import { Yokohama } from "./yokohama/region";

export const season2025: Season = {
  id: "2025",
  label: "2024-2025",
  cutline: 65,
  regionals: [Taichung, Seoul, Jakarta, Hanoi, Yokohama],
  mergedTeams,
  winnerInstitutions,
  institutionRequiredValue: instutiteRequireValueMap,
  maxTeamsPerUniversity: 3,
  scoreWeights: REGION_SCORE_WEIGHTS,
  filterRegionalTeams,
  regionalTitle: (regional) =>
    `2024 ICPC Asia-Pacific Region - ${regional.site} Site`,
  notices: [
    {
      title: "South Pacific Finals",
      body: (
        <>
          Scoreboard are not published yet in the ICPC system, but retrieved
          from:
          https://sppcontests.org/scoreboards/2024/regionals/scoreboard.htm
        </>
      ),
    },
  ],
};
