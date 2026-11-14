import { HCMC as HCMC2026 } from "../../2026/hcmc/region";
import { isVNMHighSchool } from "../../institutions/institution";
import { type Regional, RegionalStatus } from "../../types";
import {
  countTeams,
  countUniversities,
  type RegionScoreArgs,
  regionScore,
} from "../regionScore";
import prelimsStandings from "./Vietnam2027NationalScoreboard.json";

const VIETNAM_PRELIM_TEAMS = prelimsStandings.filter(
  (team) => !isVNMHighSchool(team.institution),
);

// No team list is published for the regional, and the domestic teams are not
// yet registered on icpc.global. Until they are, the domestic side is taken
// from last season's Ho Chi Minh City regional: 111 Vietnamese teams from 51
// universities solved a problem there.
const DOMESTIC_TEAMS_LAST_SEASON = 111;
const DOMESTIC_UNIVS_LAST_SEASON = 51;

// Foreign teams accepted on icpc.global as of 2026-11-14 (registration is
// open until 2026-12-01). Their names are not public.
const FOREIGN_TEAMS_ACCEPTED = 29;
// Last season the foreign teams at the five sites came from about two
// universities for every three teams.
const FOREIGN_UNIVS_ESTIMATE = 19;

const VIETNAM_REGION_SCORE: RegionScoreArgs = {
  univs: DOMESTIC_UNIVS_LAST_SEASON + FOREIGN_UNIVS_ESTIMATE,
  teams: DOMESTIC_TEAMS_LAST_SEASON + FOREIGN_TEAMS_ACCEPTED,
  foreignTeams: FOREIGN_TEAMS_ACCEPTED,
  teamsPrelim: countTeams(VIETNAM_PRELIM_TEAMS),
  univsPrelim: countUniversities(VIETNAM_PRELIM_TEAMS),
};

export const Danang: Regional = {
  contestDate: "2026-12-11",
  site: "Danang",
  region: "VNM",
  url: "https://acm-icpc.olp.vn/",
  status: RegionalStatus.preliminariesFinished,
  score: regionScore(VIETNAM_REGION_SCORE),
  scoreDetails: VIETNAM_REGION_SCORE,
  regionalTeams: [],
  lastYear: HCMC2026,
  disclaimer: (
    <>
      The team list is not published. The preliminary counts are from the
      official standings of the 2026 Vietnam National Contest. For the regional,
      the site score assumes as many Vietnamese teams and universities as last
      season&rsquo;s Ho Chi Minh City regional ({DOMESTIC_TEAMS_LAST_SEASON}{" "}
      teams, {DOMESTIC_UNIVS_LAST_SEASON} universities), plus the{" "}
      {FOREIGN_TEAMS_ACCEPTED} foreign teams accepted on icpc.global so far,
      from an estimated {FOREIGN_UNIVS_ESTIMATE} universities.
    </>
  ),
};
