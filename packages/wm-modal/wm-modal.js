var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from "lit";
import { customElement, property, query } from "lit/decorators.js";
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 *
 */
let WebmarketsModal = class WebmarketsModal extends LitElement {
    constructor() {
        super(...arguments);
        this.isOpen = false;
        this.popupeonce = false;
        this.autopopup = false;
        this.popupeveryvisit = false;
        this.popupdelay = 5000;
        this._handleClickedAway = (e) => {
            // if the modal is open do nothing
            if (!this.isOpen) {
                return;
            }
            // if the click is on the modal container do nothing
            if (e.composedPath().includes(this.modalContainer)) {
                // console.log('modal container clicked');
            }
            else {
                // if it's not on the tainer dispatch the event
                // console.log('window clicked');
                this._dispatchClickedAway();
            }
        };
    }
    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('load', this.autopopup ? (e) => this._autoPopupModal(e) : () => console.log('Not auto'));
        window.addEventListener('click', this._handleClickedAway);
        window.addEventListener("keydown", (e) => this._keyListener(e));
    }
    disconnectedCallback() {
        window.removeEventListener('load', this.autopopup ? (e) => this._autoPopupModal(e) : () => console.log('Not auto'));
        window.removeEventListener('click', this._handleClickedAway);
        window.removeEventListener("keydown", (e) => this._keyListener(e));
        super.disconnectedCallback();
    }
    _autoPopupModal(e) {
        e.stopPropagation();
        // if popupeonce attribute is enabled go through this function
        if (this.popupeonce) {
            let popupHasBeenLoaded = localStorage.getItem("popup-loaded");
            // if the popup-loaded localstorage item exists then we'll return
            if (popupHasBeenLoaded) {
                return;
            }
            // otherwise we'll open the popup
            else {
                // wait for however long the delay is
                setTimeout(() => { this.isOpen = true; }, this.popupdelay);
                // set a local storage item named popup-loaded
                localStorage.setItem("popup-loaded", 'true');
            }
        }
        // if popupeveryvisit attribute is enabled go through this function
        if (this.popupeveryvisit) {
            let popupHasBeenLoaded = sessionStorage.getItem("popup-loaded");
            // if the popup-loaded localstorage item exists then we'll return
            if (popupHasBeenLoaded) {
                return;
            }
            // otherwise we'll open the popup
            else {
                // wait for however long the delay is
                setTimeout(() => { this.isOpen = true; }, this.popupdelay);
                // set a local storage item named popup-loaded
                sessionStorage.setItem("popup-loaded", 'true');
            }
        }
        // if popupeveryvisit or popuponce aren't enabled then open the popup after whatever the delay is
        else {
            setTimeout(() => { this.isOpen = true; }, this.popupdelay);
        }
    }
    _dispatchClickedAway() {
        const options = {
            bubbles: true,
            composed: true,
        };
        this.dispatchEvent(new CustomEvent('clicked-away', options));
    }
    _keyListener(e) {
        // if they press the ESC key start recording
        if (e.key === "Escape") {
            // e.preventDefault();
            this.isOpen = false;
            document.body.toggleAttribute('no-scroll');
        }
    }
    render() {
        return html `${this.isOpen
            ? html `<slot></slot>`
            : ''}`;
    }
};
WebmarketsModal.styles = css `
    :host([isopen]) {
      z-index: 9998;
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.3);
    }
  `;
__decorate([
    property({ type: Boolean, reflect: true })
], WebmarketsModal.prototype, "isOpen", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], WebmarketsModal.prototype, "popupeonce", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], WebmarketsModal.prototype, "autopopup", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], WebmarketsModal.prototype, "popupeveryvisit", void 0);
__decorate([
    property({ type: Number, reflect: true })
], WebmarketsModal.prototype, "popupdelay", void 0);
__decorate([
    query('#modal__container')
], WebmarketsModal.prototype, "modalContainer", void 0);
WebmarketsModal = __decorate([
    customElement("wm-modal")
], WebmarketsModal);
export { WebmarketsModal };
//# sourceMappingURL=wm-modal.js.map