import { regionScore, RegionScoreArgs } from "../regionScore";
import { Regional, RegionalStatus } from "../types";

// TODO replace this with official ICPC data
const PHILIPPINES_REGION_SCORE: RegionScoreArgs = {
  univs: 11,
  teams: 28,
  foreignTeams: 11 /* 2022 data; countTeams(
    regionalStandings.filter(
      (team) => INSTITUTION_REGION_MAP.get(team.institution) !== "IDN"
    )
  ) */,
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
  regionalTeams: [],
  disclaimer: (
    <>
      Site score is estimated based on the 2022 data. I could not find any
      information about preliminaries for this site.
    </>
  ),
};
