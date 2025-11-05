import {
  countTeamNames,
  countUniversities,
  regionScore,
  RegionScoreArgs,
} from "../regionScore";
import { Regional, RegionalStatus } from "../types";

import foreignTeams from "./Manila2026ForeignTeams.json";

// TODO replace this with official ICPC data
const PHILIPPINES_REGION_SCORE: RegionScoreArgs = {
  univs: countUniversities(foreignTeams),
  teams: countTeamNames(foreignTeams),
  foreignTeams: countTeamNames(foreignTeams),
  // Does this site have a preliminary contest?
  // I can't query from https://icpc.global/regionals/finder/Asia-PSP-Provincials-2026
  // TODO: check later
  teamsPrelim: 0,
  univsPrelim: 0,
};

export const Manila: Regional = {
  contestDate: "2025-12-10",
  site: "Manila",
  region: "PHL",
  url: "https://icpc.ateneo.edu/",
  status: RegionalStatus.preliminariesFinished,
  score: regionScore(PHILIPPINES_REGION_SCORE),
  scoreDetails: PHILIPPINES_REGION_SCORE,
  regionalTeams: [...foreignTeams],
  disclaimer: (
    <>
      Registration period not finished. The site score is very likely to change.
      <br />I could not find any information about preliminaries for this site.
    </>
  ),
};
