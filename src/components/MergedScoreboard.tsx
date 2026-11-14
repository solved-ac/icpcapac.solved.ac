import { HStack, IconButton, Stack, Table, Text } from "@chakra-ui/react";
import { IconAlertCircle, IconArrowUp } from "@tabler/icons-react";
import { Fragment, memo, useMemo, useState } from "react";
import { INSTITUTION_REGION_MAP } from "../data/institutions/institution";
import {
  type ChampionshipTeamLike,
  TeamRankInCombinedScoreboardStatus,
} from "../data/types";
import { useRowSearch } from "../lib/useRowSearch";
import { shortenInstitutionName } from "../utils/institution";
import { type Choice, ChoiceSelect } from "./ChoiceSelect";
import { HoverTooltip } from "./HoverTooltip";
import { Region } from "./Region";
import { ResultCount } from "./ResultCount";
import { SearchField } from "./SearchField";
import { labelCell, numericCell, TeamName, teamCell } from "./TeamName";

const ALL = "all";
const UNKNOWN_REGION = "Unknown";
const COLUMNS = 6;

const regionOf = (team: ChampionshipTeamLike) =>
  INSTITUTION_REGION_MAP.get(team.institution) ?? UNKNOWN_REGION;

const isTeamInvited = (status: TeamRankInCombinedScoreboardStatus) =>
  status === TeamRankInCombinedScoreboardStatus.D2 ||
  status === TeamRankInCombinedScoreboardStatus.D3_3 ||
  status === TeamRankInCombinedScoreboardStatus.D5 ||
  status === TeamRankInCombinedScoreboardStatus.D4_4;

/** 3 → "3rd", 4 → "4th". Only small numbers are ever asked for. */
const ordinal = (n: number) => `${n}${["th", "st", "nd", "rd"][n] ?? "th"}`;

/** Why a team is where it is, citing the selection rule that put it there. */
function statusReason(
  team: ChampionshipTeamLike,
  maxTeamsPerUniversity: number,
): string | null {
  switch (team.status) {
    case TeamRankInCombinedScoreboardStatus.D2:
      return "In top 2 teams of the South Pacific Independent Regional Contest (see D2)";
    case TeamRankInCombinedScoreboardStatus.D3_3:
      return `Won the regional at ${team.fromSite} site (see D3 (3))`;
    case TeamRankInCombinedScoreboardStatus.D4_2_1:
      return "Second instance of a single team (see D4 (2))";
    case TeamRankInCombinedScoreboardStatus.D4_2_2:
      return `${ordinal(maxTeamsPerUniversity + 1)} or later instance of ${shortenInstitutionName(
        team.institution,
      )} (see D4 (2))`;
    case TeamRankInCombinedScoreboardStatus.D4_3:
      return `Lowest value from region ${INSTITUTION_REGION_MAP.get(
        team.institution,
      )} (see D4 (3))`;
    case TeamRankInCombinedScoreboardStatus.D5:
      return "Wildcard team (see D5)";
    default:
      return null;
  }
}

/** Teams in each group, and how many of them are inside the cutline. */
function tally(
  teams: ChampionshipTeamLike[],
  cutline: number,
  groupOf: (team: ChampionshipTeamLike) => string,
) {
  const groups = new Map<string, { total: number; overCutline: number }>();
  for (const team of teams) {
    const key = groupOf(team);
    const group = groups.get(key) ?? { total: 0, overCutline: 0 };
    group.total += 1;
    if (team.rank && team.rank !== -1 && team.rank <= cutline) {
      group.overCutline += 1;
    }
    groups.set(key, group);
  }
  return Array.from(groups, ([key, group]) => ({ key, ...group }));
}

/** A full-width row marking that everything above it made the cut. */
function CutlineRow({ label, bg }: { label: string; bg: string }) {
  return (
    <Table.Row>
      <Table.Cell colSpan={COLUMNS} bg={bg} color="white" py={1}>
        <HStack
          justify="center"
          gap={2}
          fontSize="xs"
          fontWeight="bold"
          letterSpacing="0.2em"
        >
          <IconArrowUp size={16} />
          {label}
          <IconArrowUp size={16} />
        </HStack>
      </Table.Cell>
    </Table.Row>
  );
}

/** What the search looks through for a team. Stable, for `useRowSearch`. */
const searchFields = (team: ChampionshipTeamLike) => [
  team.teamName,
  team.institution,
  shortenInstitutionName(team.institution),
  regionOf(team),
  team.fromSite,
];

/**
 * One team's row.
 *
 * Memoized and never unmounted by a search: a row that stops matching is
 * hidden, so a keystroke re-renders only the rows whose visibility changed.
 */
const TeamRow = memo(function TeamRow({
  team,
  visible,
  maxTeamsPerUniversity,
}: {
  team: ChampionshipTeamLike;
  visible: boolean;
  maxTeamsPerUniversity: number;
}) {
  const invited = isTeamInvited(team.status);
  const reason = statusReason(team, maxTeamsPerUniversity);
  return (
    <Table.Row
      display={visible ? undefined : "none"}
      // Struck out of the selection: kept in the list, dimmed.
      color={team.rank === -1 ? "fg.subtle" : undefined}
    >
      <Table.Cell {...numericCell}>
        {team.rank === -1 ? "-" : team.rank}
      </Table.Cell>
      <Table.Cell {...numericCell} pe={{ base: 2, md: 6 }}>
        {invited ? (
          <Text as="span" opacity={0.6}>
            invited
          </Text>
        ) : (
          team.assignedValue.toFixed(4)
        )}
      </Table.Cell>
      <Table.Cell {...labelCell}>
        {team.fromSite}
        {team.rankInSite !== 0 && (
          <>
            {" "}
            <Text as="span" opacity={0.6}>
              #{team.rankInSite}
            </Text>
          </>
        )}
      </Table.Cell>
      <Table.Cell {...labelCell}>
        <Region region={regionOf(team)} />
        {team.rankInRegion !== -1 && (
          <>
            {" "}
            <Text as="span" opacity={0.6}>
              #{team.rankInRegion}
            </Text>
          </>
        )}
      </Table.Cell>
      <Table.Cell {...teamCell}>
        <TeamName name={team.teamName} institution={team.institution} />
      </Table.Cell>
      <Table.Cell py={0}>
        {reason && (
          <HoverTooltip label={reason}>
            <IconButton
              variant="ghost"
              size="xs"
              color="inherit"
              aria-label={reason}
            >
              <IconAlertCircle />
            </IconButton>
          </HoverTooltip>
        )}
      </Table.Cell>
    </Table.Row>
  );
});

interface Props {
  teams: ChampionshipTeamLike[];
  /** Number of teams that qualify. */
  cutline: number;
  /** The most teams one university can send (Q in the rules). */
  maxTeamsPerUniversity: number;
}

/**
 * Every regional's teams merged into the one list the championship is
 * selected from, with the lines that selection draws across it.
 */
export function MergedScoreboard({
  teams,
  cutline,
  maxTeamsPerUniversity,
}: Props) {
  const [regionFilter, setRegionFilter] = useState(ALL);
  const [siteFilter, setSiteFilter] = useState(ALL);
  const { query, setQuery, matches, stale } = useRowSearch(teams, searchFields);

  const regionOptions = useMemo<Choice[]>(
    () => [
      { value: ALL, label: "All Regions", text: "All Regions" },
      ...tally(teams, cutline, regionOf)
        .sort((a, b) => {
          if (a.key === UNKNOWN_REGION) return 1;
          if (b.key === UNKNOWN_REGION) return -1;
          return b.overCutline - a.overCutline;
        })
        .map((group) => ({
          value: group.key,
          label: <Region region={group.key} />,
          text: group.key,
          count: `${group.overCutline}/${group.total}`,
        })),
    ],
    [teams, cutline],
  );

  const siteOptions = useMemo<Choice[]>(
    () => [
      { value: ALL, label: "All Sites", text: "All Sites" },
      ...tally(teams, cutline, (team) => team.fromSite)
        .sort((a, b) => b.overCutline - a.overCutline)
        .map((group) => ({
          value: group.key,
          label: group.key,
          text: group.key,
          count: `${group.overCutline}/${group.total}`,
        })),
    ],
    [teams, cutline],
  );

  // Indices are into `teams`: every row stays in the table, and these say
  // which are shown and after which of them the two lines are drawn.
  const { visible, shownCount, lastInvitedIndex, lastQualifiedIndex } =
    useMemo(() => {
      const visible = teams.map(
        (team, i) =>
          matches[i] &&
          (regionFilter === ALL || regionOf(team) === regionFilter) &&
          (siteFilter === ALL || team.fromSite === siteFilter),
      );
      let shownCount = 0;
      let lastInvitedIndex = -1;
      // The shown team inside the cutline with the largest rank; among
      // equals, the last one.
      let lastQualifiedIndex = -1;
      let lastQualifiedRank = -1;
      teams.forEach((team, i) => {
        if (!visible[i]) return;
        shownCount += 1;
        if (isTeamInvited(team.status)) lastInvitedIndex = i;
        const rank =
          team.rank && team.rank !== -1 ? team.rank : teams.length + 1;
        if (rank <= cutline && rank >= lastQualifiedRank) {
          lastQualifiedRank = rank;
          lastQualifiedIndex = i;
        }
      });
      return { visible, shownCount, lastInvitedIndex, lastQualifiedIndex };
    }, [teams, cutline, matches, regionFilter, siteFilter]);

  return (
    <Stack gap={3}>
      <HStack gap={2} wrap="wrap">
        <ChoiceSelect
          label="Region"
          choices={regionOptions}
          value={regionFilter}
          onChange={setRegionFilter}
        />
        <ChoiceSelect
          label="Site"
          choices={siteOptions}
          value={siteFilter}
          onChange={setSiteFilter}
        />
        <SearchField
          value={query}
          onChange={setQuery}
          placeholder="Search teams, institutions, sites"
        />
        <ResultCount shown={shownCount} total={teams.length} />
      </HStack>
      {/* Dimmed while the table is catching up with what was typed. */}
      <Table.ScrollArea opacity={stale ? 0.6 : 1} transition="opacity 0.1s">
        <Table.Root size="sm">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader {...numericCell}>#</Table.ColumnHeader>
              <Table.ColumnHeader {...numericCell}>=</Table.ColumnHeader>
              <Table.ColumnHeader>Site</Table.ColumnHeader>
              <Table.ColumnHeader>Region</Table.ColumnHeader>
              <Table.ColumnHeader>Team</Table.ColumnHeader>
              <Table.ColumnHeader>?</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {shownCount === 0 && (
              <Table.Row>
                <Table.Cell
                  colSpan={COLUMNS}
                  py={12}
                  textAlign="center"
                  color="fg.muted"
                >
                  No teams match the search and filters.
                </Table.Cell>
              </Table.Row>
            )}
            {teams.map((team, index) => (
              <Fragment key={team.teamId}>
                <TeamRow
                  team={team}
                  visible={visible[index]}
                  maxTeamsPerUniversity={maxTeamsPerUniversity}
                />
                {index === lastInvitedIndex && (
                  <CutlineRow label="INVITED" bg="orange.solid" />
                )}
                {index === lastQualifiedIndex && (
                  <CutlineRow label="QUALIFIED" bg="red.solid" />
                )}
              </Fragment>
            ))}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
    </Stack>
  );
}
