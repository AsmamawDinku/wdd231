document.addEventListener("DOMContentLoaded", () => {
    // Visit message logic
    const visitMessage = document.getElementById('visit-message');
    const lastVisit = localStorage.getItem('lastVisit');
    const now = Date.now();

    if (!lastVisit) {
        visitMessage.textContent = "Welcome! This is your first visit.";
    } else {
        const daysAgo = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
        visitMessage.textContent = `Welcome back! Your last visit was ${daysAgo} day(s) ago.`;
    }

    localStorage.setItem('lastVisit', now);

    // Load attractions
    fetch("data/discover.json")
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('attractions-container');
            data.attractions.forEach(attraction => {
                const card = document.createElement("div");
                card.classList.add("attraction-card");

                card.innerHTML = `
                    <img src="${attraction.image}" alt="${attraction.name}">
                    <div class="info">
                        <h3>${attraction.name}</h3>
                        <p>${attraction.description}</p>
                    </div>
                `;

                container.appendChild(card);
            });
        })
        .catch(error => {
            console.error("Error loading attractions:", error);
        });
});
