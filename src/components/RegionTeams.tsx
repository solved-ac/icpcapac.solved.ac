import { Text } from "@chakra-ui/react";
import type { Season } from "../data/season";
import { type Regional, RegionalStatus } from "../data/types";
import { RegionScoreboard } from "./RegionScoreboard";
import { RegionTeamList } from "./RegionTeamList";

interface Props {
  season: Season;
  region: Regional;
}

/** Whatever is known of a regional's teams at the stage it has reached. */
export function RegionTeams({ season, region }: Props) {
  if (region.status === RegionalStatus.preliminariesFinished) {
    if (region.regionalTeams.length === 0) {
      return (
        <Text py={12} textAlign="center" color="fg.muted">
          The teams of {region.site} are not published yet.
        </Text>
      );
    }
    return (
      <RegionTeamList
        season={season}
        teams={region.regionalTeams}
        score={region.score}
      />
    );
  }
  if (region.status === RegionalStatus.regionalsFinished) {
    return (
      <RegionScoreboard teams={season.filterRegionalTeams(region.scoreboard)} />
    );
  }
  return (
    <Text py={12} textAlign="center" color="fg.muted">
      {region.site} is preparing for the contest.
    </Text>
  );
}
