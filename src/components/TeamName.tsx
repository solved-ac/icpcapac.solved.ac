import { Stack, Text } from "@chakra-ui/react";
import { shortenInstitutionName } from "../utils/institution";

/**
 * A team as its name over its institution, each cut off with an ellipsis
 * when the column is too narrow.
 */
export function TeamName({
  name,
  institution,
}: {
  name: string;
  institution: string;
}) {
  return (
    <Stack gap={1} minW={0}>
      <Text truncate lineHeight="1.2">
        {name}
      </Text>
      <Text truncate fontSize="xs" lineHeight="1.2" opacity={0.7}>
        {shortenInstitutionName(institution)}
      </Text>
    </Stack>
  );
}

/**
 * Style for the table cell holding a `TeamName`: it takes the width the other
 * columns leave. `maxW: 0` is what lets a table cell shrink below its
 * content, so the name truncates instead of widening the table.
 */
export const teamCell = {
  w: "full",
  maxW: 0,
  // On a phone the table scrolls sideways; a narrower floor keeps most of
  // the name on screen before it has to.
  minW: { base: "9rem", md: "12rem" },
} as const;

/** Style for a cell of figures: right-aligned, digits of equal width. */
export const numericCell = {
  textAlign: "end",
  fontVariantNumeric: "tabular-nums",
  whiteSpace: "nowrap",
} as const;

/**
 * Style for a cell of short labels (a site, a country): kept on one line,
 * with room before the next column. Secondary text inside these cells is
 * dimmed with opacity rather than a color token, so it stays lighter than
 * its row in a row that is itself dimmed.
 */
export const labelCell = {
  whiteSpace: "nowrap",
  pe: { base: 2, md: 6 },
} as const;
