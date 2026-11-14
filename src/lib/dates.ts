import type { IsoDate } from "../data/types";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/**
 * Split by hand, not through `Date`: a `Date` built from a bare day is
 * midnight UTC, which a reader west of Greenwich would see as the day
 * before, and the page built ahead of time would disagree with the browser.
 */
function parse(date: IsoDate) {
  const [year, month, day] = date.split("-").map(Number);
  return { year, month: MONTHS[month - 1], day };
}

/**
 * A span of days as one phrase, naming the month and year once where it can:
 * `Nov 13–14, 2026`, `Nov 30 – Dec 2, 2024`. Without `year`, the short form
 * for a list where the season already says which year it is.
 */
export function formatDateRange(
  start: IsoDate,
  end: IsoDate,
  { year = true }: { year?: boolean } = {},
): string {
  const a = parse(start);
  const b = parse(end);
  const tail = year ? `, ${b.year}` : "";
  if (start === end) return `${a.month} ${a.day}${tail}`;
  if (a.month === b.month && a.year === b.year) {
    return `${a.month} ${a.day}–${b.day}${tail}`;
  }
  return `${a.month} ${a.day} – ${b.month} ${b.day}${tail}`;
}
