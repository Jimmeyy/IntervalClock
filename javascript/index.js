// Styles import
// import '../sass/main.scss';

// JS imports
import logic from './logic.js';
import mobileMenu from './mobileMenu';

if (document.body.classList.contains('app')) {
    logic();
}

mobileMenu();

