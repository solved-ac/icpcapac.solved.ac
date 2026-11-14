import { Image } from "@chakra-ui/react";

/** ISO 3166-1 alpha-3, as the institution lists use, to alpha-2. */
const REGION_ALPHA2: Record<string, string> = {
  BRN: "BN",
  KHM: "KH",
  IDN: "ID",
  JPN: "JP",
  KOR: "KR",
  LAO: "LA",
  MMR: "MM",
  MYS: "MY",
  PHL: "PH",
  PNG: "PG",
  SGP: "SG",
  THA: "TH",
  TWN: "TW",
  VNM: "VN",

  // South Pacific
  AUS: "AU",
  NZL: "NZ",
};

const TWEMOJI_BASE =
  "https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/svg";

/** A flag emoji is its country code spelled in regional indicator letters,
 *  and Twemoji names the file after those code points. */
function flagAssetUrl(alpha2: string): string {
  const points = [...alpha2].map((c) =>
    (0x1f1e6 + c.charCodeAt(0) - 65).toString(16),
  );
  return `${TWEMOJI_BASE}/${points.join("-")}.svg`;
}

interface Props {
  /** Alpha-3 code. Anything else ("Unknown") is printed as it is. */
  region: string;
  flagOnly?: boolean;
}

/** A country as its flag and code. The flag is an image so it looks the same
 *  on every platform; Windows has no flag emoji at all. */
export function Region({ region, flagOnly }: Props) {
  const alpha2 = REGION_ALPHA2[region];
  if (!alpha2) return <>{region}</>;

  return (
    <>
      <Image
        src={flagAssetUrl(alpha2)}
        alt={flagOnly ? region : ""}
        display="inline-block"
        boxSize="1.2em"
        verticalAlign="-0.25em"
        draggable={false}
        loading="lazy"
      />
      {!flagOnly && <> {region}</>}
    </>
  );
}
