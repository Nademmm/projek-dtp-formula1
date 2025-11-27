const API_URL = "https://api.openf1.org/v1/drivers?session_key=latest";
let teams = {}; // simpan data tim global

async function loadConstructors() {
    const container = document.getElementById("constructors");

    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        const teamList = {};

        data.forEach(driver => {
            if (driver.team_name) {
                const teamColor = driver.team_colour 
                    ? `#${driver.team_colour}`
                    : "#444";

                if (!teamList[driver.team_name]) {
                    teamList[driver.team_name] = teamColor;
                }
            }
        });

        teams = teamList; // simpan global
        displayTeams(teamList);

    } catch (error) {
        container.innerHTML = `<p style="color:red;">Oh noo!! Failed to load constructor data!</p>`;
        console.error(error);
    }
}

// Fungsi tampilkan tim
function displayTeams(teamObj) {
    const container = document.getElementById("constructors");
    container.innerHTML = "";

    Object.entries(teamObj).forEach(([name, color]) => {
        const card = document.createElement("div");
        card.className = "card";

        card.style.background = color;
        card.style.color = "white";
        card.style.padding = "20px";
        card.style.borderRadius = "15px";
        card.style.fontWeight = "600";
        card.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
        card.style.position = "relative";
        card.style.marginBottom = "10px";

        card.innerHTML = `
            <div style="
                position:absolute;
                inset:0;
                background:rgba(0,0,0,0.25);
            "></div>

            <h3 style="
                position:relative;
                z-index:2;
            ">${name}</h3>
        `;

        container.appendChild(card);
    });
}

// SEARCH
document.getElementById("searchTeam").addEventListener("input", function() {
    const keyword = this.value.toLowerCase();

    // filter tim
    const filtered = Object.fromEntries(
        Object.entries(teams).filter(([name]) =>
            name.toLowerCase().includes(keyword)
        )
    );

    displayTeams(filtered);
});

loadConstructors();