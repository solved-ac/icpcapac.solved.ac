import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

/**
 * solved.ac's design tokens, taken from solved.ac v4 (`packages/ui/src/theme.ts`
 * there). Only the parts this site uses are carried over: Pretendard, the
 * branded green, the cool gray and the chrome bar height. When v4's values
 * change, change them here to match.
 */

/** Height of the pinned top bar. The same value is the `sizes.headerBar`
 *  token; prefer the token in style props (`h="headerBar"`). */
export const BAR_HEIGHT = "48px";

/**
 * Pretendard first, then its Japanese build, then the system faces.
 *
 * Team names on the scoreboards are written in Korean, Japanese and Chinese
 * on the same page, so unlike v4 (which picks one build per document
 * language) both builds are loaded and the JP one follows as a fallback for
 * glyphs the default subset does not carry.
 */
const PRETENDARD_STACK =
  '"Pretendard Variable", Pretendard, "Pretendard JP Variable", "Pretendard JP", -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif';

/**
 * Branded "primary" palette, derived from the solved.ac logo green
 * (`#17ce3a`). `500` is the brand anchor; `solid` uses the deeper 600 for
 * legible white text. Drive it with `colorPalette="primary"`.
 */
const PRIMARY_SCALE = {
  "50": "#d4ffd3",
  "100": "#c4fdc4",
  "200": "#a9edaa",
  "300": "#84d986",
  "400": "#5ac060",
  "500": "#33a83f",
  "600": "#028f22",
  "700": "#007400",
  "800": "#005d00",
  "900": "#004700",
  "950": "#003100",
} as const;

/**
 * Cool-gray neutral ramp. Overriding the numeric `gray.*` tokens means every
 * gray-derived semantic token (`bg`, `fg`, `border`) picks it up.
 */
const GRAY_SCALE = {
  "50": "#f9fafb",
  "100": "#f1f3f5",
  "200": "#e1e6ed",
  "300": "#d0d5dc",
  "400": "#b6bcc2",
  "500": "#8e9399",
  "600": "#70757b",
  "700": "#54585e",
  "800": "#3d4144",
  "900": "#2a2c2f",
  "950": "#181a1c",
} as const;

const toTokens = (scale: Record<string, string>) =>
  Object.fromEntries(
    Object.entries(scale).map(([k, v]) => [k, { value: v }]),
  ) as Record<string, { value: string }>;

/**
 * The semantic-token palette for a numeric color `scale`, in the shape Chakra
 * uses for its built-in palettes, so `colorPalette="primary"` resolves
 * `fg`/`subtle`/`solid`/… correctly.
 */
function buildSemanticPalette(scale: string) {
  const ref = (step: number) => `{colors.${scale}.${step}}`;
  const pair = (light: number, dark: number) => ({
    value: { base: ref(light), _dark: ref(dark) },
  });
  return {
    contrast: { value: { base: "white", _dark: "white" } },
    fg: pair(700, 300),
    subtle: pair(100, 900),
    muted: pair(200, 800),
    emphasized: pair(300, 700),
    solid: pair(600, 600),
    focusRing: pair(600, 600),
  };
}

const config = defineConfig({
  theme: {
    tokens: {
      fonts: {
        body: { value: PRETENDARD_STACK },
        heading: { value: PRETENDARD_STACK },
        // Pretendard is the only web font: v4's Work Sans and Config Mono
        // are left out, so code falls back to the system monospace, after
        // Pretendard for the scripts a monospace face lacks.
        mono: {
          value: `ui-monospace, SFMono-Regular, Menlo, Consolas, monospace, ${PRETENDARD_STACK}`,
        },
      },
      sizes: {
        headerBar: { value: BAR_HEIGHT },
      },
      colors: {
        primary: toTokens(PRIMARY_SCALE),
        gray: toTokens(GRAY_SCALE),
      },
    },
    semanticTokens: {
      colors: {
        primary: buildSemanticPalette("primary"),
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
