async function getMembers() {
    try {
        const url = './data/members.json';
        console.log('Fetching from:', url);  // Debug log
        
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        
        const data = await response.json();
        displayMembers(data.members);
    } catch (error) {
        console.error('Full error:', {
            message: error.message,
            stack: error.stack,
            url: window.location.href
        });
    }
}

// Display members in grid or list view
function displayMembers(members) {
    const container = document.getElementById('member-container');
    container.innerHTML = '';
    
    const isGridView = container.classList.contains('grid-view');
    
    members.forEach(member => {
        if (isGridView) {
            container.appendChild(createMemberCard(member));
        } else {
            container.appendChild(createMemberListItem(member));
        }
    });
}

// Create a member card for grid view
function createMemberCard(member) {
    const card = document.createElement('div');
    card.className = 'member-card';
    
    const membershipLevels = ['Member', 'Silver', 'Gold'];
    
    card.innerHTML = `
        <img src="${member.image}" alt="${member.name}" loading="lazy">
        <div class="member-info">
            <h3>${member.name} <span class="membership-badge membership-${member.membershipLevel}">${membershipLevels[member.membershipLevel - 1]}</span></h3>
            <p><a href="${member.mapLink}" target="_blank" rel="noopener"><i class="fas fa-map-marker-alt"></i> ${member.address}</a></p>
            <p><i class="fas fa-phone"></i> ${member.phone}</p>
            <p><a href="${member.website}" target="_blank" rel="noopener"><i class="fas fa-globe"></i> Visit Website</a></p>
            ${member.additionalInfo ? `<p class="additional-info"><i class="fas fa-info-circle"></i> ${member.additionalInfo}</p>` : ''}
        </div>
    `;
    
    return card;
}

// Create a member list item for list view
function createMemberListItem(member) {
    const item = document.createElement('div');
    item.className = 'member-list-item';
    
    const membershipLevels = ['Member', 'Silver', 'Gold'];
    
    item.innerHTML = `
        <img src="images/directory/${member.image}" alt="${member.name}" loading="lazy">
        <div class="list-item-primary">
            <h3>${member.name} <span class="membership-badge membership-${member.membershipLevel}">${membershipLevels[member.membershipLevel - 1]}</span></h3>
            <p><a href="${member.mapLink}" target="_blank" rel="noopener"><i class="fas fa-map-marker-alt"></i> ${member.address}</a></p>
        </div>
        <div class="list-item-secondary">
            <p><i class="fas fa-phone"></i> ${member.phone}</p>
            <p><a href="${member.website}" target="_blank" rel="noopener"><i class="fas fa-globe"></i> Website</a></p>
        </div>
    `;
    
    return item;
}

// Toggle between grid and list view
function setupViewToggle() {
    const gridViewBtn = document.getElementById('grid-view');
    const listViewBtn = document.getElementById('list-view');
    const container = document.getElementById('member-container');
    
    gridViewBtn.addEventListener('click', () => {
        gridViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
        container.classList.remove('list-view');
        container.classList.add('grid-view');
        getMembers(); // Refresh the display
    });
    
    listViewBtn.addEventListener('click', () => {
        listViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
        container.classList.remove('grid-view');
        container.classList.add('list-view');
        getMembers(); // Refresh the display
    });
}

// Initialize hamburger menu
function initHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navigation = document.querySelector('.navigation');

    
    hamburger.addEventListener('click', () => {
        navigation.classList.toggle('show');
        hamburger.textContent = navigation.classList.contains('show') ? '✕' : '☰';
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    getMembers();
    setupViewToggle();
    initHamburgerMenu();
});