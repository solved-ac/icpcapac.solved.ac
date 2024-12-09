// This should match the university name printed
// on the ICPC World Finals T-shirt.

const INSTITUTION_SHORT_NAMES: Record<string, string> = {
  "Bina Nusantara University": "BINUS",
  "Hanoi University of Science and Technology": "HUST",
  "Nanyang Technological University": "Nanyang TU",
  "National University of Singapore": "NUS",
  "National Tsing Hua University": "NTHU",
  "National Yang Ming Chiao Tung University": "NYCU",
  "Pohang University of Science and Technology": "POSTECH",
  "The University of Tokyo": "U Tokyo",
  "Tokyo Institute of Technology": "Tokyo Tech",
  "Universitas Indonesia": "UI",
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
