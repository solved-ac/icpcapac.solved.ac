import { HStack, Stack, Table, Text } from "@chakra-ui/react";
import { memo, type ReactNode } from "react";
import { INSTITUTION_REGION_MAP } from "../data/institutions/institution";
import type { Season } from "../data/season";
import type { TeamInTeamListLikeTeamIdNullable } from "../data/types";
import { useRowSearch } from "../lib/useRowSearch";
import { shortenInstitutionName } from "../utils/institution";
import { Region } from "./Region";
import { ResultCount } from "./ResultCount";
import { SearchField } from "./SearchField";
import { labelCell, TeamName, teamCell } from "./TeamName";

const regionOf = (institution: string) =>
  INSTITUTION_REGION_MAP.get(institution) ?? "Unknown";

/** What the search looks through for a team. Stable, for `useRowSearch`. */
const searchFields = (team: TeamInTeamListLikeTeamIdNullable) => [
  team.name,
  team.institution,
  shortenInstitutionName(team.institution),
  regionOf(team.institution),
];

/** One team's row. Hidden, not unmounted, when a search leaves it out. */
const TeamRow = memo(function TeamRow({
  team,
  visible,
  requirement,
}: {
  team: TeamInTeamListLikeTeamIdNullable;
  visible: boolean;
  /** A string, so the memo can compare it. `null` when there is none. */
  requirement: string | null;
}) {
  return (
    <Table.Row display={visible ? undefined : "none"}>
      <Table.Cell {...labelCell}>
        <Region region={regionOf(team.institution)} />
      </Table.Cell>
      <Table.Cell {...teamCell}>
        <TeamName name={team.name} institution={team.institution} />
      </Table.Cell>
      <Table.Cell {...labelCell}>
        {requirement ?? <Text color="fg.muted">-</Text>}
      </Table.Cell>
    </Table.Row>
  );
});

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
export function RegionTeamList({ season, teams, score }: Props): ReactNode {
  const { query, setQuery, matches, stale } = useRowSearch(teams, searchFields);
  const shownCount = matches.filter(Boolean).length;

  const requirement = (institution: string) => {
    if (season.winnerInstitutions.includes(institution)) {
      return "Win this site";
    }
    const value = season.institutionRequiredValue.get(institution);
    if (value !== undefined) {
      return `At least #${Math.floor(value * score + 1)} after merge`;
    }
    return null;
  };

  return (
    <Stack gap={3}>
      <HStack gap={2} wrap="wrap">
        <SearchField
          value={query}
          onChange={setQuery}
          placeholder="Search teams, institutions, countries"
        />
        <ResultCount shown={shownCount} total={teams.length} />
      </HStack>
      <Table.ScrollArea opacity={stale ? 0.6 : 1} transition="opacity 0.1s">
        <Table.Root size="sm">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Region</Table.ColumnHeader>
              <Table.ColumnHeader>Team</Table.ColumnHeader>
              <Table.ColumnHeader>Inst. Req.</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {shownCount === 0 && (
              <Table.Row>
                <Table.Cell
                  colSpan={3}
                  py={12}
                  textAlign="center"
                  color="fg.muted"
                >
                  No teams match the search.
                </Table.Cell>
              </Table.Row>
            )}
            {teams.map((team, index) => (
              <TeamRow
                key={`${team.institution}/${team.name}`}
                team={team}
                visible={matches[index]}
                requirement={requirement(team.institution)}
              />
            ))}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
    </Stack>
  );
}
