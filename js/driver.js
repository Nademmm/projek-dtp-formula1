const API_URL = "https://api.openf1.org/v1/drivers?session_key=latest";
const container = document.querySelector(".driver-grid");
let teamGroups = {}; 

async function loadDrivers() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        const grouped = {};

        data.forEach(driver => {
            if (!grouped[driver.team_name]) {
                grouped[driver.team_name] = [];
            }
            grouped[driver.team_name].push(driver);
        });

        teamGroups = grouped;
        displayDrivers(grouped);

    } catch (err) {
        console.error(err);
        container.innerHTML = `<p style="color:red;">Oh noo!! Failed to load drivers</p>`;
    }
}

// FUNGSI TAMPIL DRIVER
function displayDrivers(groups) {
    container.innerHTML = "";

    Object.values(groups).forEach(team => {
        const row = document.createElement("div");
        row.className = "team-row";

        team.slice(0, 2).forEach(driver => {
            const card = document.createElement("div");
            card.className = "driver";
            card.style.background = `#${driver.team_colour}`;

            card.innerHTML = `
                <div class="nama">
                    <h2>${driver.first_name}<br><strong>${driver.last_name}</strong></h2>
                    <p>${driver.team_name}</p>
                    <p>${driver.driver_number}</p>
                </div>
                <div class="img-driver">
                    <img src="${driver.headshot_url}" alt="">
                </div>
            `;

            card.onclick = () => {
                localStorage.setItem("selectedDriver", JSON.stringify(driver));
                window.location.href = "/driver/html/detail_driver.html";
            };

            row.appendChild(card);
        });

        container.appendChild(row);
    });
}

// fitur search
document.getElementById("searchDriver").addEventListener("input", function () {
    const keyword = this.value.toLowerCase();

    const filtered = {};

    Object.entries(teamGroups).forEach(([teamName, drivers]) => {
        const matchDrivers = drivers.filter(driver =>
            driver.first_name.toLowerCase().includes(keyword) ||
            driver.last_name.toLowerCase().includes(keyword) ||
            driver.team_name.toLowerCase().includes(keyword) ||
            String(driver.driver_number).includes(keyword)
        );

        if (matchDrivers.length > 0) {
            filtered[teamName] = matchDrivers;
        }
    });

    displayDrivers(filtered);
});

loadDrivers();
