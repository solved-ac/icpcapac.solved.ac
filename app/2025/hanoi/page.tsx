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
        <b>Hanoi:</b> Regional team stats are from the last year (Hue City).
      </Card>
      <RegionTeams region={Hanoi} />
    </Container>
  );
};

export default Page;
