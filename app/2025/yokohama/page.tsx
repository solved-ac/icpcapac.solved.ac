"use client";

import { Card, Container } from "@solved-ac/ui-react";

import RegionHeader from "../components/RegionHeader";
import RegionTeams from "../components/RegionTeams";
import { Yokohama } from "../data/yokohama/region";

const Page = () => {
  return (
    <Container>
      <RegionHeader region={Yokohama} />
      <Card>
        <b>Yokohama</b>: Scoreboard are not published yet in the ICPC system,
        but retrieved from: https://icpcsec.firebaseapp.com/standings/
      </Card>
      <RegionTeams region={Yokohama} />
    </Container>
  );
};

export default Page;
