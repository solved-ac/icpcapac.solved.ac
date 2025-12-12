// This script is to be pasted to the browser console on the Domjudge scoreboard
// VNOJ uses DMOJ so this can be extended to use at other DMOJ-based scoreboards

(() => {
  let teams = t;
  if (!t) {
    const jsonData = prompt("Paste the teams JSON here:");
    if (jsonData) {
      teams = JSON.parse(jsonData);
    }
    return;
  }

  const scoreboardTBody = document.querySelector("#ranking-table tbody");
  const rows = Array.from(scoreboardTBody.querySelectorAll("tr")).filter(
    (x) => x.id
  );

  const htmlToText = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.innerText || tempDiv.textContent || "";
  };

  // Generate data from the scoreboard rows
  const teamIdBase = Math.floor(Date.now() / 1000 / 86400 - 2e4) * 1000;
  const rankMap = new Map();
  const rowData = rows.map((row, i) => {
    const teamName = row.querySelector(".rating a").innerText.trim();
    const institution = htmlToText(
      row.querySelector("p.uni-name").innerHTML.trim()
    );
    const problemsSolved =
      +row.querySelector(".user-points").innerText.trim() || 0;
    const totalTime = +row.querySelector(".user-penalty").innerText.trim() || 0;

    const rankKey = `${problemsSolved}-${totalTime}`;
    const rank =
      +row.querySelector("td:first-child").innerText.trim() ||
      rankMap.get(rankKey);
    if (!rankMap.has(rankKey)) {
      rankMap.set(rankKey, rank);
    }

    return {
      teamId: i + teamIdBase,
      teamName,
      institution,
      problemsSolved,
      totalTime,
      rank,
    };
  });

  // Check if team names match and prepare final data
  const finalData = rowData.map((row) => {
    const matchedTeam = teams.filter(
      (team) => team.name.trim() === row.teamName.trim()
    );
    if (matchedTeam.length === 0) {
      console.warn(`No matching team found for: ${row.teamName}`);
    } else if (matchedTeam.length > 1) {
      console.warn(`Multiple matching teams found for: ${row.teamName}`);
    }

    const originalTeam = matchedTeam.length === 1 ? matchedTeam[0] : null;
    return {
      ...row,
      teamName: originalTeam ? originalTeam.name : row.teamName,
      institution: originalTeam ? originalTeam.institution : row.institution,
      teamId: originalTeam && originalTeam.id ? originalTeam.id : row.teamId,
    };
  });

  if (rowData.length !== finalData.length) {
    console.warn(
      "Mismatch in number of teams between scoreboard and provided data."
    );
  }

  console.log(finalData);
})();
