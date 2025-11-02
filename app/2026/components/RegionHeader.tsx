"use client";

import {
  Card,
  Cell,
  Divider,
  Row,
  Space,
  Table,
  TableBody,
  Typo,
} from "@solved-ac/ui-react";
import { Regional, RegionalStatus } from "../data/types";
import RegionStatusText from "./RegionStatusText";

interface Props {
  region: Regional;
}

const RegionHeader = ({ region }: Props) => {
  const scorePrelimsNotFinished =
    region.status !== RegionalStatus.preliminariesFinished &&
    region.status !== RegionalStatus.regionalsFinished;
  const scoreRegionalsNotFinished =
    region.status !== RegionalStatus.regionalsFinished;

  return (
    <>
      <Typo h2>
        The 2025 ICPC Asia{" "}
        {region.site === "HCMC" ? "Ho Chi Minh City" : region.site} Regional
        Contest
      </Typo>
      <p>
        Status: <RegionStatusText status={region.status} />
      </p>
      <Table padding="dense">
        <TableBody
          style={{
            textAlign: "right",
          }}
        >
          <Row>
            <Cell># Univs</Cell>
            <Cell>
              <Typo tabular description={scoreRegionalsNotFinished}>
                {region.scoreDetails.univs}
                {scoreRegionalsNotFinished ? "?" : ""}
              </Typo>
            </Cell>
            <Cell>
              <Typo tabular>&times; 0.56</Typo>
            </Cell>
            <Cell>
              <Typo tabular description={scoreRegionalsNotFinished}>
                = {(region.scoreDetails.univs * 0.56).toFixed(2)}
                {scoreRegionalsNotFinished ? "?" : ""}
              </Typo>
            </Cell>
          </Row>
          <Row>
            <Cell># Teams</Cell>
            <Cell>
              <Typo tabular description={scoreRegionalsNotFinished}>
                {region.scoreDetails.teams}
                {scoreRegionalsNotFinished ? "?" : ""}
              </Typo>
            </Cell>
            <Cell>
              <Typo tabular>&times; 0.24</Typo>
            </Cell>
            <Cell>
              <Typo tabular description={scoreRegionalsNotFinished}>
                = {(region.scoreDetails.teams * 0.24).toFixed(2)}
                {scoreRegionalsNotFinished ? "?" : ""}
              </Typo>
            </Cell>
          </Row>
          <Row>
            <Cell># Foreign Teams</Cell>
            <Cell>
              <Typo tabular description={scoreRegionalsNotFinished}>
                {region.scoreDetails.foreignTeams}
                {scoreRegionalsNotFinished ? "?" : ""}
              </Typo>
            </Cell>
            <Cell>
              <Typo tabular>&times; 0.30</Typo>
            </Cell>
            <Cell>
              <Typo tabular description={scoreRegionalsNotFinished}>
                = {(region.scoreDetails.foreignTeams * 0.3).toFixed(2)}
                {scoreRegionalsNotFinished ? "?" : ""}
              </Typo>
            </Cell>
          </Row>
          <Row>
            <Cell># Univs in Prelim</Cell>
            <Cell>
              <Typo tabular description={scorePrelimsNotFinished}>
                {region.scoreDetails.univsPrelim}
                {scorePrelimsNotFinished ? "?" : ""}
              </Typo>
            </Cell>
            <Cell>
              <Typo tabular>&times; 0.14</Typo>
            </Cell>
            <Cell>
              <Typo tabular description={scorePrelimsNotFinished}>
                = {(region.scoreDetails.univsPrelim * 0.14).toFixed(2)}
                {scorePrelimsNotFinished ? "?" : ""}
              </Typo>
            </Cell>
          </Row>
          <Row>
            <Cell># Teams in Prelim</Cell>
            <Cell>
              <Typo tabular description={scorePrelimsNotFinished}>
                {region.scoreDetails.teamsPrelim}
                {scorePrelimsNotFinished ? "?" : ""}
              </Typo>
            </Cell>
            <Cell>
              <Typo tabular>&times; 0.06</Typo>
            </Cell>
            <Cell>
              <Typo tabular description={scorePrelimsNotFinished}>
                = {(region.scoreDetails.teamsPrelim * 0.06).toFixed(2)}
                {scorePrelimsNotFinished ? "?" : ""}
              </Typo>
            </Cell>
          </Row>
          <Row>
            <Cell>
              <b>Site Score</b>
            </Cell>
            <Cell></Cell>
            <Cell></Cell>
            <Cell>
              <Typo tabular description={scoreRegionalsNotFinished}>
                = {region.score.toFixed(2)}
                {scoreRegionalsNotFinished ? "?" : ""}
              </Typo>
            </Cell>
          </Row>
        </TableBody>
      </Table>
      {scoreRegionalsNotFinished && (
        <>
          <Space h={8} />
          <Card>
            Site score may decrease if some team fails to solve any problem{" "}
            {scorePrelimsNotFinished
              ? "in the preliminaries or in the regionals."
              : "in the regionals."}
          </Card>
        </>
      )}
      <Divider />
    </>
  );
};

export default RegionHeader;
