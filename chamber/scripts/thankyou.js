document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const memberInfo = document.getElementById('memberInfo');
    
    memberInfo.innerHTML = `
        <p>Welcome, ${params.get('firstName')} ${params.get('lastName')}!</p>
        <p>Email: ${params.get('email')}</p>
        <p>Phone: ${params.get('phone')}</p>
        <p>Business: ${params.get('business')}</p>
        <p>Application Date: ${new Date(params.get('timestamp')).toLocaleDateString()}</p>
    `;
});