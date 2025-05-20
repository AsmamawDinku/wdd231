const menuButton = document.getElementById('menu-button');
const primaryNav = document.getElementById('primary-nav');

menuButton.addEventListener('click', () => {
    primaryNav.classList.toggle('active');
    menuButton.setAttribute('aria-expanded', primaryNav.classList.contains('active'));
});