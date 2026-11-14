import { INSTITUTION_REGION_MAP } from "../../institutions/institution";
import { type Regional, RegionalStatus } from "../../types";
import {
  countTeams,
  countUniversities,
  type RegionScoreArgs,
  regionScore,
} from "../regionScore";

// TODO replace this with official ICPC data
import regionalStandings from "./Jakarta2025Standings.json";

const INDONESIA_REGION_SCORE: RegionScoreArgs = {
  univs: countUniversities(regionalStandings),
  teams: countTeams(regionalStandings),
  foreignTeams: countTeams(
    regionalStandings.filter(
      (team) => INSTITUTION_REGION_MAP.get(team.institution) !== "IDN",
    ),
  ),
  // Calculated from https://competition.binus.ac.id/inc2024/
  // (excl. teams with 0 solves)
  teamsPrelim: 716,
  univsPrelim: 20,
};

export const Jakarta: Regional = {
  site: "Jakarta",
  region: "IDN",
  dates: { start: "2024-11-30", end: "2024-12-02" },
  location: "Jakarta, Indonesia",
  venue: {
    name: "BINUS University, Anggrek Campus",
    address:
      "Jl. Kebon Jeruk Raya No. 27, Kebun Jeruk, Jakarta Barat 11530, Indonesia",
    mapUrl: "https://maps.app.goo.gl/yvfh18v6SN63ZHzY9",
  },
  icpcCode: "Jakarta-2025",
  url: "https://competition.binus.ac.id/icpc2024/",
  status: RegionalStatus.regionalsFinished,
  score: regionScore(INDONESIA_REGION_SCORE),
  scoreDetails: INDONESIA_REGION_SCORE,
  // TODO replace with ICPC official scoreboard
  scoreboard: regionalStandings,
};
