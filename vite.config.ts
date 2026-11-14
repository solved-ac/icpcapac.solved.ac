import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  server: { port: 3000 },
  plugins: [
    tanstackStart({
      // The site is hosted on GitHub Pages, so every page is rendered to an
      // HTML file at build time and nothing runs on a server afterwards.
      prerender: {
        enabled: true,
        // Season and site pages are dynamic routes (`/$season/$site`); they
        // are found by following the links in the tabs.
        crawlLinks: true,
        // `/2026/seoul.html`, not `/2026/seoul/index.html`: GitHub Pages
        // serves the former at `/2026/seoul` and would redirect the latter
        // to a trailing slash.
        autoSubfolderIndex: false,
        failOnError: true,
      },
      // GitHub Pages serves `404.html` for any path it has no file for. That
      // file is the app's shell: the chrome with no page in it, which the
      // browser then fills by routing the address it was actually asked for
      // (to the not-found page, as a rule). A prerendered `/404` page would
      // instead be hydrated against a different address than it was built
      // for, which React reports as a mismatch.
      spa: {
        enabled: true,
        // The address the shell is rendered at. Not `/`, the default: that
        // is a page of its own here, and the shell would take its place.
        maskPath: "/404",
        prerender: { outputPath: "/404" },
      },
    }),
    viteReact(),
  ],
});
