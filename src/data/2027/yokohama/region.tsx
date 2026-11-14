import { Yokohama as Yokohama2026 } from "../../2026/yokohama/region";
import { type Regional, RegionalStatus } from "../../types";
import {
  countTeamNames,
  countTeams,
  countUniversities,
  type RegionScoreArgs,
  regionScore,
} from "../regionScore";
import prelimsStandings from "./Japan2027OnlineFirstRoundStandings.json";
import domesticTeams from "./Yokohama2027DomesticTeams.json";

// `domesticTeams` is the 50 teams selected in the domestic round (rules A to
// D; the team that declined, E, is left out), from
// https://icpc.jp/2026/domestic/results/.

// Teams accepted on icpc.global as of 2026-11-14, taken to be the foreign
// teams: the domestic teams are selected by the domestic round. Their names
// are not public.
const FOREIGN_TEAMS_ACCEPTED = 10;
// Last season the foreign teams at the five sites came from about two
// universities for every three teams.
const FOREIGN_UNIVS_ESTIMATE = 7;

const JAPAN_REGION_SCORE: RegionScoreArgs = {
  univs: countUniversities(domesticTeams) + FOREIGN_UNIVS_ESTIMATE,
  teams: countTeamNames(domesticTeams) + FOREIGN_TEAMS_ACCEPTED,
  foreignTeams: FOREIGN_TEAMS_ACCEPTED,
  teamsPrelim: countTeams(prelimsStandings),
  univsPrelim: countUniversities(prelimsStandings),
};

export const Yokohama: Regional = {
  contestDate: "2026-12-06",
  site: "Yokohama",
  region: "JPN",
  url: "https://icpc.jp/2026/",
  status: RegionalStatus.preliminariesFinished,
  score: regionScore(JAPAN_REGION_SCORE),
  scoreDetails: JAPAN_REGION_SCORE,
  regionalTeams: domesticTeams,
  lastYear: Yokohama2026,
  disclaimer: (
    <>
      The domestic team list is converted from{" "}
      <a href="https://icpc.jp/2026/domestic/results/">
        https://icpc.jp/2026/domestic/results/
      </a>
      . The foreign teams are not announced: the site score counts the{" "}
      {FOREIGN_TEAMS_ACCEPTED} teams accepted on icpc.global so far as foreign
      teams, from an estimated {FOREIGN_UNIVS_ESTIMATE} universities.
    </>
  ),
};
