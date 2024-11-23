import { combineRegions } from "./championship";
import { Hanoi } from "./hanoi/region";
import { Jakarta } from "./jakarta/region";
import { Seoul } from "./seoul/region";
import { Taichung } from "./taichung/region";
import { Yokohama } from "./yokohama/region";

import winnerInstitutions from "./winnerInstitutions.json";

const regions = [Taichung, Seoul, Jakarta, Yokohama, Hanoi];

export const mergedTeams = combineRegions(regions);

export const instutiteRequireValueMap = (() => {
  const ret = new Map<string, number>();
  const institutionOccurCountMap = new Map<string, number>();
  mergedTeams.forEach((team) => {
    const institution = team.institution;
    const count = institutionOccurCountMap.get(institution) || 0;
    if (count === 2) {
      ret.set(institution, team.assignedValue);
    }
    institutionOccurCountMap.set(institution, count + 1);
  });
  winnerInstitutions.forEach((institution) => {
    ret.set(institution, 0);
  });
  return ret;
})();
