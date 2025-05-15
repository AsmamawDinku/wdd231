document.addEventListener('DOMContentLoaded', async () => {
    // Visitor message functionality
    updateVisitorMessage();
    
    // Load attractions from JSON
    try {
        const response = await fetch('data/mclean-attractions.json');
        const data = await response.json();
        displayAttractions(data.attractions);
        
        // Enhance with local API data
        await enhanceWithLocalData(data.attractions);
    } catch (error) {
        console.error('Error loading attractions:', error);
    }
});

function updateVisitorMessage() {
    const lastVisit = localStorage.getItem('lastVisit');
    const now = Date.now();
    const visitorMessage = document.querySelector('.visitor-message');
    
    if (!lastVisit) {
        visitorMessage.textContent = "Welcome! Let us know if you have any questions about McLean.";
    } else {
        const days = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
        
        if (days < 1) {
            visitorMessage.textContent = "Back so soon! Awesome!";
        } else {
            visitorMessage.textContent = `You last visited ${days} day${days === 1 ? '' : 's'} ago.`;
        }
    }
    
    localStorage.setItem('lastVisit', now);
}

function displayAttractions(attractions) {
    const gallery = document.getElementById('attractions');
    
    attractions.forEach((attraction, index) => {
        const card = document.createElement('article');
        card.className = 'attraction-card';
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <figure>
                <img src="images/discover/${attraction.image}" 
                     alt="${attraction.name}" 
                     class="attraction-image" 
                     loading="lazy">
            </figure>
            <div class="attraction-content">
                <h2>${attraction.name}</h2>
                <address>${attraction.address}</address>
                <p>${attraction.description}</p>
                <a href="${attraction.apiData}" 
                   target="_blank" 
                   rel="noopener" 
                   class="learn-more-btn">
                    Learn More
                </a>
            </div>
        `;
        
        gallery.appendChild(card);
    });
}

async function enhanceWithLocalData(attractions) {
    try {
        // Example: Fetch Fairfax County park data (mock implementation)
        const responses = await Promise.all(
            attractions.map(attraction => 
                attraction.apiData 
                    ? fetchLocalApiData(attraction.apiData) 
                    : Promise.resolve(null)
            )
        );
        
        responses.forEach((data, index) => {
            if (data) {
                // Process API data to enhance attraction cards
                console.log(`Enhanced ${attractions[index].name} with API data`);
            }
        });
    } catch (error) {
        console.error('Error enhancing with local data:', error);
    }
}

// Mock function for local API integration
async function fetchLocalApiData(url) {
    // In a real implementation, this would fetch actual API data
    // For example, Fairfax County Parks API or Virginia tourism data
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                hours: "9AM-5PM",
                admission: "Free",
                updated: new Date().toISOString()
            });
        }, 300);
    });
}