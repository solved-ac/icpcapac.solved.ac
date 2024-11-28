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
  // 11/28 16:30 (UTC+7):
  // https://www.olp.vn/tin-t%E1%BB%A9c/olympic-icpc/th%C3%B4ng-b%C3%A1o
  univs: 69,
  teams: 136,
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
