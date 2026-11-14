import { useDeferredValue, useMemo, useState } from "react";
import { matchesWords, queryWords, searchText } from "./search";

/**
 * Search over the rows of a table, without typing ever waiting on the table.
 *
 * The field shows `query` at once; the table follows `useDeferredValue` of
 * it, which React renders at low priority and abandons when another key
 * arrives. The tables pair this with rows that stay mounted and are only
 * hidden (see `visible` in the row components): mounting a few hundred styled
 * rows is what is slow, and a search that hides and shows them never does it.
 *
 * `fieldsOf` must be a stable function (defined at module scope), since the
 * rows' search text is rebuilt whenever it changes.
 */
export function useRowSearch<T>(
  rows: T[],
  fieldsOf: (row: T) => (string | null | undefined)[],
) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const texts = useMemo(
    () => rows.map((row) => searchText(fieldsOf(row))),
    [rows, fieldsOf],
  );
  /** Per row, whether it matches the query the table is currently showing. */
  const matches = useMemo(() => {
    const words = queryWords(deferredQuery);
    return texts.map((text) => matchesWords(words, text));
  }, [texts, deferredQuery]);

  return {
    query,
    setQuery,
    matches,
    /** The table is still showing the results of an earlier query. */
    stale: query !== deferredQuery,
  };
}
