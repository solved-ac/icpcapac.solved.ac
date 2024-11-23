"use client";

import Twemoji from "./Twemoji";

const REGION_EMOJI_MAP = {
  BRN: "🇧🇳",
  KHM: "🇰🇭",
  IDN: "🇮🇩",
  JPN: "🇯🇵",
  KOR: "🇰🇷",
  LAO: "🇱🇦",
  MMR: "🇲🇲",
  MYS: "🇲🇾",
  PHL: "🇵🇭",
  PNG: "🇵🇬",
  SGP: "🇸🇬",
  THA: "🇹🇭",
  TWN: "🇹🇼",
  VNM: "🇻🇳",

  // South Pacific
  AUS: "🇦🇺",
  NZL: "🇳🇿",
};

interface Props {
  region: string;
}

const Region = ({ region }: Props) => {
  if (region in REGION_EMOJI_MAP) {
    return (
      <>
        <Twemoji>
          {REGION_EMOJI_MAP[region as keyof typeof REGION_EMOJI_MAP]}
        </Twemoji>{" "}
        {region}
      </>
    );
  }

  return <>{region}</>;
};

export default Region;
