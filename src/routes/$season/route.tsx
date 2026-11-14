import {
  Link as ChakraLink,
  Container,
  Heading,
  Stack,
  Tabs,
  Text,
} from "@chakra-ui/react";
import {
  createFileRoute,
  notFound,
  Outlet,
  useParams,
} from "@tanstack/react-router";
import { Region } from "../../components/Region";
import {
  TabsLinkRoot,
  TabsTriggerLink,
} from "../../components/TabsTriggerLink";
import { siteSlug } from "../../data/season";
import { findSeason } from "../../data/seasons";
import { SITE_NAME } from "../../site";

/**
 * A season: its heading and the tabs over its regionals.
 *
 * The loader only checks that the season exists. The data itself is imported
 * by the components: it holds JSX and Maps, which loader data, having to
 * cross from the prerendered HTML to the browser, cannot.
 */
export const Route = createFileRoute("/$season")({
  loader: ({ params }) => {
    if (!findSeason(params.season)) throw notFound();
  },
  head: ({ params }) => {
    const season = findSeason(params.season);
    return {
      meta: season
        ? [{ title: `${SITE_NAME} ${season.label} - solved.ac` }]
        : [],
    };
  },
  component: SeasonLayout,
});

const HOME_TAB = "home";

const external = { target: "_blank", rel: "noreferrer" } as const;

function SeasonLayout() {
  const { season: seasonId } = Route.useParams();
  const { site } = useParams({ strict: false });
  const season = findSeason(seasonId);
  if (!season) return null;

  return (
    <Container maxW="5xl" pt={10}>
      <Stack gap={6}>
        <Stack gap={1}>
          <Heading as="h1" size="2xl">
            {SITE_NAME} {season.label}
          </Heading>
          <Text color="fg.muted" fontSize="sm">
            by{" "}
            <ChakraLink
              href="https://solved.ac"
              variant="underline"
              {...external}
            >
              solved.ac
            </ChakraLink>{" "}
            / X{" "}
            <ChakraLink
              href="https://x.com/shiftpsh"
              variant="underline"
              {...external}
            >
              @shiftpsh
            </ChakraLink>{" "}
            / CF{" "}
            <ChakraLink
              href="https://codeforces.com/profile/shiftpsh"
              variant="underline"
              {...external}
            >
              @shiftpsh
            </ChakraLink>
          </Text>
        </Stack>
        <TabsLinkRoot
          value={site ?? HOME_TAB}
          variant="line"
          colorPalette="primary"
        >
          {/* Seven sites do not fit a phone; the list scrolls sideways
              instead of wrapping into a second row of tabs. */}
          <Tabs.List overflowX="auto" overflowY="hidden">
            <TabsTriggerLink
              value={HOME_TAB}
              to="/$season"
              params={{ season: season.id }}
              flexShrink={0}
            >
              Home
            </TabsTriggerLink>
            {season.regionals.map((regional) => (
              <TabsTriggerLink
                key={regional.site}
                value={siteSlug(regional)}
                to="/$season/$site"
                params={{ season: season.id, site: siteSlug(regional) }}
                flexShrink={0}
              >
                <Region region={regional.region} flagOnly />
                {regional.formerSite && (
                  <Text
                    as="span"
                    color="fg.subtle"
                    textDecoration="line-through"
                  >
                    {regional.formerSite}
                  </Text>
                )}
                {regional.site}
              </TabsTriggerLink>
            ))}
          </Tabs.List>
        </TabsLinkRoot>
        <Outlet />
      </Stack>
    </Container>
  );
}
