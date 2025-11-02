import { INSTITUTION_REGION_MAP } from "@/app/data/institutions/institution";
import {
  countTeams,
  countUniversities,
  regionScore,
  RegionScoreArgs,
} from "../regionScore";
import { Region, RegionStatus } from "../types";

import prelimsTeamsWithUnofficial from "./Vietnam2025NationalScoreboard.json";

import regionalStandings from "./Hanoi2025Standings.json";

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
      (team) => INSTITUTION_REGION_MAP.get(team.institution) !== "VNM"
    )
  ),
  teamsPrelim: countTeams(VIETNAM_PRELIM_TEAMS),
  univsPrelim: countUniversities(VIETNAM_PRELIM_TEAMS),
};

export const Hanoi: Region = {
  site: "Hanoi",
  region: "VNM",
  url: "https://acm-icpc.olp.vn/",
  status: RegionStatus.regionalsFinished,
  score: regionScore(VIETNAM_REGION_SCORE),
  scoreDetails: VIETNAM_REGION_SCORE,
  // TODO replace with ICPC official scoreboard
  scoreboard: regionalStandings,
};
