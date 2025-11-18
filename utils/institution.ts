import shortnames from "../app/data/institutions/_shortnames.json";

// This should match the university name printed
// on the ICPC World Finals T-shirt.

const INSTITUTION_SHORT_NAMES: Record<string, string> = {
  ...shortnames,
};

export const shortenInstitutionName = (institution: string) => {
  if (INSTITUTION_SHORT_NAMES[institution]) {
    return INSTITUTION_SHORT_NAMES[institution];
  }

  return institution
    .replace(/University of Engineering and Technology/, "UET")
    .replace(/Vietnam National University/, "VNU")
    .replace(/University/, "U")
    .replace(
      /([A-Z])[a-z]+ ([A-Z])[a-z]+ Institute of Science and Technology/,
      "$1$2IST"
    )
    .replace(/([A-Z])[a-z]+ Institute of Science and Technology/, "$1IST")
    .replace(/Institute of Technology/, "IT");
};
