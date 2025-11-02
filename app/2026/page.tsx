"use client";

import {
  Card,
  Cell,
  Container,
  Divider,
  Row,
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

const regions = [Bangkok, Taichung, Seoul, Jakarta, Yokohama, HCMC, Manila];

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
            </Row>
          ))}
        </TableBody>
      </Table>
      <Divider />
      <Card>
        <b>South Pacific Finals</b>: Scoreboard is not published yet in the ICPC
        system, but the information was retrieved from:{" "}
        <a href="https://sppcontests.org/2025-icpc-south-pacific-regional-final-report/">
          https://sppcontests.org/2025-icpc-south-pacific-regional-final-report/
        </a>
        The selection algorithm is assumed to be the same as 2024-2025 cycle.
      </Card>
      <MergedScoreboard teams={mergedTeams} />
    </Container>
  );
};

export default Page;
