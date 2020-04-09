const mobileMenu = function () {
    function isMobile() {
        if (window.innerWidth < 1201) {
            return true;
        }
        return false;
    }

    if (isMobile()) {
        const menu = {
            main: document.querySelector('.side-menu-js'),
            openBtn: document.querySelector('.side-menu-open-js'),
            closeBtn: document.querySelector('.side-menu-close-js')
        }

        function handleSideMenuToggle() {
            menu.main.classList.toggle('is-active');
        }

        menu.openBtn.addEventListener('click', handleSideMenuToggle);
        menu.closeBtn.addEventListener('click', handleSideMenuToggle);
    }
}

export default mobileMenu();