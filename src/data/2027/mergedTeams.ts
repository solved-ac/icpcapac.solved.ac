import { combineRegions } from "./championship";
import { Danang } from "./danang/region";
import { Jakarta } from "./jakarta/region";
import { MAX_TEAMS_PER_UNIVERSITY } from "./regionScoreboard";
import { Seoul } from "./seoul/region";
import winnerInstitutionsJson from "./winnerInstitutions.json";
import { Yokohama } from "./yokohama/region";
import { Yunlin } from "./yunlin/region";

const winnerInstitutions: string[] = winnerInstitutionsJson;

const regions = [Seoul, Jakarta, Yokohama, Danang, Yunlin];

export const mergedTeams = combineRegions(regions);

// For each institution, the value of the last team it can still send: a
// further team has to beat that value to take its place.
export const instutiteRequireValueMap = (() => {
  const ret = new Map<string, number>();
  const institutionOccurCountMap = new Map<string, number>();
  mergedTeams.forEach((team) => {
    const institution = team.institution;
    const count = institutionOccurCountMap.get(institution) || 0;
    if (count === MAX_TEAMS_PER_UNIVERSITY - 1) {
      ret.set(institution, team.assignedValue);
    }
    institutionOccurCountMap.set(institution, count + 1);
  });
  winnerInstitutions.forEach((institution) => {
    ret.set(institution, 0);
  });
  return ret;
})();
