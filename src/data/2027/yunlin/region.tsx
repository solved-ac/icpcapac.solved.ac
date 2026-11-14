import { Taichung as Taichung2026 } from "../../2026/taichung/region";
import {
  type Regional,
  RegionalStatus,
  type TeamInStandingsLike,
} from "../../types";
import {
  countTeams,
  countUniversities,
  type RegionScoreArgs,
  regionScore,
} from "../regionScore";
import prelimsOnlineStandings from "./Taiwan2027OnlineStandings.json";
import prelimsPrivateUSStandings from "./Taiwan2027PrivateUStandings.json";
import prelimsTechUSStandings from "./Taiwan2027TechUStandings.json";

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

// No team list is published. icpc.global lists 100 teams accepted at the
// on-site (domestic) site and 10 at the foreign teams site as of 2026-11-14,
// which is what https://www.icpc.tw/en/events/2026/team-selection/ provides
// for. Their names are not public, and applying the published selection
// rule to the preliminary standings only reproduced 78 of last season's 100
// domestic teams, so no names are guessed.
const DOMESTIC_TEAMS_ACCEPTED = 100;
const FOREIGN_TEAMS_ACCEPTED = 10;
// Last season's Taichung regional: 31 Taiwanese universities, and 7 foreign
// ones for its 10 foreign teams.
const DOMESTIC_UNIVS_LAST_SEASON = 31;
const FOREIGN_UNIVS_ESTIMATE = 7;

const TAIWAN_REGION_SCORE: RegionScoreArgs = {
  univs: DOMESTIC_UNIVS_LAST_SEASON + FOREIGN_UNIVS_ESTIMATE,
  teams: DOMESTIC_TEAMS_ACCEPTED + FOREIGN_TEAMS_ACCEPTED,
  foreignTeams: FOREIGN_TEAMS_ACCEPTED,
  teamsPrelim: countTeams(TAIWAN_PRELIMS_ALL_STANDINGS),
  univsPrelim: countUniversities(TAIWAN_PRELIMS_ALL_STANDINGS),
};

export const Yunlin: Regional = {
  contestDate: "2026-12-13",
  site: "Yunlin",
  region: "TWN",
  dates: { start: "2026-12-12", end: "2026-12-14" },
  location: "Douliu, Yunlin, Taiwan",
  venue: {
    name: "Gymnasium, National Yunlin University of Science and Technology (YunTech)",
  },
  icpcCode: "Taipei-2027",
  url: "https://www.icpc.tw/en/events/2026/",
  status: RegionalStatus.preliminariesFinished,
  score: regionScore(TAIWAN_REGION_SCORE),
  scoreDetails: TAIWAN_REGION_SCORE,
  regionalTeams: [],
  lastYear: Taichung2026,
  disclaimer: (
    <>
      The team list is not published. The preliminary counts are from the
      official standings of TOPC, TUPC and PUPC. For the regional, the site
      score uses the {DOMESTIC_TEAMS_ACCEPTED} domestic and{" "}
      {FOREIGN_TEAMS_ACCEPTED} foreign teams accepted on icpc.global, and
      assumes as many universities as last season&rsquo;s Taichung regional (
      {DOMESTIC_UNIVS_LAST_SEASON} Taiwanese, {FOREIGN_UNIVS_ESTIMATE} foreign).
    </>
  ),
};
