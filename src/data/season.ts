import type { ReactNode } from "react";
import type {
  ChampionshipTeamLike,
  Regional,
  RegionScoreWeights,
  TeamInFilteredStandingsLike,
  TeamInStandingsLike,
} from "./types";

export interface SameTeams {
  institution: string;
  names: string[];
}

/**
 * Everything the pages need to draw one season. The pages are the same for
 * every season; what differs is here.
 */
export interface Season {
  /** The URL segment: `/2026`. Named after the year of the championship. */
  id: string;
  /** "2025-2026" */
  label: string;
  /** Number of teams that qualify for the championship. */
  cutline: number;
  /** In the order the tabs show them. */
  regionals: Regional[];
  mergedTeams: ChampionshipTeamLike[];
  winnerInstitutions: string[];
  /** For an institution, the value its third team was assigned: a fourth
   *  team has to beat it to count. Winner institutions map to 0. */
  institutionRequiredValue: Map<string, number>;
  /** The most teams one university can send to the championship (Q). */
  maxTeamsPerUniversity: number;
  /** This season's site-score weights, as its `regionScore` applies them. */
  scoreWeights: RegionScoreWeights;
  /** This season's rule for which teams of a regional stay in the ranking. */
  filterRegionalTeams: (
    teams: TeamInStandingsLike[],
  ) => TeamInFilteredStandingsLike[];
  /** Heading of a regional's page. */
  regionalTitle: (regional: Regional) => string;
  /** Column heading for `Regional.lastYear`, e.g. "(2024)". */
  lastYearLabel?: string;
  /** Notes above the merged scoreboard. */
  notices: { title: string; body: ReactNode }[];
  /** Teams treated as one team, listed on the season's home page. */
  sameTeams?: SameTeams[];
}

/** `/2026/seoul` */
export const siteSlug = (regional: Regional) => regional.site.toLowerCase();
