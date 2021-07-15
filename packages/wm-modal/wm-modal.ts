import { LitElement, html, css } from "lit";
import { customElement, property, query } from "lit/decorators.js";

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 * 
 */

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

  @property({ type: Boolean, reflect: true }) isOpen = false;

  @query('#modal__container')
  modalContainer!: HTMLDivElement;

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('click', this._handleClickedAway);
    window.addEventListener("keydown", (e: KeyboardEvent) =>
      this._keyListener(e)
    );
  }
  disconnectedCallback() {
    window.removeEventListener('click', this._handleClickedAway);
    window.removeEventListener("keydown", (e: KeyboardEvent) =>
      this._keyListener(e)
    );
    super.disconnectedCallback();
  }

  _handleClickedAway = (e: MouseEvent) => {
    // if the modal is open do nothing
    if (!this.isOpen) {
      return;
    }
    // if the click is on the modal container do nothing
    if (e.composedPath().includes(this.modalContainer)) {
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
      ? html`<div id="modal__container">
          <slot></slot>
        </div>`
      : ''}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "wm-modal": WebmarketsModal;
  }
}
