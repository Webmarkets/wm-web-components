// Mobile Menu
const mobileMenuBtn = document.querySelector('#js-mobile-menu__button');
const mobileMenuElement = document.querySelector('wm-mobile-menu');
const mobileMenuLinkExpand = document.querySelector('.header-nav__link--expand');

mobileMenuBtn.addEventListener('click', toggleMenu);
mobileMenuLinkExpand.addEventListener('click', (event) => toggleSecondaryNav(event));

function toggleMenu() {
    if (mobileMenuBtn.innerHTML === "menu") {
        mobileMenuBtn.innerHTML = "close";
    } else if (mobileMenuBtn.innerHTML === "close") {
        mobileMenuBtn.innerHTML = "menu";
    }
    mobileMenuElement.toggleAttribute('isOpen');
    document.body.toggleAttribute('no-scroll');
}

function toggleSecondaryNav(event) {
    if (event.target.nextElementSibling.classList.contains('header-nav-links__list--secondary--open')) {
        event.target.setAttribute('aria-expanded', 'false');
    } else {
        event.target.setAttribute('aria-expanded', 'true');
    }
    event.target.nextElementSibling.classList.toggle('header-nav-links__list--secondary--open')
}
