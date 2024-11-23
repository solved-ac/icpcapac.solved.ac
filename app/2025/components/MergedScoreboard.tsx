"use client";

import {
  Cell,
  Row,
  Space,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Typo,
} from "@solved-ac/ui-react";
import {
  ChampionshipTeamLike,
  TeamInFilteredStandingsLike,
  TeamInStandingsLike,
  TeamInTeamListLike,
  TeamRankInCombinedScoreboardStatus,
} from "../data/types";
import Region from "@/components/Region";
import { shortenInstitutionName } from "@/utils/institution";
import { institutionRegionMap } from "../data/institution";
import { useTheme } from "@emotion/react";

interface Props {
  teams: ChampionshipTeamLike[];
}

const RegionScoreboard = ({ teams }: Props) => {
  const theme = useTheme();

  return (
    <TableContainer>
      <Table fullWidth>
        <colgroup>
          <col style={{ minWidth: "2em" }} />
          <col style={{ minWidth: "2em" }} />
          <col style={{ minWidth: "6em" }} />
          <col style={{ minWidth: "6em" }} />
          <col />
        </colgroup>
        <TableHead>
          <Row>
            <Cell>#</Cell>
            <Cell>=</Cell>
            <Cell>Site</Cell>
            <Cell>Region</Cell>
            <Cell>Team</Cell>
          </Row>
        </TableHead>
        <TableBody>
          {teams.map((team, idx) => {
            return (
              <Row
                key={idx}
                style={
                  team.rank === -1
                    ? {
                        color: theme.color.text.secondary.main,
                      }
                    : {}
                }
              >
                <Cell style={{ textAlign: "right" }}>
                  <Typo tabular>{team.rank === -1 ? "-" : team.rank}</Typo>
                </Cell>
                <Cell style={{ textAlign: "right" }}>
                  <Typo
                    tabular
                    description={
                      team.status === TeamRankInCombinedScoreboardStatus.D2 ||
                      team.status === TeamRankInCombinedScoreboardStatus.D5
                    }
                  >
                    {team.status === TeamRankInCombinedScoreboardStatus.D2 ||
                    team.status === TeamRankInCombinedScoreboardStatus.D5
                      ? "invited"
                      : team.assignedValue.toFixed(4)}
                  </Typo>
                </Cell>
                <Cell>
                  {team.fromSite} <Typo description>#{team.rankInSite}</Typo>
                </Cell>
                <Cell>
                  <Region
                    region={
                      institutionRegionMap.get(team.institution) ?? "Unknown"
                    }
                  />
                  {team.rankInRegion !== -1 && (
                    <>
                      {" "}
                      <Typo description>#{team.rankInRegion}</Typo>
                    </>
                  )}
                </Cell>
                <Cell>
                  <Typo
                    ellipsis
                    style={{
                      display: "block",
                      lineHeight: 1,
                    }}
                  >
                    {team.teamName}
                  </Typo>
                  <Space h={4} />
                  <Typo
                    ellipsis
                    small
                    style={{
                      display: "block",
                      lineHeight: 1,
                    }}
                  >
                    {shortenInstitutionName(team.institution)}
                  </Typo>
                </Cell>
              </Row>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RegionScoreboard;
