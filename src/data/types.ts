import type { ReactNode } from "react";

/** The five counts a site's score is made of. */
export interface RegionScoreArgs {
  univs: number;
  teams: number;
  foreignTeams: number;
  univsPrelim: number;
  teamsPrelim: number;
}

/** What each of those counts is multiplied by. Set by each season's rules. */
export type RegionScoreWeights = RegionScoreArgs;

export enum RegionalStatus {
  preparing = "preparing",
  preliminariesFinished = "preliminariesFinished",
  regionalsFinished = "regionalsFinished",
}

/** A calendar day, `2026-11-14`. */
export type IsoDate = `${number}-${string}-${string}`;

export interface RegionalBase {
  contestDate?: IsoDate;
  site: string;
  /** A site the regional was first announced at, shown struck through
   *  beside the site it moved to. */
  formerSite?: string;
  region: string;
  /** The regional's own website. */
  url?: string;
  /** First and last day of the event, as the host announces them. */
  dates?: { start: IsoDate; end: IsoDate };
  /** The city and the country it is held in. */
  location?: string;
  /**
   * The exact place, as the host announced it. Left out where the host's
   * pages name no venue; `address` likewise where they give none.
   */
  venue?: {
    name: string;
    address?: string;
    /** The host's own map link. Without one, the page links a map search
     *  for the name and address. */
    mapUrl?: string;
  };
  /** The contest's code on icpc.global: `Seoul-2027` is the page
   *  https://icpc.global/regionals/finder/Seoul-2027. */
  icpcCode?: string;
  score: number;
  scoreOverride?: number;
  scoreDetails: RegionScoreArgs;
  disclaimer?: ReactNode;
  /** The same host's regional in the previous season, for comparison. */
  lastYear?: Regional;
}

export interface TeamInStandingsLike {
  teamId: number;
  rank: number | null;
  problemsSolved: number;
  institution: string;
  teamName: string;
}

/*
 * D3. Apply the following procedures in this order, to the ranking of each regional.
       (The regional is called X in the following.)

 * (1) Remove teams from South Pacific and other super-regions from the ranking.
 * (2) Remove teams not solving any problem from the ranking.
 *     Only teams solving at least one problem are retained.
 * (3) Remove the teams of winner universities from the ranking.
 *     Here, a winner university is the university to which a winner team (see B1) belongs.
 *     It may be the winner of the regional X, or of another regional.
 * (4) Remove the fourth or lower ranked teams of each university from the ranking.
 * 
 * (Note) The maximum number of teams from a single university competing in the
 *        Championship is 3. See D4(2).
 */
export enum TeamRankStatus {
  NONE = "none",
  D3_1 = "from South Pacific and other super-regions",
  D3_2 = "not solving any problem",
  D3_3 = "of winner universities",
  D3_4 = "fourth or lower ranked teams of each university",
}

export interface TeamInFilteredStandingsLike extends TeamInStandingsLike {
  status: TeamRankStatus;
  recalculatedRank: number;
}

export interface TeamInTeamListLike {
  teamId: number;
  name: string;
  institution: string;
  problemsSolved?: number;
}

export interface TeamInTeamListLikeTeamIdNullable {
  teamId: number | null;
  name: string;
  institution: string;
  problemsSolved?: number;
}

export type Regional = RegionalBase &
  (
    | {
        status: RegionalStatus.preliminariesFinished;
        regionalTeams: TeamInTeamListLikeTeamIdNullable[];
      }
    | {
        status: RegionalStatus.regionalsFinished;
        scoreboard: TeamInStandingsLike[];
      }
    | { status: RegionalStatus.preparing }
  );

/*
 * D2. Two top teams of the South Pacific Independent Regional Contest
 *     are invited to compete in the Asia Pacific Championship.
 *
 * D4. Merge the lists of teams from all regionals in Asia Pacific,
 *     and apply the following procedures in this order to the resulting list.
 *
 * (1) Sort the resulting list in ascending order of the value assigned above.
 * (2) Strike out the second instance of a single team, if any.
 *     Then, strike out the fourth or later instances of teams of a single university.
 *     This means that at most three teams are qualified from a single university.
 * (Note) The fourth or lower teams are already removed in D3(4),
 *        but this step is necessary.
 * (3) From each Asia Pacific country, select one team with the smallest value.
 *     This team is qualified for the Championship.
 * (Note) This is a wild-card rule for under-represented countries.
 *        At least one team is qualified from every country.
 *        Note that only teams solving at least one problem can be qualified (See D3(2)).
 * (4) Let P be the number of teams for the Championship.
 *     Scan the list from the team with the smallest value, and select teams
 *     one by one, skipping those teams already selected in the step (3),
 *     until the number of selected teams reach P.
 *     These teams are qualified for the Championship.
 *
 * D5. At most one team should be selected as the wild-card team at the
 *     discretion of the Championship director. This team is qualified
 *     for the Championship.
 */
export enum TeamRankInCombinedScoreboardStatus {
  NONE = "none",
  D2 = "South Pacific Independent Regional Contest",
  D3_3 = "winner universities",
  D4_2_1 = "second instance of a single team",
  D4_2_2 = "fourth or later instances of teams of a single university",
  D4_3 = "smallest value from each Asia Pacific country",
  D4_4 = "selected teams for the Championship",
  D5 = "wild-card team",
}

export interface ChampionshipTeamLike {
  teamId: number;
  assignedValue: number;
  sortKey: number;
  status: TeamRankInCombinedScoreboardStatus;
  statusMetadata?: string;
  rank: number | null;
  fromSite: string;
  rankInSite: number | null;
  rankInRegion: number | null;
  institution: string;
  teamName: string;
}
