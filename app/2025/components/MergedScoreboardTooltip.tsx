"use client";

import { shortenInstitutionName } from "@/utils/institution";
import {
  ChampionshipTeamLike,
  TeamRankInCombinedScoreboardStatus,
} from "../data/types";
import { institutionRegionMap } from "../data/institution";

interface Props {
  team: ChampionshipTeamLike;
}

const MergedScoreboardTooltip = ({ team }: Props) => {
  const { status } = team;
  if (status === TeamRankInCombinedScoreboardStatus.NONE) return null;
  if (status === TeamRankInCombinedScoreboardStatus.D2) {
    return (
      <>
        In top 2 teams of the South Pacific Independent Regional Contest (see
        D2)
      </>
    );
  }
  if (status === TeamRankInCombinedScoreboardStatus.D3_3) {
    return <>Won the regional st {team.fromSite} site (see D3 (3))</>;
  }
  if (status === TeamRankInCombinedScoreboardStatus.D4_2_1) {
    return <>Second instance of a single team (see D4 (2))</>;
  }
  if (status === TeamRankInCombinedScoreboardStatus.D4_2_2) {
    return (
      <>
        4th or later instance of {shortenInstitutionName(team.institution)} (see
        D4 (2))
      </>
    );
  }
  if (status === TeamRankInCombinedScoreboardStatus.D4_3) {
    return (
      <>
        Lowest value from region {institutionRegionMap.get(team.institution)}{" "}
        (see D4 (3))
      </>
    );
  }
  if (status === TeamRankInCombinedScoreboardStatus.D5) {
    return <>Wildcard team (see D5)</>;
  }

  return null;
};

export default MergedScoreboardTooltip;
