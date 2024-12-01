"use client";

import { Card, Container } from "@solved-ac/ui-react";

import RegionHeader from "../components/RegionHeader";
import RegionTeams from "../components/RegionTeams";
import { Jakarta } from "../data/jakarta/region";

const Page = () => {
  return (
    <Container>
      <RegionHeader region={Jakarta} />
      <Card>
        <b>Jakarta:</b> Scoreboard is not published yet in the ICPC system, but
        calculated with: https://competition.binus.ac.id/inc2024/ and
        https://competition.binus.ac.id/contest/public
      </Card>
      <RegionTeams region={Jakarta} />
    </Container>
  );
};

export default Page;
