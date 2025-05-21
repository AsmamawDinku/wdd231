// Initialize Google Map
import { loadTestimonials } from './modal.js';
function initMap() {
    const headquarters = { lat: 38.9246, lng: -77.2203 }; // Coordinates for McLean, VA
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: headquarters,
    });
    new google.maps.Marker({
        position: headquarters,
        map: map,
        title: "Bank of Asmamaw Headquarters",
    });
}

// Expose to global scope for Google Maps callback
window.initMap = initMap;