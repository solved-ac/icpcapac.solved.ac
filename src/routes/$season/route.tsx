import {
  Box,
  Link as ChakraLink,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { SeasonNav } from "../../components/SeasonNav";
import { findSeason } from "../../data/seasons";
import { SITE_NAME } from "../../site";

/**
 * A season: its heading, the navigation over its regionals, and the page.
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

const external = { target: "_blank", rel: "noreferrer" } as const;

function SeasonLayout() {
  const { season: seasonId } = Route.useParams();
  const season = findSeason(seasonId);
  if (!season) return null;

  return (
    <Container maxW="6xl" pt={{ base: 6, md: 10 }}>
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
        <Flex
          direction={{ base: "column", md: "row" }}
          align={{ base: "stretch", md: "flex-start" }}
          gap={{ base: 4, md: 10 }}
        >
          <SeasonNav season={season} />
          {/* `minW: 0` lets the tables inside scroll sideways instead of
              pushing the column wider than the screen. */}
          <Box flex={1} minW={0}>
            <Outlet />
          </Box>
        </Flex>
      </Stack>
    </Container>
  );
}
