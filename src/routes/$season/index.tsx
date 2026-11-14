import {
  Code,
  Heading,
  List,
  Separator,
  Stack,
  Table,
  Text,
} from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";
import { Fragment } from "react";
import { MergedScoreboard } from "../../components/MergedScoreboard";
import { Notice } from "../../components/Notice";
import { Region } from "../../components/Region";
import { numericCell } from "../../components/TeamName";
import type { Season } from "../../data/season";
import { findSeason } from "../../data/seasons";
import { RegionalStatus } from "../../data/types";
import { shortenInstitutionName } from "../../utils/institution";

export const Route = createFileRoute("/$season/")({
  component: SeasonHomePage,
});

/** Each site's score, beside last season's where there is one. */
function SiteScores({ season }: { season: Season }) {
  const showLastYear = season.lastYearLabel !== undefined;

  return (
    // `alignSelf`: a table this short reads as a list, not as a page-wide grid.
    <Table.Root size="sm" w="auto" alignSelf="flex-start">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>Site</Table.ColumnHeader>
          <Table.ColumnHeader {...numericCell}>Score</Table.ColumnHeader>
          {showLastYear && (
            <Table.ColumnHeader {...numericCell}>
              {season.lastYearLabel}
            </Table.ColumnHeader>
          )}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {season.regionals.map((regional) => {
          const final = regional.status === RegionalStatus.regionalsFinished;
          return (
            <Table.Row key={regional.site}>
              <Table.Cell whiteSpace="nowrap" pe={8}>
                <Region region={regional.region} flagOnly /> {regional.site}
              </Table.Cell>
              <Table.Cell
                {...numericCell}
                // A score that can still change is dimmed and marked `?`.
                color={final ? undefined : "fg.muted"}
              >
                {regional.score.toFixed(2)}
                {final ? "" : "?"}
              </Table.Cell>
              {showLastYear && (
                <Table.Cell {...numericCell} color="fg.muted">
                  {regional.lastYear ? regional.lastYear.score.toFixed(2) : "-"}
                </Table.Cell>
              )}
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table.Root>
  );
}

function SameTeamsNotice({
  sameTeams,
}: {
  sameTeams: NonNullable<Season["sameTeams"]>;
}) {
  return (
    <Notice>
      <Stack gap={2}>
        <Text>
          <b>
            There are {sameTeams.length} pairs of teams with the same
            institution and similar names.
          </b>{" "}
          These teams are considered the same team for the purpose of selection
          to the APAC Finals:
        </Text>
        <List.Root ps={5} gap={1}>
          {sameTeams.map(({ institution, names }) => (
            <List.Item key={institution + names[0]}>
              {shortenInstitutionName(institution)}:{" "}
              {names.map((name, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: two spellings of one team can be the same string
                <Fragment key={index}>
                  {index > 0 && ", "}
                  {/* `pre`: some of these names differ only in whitespace. */}
                  <Code size="sm" variant="outline" whiteSpace="pre">
                    {name}
                  </Code>
                </Fragment>
              ))}
            </List.Item>
          ))}
        </List.Root>
        <Text>
          The RCDs confirmed that the members of these teams are same. They also
          reminded that, in the future, teams should register with the exact
          same name in both sites to avoid issues.
        </Text>
      </Stack>
    </Notice>
  );
}

function SeasonHomePage() {
  const { season: seasonId } = Route.useParams();
  const season = findSeason(seasonId);
  if (!season) return null;

  return (
    <Stack gap={6}>
      <Heading as="h2" size="xl">
        Candidate Teams to the APAC Finals
      </Heading>
      <SiteScores season={season} />
      <Stack gap={2}>
        {season.notices.length > 0 && (
          <Notice>
            <Stack gap={3} separator={<Separator />}>
              {season.notices.map((notice) => (
                <Text key={notice.title}>
                  <b>{notice.title}</b>: {notice.body}
                </Text>
              ))}
            </Stack>
          </Notice>
        )}
        {season.sameTeams && season.sameTeams.length > 0 && (
          <SameTeamsNotice sameTeams={season.sameTeams} />
        )}
      </Stack>
      <MergedScoreboard
        teams={season.mergedTeams}
        cutline={season.cutline}
        maxTeamsPerUniversity={season.maxTeamsPerUniversity}
      />
    </Stack>
  );
}
