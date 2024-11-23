"use client";

import { Card, Container } from "@solved-ac/ui-react";

import RegionHeader from "../components/RegionHeader";
import RegionTeams from "../components/RegionTeams";
import { Seoul } from "../data/seoul/region";

const Page = () => {
  return (
    <Container>
      <RegionHeader region={Seoul} />
      <Card>
        <b>Seoul</b>: Scoreboard is not published yet in the ICPC system, but
        retrieved from:
        https://chzzk.naver.com/live/b943a0e94fd10781eebce86019cb6016
      </Card>
      <RegionTeams region={Seoul} />
    </Container>
  );
};

export default Page;
