"use client";

import {
  Card,
  Cell,
  Container,
  Divider,
  Row,
  Space,
  Table,
  TableBody,
  TableHead,
  Typo,
} from "@solved-ac/ui-react";
import MergedScoreboard from "./components/MergedScoreboard";
import { Hanoi } from "./data/hanoi/region";
import { Jakarta } from "./data/jakarta/region";
import { mergedTeams } from "./data/mergedTeams";
import { Seoul } from "./data/seoul/region";
import { Taichung } from "./data/taichung/region";
import { RegionStatus } from "./data/types";
import { Yokohama } from "./data/yokohama/region";

const regions = [Taichung, Seoul, Jakarta, Hanoi, Yokohama];

const Page = () => {
  return (
    <Container>
      <Typo h2>Candidate Teams to the APAC Finals</Typo>

      <Table padding="dense">
        <TableHead>
          <Row>
            <Cell>Site</Cell>
            <Cell>Score</Cell>
          </Row>
        </TableHead>
        <TableBody>
          {regions.map((region) => (
            <Row key={region.site}>
              <Cell>{region.site}</Cell>
              <Cell
                style={{
                  textAlign: "right",
                }}
              >
                <Typo
                  tabular
                  description={region.status !== RegionStatus.regionalsFinished}
                >
                  {region.score.toFixed(2)}
                  {region.status === RegionStatus.regionalsFinished ? "" : "?"}
                </Typo>
              </Cell>
            </Row>
          ))}
        </TableBody>
      </Table>
      <Divider />
      <Card>
        <b>South Pacific Finals</b>: Scoreboard are not published yet in the
        ICPC system, but retrieved from:
        https://sppcontests.org/scoreboards/2024/regionals/scoreboard.htm
      </Card>
      <Space h={32} />
      <MergedScoreboard teams={mergedTeams} />
    </Container>
  );
};

export default Page;
