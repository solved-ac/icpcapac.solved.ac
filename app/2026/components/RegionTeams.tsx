"use client";

import { EmptyStatePlaceholder } from "@solved-ac/ui-react";
import { filterRegionalTeams } from "../data/regionScoreboard";
import { Regional, RegionalStatus } from "../data/types";
import RegionScoreboard from "./RegionScoreboard";
import RegionTeamList from "./RegionTeamList";

interface Props {
  region: Regional;
}

const RegionTeams = ({ region }: Props) => {
  if (region.status === RegionalStatus.preparing) {
    return (
      <EmptyStatePlaceholder>
        {region.site} is preparing for the contest.
      </EmptyStatePlaceholder>
    );
  }
  if (region.status === RegionalStatus.preliminariesFinished) {
    return <RegionTeamList teams={region.regionalTeams} score={region.score} />;
  }
  if (region.status === RegionalStatus.regionalsFinished) {
    return <RegionScoreboard teams={filterRegionalTeams(region.scoreboard)} />;
  }
  return <></>;
};

export default RegionTeams;
