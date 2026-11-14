import { HStack, Stack, Table } from "@chakra-ui/react";
import { memo } from "react";
import { INSTITUTION_REGION_MAP } from "../data/institutions/institution";
import type { TeamInFilteredStandingsLike } from "../data/types";
import { useRowSearch } from "../lib/useRowSearch";
import { shortenInstitutionName } from "../utils/institution";
import { Region } from "./Region";
import { ResultCount } from "./ResultCount";
import { SearchField } from "./SearchField";
import { labelCell, numericCell, TeamName, teamCell } from "./TeamName";

const regionOf = (institution: string) =>
  INSTITUTION_REGION_MAP.get(institution) ?? "Unknown";

/** What the search looks through for a team. Stable, for `useRowSearch`. */
const searchFields = (team: TeamInFilteredStandingsLike) => [
  team.teamName,
  team.institution,
  shortenInstitutionName(team.institution),
  regionOf(team.institution),
];

/** One team's row. Hidden, not unmounted, when a search leaves it out. */
const TeamRow = memo(function TeamRow({
  team,
  visible,
}: {
  team: TeamInFilteredStandingsLike;
  visible: boolean;
}) {
  return (
    <Table.Row
      display={visible ? undefined : "none"}
      // Removed from the selection: kept in the list, dimmed.
      color={team.recalculatedRank === -1 ? "fg.subtle" : undefined}
    >
      <Table.Cell {...numericCell}>
        {team.recalculatedRank === -1 ? "-" : team.recalculatedRank}
      </Table.Cell>
      <Table.Cell {...numericCell}>{team.rank}</Table.Cell>
      <Table.Cell {...labelCell}>
        <Region region={regionOf(team.institution)} />
      </Table.Cell>
      <Table.Cell {...teamCell}>
        <TeamName name={team.teamName} institution={team.institution} />
      </Table.Cell>
    </Table.Row>
  );
});

interface Props {
  teams: TeamInFilteredStandingsLike[];
}

/**
 * A finished regional's standings. `#*` is the rank after the teams the
 * selection rules remove are taken out; `#` is the rank on the day.
 */
export function RegionScoreboard({ teams }: Props) {
  const { query, setQuery, matches, stale } = useRowSearch(teams, searchFields);
  const shownCount = matches.filter(Boolean).length;

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
              <Table.ColumnHeader {...numericCell}>#*</Table.ColumnHeader>
              <Table.ColumnHeader {...numericCell}>#</Table.ColumnHeader>
              <Table.ColumnHeader>Region</Table.ColumnHeader>
              <Table.ColumnHeader>Team</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {shownCount === 0 && (
              <Table.Row>
                <Table.Cell
                  colSpan={4}
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
                // Unofficial scoreboards repeat ids, so the name is part of
                // the key.
                key={`${team.teamId}/${team.institution}/${team.teamName}`}
                team={team}
                visible={matches[index]}
              />
            ))}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
    </Stack>
  );
}
