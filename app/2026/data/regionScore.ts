import {
  TeamInStandingsLike,
  TeamInTeamListLike,
  TeamInTeamListLikeTeamIdNullable,
} from "./types";

export interface RegionScoreArgs {
  univs: number;
  teams: number;
  foreignTeams: number;
  univsPrelim: number;
  teamsPrelim: number;
}

export const regionScore = ({
  univs,
  teams,
  foreignTeams,
  univsPrelim,
  teamsPrelim,
}: RegionScoreArgs) => {
  return (
    0.56 * univs +
    0.24 * teams +
    0.14 * univsPrelim +
    0.06 * teamsPrelim +
    0.3 * foreignTeams
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
