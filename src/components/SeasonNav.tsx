import { Box, Text } from "@chakra-ui/react";
import { IconHome } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { type Season, siteSlug } from "../data/season";
import { formatDateRange } from "../lib/dates";
import { BAR_HEIGHT } from "../theme";
import { Region } from "./Region";

/**
 * One destination in the season's navigation.
 *
 * The router's link marks itself `aria-current="page"` when it leads to the
 * page that is open, and the styling hangs off that (`_currentPage`), so
 * there is no "which one is active" state to keep.
 */
const itemStyle = {
  display: "flex",
  alignItems: "center",
  gap: 2,
  flexShrink: 0,
  px: 3,
  py: { base: 1.5, md: 2 },
  // A chip in the strip on a phone, a row in the list on a wide screen.
  rounded: { base: "full", md: "md" },
  fontSize: "sm",
  fontWeight: "medium",
  whiteSpace: "nowrap",
  color: "fg.muted",
  _hover: { bg: "bg.subtle" },
  _currentPage: {
    bg: "bg.emphasized",
    color: "fg",
    fontWeight: "semibold",
    _hover: { bg: "bg.emphasized" },
  },
} as const;

/** The trailing note of a row: shown beside the list, dropped from a chip. */
function Note({ children }: { children: ReactNode }) {
  return (
    <Text
      as="span"
      display={{ base: "none", md: "block" }}
      fontSize="xs"
      fontWeight="normal"
      fontVariantNumeric="tabular-nums"
      opacity={0.7}
    >
      {children}
    </Text>
  );
}

/**
 * A season's pages: the merged scoreboard, then each regional.
 *
 * On a wide screen it is a column beside the page, one row per regional,
 * which stays in view while a long table scrolls. On a phone there is no
 * room for a column, so the same links lie in one strip that scrolls
 * sideways and stays pinned under the top bar, keeping the other regionals
 * one tap away from the bottom of a scoreboard.
 */
export function SeasonNav({ season }: { season: Season }) {
  return (
    <Box
      as="nav"
      aria-label="Regionals"
      display="flex"
      flexDirection={{ base: "row", md: "column" }}
      gap={{ base: 1, md: 0.5 }}
      flexShrink={0}
      w={{ base: "auto", md: "56" }}
      position="sticky"
      zIndex={5}
      // Below the top bar; on a wide screen with a little air above it.
      top={{ base: BAR_HEIGHT, md: `calc(${BAR_HEIGHT} + 1.5rem)` }}
      // The strip spans the screen edge to edge and scrolls inside itself;
      // the negative margin undoes the page gutter, the padding restores it
      // for the first and last chip.
      mx={{ base: -4, md: 0 }}
      px={{ base: 4, md: 0 }}
      py={{ base: 2, md: 0 }}
      overflowX={{ base: "auto", md: "visible" }}
      bg={{ base: "bg", md: "transparent" }}
      borderBottomWidth={{ base: 1, md: 0 }}
      css={{ scrollbarWidth: "none" }}
    >
      <Box asChild {...itemStyle}>
        <Link
          to="/$season"
          params={{ season: season.id }}
          // Otherwise it would also count as current on every regional's
          // page, which is under the same address.
          activeOptions={{ exact: true }}
        >
          <IconHome size="1.2em" />
          <Text as="span" flex={1}>
            Home
          </Text>
        </Link>
      </Box>
      {season.regionals.map((regional) => (
        <Box asChild key={regional.site} {...itemStyle}>
          <Link
            to="/$season/$site"
            params={{ season: season.id, site: siteSlug(regional) }}
          >
            <Region region={regional.region} flagOnly />
            <Text as="span" flex={1}>
              {regional.formerSite && (
                <>
                  <Text
                    as="span"
                    textDecoration="line-through"
                    fontWeight="normal"
                    opacity={0.7}
                  >
                    {regional.formerSite}
                  </Text>{" "}
                </>
              )}
              {regional.site}
            </Text>
            {regional.dates && (
              <Note>
                {formatDateRange(regional.dates.start, regional.dates.end, {
                  year: false,
                })}
              </Note>
            )}
          </Link>
        </Box>
      ))}
    </Box>
  );
}
