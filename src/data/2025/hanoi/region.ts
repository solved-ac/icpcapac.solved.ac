import { INSTITUTION_REGION_MAP } from "../../institutions/institution";
import {
  countTeams,
  countUniversities,
  type RegionScoreArgs,
  regionScore,
} from "../../regionScore";
import { type Regional, RegionalStatus } from "../../types";
import regionalStandings from "./Hanoi2025Standings.json";
import prelimsTeamsWithUnofficial from "./Vietnam2025NationalScoreboard.json";

const VIETNAM_PRELIM_TEAMS = prelimsTeamsWithUnofficial.filter((x) => {
  if (x.institution.match(/^HS(GS)? /)) return false;
  if (x.institution.match(/High School/i)) return false;
  return true;
});

const VIETNAM_REGION_SCORE: RegionScoreArgs = {
  univs: countUniversities(regionalStandings),
  teams: countTeams(regionalStandings),
  foreignTeams: countTeams(
    regionalStandings.filter(
      (team) => INSTITUTION_REGION_MAP.get(team.institution) !== "VNM",
    ),
  ),
  teamsPrelim: countTeams(VIETNAM_PRELIM_TEAMS),
  univsPrelim: countUniversities(VIETNAM_PRELIM_TEAMS),
};

export const Hanoi: Regional = {
  site: "Hanoi",
  region: "VNM",
  url: "https://acm-icpc.olp.vn/",
  status: RegionalStatus.regionalsFinished,
  score: regionScore(VIETNAM_REGION_SCORE),
  scoreDetails: VIETNAM_REGION_SCORE,
  // TODO replace with ICPC official scoreboard
  scoreboard: regionalStandings,
};
