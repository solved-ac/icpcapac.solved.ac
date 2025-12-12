"use client";

import {
  Card,
  Cell,
  Container,
  Divider,
  Item,
  Itemize,
  Row,
  Space,
  Table,
  TableBody,
  TableHead,
  Typo,
} from "@solved-ac/ui-react";
import MergedScoreboard from "./components/MergedScoreboard";
import { Bangkok } from "./data/bangkok/region";
import { HCMC } from "./data/hcmc/region";
import { Jakarta } from "./data/jakarta/region";
import { Manila } from "./data/manila/region";
import { mergedTeams } from "./data/mergedTeams";
import { Seoul } from "./data/seoul/region";
import { Taichung } from "./data/taichung/region";
import { RegionalStatus } from "./data/types";
import { Yokohama } from "./data/yokohama/region";
import Region from "@/components/Region";

import sameTeams from "./data/same_teams.json";
import { shortenInstitutionName } from "@/utils/institution";
import styled from "@emotion/styled";
import { Fragment } from "react";

const regions = [Bangkok, Taichung, Seoul, Jakarta, Yokohama, Manila, HCMC];

const Name = styled.code`
  font-family: monospace;
  font-size: 90%;
  background-color: #f7d7ad;
  white-space: pre;
  border-radius: 4px;
  padding: 2px 4px;
  border: 1px solid #e0a96d;
`;

const Page = () => {
  const sameTeamsCount = sameTeams.length;

  return (
    <Container>
      <Typo h2>Candidate Teams to the APAC Finals</Typo>

      <Table padding="dense">
        <TableHead>
          <Row>
            <Cell>Site</Cell>
            <Cell>Score</Cell>
            <Cell>(2024)</Cell>
          </Row>
        </TableHead>
        <TableBody>
          {regions.map((region) => (
            <Row key={region.site}>
              <Cell>
                <Region region={region.region} flagOnly /> {region.site}
              </Cell>
              <Cell
                style={{
                  textAlign: "right",
                }}
              >
                <Typo
                  tabular
                  description={
                    region.status !== RegionalStatus.regionalsFinished
                  }
                >
                  {region.score.toFixed(2)}
                  {region.status === RegionalStatus.regionalsFinished
                    ? ""
                    : "?"}
                </Typo>
              </Cell>
              <Cell
                style={{
                  textAlign: "right",
                }}
              >
                {region.lastYear ? (
                  <Typo tabular description>
                    {region.lastYear.score.toFixed(2)}
                  </Typo>
                ) : (
                  <Typo description>-</Typo>
                )}
              </Cell>
            </Row>
          ))}
        </TableBody>
      </Table>
      <Divider />
      <Card>
        <b>Institution Names</b>: If the institution had participated in the
        World Finals, its name is shortened according to the name printed on the
        latest ICPC World Finals T-shirt. Otherwise, the full institution name
        is shown.
        <Space h={8} />
        <Divider margin="none" />
        <Space h={8} />
        <b>South Pacific Finals</b>: Scoreboard is not published yet in the ICPC
        system, but the information was retrieved from:{" "}
        <a href="https://sppcontests.org/2025-icpc-south-pacific-regional-final-report/">
          https://sppcontests.org/2025-icpc-south-pacific-regional-final-report/
        </a>
        <Space h={8} />
        <Divider margin="none" />
        <Space h={8} />
        {sameTeamsCount > 0 && (
          <>
            <b>
              There are {sameTeamsCount} pairs of teams with the same
              institution and similar names
            </b>
            . These teams are considered the same team for the purpose of
            selection to the APAC Finals:
            <Itemize>
              {sameTeams.map(({ institution, names }) => (
                <Item key={institution + names[0]}>
                  {shortenInstitutionName(institution)}:{" "}
                  {names.map((name, index) => (
                    <Fragment key={name}>
                      {index > 0 && <>, </>}
                      <Name key={name}>{name}</Name>
                    </Fragment>
                  ))}
                </Item>
              ))}
            </Itemize>
            It is unclear if the members of these teams are actually the same,
            and if the names are considered the same{" "}
            <a
              href="https://icpc.jp/apac/2025-26/rules/"
              target="_blank"
              rel="noreferrer"
            >
              (see rule (A1) for why it matters)
            </a>
            .
          </>
        )}
      </Card>
      <Space h={32} />
      <MergedScoreboard teams={mergedTeams} />
    </Container>
  );
};

export default Page;
