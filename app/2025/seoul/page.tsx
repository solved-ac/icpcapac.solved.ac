"use client";

import { Container } from "@solved-ac/ui-react";

import RegionHeader from "../components/RegionHeader";
import RegionTeams from "../components/RegionTeams";
import { Seoul } from "../data/seoul/region";

const Page = () => {
  return (
    <Container>
      <RegionHeader region={Seoul} />
      <RegionTeams region={Seoul} />
    </Container>
  );
};

export default Page;
