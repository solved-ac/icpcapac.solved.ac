import { Badge, Heading, HStack, Stack, Table, Text } from "@chakra-ui/react";
import {
  type Regional,
  RegionalStatus,
  type RegionScoreWeights,
} from "../data/types";
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
  /** The season's site-score weights. */
  weights: RegionScoreWeights;
}

/** A regional's name, its status, and how its site score adds up. */
export function RegionHeader({ region, title, weights }: Props) {
  const prelimsPending =
    region.status !== RegionalStatus.preliminariesFinished &&
    region.status !== RegionalStatus.regionalsFinished;
  const regionalsPending = region.status !== RegionalStatus.regionalsFinished;

  const { scoreDetails } = region;
  const terms = (
    [
      ["univs", "# Univs", regionalsPending],
      ["teams", "# Teams", regionalsPending],
      ["foreignTeams", "# Foreign Teams", regionalsPending],
      ["univsPrelim", "# Univs in Prelim", prelimsPending],
      ["teamsPrelim", "# Teams in Prelim", prelimsPending],
    ] as const
  ).map(([key, label, pending]) => ({
    label,
    count: scoreDetails[key],
    weight: weights[key],
    pending,
  }));

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
