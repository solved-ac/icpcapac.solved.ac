import { Text } from "@chakra-ui/react";

/** How much of a list a search or filter has left: `12 of 388 teams`. */
export function ResultCount({
  shown,
  total,
}: {
  shown: number;
  total: number;
}) {
  return (
    <Text
      fontSize="sm"
      color="fg.muted"
      fontVariantNumeric="tabular-nums"
      whiteSpace="nowrap"
      // Announced when it changes, so a reader who cannot see the table
      // shrink still learns what the search found.
      aria-live="polite"
    >
      {shown === total ? `${total} teams` : `${shown} of ${total} teams`}
    </Text>
  );
}
