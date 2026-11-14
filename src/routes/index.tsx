import { Container, Link, Text } from "@chakra-ui/react";
import {
  createFileRoute,
  Link as RouterLink,
  useNavigate,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { LATEST_SEASON } from "../data/seasons";
import { SITE_NAME } from "../site";

/**
 * `/` leads to the latest season.
 *
 * The site is static files, so there is no server to answer with a redirect.
 * The page carries a `<meta http-equiv="refresh">`, which works without
 * JavaScript, and navigates on mount for a reader who arrives here inside
 * the app. The link is what the prerender crawler follows to find the season
 * pages.
 */
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [{ httpEquiv: "refresh", content: `0; url=/${LATEST_SEASON.id}` }],
  }),
  component: IndexPage,
});

function IndexPage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate({
      to: "/$season",
      params: { season: LATEST_SEASON.id },
      replace: true,
    });
  }, [navigate]);

  return (
    <Container maxW="5xl" py={16}>
      <Text color="fg.muted">
        Redirecting to{" "}
        <Link asChild variant="underline">
          <RouterLink to="/$season" params={{ season: LATEST_SEASON.id }}>
            {SITE_NAME} {LATEST_SEASON.label}
          </RouterLink>
        </Link>
        …
      </Text>
    </Container>
  );
}
