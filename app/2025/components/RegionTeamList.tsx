"use client";

import Region from "@/components/Region";
import { shortenInstitutionName } from "@/utils/institution";
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
import { institutionRegionMap } from "../data/institution";
import { instutiteRequireValueMap } from "../data/mergedTeams";
import { TeamInTeamListLike } from "../data/types";

interface Props {
  teams: TeamInTeamListLike[];
  score: number;
}

const RegionTeamList = ({ teams, score }: Props) => {
  return (
    <TableContainer>
      <Table fullWidth>
        <TableHead>
          <Row>
            <Cell>Region</Cell>
            <Cell>Team</Cell>
            <Cell>Inst. Req.</Cell>
          </Row>
        </TableHead>
        <TableBody>
          {teams.map((team, idx) => {
            return (
              <Row key={idx} style={{}}>
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
                    {team.name}
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
                  {instutiteRequireValueMap.has(team.institution) ? (
                    `At least #${Math.floor(
                      (instutiteRequireValueMap.get(team.institution) || 0) *
                        score +
                        1
                    )} after merge`
                  ) : (
                    <Typo description>-</Typo>
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

export default RegionTeamList;
