"use client";

import { Card, Container } from "@solved-ac/ui-react";

import RegionHeader from "../components/RegionHeader";
import RegionTeams from "../components/RegionTeams";
import { Taichung } from "../data/taichung/region";
import { Jakarta } from "../data/jakarta/region";
import { Yokohama } from "../data/yokohama/region";

const Page = () => {
  return (
    <Container>
      <RegionHeader region={Yokohama} />
      <Card>
        <b>Yokohama:</b> Regional teams are not published yet, but calculated
        with the internal rules:
        https://icpc.iisf.or.jp/2024-yokohama/domestic/selectionrule/
      </Card>
      <RegionTeams region={Yokohama} />
    </Container>
  );
};

export default Page;
