import { Taichung as Taichung2025 } from "../../../2025/data/taichung/region";
import {
  countTeamNames,
  countTeams,
  countUniversities,
  regionScore,
  RegionScoreArgs,
} from "../regionScore";
import { Regional, RegionalStatus, TeamInStandingsLike } from "../types";

import domesticTeams from "./Taichung2026DomesticTeams.json";
import foreignTeams from "./Taichung2026ForeignTeams.json";

import prelimsOnlineStandings from "./Taiwan2026OnlineStandings.json";
import prelimsPrivateUSStandings from "./Taiwan2026PrivateUStandings.json";
import prelimsTechUSStandings from "./Taiwan2026TechUStandings.json";

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
  // univs: countUniversities(regionalStandings),
  univs: countUniversities(foreignTeams, domesticTeams),
  // teams: countTeams(regionalStandings),
  teams: countTeamNames(foreignTeams, domesticTeams),
  // foreignTeams: countTeams(
  //   regionalStandings.filter(
  //     (team) => INSTITUTION_REGION_MAP.get(team.institution) !== "TWN"
  //   )
  // ),
  foreignTeams: countTeamNames(foreignTeams),
  teamsPrelim: countTeams(TAIWAN_PRELIMS_ALL_STANDINGS),
  univsPrelim: countUniversities(TAIWAN_PRELIMS_ALL_STANDINGS),
};

export const Taichung: Regional = {
  contestDate: "2025-11-16",
  site: "Taichung",
  region: "TWN",
  url: "https://www.icpc.tw/2025/",
  status: RegionalStatus.preliminariesFinished,
  score: regionScore(TAIWAN_REGION_SCORE),
  scoreDetails: TAIWAN_REGION_SCORE,
  regionalTeams: [...foreignTeams, ...domesticTeams],
  lastYear: Taichung2025,
  disclaimer: <></>,
  // scoreboard: regionalStandings,
};
