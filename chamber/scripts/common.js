// Common functions used across all pages

// Update copyright year and last modified date
function updateFooterDates() {
    const copyrightYear = document.getElementById('copyright-year');
    const lastModified = document.getElementById('last-modified');
    
    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }
    
    if (lastModified) {
        lastModified.textContent = document.lastModified;
    }
}

// Initialize hamburger menu
function initHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navigation = document.querySelector('.navigation');
    
    if (hamburger && navigation) {
        hamburger.addEventListener('click', () => {
            navigation.classList.toggle('show');
            hamburger.textContent = navigation.classList.contains('show') ? '✕' : '☰';
        });
    }
}

// Initialize common elements
document.addEventListener('DOMContentLoaded', () => {
    updateFooterDates();
    initHamburgerMenu();
});