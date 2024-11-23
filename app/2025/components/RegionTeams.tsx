"use client";

import { EmptyStatePlaceholder } from "@solved-ac/ui-react";
import { filterRegionalTeams } from "../data/regionScoreboard";
import { Region, RegionStatus } from "../data/types";
import RegionScoreboard from "./RegionScoreboard";
import RegionTeamList from "./RegionTeamList";

interface Props {
  region: Region;
}

const RegionTeams = ({ region }: Props) => {
  if (region.status === RegionStatus.preparing) {
    return (
      <EmptyStatePlaceholder>
        {region.site} is preparing for the contest.
      </EmptyStatePlaceholder>
    );
  }
  if (region.status === RegionStatus.preliminariesFinished) {
    return <RegionTeamList teams={region.regionalTeams} score={region.score} />;
  }
  if (region.status === RegionStatus.regionalsFinished) {
    return <RegionScoreboard teams={filterRegionalTeams(region.scoreboard)} />;
  }
  return <></>;
};

export default RegionTeams;
