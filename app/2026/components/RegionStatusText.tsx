"use client";

import { Typo } from "@solved-ac/ui-react";
import { RegionalStatus } from "../data/types";

interface Props {
  status: RegionalStatus;
}

const RegionStatusText = ({ status }: Props) => {
  if (status === RegionalStatus.preparing) {
    return <Typo description>Preparing preliminaries</Typo>;
  }
  if (status === RegionalStatus.preliminariesFinished) {
    return <span>Preliminaries finished</span>;
  }
  return <b>Concluded</b>;
};

export default RegionStatusText;
