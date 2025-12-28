document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('mobile-menu-overlay');

    if (!hamburgerBtn || !mobileMenu || !overlay) return;

    const openMenu = () => {
        mobileMenu.classList.add('is-open');
        overlay.classList.add('is-active');
        document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
        mobileMenu.classList.remove('is-open');
        overlay.classList.remove('is-active');
        document.body.style.overflow = '';
    };

    const toggleMenu = () => {
        mobileMenu.classList.contains('is-open')
        ? closeMenu()
        : openMenu();
    };

    // Toggle with hamburger
    hamburgerBtn.addEventListener('click', toggleMenu);

    // Close when clicking overlay
    overlay.addEventListener('click', closeMenu);

    // Close when clicking any link inside the menu
    mobileMenu.addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
        closeMenu();
        }
    });
});
