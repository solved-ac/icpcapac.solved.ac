/** Case and width folded, so `ＫＡＩＳＴ` and `kaist` are the same text. */
const fold = (text: string) => text.normalize("NFKC").toLowerCase();

/**
 * Everything a row can be found by, as one folded string. Built once per
 * row, not on every keystroke.
 */
export const searchText = (fields: (string | null | undefined)[]) =>
  fold(fields.filter(Boolean).join("\n"));

/** The words of a query, folded the same way as `searchText`. */
export const queryWords = (query: string) =>
  fold(query).split(/\s+/).filter(Boolean);

/**
 * Whether every word appears somewhere in the row's text. Words are matched
 * separately and in any order, so `seoul kaist` finds a KAIST team at the
 * Seoul site although no single field holds both.
 */
export const matchesWords = (words: string[], text: string) =>
  words.every((word) => text.includes(word));
