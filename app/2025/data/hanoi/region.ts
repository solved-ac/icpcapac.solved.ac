import {
  countTeams,
  countUniversities,
  regionScore,
  RegionScoreArgs,
} from "../regionScore";
import { Region, RegionStatus } from "../types";

import prelimsTeams from "./Vietnam2025NationalScoreboard.json";

const VIETNAM_REGION_SCORE: RegionScoreArgs = {
  univs: 63,
  teams: 125,
  foreignTeams: 20,
  teamsPrelim: countTeams(prelimsTeams),
  univsPrelim: countUniversities(prelimsTeams),
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
