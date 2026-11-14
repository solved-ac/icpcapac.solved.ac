import { Box, ChakraProvider, Flex } from "@chakra-ui/react";
import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { Footer } from "../components/Footer";
import { TopBar } from "../components/TopBar";
import {
  colorModeBootstrapScript,
  DARK_CLASS,
  useOsPrefersDark,
} from "../lib/colorMode";
import { SITE_NAME } from "../site";
import { system } from "../theme";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: `${SITE_NAME} - solved.ac` },
      {
        name: "description",
        content:
          "Scoreboard archive and statistics for the ICPC Asia-Pacific region.",
      },
    ],
    // Pretendard (the default face) ships from jsDelivr as a variable,
    // dynamic-subset build that loads only the glyph ranges a page renders.
    // The JP build is loaded beside it for Japanese team names. Pretendard
    // is the only web font.
    links: [
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "preconnect", href: "https://cdn.jsdelivr.net" },
      {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css",
      },
      {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-jp-dynamic-subset.min.css",
      },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  // Resolved here as well as in the bootstrap script: the script wins the
  // race before first paint, React owns the class from hydration onward.
  // `suppressHydrationWarning` on `<html>` is what lets the two disagree for
  // the one render where the build assumed light and the OS is dark.
  const dark = useOsPrefersDark();

  return (
    <html
      lang="en"
      className={dark ? DARK_CLASS : undefined}
      suppressHydrationWarning
    >
      <head>
        {/* First in `<head>`, so the class is on `<html>` before the browser
            paints. The script is a constant; see `colorMode.ts`. */}
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: a constant string
          dangerouslySetInnerHTML={{ __html: colorModeBootstrapScript }}
        />
        <HeadContent />
      </head>
      <body>
        <ChakraProvider value={system}>
          <Flex direction="column" minH="100dvh">
            <TopBar />
            <Box as="main" flex={1}>
              <Outlet />
            </Box>
            <Footer />
          </Flex>
        </ChakraProvider>
        <Scripts />
      </body>
    </html>
  );
}
