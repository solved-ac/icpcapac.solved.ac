import type {
  RegionScoreArgs,
  RegionScoreWeights,
  TeamInStandingsLike,
  TeamInTeamListLike,
  TeamInTeamListLikeTeamIdNullable,
} from "../types";

export type { RegionScoreArgs };

/** This season's weights. Shown on each regional's page as well as applied. */
export const REGION_SCORE_WEIGHTS: RegionScoreWeights = {
  univs: 0.56,
  teams: 0.24,
  foreignTeams: 0.3,
  univsPrelim: 0.14,
  teamsPrelim: 0.06,
};

export const regionScore = ({
  univs,
  teams,
  foreignTeams,
  univsPrelim,
  teamsPrelim,
}: RegionScoreArgs) => {
  return (
    REGION_SCORE_WEIGHTS.univs * univs +
    REGION_SCORE_WEIGHTS.teams * teams +
    REGION_SCORE_WEIGHTS.univsPrelim * univsPrelim +
    REGION_SCORE_WEIGHTS.teamsPrelim * teamsPrelim +
    REGION_SCORE_WEIGHTS.foreignTeams * foreignTeams
  );
};

export const countUniversities = (
  ...teams: (
    | TeamInStandingsLike
    | TeamInTeamListLike
    | TeamInTeamListLikeTeamIdNullable
  )[][]
) => {
  const universities = new Set<string>();
  teams.flat().forEach((team) => {
    if (team.problemsSolved === 0) return;
    universities.add(team.institution);
  });
  return universities.size;
};

export const countTeams = (
  ...teams: (TeamInStandingsLike | TeamInTeamListLike)[][]
) => {
  const ids = new Set<number>();
  teams.flat().forEach((team) => {
    if (team.problemsSolved === 0) return;
    ids.add(team.teamId);
  });
  return ids.size;
};

export const countTeamNames = (
  ...teams: TeamInTeamListLikeTeamIdNullable[][]
) => {
  const names = new Set<string>();
  teams.flat().forEach((team) => {
    if (team.problemsSolved === 0) return;
    names.add(team.name);
  });
  return names.size;
};
