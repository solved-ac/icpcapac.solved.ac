"use client"

import { Card, Container } from "@solved-ac/ui-react";
import { Regional } from "../data/types";
import RegionHeader from "./RegionHeader";
import RegionTeams from "./RegionTeams";

const RegionPage = (regional: Regional) => {
  const Page = () => {
    return (
      <Container>
        <RegionHeader region={regional} />
        {regional.disclaimer ? (
          <Card>
            <b>{regional.site}</b>: {regional.disclaimer}
          </Card>
        ) : null}
        <RegionTeams region={regional} />
      </Container>
    );
  };
  return Page;
};

export default RegionPage;
