import { institutionRegionMap } from "../institution";
import {
  countTeams,
  countUniversities,
  regionScore,
  RegionScoreArgs,
} from "../regionScore";
import { Region, RegionStatus, TeamInStandingsLike } from "../types";

import regionalStandings from "./Taichung2025Standings.json";

import prelimsOnlineStandings from "./Taiwan2025OnlineStandings.json";
import prelimsPrivateUSStandings from "./Taiwan2025PrivateUStandings.json";
import prelimsTechUSStandings from "./Taiwan2025TechUStandings.json";

// Remove duplicate teams in prelims standings:
// in Taiwan, one team can participate in multiple prelims contests
// (both TOPC and PUPC / both TOPC and TUPC)
const TAIWAN_PRELIMS_ALL_STANDINGS = (() => {
  const prelimsAllStandings: TeamInStandingsLike[] = [];
  const teamOccurSet = new Set<string>();
  [
    prelimsOnlineStandings,
    prelimsPrivateUSStandings,
    prelimsTechUSStandings,
  ].forEach((prelimsStandings) => {
    prelimsStandings.forEach((team) => {
      const { teamName, institution } = team;
      if (team.problemsSolved === 0) return;
      if (!teamOccurSet.has(`${teamName}$$${institution}`)) {
        teamOccurSet.add(`${teamName}$$${institution}`);
        prelimsAllStandings.push(team);
      }
    });
  });
  return prelimsAllStandings;
})();

const TAIWAN_REGION_SCORE: RegionScoreArgs = {
  univs: countUniversities(regionalStandings),
  teams: countTeams(regionalStandings),
  foreignTeams: countTeams(
    regionalStandings.filter(
      (team) => institutionRegionMap.get(team.institution) !== "TWN"
    )
  ),
  teamsPrelim: countTeams(TAIWAN_PRELIMS_ALL_STANDINGS),
  univsPrelim: countUniversities(TAIWAN_PRELIMS_ALL_STANDINGS),
};

export const Taichung: Region = {
  site: "Taichung",
  region: "TWN",
  url: "https://hpc.asia.edu.tw/icpc2024/",
  status: RegionStatus.regionalsFinished,
  score: regionScore(TAIWAN_REGION_SCORE),
  scoreDetails: TAIWAN_REGION_SCORE,
  scoreboard: regionalStandings,
};
