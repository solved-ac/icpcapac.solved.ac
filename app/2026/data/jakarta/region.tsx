import { Jakarta as Jakarta2025 } from "../../../2025/data/jakarta/region";
import { regionScore, RegionScoreArgs } from "../regionScore";
import { Regional, RegionalStatus } from "../types";

// TODO replace this with official ICPC data
// import regionalStandings from "./Jakarta2025Standings.json";

const INDONESIA_REGION_SCORE: RegionScoreArgs = {
  univs: 28, // Last year data; replace with countUniversities(regionalStandings),
  teams: 73, // Last year data; countTeams(regionalStandings),
  foreignTeams: 24 /* Last year data; countTeams(
    regionalStandings.filter(
      (team) => INSTITUTION_REGION_MAP.get(team.institution) !== "IDN"
    )
  ) */,
  // Calculated from https://competition.binus.ac.id/inc2025/
  // (excl. teams with 0 solves)
  teamsPrelim: 436,
  univsPrelim: 25,
};

export const Jakarta: Regional = {
  contestDate: "2025-11-24",
  site: "Jakarta",
  region: "IDN",
  url: "https://competition.binus.ac.id/icpc2025/",
  status: RegionalStatus.preliminariesFinished,
  score: regionScore(INDONESIA_REGION_SCORE),
  scoreDetails: INDONESIA_REGION_SCORE,
  regionalTeams: [],
  lastYear: Jakarta2025,
  disclaimer: (
    <>
      Registration is still open. The # of teams and universities participating
      in the regional contest is from last year.
      <br />
      Preliminary teams list is converted from:{" "}
      <a href="https://competition.binus.ac.id/inc2025/">
        https://competition.binus.ac.id/inc2025/
      </a>
      , excluding teams with 0 solves.
    </>
  ),
};
