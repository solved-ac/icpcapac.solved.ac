"use client";

import { Container } from "@solved-ac/ui-react";

import RegionHeader from "../components/RegionHeader";
import RegionTeams from "../components/RegionTeams";
import { Jakarta } from "../data/jakarta/region";

const Page = () => {
  return (
    <Container>
      <RegionHeader region={Jakarta} />
      <RegionTeams region={Jakarta} />
    </Container>
  );
};

export default Page;
