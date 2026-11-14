import {
  Button,
  Container,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";
import { LATEST_SEASON } from "../data/seasons";
import { SITE_NAME } from "../site";

const ILLUSTRATION = "https://cdn.solved.ac/assets/illust/404.png";

/**
 * The 404 body, as the router's `defaultNotFoundComponent`. GitHub Pages
 * answers an unknown path with `404.html`, the app shell (see
 * `vite.config.ts`), and the router lands here from it.
 */
export function NotFound() {
  return (
    <Container maxW="2xl" py={16}>
      <Stack gap={6} align="center" textAlign="center">
        <Image
          // Decorative: the heading and message carry the meaning.
          alt=""
          src={ILLUSTRATION}
          boxSize={{ base: "150px", md: "200px" }}
          objectFit="contain"
          draggable={false}
          userSelect="none"
        />
        <Stack gap={2}>
          <Text fontSize="sm" fontWeight="medium" color="fg.muted">
            404
          </Text>
          <Heading size="xl">Page not found</Heading>
          <Text color="fg.muted">There is no scoreboard at this address.</Text>
        </Stack>
        <Button asChild colorPalette="primary">
          <Link to="/$season" params={{ season: LATEST_SEASON.id }}>
            {SITE_NAME} {LATEST_SEASON.label}
          </Link>
        </Button>
      </Stack>
    </Container>
  );
}
