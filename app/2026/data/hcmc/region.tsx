import { Regional, RegionalStatus } from "../types";

import { Hanoi as Hanoi2025 } from "@/app/2025/data/hanoi/region";

// const VIETNAM_REGION_SCORE: RegionScoreArgs = {
//   univs: countUniversities(regionalStandings),
//   teams: countTeams(regionalStandings),
//   foreignTeams: countTeams(
//     regionalStandings.filter(
//       (team) => INSTITUTION_REGION_MAP.get(team.institution) !== "VNM"
//     )
//   ),
//   teamsPrelim: countTeams(VIETNAM_PRELIM_TEAMS),
//   univsPrelim: countUniversities(VIETNAM_PRELIM_TEAMS),
// };

export const HCMC: Regional = {
  contestDate: "2025-12-11",
  site: "HCMC",
  region: "VNM",
  url: "https://acm-icpc.olp.vn/",
  status: RegionalStatus.preparing,
  // score: regionScore(VIETNAM_REGION_SCORE),
  // scoreDetails: VIETNAM_REGION_SCORE,
  score: Hanoi2025.score,
  scoreDetails: Hanoi2025.scoreDetails,
  lastYear: Hanoi2025,
  disclaimer: <>Site score is from last year&lsquo;s Hanoi regionals.</>,
};
