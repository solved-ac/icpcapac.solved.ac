"use client";

import { Typo } from "@solved-ac/ui-react";
import { RegionStatus } from "../data/types";

interface Props {
  status: RegionStatus;
}

const RegionStatusText = ({ status }: Props) => {
  if (status === RegionStatus.preparing) {
    return <Typo description>Preparing preliminaries</Typo>;
  }
  if (status === RegionStatus.preliminariesFinished) {
    return <span>Preliminaries finished</span>;
  }
  return <b>Concluded</b>;
};

export default RegionStatusText;
