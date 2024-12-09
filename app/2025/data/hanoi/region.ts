import {
  countTeams,
  countUniversities,
  regionScore,
  RegionScoreArgs,
} from "../regionScore";
import { Region, RegionStatus } from "../types";

import prelimsTeamsWithUnofficial from "./Vietnam2025NationalScoreboard.json";

import { institutionRegionMap } from "../institution";
import regionalTeamsDomestic from "./Hanoi2025TeamsDomestic.json";
import regionalTeamsIntl from "./Hanoi2025TeamsIntl.json";

const regionalTeams = regionalTeamsIntl.concat(regionalTeamsDomestic);

const VIETNAM_PRELIM_TEAMS = prelimsTeamsWithUnofficial.filter((x) => {
  if (x.institution.match(/^HS(GS)? /)) return false;
  if (x.institution.match(/High School/i)) return false;
  return true;
});

const VIETNAM_REGION_SCORE: RegionScoreArgs = {
  univs: countUniversities(regionalTeams),
  teams: countTeams(regionalTeams),
  foreignTeams: countTeams(
    regionalTeams.filter(
      (team) => institutionRegionMap.get(team.institution) !== "VNM"
    )
  ),
  teamsPrelim: countTeams(VIETNAM_PRELIM_TEAMS),
  univsPrelim: countUniversities(VIETNAM_PRELIM_TEAMS),
};

export const Hanoi: Region = {
  site: "Hanoi",
  region: "VNM",
  url: "https://acm-icpc.olp.vn/",
  status: RegionStatus.preliminariesFinished,
  score: regionScore(VIETNAM_REGION_SCORE),
  scoreDetails: VIETNAM_REGION_SCORE,
  regionalTeams,
};
