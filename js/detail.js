const driver = JSON.parse(localStorage.getItem("selectedDriver"));

    const container = document.getElementById("detailCard");

    if (!driver) {
        container.innerHTML = "<p>No data found!</p>";
    } else {
        container.innerHTML = `
        <img src="${driver.headshot_url || 'https://via.placeholder.com/400'}" alt="">
        <h2>${driver.full_name}</h2>
        <p><strong>Team </strong> ${driver.team_name || "-"}</p>
        <p>#${driver.driver_number || "-"}</p>
        <p>${driver.name_acronym || "-"}</p>

        <hr style="margin:15px 0;border-color:#444;">

        <p>
        ${driver.full_name} is a Formula 1 driver who competes 
        for the <strong>${driver.team_name || "Unknown"}</strong> team.
        He is known for driving car number <strong>${driver.driver_number || "-"}</strong>
        in the Formula 1 championship.
        </p>
        `;
    }