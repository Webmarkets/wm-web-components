const WmModal = document.querySelector('wm-modal');
const modalCloseBtn = document.querySelector('#modal-close__button');
const modalOpenBtn = document.querySelector('#modal-open__button');

WmModal ? WmModal.addEventListener('clicked-away', (event) => toggleEquipmentModal(event)) : null;
modalCloseBtn ? modalCloseBtn.addEventListener('click', (event) => toggleEquipmentModal(event)) : null;
modalOpenBtn ? modalOpenBtn.addEventListener('click', (event) => toggleEquipmentModal(event)) : null;


function toggleEquipmentModal(event) {
     event.stopPropagation();
    WmModal.toggleAttribute('isopen');
    // document.body.toggleAttribute('no-scroll');
}