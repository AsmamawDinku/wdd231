async function getMembers() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) throw new Error("Failed to fetch member data.");
    const data = await response.json();
    displayMembers(data.members);
  } catch (error) {
    console.error("Error loading member data:", error);
    document.getElementById("member-container").innerHTML = `<p class="error-message">Unable to load members. Try again later.</p>`;
  }
}

function displayMembers(members) {
  const container = document.getElementById("member-container");
  container.innerHTML = "";
  const isGrid = container.classList.contains("grid-view");

  members.forEach(member => {
    const element = isGrid ? createMemberCard(member) : createMemberListItem(member);
    container.appendChild(element);
  });
}

function createMemberCard(member) {
  const card = document.createElement("div");
  card.className = "member-card";
  const level = { 1: "Member", 2: "Silver", 3: "Gold" };

  card.innerHTML = `
    <img src="images/directory/${member.image}" alt="${member.name}" loading="lazy">
    <div class="member-info">
      <h3>${member.name} <span class="membership-badge membership-${member.membershipLevel}">${level[member.membershipLevel]}</span></h3>
      <p><a href="${member.mapLink}" target="_blank"><i class="fas fa-map-marker-alt"></i> ${member.address}</a></p>
      <p><i class="fas fa-phone"></i> ${member.phone}</p>
      <p><a href="${member.website}" target="_blank"><i class="fas fa-globe"></i> Visit Website</a></p>
      ${member.additionalInfo ? `<p class="additional-info"><i class="fas fa-info-circle"></i> ${member.additionalInfo}</p>` : ""}
    </div>`;
  return card;
}

function createMemberListItem(member) {
  const item = document.createElement("div");
  item.className = "member-list-item";
  const level = { 1: "Member", 2: "Silver", 3: "Gold" };

  item.innerHTML = `
    <img src="images/directory/${member.image}" alt="${member.name}" loading="lazy">
    <div class="list-item-primary">
      <h3>${member.name} <span class="membership-badge membership-${member.membershipLevel}">${level[member.membershipLevel]}</span></h3>
      <p><a href="${member.mapLink}" target="_blank"><i class="fas fa-map-marker-alt"></i> ${member.address}</a></p>
    </div>
    <div class="list-item-secondary">
      <p><i class="fas fa-phone"></i> ${member.phone}</p>
      <p><a href="${member.website}" target="_blank"><i class="fas fa-globe"></i> Website</a></p>
    </div>`;
  return item;
}

function setupViewToggle() {
  const gridViewBtn = document.getElementById("grid-view");
  const listViewBtn = document.getElementById("list-view");
  const container = document.getElementById("member-container");

  gridViewBtn.addEventListener("click", () => {
    gridViewBtn.classList.add("active");
    listViewBtn.classList.remove("active");
    container.classList.add("grid-view");
    container.classList.remove("list-view");
    getMembers();
  });

  listViewBtn.addEventListener("click", () => {
    listViewBtn.classList.add("active");
    gridViewBtn.classList.remove("active");
    container.classList.add("list-view");
    container.classList.remove("grid-view");
    getMembers();
  });
}

function initHamburgerMenu() {
  const hamburger = document.getElementById("hamburger");
  const nav = document.querySelector(".navigation");
  hamburger.addEventListener("click", () => {
    nav.classList.toggle("show");
    hamburger.textContent = nav.classList.contains("show") ? "✕" : "☰";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  getMembers();
  setupViewToggle();
  initHamburgerMenu();
});
