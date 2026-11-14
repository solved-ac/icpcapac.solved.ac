import { INSTITUTION_REGION_MAP } from "./institutions/institution";
import {
  type TeamInFilteredStandingsLike,
  type TeamInStandingsLike,
  TeamRankStatus,
} from "./types";

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
  teams: T[],
  /** Institutions that won a regional this season, at this site or another. */
  winnersInOtherRegions: string[],
): (TeamInFilteredStandingsLike & T)[] => {
  const winnerInstitutions = new Set(winnersInOtherRegions);
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

    const region = INSTITUTION_REGION_MAP.get(x.institution);
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

  // (D4-3): we have to remove #1s from each region,
  // but since we want to include them in the displayed teams list,
  // we'll just consider the rank as 0
  let recaulculatedRank = 0;
  ret.forEach((x) => {
    if (x.status === TeamRankStatus.NONE) {
      x.recalculatedRank = recaulculatedRank++;
    }
  });

  return ret;
};
