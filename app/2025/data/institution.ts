import institutions from "./institutions.json";

export type Institution = typeof institutions extends (infer T)[] ? T : never;

export const institutionRegionMap = new Map(
  institutions.map(({ institution, region }) => [institution, region])
);
