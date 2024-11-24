import {
  countTeams,
  countUniversities,
  regionScore,
  RegionScoreArgs,
} from "../regionScore";
import { Region, RegionStatus } from "../types";

import prelimsTeamsWithUnofficial from "./Vietnam2025NationalScoreboard.json";

const VIETNAM_PRELIM_TEAMS = prelimsTeamsWithUnofficial.filter((x) => {
  if (x.institution.match(/^HS(GS)? /)) return false;
  if (x.institution.match(/High School/i)) return false;
  return true;
});

const VIETNAM_REGION_SCORE: RegionScoreArgs = {
  univs: 63,
  teams: 125,
  foreignTeams: 20,
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
  regionalTeams: [],
};
