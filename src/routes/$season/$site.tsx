import { Stack } from "@chakra-ui/react";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { Notice } from "../../components/Notice";
import { RegionHeader } from "../../components/RegionHeader";
import { RegionTeams } from "../../components/RegionTeams";
import { findRegional, findSeason } from "../../data/seasons";
import { SITE_NAME } from "../../site";

const lookup = (params: { season: string; site: string }) => {
  const season = findSeason(params.season);
  const regional = season && findRegional(season, params.site);
  return season && regional ? { season, regional } : null;
};

export const Route = createFileRoute("/$season/$site")({
  loader: ({ params }) => {
    if (!lookup(params)) throw notFound();
  },
  head: ({ params }) => {
    const found = lookup(params);
    return {
      meta: found
        ? [
            {
              title: `${found.regional.site} - ${SITE_NAME} ${found.season.label} - solved.ac`,
            },
          ]
        : [],
    };
  },
  component: SitePage,
});

function SitePage() {
  const found = lookup(Route.useParams());
  if (!found) return null;
  const { season, regional } = found;

  return (
    <Stack gap={6}>
      <RegionHeader
        region={regional}
        title={season.regionalTitle(regional)}
        weights={season.scoreWeights}
      />
      {regional.disclaimer ? (
        <Notice>
          <b>{regional.site}</b>: {regional.disclaimer}
        </Notice>
      ) : null}
      <RegionTeams season={season} region={regional} />
    </Stack>
  );
}
