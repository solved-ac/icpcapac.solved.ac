"use client";

import Region from "@/components/Region";
import { shortenInstitutionName } from "@/utils/institution";
import { useTheme } from "@emotion/react";
import {
  Cell,
  Row,
  Space,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Tooltip,
  Typo,
} from "@solved-ac/ui-react";
import { IconAlertCircle } from "@tabler/icons-react";
import { INSTITUTION_REGION_MAP } from "../../data/institutions/institution";
import {
  ChampionshipTeamLike,
  TeamRankInCombinedScoreboardStatus,
} from "../data/types";
import MergedScoreboardTooltip from "./MergedScoreboardTooltip";

const isTeamInvited = (status: TeamRankInCombinedScoreboardStatus) =>
  status === TeamRankInCombinedScoreboardStatus.D2 ||
  status === TeamRankInCombinedScoreboardStatus.D3_3 ||
  status === TeamRankInCombinedScoreboardStatus.D5 ||
  status === TeamRankInCombinedScoreboardStatus.D4_4;

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
          <col style={{ minWidth: "2em" }} />
        </colgroup>
        <TableHead>
          <Row>
            <Cell>#</Cell>
            <Cell>=</Cell>
            <Cell>Site</Cell>
            <Cell>Region</Cell>
            <Cell>Team</Cell>
            <Cell>?</Cell>
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
                  <Typo tabular description={isTeamInvited(team.status)}>
                    {isTeamInvited(team.status)
                      ? "invited"
                      : team.assignedValue.toFixed(4)}
                  </Typo>
                </Cell>
                <Cell>
                  {team.fromSite}
                  {team.rankInSite !== 0 && (
                    <>
                      {" "}
                      <Typo description>#{team.rankInSite}</Typo>
                    </>
                  )}
                </Cell>
                <Cell>
                  <Region
                    region={
                      INSTITUTION_REGION_MAP.get(team.institution) ?? "Unknown"
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
                <Cell>
                  {team.status !== TeamRankInCombinedScoreboardStatus.NONE && (
                    <>
                      <Tooltip title={<MergedScoreboardTooltip team={team} />}>
                        <IconAlertCircle />
                      </Tooltip>
                    </>
                  )}
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
