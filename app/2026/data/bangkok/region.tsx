import { INSTITUTION_REGION_MAP } from "../../../data/institutions/institution";
import {
  countTeamNames,
  countTeams,
  countUniversities,
  regionScore,
  RegionScoreArgs,
} from "../regionScore";
import { Regional, RegionalStatus } from "../types";

// TODO replace this with official ICPC data
// Converted from https://docs.google.com/spreadsheets/d/1-iGAEtp5xeaeTdsj6eD9YJiBGgHIHP5QmvHvwRoZeCg/htmlview?fbclid=IwY2xjawN0NL9leHRuA2FlbQIxMABicmlkETFaRkdKRzhCekxwMzF2ZFlYAR6sX1rnk1smT8TaF0RRjA52mCblUk4R_dhT5Bf3k5ugbH4qgdjRQ1LtyDcMFQ_aem_yj1Fijx_bwk5kvrLPXYy6A
import prelimsTeams from "./ThailandNational2025Teams.json";
// Converted from https://icpc.cp.eng.chula.ac.th/2025/team-register
import regionalStandings from "./Bangkok2026Standings.json";

const THAILAND_REGION_SCORE: RegionScoreArgs = {
  univs: countUniversities(regionalStandings),
  teams: countTeams(regionalStandings),
  foreignTeams: countTeams(
    regionalStandings.filter(
      (team) => INSTITUTION_REGION_MAP.get(team.institution) !== "THA"
    )
  ),
  teamsPrelim: countTeamNames(prelimsTeams),
  univsPrelim: countUniversities(prelimsTeams),
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
      The scoreboard (national round and regionals) is not yet available from
      ICPC official sources, therefore may differ from the official results.
      <br />
      Regional team list is converted from:{" "}
      <a href="https://icpc.cp.eng.chula.ac.th/2025/team-register">
        https://icpc.cp.eng.chula.ac.th/2025/team-register
      </a>
      .
      <br />
      Preliminary teams list is converted from:{" "}
      <a href="https://docs.google.com/spreadsheets/d/1-iGAEtp5xeaeTdsj6eD9YJiBGgHIHP5QmvHvwRoZeCg/htmlview">
        https://docs.google.com/spreadsheets/d/1-iGAEtp5xeaeTdsj6eD9YJiBGgHIHP5QmvHvwRoZeCg/htmlview
      </a>
      , <b>without excluding teams with 0 solves</b> &ndash; the site score may
      decrease when teams with 0 solves are excluded.
    </>
  ),
};
