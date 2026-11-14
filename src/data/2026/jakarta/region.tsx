import { Jakarta as Jakarta2025 } from "../../2025/jakarta/region";
import { INSTITUTION_REGION_MAP } from "../../institutions/institution";
import { type Regional, RegionalStatus } from "../../types";
import {
  countTeams,
  countUniversities,
  type RegionScoreArgs,
  regionScore,
} from "../regionScore";

import prelimsStandings from "./Indonesia2026NationalStandings.json";
import regionalStandings from "./Jakarta2026Standings.json";

const INDONESIA_REGION_SCORE: RegionScoreArgs = {
  univs: countUniversities(regionalStandings),
  teams: countTeams(regionalStandings),
  foreignTeams: countTeams(
    regionalStandings.filter(
      (team) => INSTITUTION_REGION_MAP.get(team.institution) !== "IDN",
    ),
  ),
  teamsPrelim: countTeams(prelimsStandings),
  univsPrelim: countUniversities(prelimsStandings),
};

export const Jakarta: Regional = {
  contestDate: "2025-11-24",
  site: "Jakarta",
  region: "IDN",
  dates: { start: "2025-11-22", end: "2025-11-24" },
  location: "Jakarta, Indonesia",
  venue: {
    name: "BINUS University, Anggrek Campus",
    address:
      "Jl. Kebon Jeruk Raya No. 27, Kebun Jeruk, Jakarta Barat 11530, Indonesia",
    mapUrl: "https://maps.app.goo.gl/yvfh18v6SN63ZHzY9",
  },
  icpcCode: "Jakarta-2026",
  url: "https://competition.binus.ac.id/icpc2025/",
  status: RegionalStatus.regionalsFinished,
  score: regionScore(INDONESIA_REGION_SCORE),
  scoreDetails: INDONESIA_REGION_SCORE,
  scoreboard: regionalStandings,
  lastYear: Jakarta2025,
};
