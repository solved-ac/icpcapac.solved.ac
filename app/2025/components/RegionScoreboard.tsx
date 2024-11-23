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
  TeamInFilteredStandingsLike,
  TeamInStandingsLike,
  TeamInTeamListLike,
} from "../data/types";
import Region from "@/components/Region";
import { shortenInstitutionName } from "@/utils/institution";
import { institutionRegionMap } from "../data/institution";
import { useTheme } from "@emotion/react";

interface Props {
  teams: TeamInFilteredStandingsLike[];
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
          <col />
        </colgroup>
        <TableHead>
          <Row>
            <Cell>#*</Cell>
            <Cell>#</Cell>
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
                  team.recalculatedRank === -1
                    ? {
                        color: theme.color.text.secondary.main,
                      }
                    : {}
                }
              >
                <Cell style={{ textAlign: "right" }}>
                  <Typo tabular>
                    {team.recalculatedRank === -1 ? "-" : team.recalculatedRank}
                  </Typo>
                </Cell>
                <Cell style={{ textAlign: "right" }}>
                  <Typo tabular>{team.rank}</Typo>
                </Cell>
                <Cell>
                  <Region
                    region={
                      institutionRegionMap.get(team.institution) ?? "Unknown"
                    }
                  />
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
