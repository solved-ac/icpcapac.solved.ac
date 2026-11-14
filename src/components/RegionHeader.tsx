import { Badge, Heading, HStack, Stack, Table, Text } from "@chakra-ui/react";
import { type Regional, RegionalStatus } from "../data/types";
import { Notice } from "./Notice";
import { numericCell } from "./TeamName";

function StatusBadge({ status }: { status: RegionalStatus }) {
  if (status === RegionalStatus.preparing) {
    return <Badge variant="outline">Preparing preliminaries</Badge>;
  }
  if (status === RegionalStatus.preliminariesFinished) {
    return <Badge>Preliminaries finished</Badge>;
  }
  return <Badge colorPalette="primary">Concluded</Badge>;
}

/** A figure that is still an estimate is dimmed and marked with a `?`. */
function Figure({ pending, children }: { pending: boolean; children: string }) {
  return (
    <Text as="span" color={pending ? "fg.muted" : undefined}>
      {children}
      {pending ? "?" : ""}
    </Text>
  );
}

interface Props {
  region: Regional;
  title: string;
}

/** A regional's name, its status, and how its site score adds up. */
export function RegionHeader({ region, title }: Props) {
  const prelimsPending =
    region.status !== RegionalStatus.preliminariesFinished &&
    region.status !== RegionalStatus.regionalsFinished;
  const regionalsPending = region.status !== RegionalStatus.regionalsFinished;

  const { scoreDetails } = region;
  // The weights are `regionScore`'s.
  const terms = [
    {
      label: "# Univs",
      count: scoreDetails.univs,
      weight: 0.56,
      pending: regionalsPending,
    },
    {
      label: "# Teams",
      count: scoreDetails.teams,
      weight: 0.24,
      pending: regionalsPending,
    },
    {
      label: "# Foreign Teams",
      count: scoreDetails.foreignTeams,
      weight: 0.3,
      pending: regionalsPending,
    },
    {
      label: "# Univs in Prelim",
      count: scoreDetails.univsPrelim,
      weight: 0.14,
      pending: prelimsPending,
    },
    {
      label: "# Teams in Prelim",
      count: scoreDetails.teamsPrelim,
      weight: 0.06,
      pending: prelimsPending,
    },
  ];

  return (
    <Stack gap={4} align="flex-start">
      <HStack gap={3} wrap="wrap">
        <Heading as="h2" size="xl">
          {title}
        </Heading>
        <StatusBadge status={region.status} />
      </HStack>
      <Table.Root size="sm" w="auto">
        <Table.Body>
          {terms.map((term) => (
            <Table.Row key={term.label}>
              <Table.Cell>{term.label}</Table.Cell>
              <Table.Cell {...numericCell}>
                <Figure pending={term.pending}>{String(term.count)}</Figure>
              </Table.Cell>
              <Table.Cell {...numericCell} color="fg.muted">
                &times; {term.weight.toFixed(2)}
              </Table.Cell>
              <Table.Cell {...numericCell}>
                <Figure pending={term.pending}>
                  {`= ${(term.count * term.weight).toFixed(2)}`}
                </Figure>
              </Table.Cell>
            </Table.Row>
          ))}
          <Table.Row fontWeight="semibold">
            <Table.Cell>Site Score</Table.Cell>
            <Table.Cell />
            <Table.Cell />
            <Table.Cell {...numericCell}>
              <Figure pending={regionalsPending}>
                {`= ${region.score.toFixed(2)}`}
              </Figure>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
      {regionalsPending && (
        <Notice alignSelf="stretch">
          Site score may decrease if some team fails to solve any problem{" "}
          {prelimsPending
            ? "in the preliminaries or in the regionals."
            : "in the regionals."}
        </Notice>
      )}
    </Stack>
  );
}
