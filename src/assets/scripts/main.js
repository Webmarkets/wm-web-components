const mobileMenuBtn = document.querySelector('#js-mobile-menu__button');
const mobileMenuElement = document.querySelector('mobile-menu');

mobileMenuBtn.addEventListener('click', toggleMenu);

function toggleMenu() {
    if (mobileMenuBtn.innerHTML === "menu") {
        mobileMenuBtn.innerHTML = "close";
    } else if (mobileMenuBtn.innerHTML === "close") {
        mobileMenuBtn.innerHTML = "menu";
    }
    mobileMenuElement.toggleAttribute('isOpen');
    document.body.toggleAttribute('no-scroll');
}

