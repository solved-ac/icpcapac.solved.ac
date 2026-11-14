import { season2025 } from "./2025/season";
import { season2026 } from "./2026/season";
import { type Season, siteSlug } from "./season";

/** Oldest first. Adding a season here adds its pages. */
export const SEASONS: Season[] = [season2025, season2026];

/** Where `/` leads. */
export const LATEST_SEASON = SEASONS[SEASONS.length - 1];

export const findSeason = (id: string) => SEASONS.find((s) => s.id === id);

export const findRegional = (season: Season, slug: string) =>
  season.regionals.find((r) => siteSlug(r) === slug);
