
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

// Initialize common elements
document.addEventListener('DOMContentLoaded', () => {
    updateFooterDates();
});