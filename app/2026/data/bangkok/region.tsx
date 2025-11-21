import { INSTITUTION_REGION_MAP } from "../../../data/institutions/institution";
import {
  countTeams,
  countUniversities,
  regionScore,
  RegionScoreArgs,
} from "../regionScore";
import { Regional, RegionalStatus } from "../types";

import regionalStandings from "./Bangkok2026Standings.json";

const THAILAND_REGION_SCORE: RegionScoreArgs = {
  univs: countUniversities(regionalStandings),
  teams: countTeams(regionalStandings),
  foreignTeams: countTeams(
    regionalStandings.filter(
      (team) => INSTITUTION_REGION_MAP.get(team.institution) !== "THA"
    )
  ),
  teamsPrelim: 0,
  univsPrelim: 0,
};

export const Bangkok: Regional = {
  contestDate: "2025-11-02",
  site: "Bangkok",
  region: "THA",
  url: "https://icpc.cp.eng.chula.ac.th/2025",
  status: RegionalStatus.regionalsFinished,
  score: regionScore(THAILAND_REGION_SCORE),
  scoreDetails: THAILAND_REGION_SCORE,
  scoreboard: regionalStandings,
  disclaimer: (
    <>
      The technical director confirmed that the ICPC Thailand Nationals is not a
      preliminary contest for this region.
    </>
  ),
};
