import type { Season } from "../season";
import { Danang } from "./danang/region";
import { Jakarta } from "./jakarta/region";
import { instutiteRequireValueMap, mergedTeams } from "./mergedTeams";
import { REGION_SCORE_WEIGHTS } from "./regionScore";
import {
  filterRegionalTeams,
  MAX_TEAMS_PER_UNIVERSITY,
} from "./regionScoreboard";
import { Seoul } from "./seoul/region";
import winnerInstitutions from "./winnerInstitutions.json";
import { Yokohama } from "./yokohama/region";
import { Yunlin } from "./yunlin/region";

export const season2027: Season = {
  id: "2027",
  label: "2026-2027",
  // P is not announced for the 2027 Championship; last season's 70 is assumed.
  cutline: 70,
  // By contest date. Bangkok and Manila hold no regional this season.
  regionals: [Seoul, Jakarta, Yokohama, Danang, Yunlin],
  mergedTeams,
  winnerInstitutions,
  institutionRequiredValue: instutiteRequireValueMap,
  maxTeamsPerUniversity: MAX_TEAMS_PER_UNIVERSITY,
  scoreWeights: REGION_SCORE_WEIGHTS,
  filterRegionalTeams,
  regionalTitle: (regional) =>
    `The 2026 ICPC Asia ${regional.site} Regional Contest`,
  lastYearLabel: "(2025)",
  notices: [
    {
      title: "Rules",
      body: (
        <>
          This list follows the{" "}
          <a href="https://icpc.jp/apac/2026-27/rulenew/">
            Asia Pacific Rules for 2026-2027
          </a>{" "}
          (1 November 2026). New this season, a university can send at most{" "}
          <b>{MAX_TEAMS_PER_UNIVERSITY}</b> teams to the Championship (it was
          3). There are five regionals: Seoul, Jakarta, Yokohama, Danang and
          Yunlin.
        </>
      ),
    },
    {
      title: "Constraints",
      body: (
        <>
          The number of teams for the 2027 Championship is not announced. Last
          season&rsquo;s 70 is assumed.
        </>
      ),
    },
    {
      title: "Estimates",
      body: (
        <>
          Seoul has official standings. For a regional not yet held, the list
          below holds a placeholder for each team the site expects, and its
          score is computed from the official preliminary standings and from
          what is known of its teams; each site&rsquo;s page says where its
          numbers come from.
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
};
