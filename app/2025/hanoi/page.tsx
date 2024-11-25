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
        <b>Hanoi:</b> 140 teams (120 Vietnamese teams + 20 foreign teams) from
        58 domestic universities and unknown count of foreign universities are
        expected:
        https://www.olp.vn/tin-t%E1%BB%A9c/olympic-icpc/th%C3%B4ng-b%C3%A1o; #
        foreign universities is calculated from the last year&lsquo;s number.
      </Card>
      <RegionTeams region={Hanoi} />
    </Container>
  );
};

export default Page;
