"use client";

import { Card, Container } from "@solved-ac/ui-react";

import RegionHeader from "../components/RegionHeader";
import RegionTeams from "../components/RegionTeams";
import { Hanoi } from "../data/hanoi/region";

const Page = () => {
  return (
    <Container>
      <RegionHeader region={Hanoi} />
      <Card>
        <b>Hanoi:</b> Scoreboard is not published yet in the ICPC system, but
        calculated with: https://icpc.vnoi.info/contest/icpc/ranking/
      </Card>
      <RegionTeams region={Hanoi} />
    </Container>
  );
};

export default Page;
