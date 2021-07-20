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
        window.addEventListener('click', this._handleClickedAway);
        window.addEventListener("keydown", (e) => this._keyListener(e));
    }
    disconnectedCallback() {
        window.removeEventListener('click', this._handleClickedAway);
        window.removeEventListener("keydown", (e) => this._keyListener(e));
        super.disconnectedCallback();
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
            ? html `<div id="modal__container">
          <slot></slot>
        </div>`
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
    #modal__container {
      width: 60%;
      height: 50%;
      display: flex;
      z-index: 9999;
      position: absolute;
      top: 50%;
      left: 50%;
      min-height: 100px;
      padding: 15px;
      border-radius: 10px;
      transform: translate(-50%, -50%);
      background: #fff;
      overflow: auto;
    }
    @media only screen and (max-width: 905px) {
      #modal__container {
        width: 80%;
        height: 60%;
      }
    }
  `;
__decorate([
    property({ type: Boolean, reflect: true })
], WebmarketsModal.prototype, "isOpen", void 0);
__decorate([
    query('#modal__container')
], WebmarketsModal.prototype, "modalContainer", void 0);
WebmarketsModal = __decorate([
    customElement("wm-modal")
], WebmarketsModal);
export { WebmarketsModal };
//# sourceMappingURL=wm-modal.js.map