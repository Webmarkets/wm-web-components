import { LitElement, html, css } from "lit";
import { customElement, property, query } from "lit/decorators.js";

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 * 
 */
 
export const tagName = 'wm-modal';

@customElement("wm-modal")
export class WebmarketsModal extends LitElement {
  static styles = css`
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

  @property({ type: Boolean, reflect: true }) isOpen = false;
  @property({type: Boolean, reflect: true }) popuponce = false;
  @property({type: Boolean, reflect: true }) autopopup = false;
  @property({type: Boolean, reflect: true }) popupeveryvisit = false;
  @property({type: Number, reflect: true }) popupdelay = 5000;


  @query('#modal__slot')
  modalSlot!: HTMLDivElement;

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('load', this.autopopup ? (e) => this._autoPopupModal(e) : () => console.log('Not auto'));
    window.addEventListener('click', this._handleClickedAway);
    window.addEventListener("keydown", (e: KeyboardEvent) =>
      this._keyListener(e)
    );
  }
  disconnectedCallback() {
    window.removeEventListener('load', this.autopopup ? (e) => this._autoPopupModal(e) : () => console.log('Not auto'));
    window.removeEventListener('click', this._handleClickedAway);
    window.removeEventListener("keydown", (e: KeyboardEvent) =>
      this._keyListener(e)
    );
    super.disconnectedCallback();
  }



  _autoPopupModal(e: Event) {
    e.stopPropagation();
    // if popuponce attribute is enabled go through this function
    if(this.popuponce) {
      let popupHasBeenLoaded = localStorage.getItem("popup-loaded");
      // if the popup-loaded localstorage item exists then we'll return
      if(popupHasBeenLoaded) {
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
    if(this.popupeveryvisit) {
      let popupHasBeenLoaded = sessionStorage.getItem("popup-loaded");
      // if the popup-loaded localstorage item exists then we'll return
      if(popupHasBeenLoaded) {
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

  _handleClickedAway = (e: MouseEvent) => {
    // if the modal is open do nothing
    if (!this.isOpen) {
      return;
    }
    // if the click is on the modal container do nothing
    if (e.composedPath().includes(this.modalSlot)) {
      // console.log('modal container clicked');
    } else {
      // if it's not on the tainer dispatch the event
      // console.log('window clicked');
      this._dispatchClickedAway();
    }
  };

  _dispatchClickedAway() {
    const options = {
      bubbles: true,
      composed: true,
    };
    this.dispatchEvent(new CustomEvent('clicked-away', options));
  }

  _keyListener(e: KeyboardEvent) {
    // if they press the ESC key start recording
    if (e.key === "Escape") {
      // e.preventDefault();
      this.isOpen = false;
      document.body.toggleAttribute('no-scroll');
    }
  }

  render() {
    return html`${this.isOpen
      ? html`<div>
        <slot id="modal__slot"></slot>
      </div>`
      : ''}`;
  }
}
