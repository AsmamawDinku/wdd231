// Set timestamp when form loads
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('timestamp').value = new Date().toISOString();
    
    // Initialize membership cards with animation
    const cards = document.querySelectorAll('.benefit-card');
    cards.forEach((card, index) => {
        card.style.animation = `fadeIn 0.5s ease ${index * 0.2}s forwards`;
        card.style.opacity = 0;
    });
});

// Modal functionality
function openModal(level) {
    const modal = document.getElementById(`${level}-modal`);
    modal.style.display = 'block';
}

function closeModal(level) {
    document.getElementById(`${level}-modal`).style.display = 'none';
}

// Close modal when clicking outside content
window.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
});