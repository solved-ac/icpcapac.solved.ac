import { institutionRegionMap } from "./institution";
import {
  TeamInFilteredStandingsLike,
  TeamInStandingsLike,
  TeamRankStatus,
} from "./types";
import winnersInOtherRegions from "./winnerInstitutions.json";

export const asiaPacificRegions = new Set([
  "BRN",
  "KHM",
  "IDN",
  "JPN",
  "KOR",
  "LAO",
  "MMR",
  "MYS",
  "PHL",
  "PNG",
  "SGP",
  "THA",
  "TWN",
  "VNM",
]);

export const filterRegionalTeams = <T extends TeamInStandingsLike>(
  teams: T[]
): (TeamInFilteredStandingsLike & T)[] => {
  const winnerInstitutions = new Set(winnersInOtherRegions.map((team) => team));
  const institutionOccurCount = new Map<string, number>();

  const ret = teams.map((team) => ({
    ...team,
    status: TeamRankStatus.NONE,
    recalculatedRank: -1,
  }));

  ret.forEach((x) => {
    // Even if `x` is in `winnersInOtherRegions`,
    // it should be not removed from the ranking list.
    if (x.rank === 1) return;

    const region = institutionRegionMap.get(x.institution);
    if (!region || !asiaPacificRegions.has(region)) {
      x.status = TeamRankStatus.D3_1;
      return;
    }
    if (x.problemsSolved === 0) {
      x.status = TeamRankStatus.D3_2;
      return;
    }
    if (winnerInstitutions.has(x.institution)) {
      x.status = TeamRankStatus.D3_3;
      return;
    }
    const institutionCount = institutionOccurCount.get(x.institution) || 0;
    if (institutionCount >= 3) {
      x.status = TeamRankStatus.D3_4;
      return;
    }
    institutionOccurCount.set(x.institution, institutionCount + 1);
  });

  let recaulculatedRank = 1;
  ret.forEach((x) => {
    if (x.status === TeamRankStatus.NONE) {
      x.recalculatedRank = recaulculatedRank++;
    }
  });

  return ret;
};
