import { INSTITUTION_REGION_MAP } from "@/app/data/institutions/institution";
import {
  countTeamNames,
  countUniversities,
  regionScore,
  RegionScoreArgs,
} from "../regionScore";
import { Regional, RegionalStatus } from "../types";

import regionalTeams from "./Manila2026Teams.json";

// TODO replace this with official ICPC data
const PHILIPPINES_REGION_SCORE: RegionScoreArgs = {
  univs: countUniversities(regionalTeams),
  teams: countTeamNames(regionalTeams),
  foreignTeams: countTeamNames(
    regionalTeams.filter(
      (team) => INSTITUTION_REGION_MAP.get(team.institution) !== "PHL"
    )
  ),
  // Does this site have a preliminary contest?te
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
  regionalTeams,
  disclaimer: (
    <>I could not find any information about preliminaries for this site.</>
  ),
};
