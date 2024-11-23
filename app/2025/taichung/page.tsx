"use client";

import { Container } from "@solved-ac/ui-react";

import RegionHeader from "../components/RegionHeader";
import RegionTeams from "../components/RegionTeams";
import { Taichung } from "../data/taichung/region";

const Page = () => {
  return (
    <Container>
      <RegionHeader region={Taichung} />
      <RegionTeams region={Taichung} />
    </Container>
  );
};

export default Page;
