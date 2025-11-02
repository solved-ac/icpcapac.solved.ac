import AUS from "./AUS.json";
import IDN from "./IDN.json";
import JPN from "./JPN.json";
import KOR from "./KOR.json";
import MYS from "./MYS.json";
import PHL from "./PHL.json";
import SGP from "./SGP.json";
import THA from "./THA.json";
import TWN from "./TWN.json";
import VNM from "./VNM.json";

export const INSTITUTION_REGION_MAP = new Map([
  ...AUS.map((institution) => [institution, "AUS"] as const),
  ...IDN.map((institution) => [institution, "IDN"] as const),
  ...JPN.map((institution) => [institution, "JPN"] as const),
  ...KOR.map((institution) => [institution, "KOR"] as const),
  ...MYS.map((institution) => [institution, "MYS"] as const),
  ...PHL.map((institution) => [institution, "PHL"] as const),
  ...SGP.map((institution) => [institution, "SGP"] as const),
  ...THA.map((institution) => [institution, "THA"] as const),
  ...TWN.map((institution) => [institution, "TWN"] as const),
  ...VNM.map((institution) => [institution, "VNM"] as const),
]);

export const isVNMHighSchool = (institution: string) => {
  if (institution.match(/^HS(GS)? /)) return true;
  if (institution.match(/High School/i)) return true;
  return false;
};
