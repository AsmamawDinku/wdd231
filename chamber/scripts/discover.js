document.addEventListener("DOMContentLoaded", () => {
  /* visit message */
  const msg = document.getElementById("visit-message");
  const now = Date.now();
  const last = Number(localStorage.getItem("lastVisit") || 0);

  if (!last) {
    msg.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const days = Math.floor((now - last) / 86_400_000);
    msg.textContent = days < 1
      ? "Back so soon! Awesome!"
      : `You last visited ${days} day${days === 1 ? "" : "s"} ago.`;
  }
  localStorage.setItem("lastVisit", now);

  /* attraction cards */
  fetch("data/discover.json")
    .then(r => r.json())
    .then(({attractions}) => {
      const container = document.getElementById("attractions-container");
      attractions.forEach(a => {
        container.insertAdjacentHTML("beforeend", `
          <article class="attraction-card">
            <img src="${a.image}" alt="${a.name}" width="300" height="200" loading="lazy">
            <div class="info">
              <h3>${a.name}</h3>
              <address>${a.address}</address>
              <p>${a.description}</p>
              <a class="learn-btn" href="${a.map}" target="_blank" rel="noopener">Learn More</a>
            </div>
          </article>
        `);
      });
    })
    .catch(err => console.error("Attractions load failed:", err));
});