import type { Season } from "../season";
import { Bangkok } from "./bangkok/region";
import { HCMC } from "./hcmc/region";
import { Jakarta } from "./jakarta/region";
import { Manila } from "./manila/region";
import { instutiteRequireValueMap, mergedTeams } from "./mergedTeams";
import { REGION_SCORE_WEIGHTS } from "./regionScore";
import { filterRegionalTeams } from "./regionScoreboard";
import sameTeams from "./same_teams.json";
import { Seoul } from "./seoul/region";
import { Taichung } from "./taichung/region";
import winnerInstitutions from "./winnerInstitutions.json";
import { Yokohama } from "./yokohama/region";

export const season2026: Season = {
  id: "2026",
  label: "2025-2026",
  cutline: 70,
  // By contest date.
  regionals: [Bangkok, Taichung, Seoul, Jakarta, Yokohama, Manila, HCMC],
  mergedTeams,
  winnerInstitutions,
  institutionRequiredValue: instutiteRequireValueMap,
  scoreWeights: REGION_SCORE_WEIGHTS,
  filterRegionalTeams,
  regionalTitle: (regional) =>
    `The 2025 ICPC Asia ${
      regional.site === "HCMC" ? "Ho Chi Minh City" : regional.site
    } Regional Contest`,
  lastYearLabel: "(2024)",
  notices: [
    {
      title: "Constraints",
      body: (
        <>
          It is confirmed that the 2026 APAC Finals will qualify <b>70</b>{" "}
          teams.
        </>
      ),
    },
    {
      title: "Institution Names",
      body: (
        <>
          If the institution had participated in the World Finals, its name is
          shortened according to the name printed on the latest ICPC World
          Finals T-shirt. Otherwise, the full institution name is shown.
        </>
      ),
    },
  ],
  sameTeams,
};
