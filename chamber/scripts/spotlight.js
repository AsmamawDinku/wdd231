// scripts/spotlights.js - Virginia business data
async function fetchVirginiaBusinesses() {
    try {
        // Virginia Business Registry API (mock endpoint - replace with real VA API if available)
        const response = await fetch('https://api.virginia.gov/businesses?county=Fairfax&chamber_members=true');
        const data = await response.json();
        
        // Filter for Gold/Silver members in Virginia
        const vaMembers = data.businesses.filter(business => 
            (business.membershipLevel === "Gold" || business.membershipLevel === "Silver") &&
            business.state === "VA"
        );
        
        displayVirginiaSpotlights(vaMembers);
    } catch (error) {
        console.error("Error fetching VA businesses:", error);
        // Fallback to local JSON if API fails
        fetchLocalVirginiaData();
    }
}

function displayVirginiaSpotlights(businesses) {
    const container = document.getElementById("spotlight-container");
    container.innerHTML = "";
    
    // Get 2-3 random Virginia businesses
    const spotlights = businesses
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.min(3, businesses.length));
    
    spotlights.forEach(business => {
        container.innerHTML += `
            <div class="spotlight-card">
                <img src="${business.logo || 'images/va-business-default.webp'}" 
                     alt="${business.name}" loading="lazy">
                <h3>${business.name}</h3>
                <p><i class="fas fa-map-marker-alt"></i> ${business.city}, VA</p>
                <p><i class="fas fa-phone"></i> ${business.phone || 'N/A'}</p>
                <p>Membership: ${business.membershipLevel}</p>
                ${business.website ? `<a href="${business.website}" target="_blank">Visit Website</a>` : ''}
            </div>
        `;
    });
}

// Fallback to local VA data if API fails
async function fetchLocalVirginiaData() {
    const response = await fetch('data/virginia-businesses.json');
    const localData = await response.json();
    displayVirginiaSpotlights(localData.businesses);
}

// Initialize
fetchVirginiaBusinesses();