"use client";

import { Container } from "@solved-ac/ui-react";

import RegionHeader from "../components/RegionHeader";
import RegionTeams from "../components/RegionTeams";
import { Yokohama } from "../data/yokohama/region";

const Page = () => {
  return (
    <Container>
      <RegionHeader region={Yokohama} />
      <RegionTeams region={Yokohama} />
    </Container>
  );
};

export default Page;
