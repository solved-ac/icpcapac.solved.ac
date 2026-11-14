import { INSTITUTION_REGION_MAP } from "../../institutions/institution";
import { type Regional, RegionalStatus } from "../../types";
import {
  countTeams,
  countUniversities,
  type RegionScoreArgs,
  regionScore,
} from "../regionScore";

import regionalStandings from "./Manila2026Standings.json";

const PHILIPPINES_REGION_SCORE: RegionScoreArgs = {
  univs: countUniversities(regionalStandings),
  teams: countTeams(regionalStandings),
  foreignTeams: countTeams(
    regionalStandings.filter(
      (team) => INSTITUTION_REGION_MAP.get(team.institution) !== "PHL",
    ),
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
  dates: { start: "2025-12-09", end: "2025-12-10" },
  location: "Quezon City, Philippines",
  venue: {
    name: "Areté, Ateneo de Manila University",
  },
  icpcCode: "Manila-2026",
  url: "https://icpc.ateneo.edu/",
  status: RegionalStatus.regionalsFinished,
  score: regionScore(PHILIPPINES_REGION_SCORE),
  scoreDetails: PHILIPPINES_REGION_SCORE,
  scoreboard: regionalStandings,
  disclaimer: (
    <>I could not find any information about preliminaries for this site.</>
  ),
};
