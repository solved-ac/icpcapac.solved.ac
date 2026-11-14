import { Jakarta as Jakarta2026 } from "../../2026/jakarta/region";
import { type Regional, RegionalStatus } from "../../types";
import {
  countTeamNames,
  countTeams,
  countUniversities,
  type RegionScoreArgs,
  regionScore,
} from "../regionScore";
import prelimsStandings from "./Indonesia2027NationalStandings.json";
import domesticTeams from "./Jakarta2027DomesticTeams.json";

// No list of local teams is published. `domesticTeams` is an estimate: the 61
// teams the official INC 2026 standings on icpc.global set apart from the
// rest, which are the 56 ranked teams (General group) and the 5 cited with
// "Honors" (Supplementary group). The INC rules advance the top 40 of the
// General group and the top 5 of the Supplementary group, and invite further
// General group teams up to about 55 local teams:
// https://competition.binus.ac.id/icpc2026/inc_rules.pdf

// Foreign teams accepted on icpc.global as of 2026-11-14. Their names are not
// public.
const FOREIGN_TEAMS_ACCEPTED = 30;
// Last season the foreign teams at the five sites came from about two
// universities for every three teams.
const FOREIGN_UNIVS_ESTIMATE = 20;

const INDONESIA_REGION_SCORE: RegionScoreArgs = {
  univs: countUniversities(domesticTeams) + FOREIGN_UNIVS_ESTIMATE,
  teams: countTeamNames(domesticTeams) + FOREIGN_TEAMS_ACCEPTED,
  foreignTeams: FOREIGN_TEAMS_ACCEPTED,
  teamsPrelim: countTeams(prelimsStandings),
  univsPrelim: countUniversities(prelimsStandings),
};

export const Jakarta: Regional = {
  contestDate: "2026-11-29",
  site: "Jakarta",
  region: "IDN",
  url: "https://competition.binus.ac.id/icpc2026/",
  status: RegionalStatus.preliminariesFinished,
  score: regionScore(INDONESIA_REGION_SCORE),
  scoreDetails: INDONESIA_REGION_SCORE,
  regionalTeams: domesticTeams,
  lastYear: Jakarta2026,
  disclaimer: (
    <>
      The team list is an estimate. No list of local teams is published; shown
      are the 61 teams that the official standings of the Indonesia National
      Contest rank or cite with honors, which is the group the{" "}
      <a href="https://competition.binus.ac.id/icpc2026/inc_rules.pdf">
        INC rules
      </a>{" "}
      advance from. The foreign teams are not announced: the site score counts
      the {FOREIGN_TEAMS_ACCEPTED} foreign teams accepted on icpc.global so far,
      from an estimated {FOREIGN_UNIVS_ESTIMATE} universities.
    </>
  ),
};
