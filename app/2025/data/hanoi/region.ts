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

const VIETNAM_LAST_YEAR_FOREIGN_INSTITUTIONS = [
  // #1
  "Seoul National University",
  // #2, 3, 6, 7, 12
  "National University of Singapore",
  // #4, 11
  "National Taiwan University",
  // #10
  "Universitas Indonesia",
  // #16, 20, 26
  "Nanyang Technological University",
  // #29
  "University of the Thai Chamber of Commerce",
  // #32, 42, 57, 82
  "Chulalongkorn University",
  // #39
  "Bina Nusantara University",
  // #75
  "Ateneo de Manila University",
  // #103
  "Chiang Mai University",
];

const VIETNAM_REGION_SCORE: RegionScoreArgs = {
  // 11/26 18:30 (UTC+7):
  // Domestic univs will be at least 58.
  // # foreign universities is unknown, so it is calculated from
  // the last year's number of foreign teams.
  univs: 58 + VIETNAM_LAST_YEAR_FOREIGN_INSTITUTIONS.length,
  // It will be likely that the number of teams will be 140.
  // (120 Vietnamese teams + 20 foreign teams)
  // https://www.olp.vn/tin-t%E1%BB%A9c/olympic-icpc/th%C3%B4ng-b%C3%A1o
  teams: 140,
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
