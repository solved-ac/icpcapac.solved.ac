import {
  Badge,
  DataList,
  Heading,
  HStack,
  Link,
  Stack,
  Table,
  Text,
} from "@chakra-ui/react";
import { IconExternalLink, IconMapPin } from "@tabler/icons-react";
import {
  type Regional,
  RegionalStatus,
  type RegionScoreWeights,
} from "../data/types";
import { formatDateRange } from "../lib/dates";
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

const external = { target: "_blank", rel: "noreferrer" } as const;

/** `https://icpc.jp/2026/` → `icpc.jp/2026`, for showing a link as itself. */
const displayUrl = (url: string) =>
  url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

/** A map search for the venue, for hosts that publish no map link. */
const mapSearchUrl = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

/** When, where, and the pages to read more on. */
function RegionFacts({ region }: { region: Regional }) {
  const { dates, location, venue, url, icpcCode } = region;
  if (!dates && !location && !venue && !url && !icpcCode) return null;

  return (
    <DataList.Root orientation="horizontal" size="md" gap={2}>
      {dates && (
        <DataList.Item>
          <DataList.ItemLabel minW="20">Dates</DataList.ItemLabel>
          <DataList.ItemValue>
            {formatDateRange(dates.start, dates.end)}
          </DataList.ItemValue>
        </DataList.Item>
      )}
      {venue && (
        <DataList.Item alignItems="flex-start">
          <DataList.ItemLabel minW="20">Venue</DataList.ItemLabel>
          <DataList.ItemValue>
            <Stack gap={0.5}>
              <Text>{venue.name}</Text>
              {venue.address && (
                <Text color="fg.muted" fontSize="sm">
                  {venue.address}
                </Text>
              )}
              <Link
                href={
                  venue.mapUrl ??
                  mapSearchUrl(
                    [venue.name, venue.address ?? location]
                      .filter(Boolean)
                      .join(", "),
                  )
                }
                variant="underline"
                colorPalette="primary"
                fontSize="sm"
                w="fit-content"
                {...external}
              >
                <IconMapPin size="1em" />
                Open map
              </Link>
            </Stack>
          </DataList.ItemValue>
        </DataList.Item>
      )}
      {location && (
        <DataList.Item>
          <DataList.ItemLabel minW="20">Location</DataList.ItemLabel>
          <DataList.ItemValue>{location}</DataList.ItemValue>
        </DataList.Item>
      )}
      {(url || icpcCode) && (
        <DataList.Item alignItems="flex-start">
          <DataList.ItemLabel minW="20">Links</DataList.ItemLabel>
          <DataList.ItemValue>
            <Stack gap={0.5} minW={0}>
              {url && (
                <Link
                  href={url}
                  variant="underline"
                  colorPalette="primary"
                  w="fit-content"
                  overflowWrap="anywhere"
                  {...external}
                >
                  {displayUrl(url)}
                  <IconExternalLink size="1em" />
                </Link>
              )}
              {icpcCode && (
                <Link
                  href={`https://icpc.global/regionals/finder/${icpcCode}`}
                  variant="underline"
                  colorPalette="primary"
                  w="fit-content"
                  {...external}
                >
                  icpc.global
                  <IconExternalLink size="1em" />
                </Link>
              )}
            </Stack>
          </DataList.ItemValue>
        </DataList.Item>
      )}
    </DataList.Root>
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
      <RegionFacts region={region} />
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
