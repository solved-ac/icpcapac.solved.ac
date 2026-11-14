# icpcapac.solved.ac

Scoreboard archive and statistics for the ICPC Asia-Pacific region.

## Development

```sh
yarn install
yarn dev        # http://localhost:3000
yarn build      # static site in dist/client
yarn typecheck
yarn lint
```

The site is [TanStack Start](https://tanstack.com/start) with
[Chakra UI](https://chakra-ui.com), themed with solved.ac's design tokens
(`src/theme.ts`). Every page is prerendered to a static HTML file at build
time. Pushing to `main` builds the site and publishes `dist/client` to GitHub
Pages.

## Updating data

- `src/data/<year>/<site>/` holds a regional's standings as JSON and a
  `region.tsx` that describes the regional.
- `src/data/<year>/season.tsx` lists a season's regionals, its cutline and
  the notes on its home page. `src/data/seasons.ts` lists the seasons; the
  last one is where `/` leads.
- `src/data/institutions/` maps institutions to countries, and
  `_shortnames.json` holds the short names shown on the scoreboards.
- `scripts/` has helpers that extract standings from scoreboard pages.
