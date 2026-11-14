import { Table } from "@chakra-ui/react";
import { INSTITUTION_REGION_MAP } from "../data/institutions/institution";
import type { TeamInFilteredStandingsLike } from "../data/types";
import { Region } from "./Region";
import { labelCell, numericCell, TeamName, teamCell } from "./TeamName";

interface Props {
  teams: TeamInFilteredStandingsLike[];
}

/**
 * A finished regional's standings. `#*` is the rank after the teams the
 * selection rules remove are taken out; `#` is the rank on the day.
 */
export function RegionScoreboard({ teams }: Props) {
  return (
    <Table.ScrollArea>
      <Table.Root size="sm">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader {...numericCell}>#*</Table.ColumnHeader>
            <Table.ColumnHeader {...numericCell}>#</Table.ColumnHeader>
            <Table.ColumnHeader>Region</Table.ColumnHeader>
            <Table.ColumnHeader>Team</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {teams.map((team, index) => (
            <Table.Row
              // biome-ignore lint/suspicious/noArrayIndexKey: a static list, and team ids repeat in unofficial scoreboards
              key={index}
              // Removed from the selection: kept in the list, dimmed.
              color={team.recalculatedRank === -1 ? "fg.subtle" : undefined}
            >
              <Table.Cell {...numericCell}>
                {team.recalculatedRank === -1 ? "-" : team.recalculatedRank}
              </Table.Cell>
              <Table.Cell {...numericCell}>{team.rank}</Table.Cell>
              <Table.Cell {...labelCell}>
                <Region
                  region={
                    INSTITUTION_REGION_MAP.get(team.institution) ?? "Unknown"
                  }
                />
              </Table.Cell>
              <Table.Cell {...teamCell}>
                <TeamName name={team.teamName} institution={team.institution} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  );
}
