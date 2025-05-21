// Set timestamp when page loads
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('timestamp').value = new Date().toISOString();
});

// Modal functions
function openModal(level) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
            <h3>${level.charAt(0).toUpperCase() + level.slice(1)} Membership Benefits</h3>
            <ul>
                ${getBenefits(level).map(b => `<li>${b}</li>`).join('')}
            </ul>
        </div>
    `;
    document.body.appendChild(modal);
}

function getBenefits(level) {
    const benefits = {
        np: [
            'Free directory listing',
            'Member networking events',
            'Monthly newsletter',
            'Workshop discounts'
        ],
        bronze: [
            'All Non-Profit benefits',
            'Enhanced directory listing',
            '2 free event tickets',
            '10% advertising discount'
        ],
        silver: [
            'All Bronze benefits',
            'Logo in directory',
            '4 free event tickets',
            '15% advertising discount',
            'Business mentoring'
        ],
        gold: [
            'All Silver benefits',
            'Premium directory placement',
            'Unlimited event tickets',
            '25% advertising discount',
            'VIP gala access',
            'Newsletter feature'
        ]
    };
    return benefits[level] || [];
}