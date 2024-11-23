import { institutionRegionMap } from "../institution";
import {
  countTeams,
  countUniversities,
  regionScore,
  RegionScoreArgs,
} from "../regionScore";
import { Region, RegionStatus, TeamInStandingsLike } from "../types";

import prelimsStandings from "./Japan2025OnlineFirstRoundStandings.json";

import regionalTeams from "./Yokohama2025Teams.json";

const JAPAN_PROVISIONED_TEAMS = (() => {
  // https://icpc.iisf.or.jp/2024-yokohama/domestic/selectionrule/
  const ret: TeamInStandingsLike[] = [];
  const institutionCountMap = new Map<string, number>();
  prelimsStandings.forEach((team) => {
    const institutionCount = institutionCountMap.get(team.institution) || 0;
    const increment = () => {
      institutionCountMap.set(team.institution, institutionCount + 1);
    };

    if (ret.length < 10) {
      ret.push(team);
      increment();
      return;
    }
    if (ret.length < 25) {
      if (institutionCount < 3) {
        ret.push(team);
        increment();
      }
      return;
    }
    if (ret.length < 40) {
      if (institutionCount < 2) {
        ret.push(team);
        increment();
      }
      return;
    }
    if (ret.length < 49) {
      if (institutionCount < 1) {
        ret.push(team);
        increment();
      }
      return;
    }
  });

  return ret;
})();

const JAPAN_REGIONAL_TEAMS = [
  ...regionalTeams,
  ...JAPAN_PROVISIONED_TEAMS.map((x) => ({ ...x, name: x.teamName })),
];

const JAPAN_REGION_SCORE: RegionScoreArgs = {
  univs: countUniversities(JAPAN_REGIONAL_TEAMS),
  teams: countTeams(JAPAN_REGIONAL_TEAMS),
  foreignTeams: countTeams(
    JAPAN_REGIONAL_TEAMS.filter(
      (team) => institutionRegionMap.get(team.institution) !== "JPN"
    )
  ),
  teamsPrelim: countTeams(prelimsStandings),
  univsPrelim: countUniversities(prelimsStandings),
};

export const Yokohama: Region = {
  site: "Yokohama",
  region: "JPN",
  url: "https://icpc.iisf.or.jp/2024-yokohama/",
  status: RegionStatus.preliminariesFinished,
  score: regionScore(JAPAN_REGION_SCORE),
  scoreDetails: JAPAN_REGION_SCORE,
  regionalTeams: JAPAN_REGIONAL_TEAMS,
};
