// Main JavaScript for the site
import { loadTestimonials } from './modal.js'; // Import the loadTestimonials function from modal.js

// Initialize Google Map
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

document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.main-nav');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
            }
        });
    });

    // Load testimonials on home page
    if (document.querySelector('.testimonial-slider')) {
        loadTestimonials();
    }

    // Store user preference for menu state in localStorage
    const menuState = localStorage.getItem('menuState');
    if (menuState === 'open') {
        hamburger.classList.add('active');
        nav.classList.add('active');
    }

    hamburger.addEventListener('click', () => {
        if (nav.classList.contains('active')) {
            localStorage.setItem('menuState', 'open');
        } else {
            localStorage.setItem('menuState', 'closed');
        }
    });

    // Add current year to footer
    const yearElement = document.querySelector('footer .footer-bottom p:first-child');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = yearElement.textContent.replace('2025', currentYear);
    }

    // Expose initMap to global scope for Google Maps callback
    window.initMap = initMap;
});