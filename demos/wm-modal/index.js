import '@webmarkets/wm-modal/dist/wm-modal.bundled.js'

const WmModal = document.querySelector('wm-modal');
const modalCloseBtn = document.querySelector('#modal-close__button');

WmModal ? WmModal.addEventListener('clicked-away', (event) => toggleEquipmentModal(event)) : null;
modalCloseBtn ? modalCloseBtn.addEventListener('click', (event) => toggleEquipmentModal(event)) : null;

function toggleEquipmentModal(event) {
     event.stopPropagation();
    WmModal.toggleAttribute('isopen');
    document.body.toggleAttribute('no-scroll');
}