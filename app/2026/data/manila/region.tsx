import { INSTITUTION_REGION_MAP } from "@/app/data/institutions/institution";
import {
  countTeams,
  countUniversities,
  regionScore,
  RegionScoreArgs,
} from "../regionScore";
import { Regional, RegionalStatus } from "../types";

import regionalStandings from "./Manila2026Standings.json";

// TODO replace this with official ICPC data
const PHILIPPINES_REGION_SCORE: RegionScoreArgs = {
  univs: countUniversities(regionalStandings),
  teams: countTeams(regionalStandings),
  foreignTeams: countTeams(
    regionalStandings.filter(
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
  status: RegionalStatus.regionalsFinished,
  score: regionScore(PHILIPPINES_REGION_SCORE),
  scoreDetails: PHILIPPINES_REGION_SCORE,
  scoreboard: regionalStandings,
  disclaimer: (
    <>
      Scoreboard is not yet published in the ICPC system. It is taken and
      hand-converted from:
      <a href="https://www.facebook.com/photo/?fbid=836955312434837&set=a.836948792435489">
        https://www.facebook.com/photo/?fbid=836955312434837&set=a.836948792435489
      </a>
      .<br />I could not find any information about preliminaries for this site.
    </>
  ),
};
