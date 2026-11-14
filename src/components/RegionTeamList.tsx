import { Table, Text } from "@chakra-ui/react";
import { INSTITUTION_REGION_MAP } from "../data/institutions/institution";
import type { Season } from "../data/season";
import type { TeamInTeamListLikeTeamIdNullable } from "../data/types";
import { Region } from "./Region";
import { labelCell, TeamName, teamCell } from "./TeamName";

interface Props {
  season: Season;
  teams: TeamInTeamListLikeTeamIdNullable[];
  /** The site's score. */
  score: number;
}

/**
 * The teams entered in a regional that has not been held yet, each with what
 * its institution needs from this site to send another team.
 */
export function RegionTeamList({ season, teams, score }: Props) {
  const requirement = (institution: string) => {
    if (season.winnerInstitutions.includes(institution)) {
      return "Win this site";
    }
    const value = season.institutionRequiredValue.get(institution);
    if (value !== undefined) {
      return `At least #${Math.floor(value * score + 1)} after merge`;
    }
    return <Text color="fg.muted">-</Text>;
  };

  return (
    <Table.ScrollArea>
      <Table.Root size="sm">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Region</Table.ColumnHeader>
            <Table.ColumnHeader>Team</Table.ColumnHeader>
            <Table.ColumnHeader>Inst. Req.</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {teams.map((team, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: a static list; team ids may be missing before a contest
            <Table.Row key={index}>
              <Table.Cell {...labelCell}>
                <Region
                  region={
                    INSTITUTION_REGION_MAP.get(team.institution) ?? "Unknown"
                  }
                />
              </Table.Cell>
              <Table.Cell {...teamCell}>
                <TeamName name={team.name} institution={team.institution} />
              </Table.Cell>
              <Table.Cell {...labelCell}>
                {requirement(team.institution)}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  );
}
