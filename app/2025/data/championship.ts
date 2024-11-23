import { institutionRegionMap } from "./institution";
import { filterRegionalTeams } from "./regionScoreboard";
import {
  ChampionshipTeamLike,
  Region,
  RegionStatus,
  TeamInFilteredStandingsLike,
  TeamRankInCombinedScoreboardStatus,
  TeamRankStatus,
} from "./types";

const createFauxTeams = (
  region: Region,
  count: number
): TeamInFilteredStandingsLike[] => {
  const base = Math.floor(Math.random() * 1000);
  return new Array(count).fill(0).map((_, i) => ({
    teamId: -base * 1000 - i,
    status: TeamRankStatus.NONE,
    rank: i + 1,
    recalculatedRank: i + 1,
    problemsSolved: 1,
    teamName: `${region.site} Site - Team ${i + 1}`,
    institution: `Unknown (${base * 1000 + i})`,
  }));
};

export const combineRegions = (regions: Region[]) => {
  const teams: ChampionshipTeamLike[] = regions
    .map((region) => ({
      region,
      teams:
        region.status === RegionStatus.regionalsFinished
          ? filterRegionalTeams(region.scoreboard).filter(
              (x) => x.status === TeamRankStatus.NONE
            )
          : createFauxTeams(region, region.scoreDetails.teams),
    }))
    .flatMap(({ region, teams }) =>
      teams.map(
        (t) =>
          ({
            ...t,
            rank: -1,
            fromSite: region.site,
            rankInSite: t.recalculatedRank,
            rankInRegion: -1,
            assignedValue: (t.recalculatedRank - 1) / region.score,
            sortKey: (t.recalculatedRank - 1) / region.score,
            status: TeamRankInCombinedScoreboardStatus.NONE,
          } satisfies ChampionshipTeamLike)
      )
    )
    .sort((a, b) => a.sortKey - b.sortKey);

  // D4-2: Remove duplicates and teams with institute rank >= 4
  // The ICPC internal team ID does not do a good job of identifying teams.
  const teamIdsSet = new Set<string>();
  const instituteCountMap = new Map<string, number>();
  teams.forEach((team) => {
    const teamId = `${team.institution}$$${team.teamName}`;
    if (teamIdsSet.has(teamId)) {
      team.status = TeamRankInCombinedScoreboardStatus.D4_2_1;
      return;
    }
    const instituteCount = instituteCountMap.get(team.institution) || 0;
    if (instituteCount >= 3) {
      team.status = TeamRankInCombinedScoreboardStatus.D4_2_2;
      return;
    }
    teamIdsSet.add(teamId);
    instituteCountMap.set(team.institution, instituteCount + 1);
  });

  // D4-3: smallest value for each region
  const regionsSet = new Set<string>();
  teams.forEach((team) => {
    if (team.status === TeamRankInCombinedScoreboardStatus.D4_2_1) return;
    if (team.status === TeamRankInCombinedScoreboardStatus.D4_2_2) return;
    const teamRegion = institutionRegionMap.get(team.institution);
    if (!teamRegion) return;
    if (regionsSet.has(teamRegion)) return;
    regionsSet.add(teamRegion);
    team.status = TeamRankInCombinedScoreboardStatus.D4_3;
    team.sortKey = 0;
  });

  // D2: Two top teams of the South Pacific Independent Regional Contest
  teams.push({
    teamId: -1,
    assignedValue: 0,
    sortKey: 0,
    status: TeamRankInCombinedScoreboardStatus.D2,
    rank: null,
    fromSite: "SP Finals",
    rankInSite: 1,
    rankInRegion: 1,
    institution: "UNSW Sydney",
    teamName: "W[3]-complete",
  });
  teams.push({
    teamId: -1,
    assignedValue: 0,
    sortKey: 0,
    status: TeamRankInCombinedScoreboardStatus.D2,
    rank: null,
    fromSite: "SP Finals",
    rankInSite: 2,
    rankInRegion: 2,
    institution: "University of Melbourne",
    teamName: "habibi",
  });

  // D5: Wildcard team
  teams.push({
    teamId: -1,
    assignedValue: 0,
    sortKey: 0,
    status: TeamRankInCombinedScoreboardStatus.D5,
    rank: null,
    fromSite: "Wildcard",
    rankInSite: 1,
    rankInRegion: -1,
    institution: "Wildcard",
    teamName: "Wildcard",
  });

  teams.sort((a, b) =>
    a.sortKey !== b.sortKey
      ? a.sortKey - b.sortKey
      : a.assignedValue - b.assignedValue
  );

  let rank = 1;
  let rowCount = 1;
  let prvScore = 0;
  const regionRank = new Map<string, number>();
  const regionRowCount = new Map<string, number>();
  const regionPrvScore = new Map<string, number>();
  teams.forEach((team) => {
    if (
      team.status === TeamRankInCombinedScoreboardStatus.NONE ||
      team.status === TeamRankInCombinedScoreboardStatus.D4_3 ||
      team.status === TeamRankInCombinedScoreboardStatus.D2 ||
      team.status === TeamRankInCombinedScoreboardStatus.D5
    ) {
      if (team.sortKey !== prvScore) {
        rank += rowCount;
        rowCount = 1;
        prvScore = team.sortKey;
      } else {
        rowCount += 1;
      }
      team.rank = rank;
    }

    if (
      team.status === TeamRankInCombinedScoreboardStatus.NONE ||
      team.status === TeamRankInCombinedScoreboardStatus.D4_3
    ) {
      const region = institutionRegionMap.get(team.institution);
      if (region) {
        if (!regionPrvScore.has(region)) {
          regionRank.set(region, 1);
          regionRowCount.set(region, 1);
          regionPrvScore.set(region, team.sortKey);
        } else if (team.sortKey !== regionPrvScore.get(region)) {
          regionRank.set(
            region,
            (regionRank.get(region) || 1) + (regionRowCount.get(region) || 1)
          );
          regionRowCount.set(region, 1);
          regionPrvScore.set(region, team.sortKey);
        } else {
          regionRowCount.set(region, (regionRowCount.get(region) || 1) + 1);
        }
        team.rankInRegion = regionRank.get(region) || -1;
      }
    }
  });

  return teams;
};
