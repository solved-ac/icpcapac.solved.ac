import { INSTITUTION_REGION_MAP } from "@/app/data/institutions/institution";
import {
  countTeams,
  countUniversities,
  regionScore,
  RegionScoreArgs,
} from "../regionScore";
import { Region, RegionStatus } from "../types";

// TODO replace this with official ICPC data
import regionalStandings from "./Jakarta2025Standings.json";

const INDONESIA_REGION_SCORE: RegionScoreArgs = {
  univs: countUniversities(regionalStandings),
  teams: countTeams(regionalStandings),
  foreignTeams: countTeams(
    regionalStandings.filter(
      (team) => INSTITUTION_REGION_MAP.get(team.institution) !== "IDN"
    )
  ),
  // Calculated from https://competition.binus.ac.id/inc2024/
  // (excl. teams with 0 solves)
  teamsPrelim: 716,
  univsPrelim: 20,
};

export const Jakarta: Region = {
  site: "Jakarta",
  region: "IDN",
  url: "https://competition.binus.ac.id/icpc2024/",
  status: RegionStatus.regionalsFinished,
  score: regionScore(INDONESIA_REGION_SCORE),
  scoreDetails: INDONESIA_REGION_SCORE,
  // TODO replace with ICPC official scoreboard
  scoreboard: regionalStandings,
};
