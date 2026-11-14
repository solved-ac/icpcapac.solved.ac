import { Bleed, Box, Button, Container, HStack, Image } from "@chakra-ui/react";
import { Link, useParams } from "@tanstack/react-router";
import { findSeason, LATEST_SEASON } from "../data/seasons";
import { SITE_SLUG } from "../site";
import { SeasonSwitcher } from "./SeasonSwitcher";

const LOGO_SRC = "https://cdn.solved.ac/assets/logo.svg";

/**
 * The bar pinned to the top of every page: `[ac] / icpcapac`, as a path from
 * solved.ac to this site, and the season switcher. Laid out as Maishift's
 * header is: ghost buttons either side of a slash.
 */
export function TopBar() {
  // Read loosely: a not-found page may be outside any season.
  const { season: seasonId } = useParams({ strict: false });
  const season = seasonId ? findSeason(seasonId) : undefined;

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex="docked"
      flexShrink={0}
      bg="bg"
      borderBottomWidth={1}
    >
      <Container as="nav" maxW="5xl" h="headerBar">
        {/* The ghost buttons at either end carry their own padding; the
            bleed takes it back, so their contents line up with the page's
            edges. Inside the container, because a bleed around a centred
            container moves nothing. */}
        <Bleed inlineStart={3} inlineEnd={2} h="100%">
          <HStack align="center" h="100%" justify="space-between" gap={2}>
            <HStack align="center" h="100%" gap={2} minW={0}>
              <Button asChild variant="ghost" size="sm" px={3}>
                <a href="https://solved.ac" aria-label="solved.ac">
                  <Image
                    src={LOGO_SRC}
                    alt="solved.ac"
                    h="24px"
                    draggable={false}
                  />
                </a>
              </Button>
              <Bleed inline={3} color="fg.subtle" aria-hidden>
                /
              </Bleed>
              <Button
                asChild
                variant="ghost"
                size="sm"
                px={3}
                fontWeight="bold"
              >
                <Link
                  to="/$season"
                  params={{ season: LATEST_SEASON.id }}
                  // Otherwise the link marks itself active on every page of
                  // the latest season.
                  activeOptions={{ exact: true }}
                >
                  {SITE_SLUG}
                </Link>
              </Button>
            </HStack>
            <SeasonSwitcher current={season} />
          </HStack>
        </Bleed>
      </Container>
    </Box>
  );
}
