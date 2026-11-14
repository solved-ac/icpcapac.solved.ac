import { Seoul as Seoul2026 } from "../../2026/seoul/region";
import { type Regional, RegionalStatus } from "../../types";
import {
  countTeamNames,
  countTeams,
  countUniversities,
  type RegionScoreArgs,
  regionScore,
} from "../regionScore";
import prelimsStandings from "./Korea2027NationalFirstStandings.json";
import domesticTeams from "./Seoul2027DomesticTeams.json";
import foreignTeams from "./Seoul2027ForeignTeams.json";

// `domesticTeams` is the list of 74 teams promoted from the First Round,
// from https://icpckorea.org/archives/3515/, with institution names as
// icpc.global spells them. `foreignTeams` is the 7 accepted foreign teams,
// from https://icpckorea.org/archives/0-2026-regional-foreign-invitation-result/.
// Together they match the 81 teams icpc.global lists as accepted.

const KOREA_REGION_SCORE: RegionScoreArgs = {
  univs: countUniversities(foreignTeams, domesticTeams),
  teams: countTeamNames(foreignTeams, domesticTeams),
  foreignTeams: countTeamNames(foreignTeams),
  teamsPrelim: countTeams(prelimsStandings),
  univsPrelim: countUniversities(prelimsStandings),
};

export const Seoul: Regional = {
  contestDate: "2026-11-14",
  site: "Seoul",
  region: "KOR",
  dates: { start: "2026-11-13", end: "2026-11-14" },
  location: "Goyang, Korea",
  venue: {
    name: "KINTEX Exhibition Center 2, 4th floor",
    address: "217-60 Kintex-ro, Ilsanseo-gu, Goyang-si, Gyeonggi-do, Korea",
  },
  icpcCode: "Seoul-2027",
  url: "https://icpckorea.org/2026-seoul/2026-regional/",
  status: RegionalStatus.preliminariesFinished,
  score: regionScore(KOREA_REGION_SCORE),
  scoreDetails: KOREA_REGION_SCORE,
  regionalTeams: [...foreignTeams, ...domesticTeams],
  lastYear: Seoul2026,
  disclaimer: (
    <>
      The regional was held on 14 November 2026; its standings are not yet
      published on icpc.global. The team list is converted from{" "}
      <a href="https://icpckorea.org/archives/3515/">
        https://icpckorea.org/archives/3515/
      </a>{" "}
      and{" "}
      <a href="https://icpckorea.org/archives/0-2026-regional-foreign-invitation-result/">
        https://icpckorea.org/archives/0-2026-regional-foreign-invitation-result/
      </a>
      .
    </>
  ),
};
