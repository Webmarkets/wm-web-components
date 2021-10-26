import { LitElement, html, css } from "lit";
import { customElement, property, query } from "lit/decorators.js";

export const tagName = "wm-modal";

@customElement("wm-modal")
export class WebmarketsModal extends LitElement {
  static styles = css`
    :host() {
      display: none;
    }
    #modal__slot {
      display: none;
    }
    :host([open])   {
      display: block;
      z-index: 9998;
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.3);
    }
    :host([open]) #modal__slot {
      display: block;
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

  @property({ type: Boolean, reflect: true, attribute: "open" })
  open = false;
  @property({ type: Boolean, reflect: true, attribute: "popup-once" })
  popupOnce = false;
  @property({ type: Boolean, reflect: true, attribute: "auto-popup" })
  autoPopup = false;
  @property({ type: Boolean, reflect: true, attribute: "popup-every-visit" })
  popupEveryVisit = false;
  @property({ type: Number, reflect: true, attribute: "popup-delay" })
  popupDelay = 5000;

  @query("#modal__slot")
  modalSlot!: HTMLDivElement;

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener(
      "load",
      this.autoPopup
        ? (e) => this._autoPopupModal(e)
        : () => console.log("Not auto")
    );
    window.addEventListener("click", this._handleClickedAway);
    window.addEventListener("keydown", (e: KeyboardEvent) =>
      this._keyListener(e)
    );
  }
  disconnectedCallback() {
    window.removeEventListener(
      "load",
      this.autoPopup
        ? (e) => this._autoPopupModal(e)
        : () => console.log("Not auto")
    );
    // window.removeEventListener("click", this._handleClickedAway);
    window.removeEventListener("keydown", (e: KeyboardEvent) =>
      this._keyListener(e)
    );
    super.disconnectedCallback();
  }

  private _autoPopupModal(e: Event) {
    e.stopPropagation();
    // if popuponce attribute is enabled go through this function
    if (this.popupOnce) {
      let popupHasBeenLoaded = localStorage.getItem("popup-loaded");
      // if the popup-loaded localstorage item exists then we'll return
      if (popupHasBeenLoaded) {
        return;
      }
      // otherwise we'll open the popup
      else {
        // wait for however long the delay is
        setTimeout(() => {
          this.open = true;
        }, this.popupDelay);
        // set a local storage item named popup-loaded
        localStorage.setItem("popup-loaded", "true");
      }
    }
    // if popupeveryvisit attribute is enabled go through this function
    if (this.popupEveryVisit) {
      let popupHasBeenLoaded = sessionStorage.getItem("popup-loaded");
      // if the popup-loaded localstorage item exists then we'll return
      if (popupHasBeenLoaded) {
        return;
      }
      // otherwise we'll open the popup
      else {
        // wait for however long the delay is
        setTimeout(() => {
          this.open = true;
        }, this.popupDelay);
        // set a local storage item named popup-loaded
        sessionStorage.setItem("popup-loaded", "true");
      }
    }
    // if popupeveryvisit or popuponce aren't enabled then open the popup after whatever the delay is
    else {
      setTimeout(() => {
        this.open = true;
      }, this.popupDelay);
    }
  }

  private _handleClickedAway = (e: MouseEvent) => {
    // if the modal is not open do nothing
    if (!this.open) {
      return;
    }
    // if the click is on the modal container do nothing
    if (e.composedPath().includes(this.modalSlot)) {
      // console.log('modal container clicked');
    } else {
      // if it's not on the tainer dispatch the event
      // console.log('window clicked');
      // this._dispatchClickedAway();
      this.toggleModal();
    }
  };

  /**
   * Toggle the open property of the modal
   */
  public toggleModal () {
    this.open = !this.open;
  }

  // _dispatchClickedAway() {
  //   const options = {
  //     bubbles: true,
  //     composed: true,
  //   };
  //   this.dispatchEvent(new CustomEvent("clicked-away", options));
  // }

  private _keyListener(e: KeyboardEvent) {
    // if they press the ESC key start recording
    if (e.key === "Escape") {
      // e.preventDefault();
      this.open = false;
      document.body.toggleAttribute("no-scroll");
      document.body.style.overflow = 'hidden';
    }
  }

  render() {
    return html`<slot name="modal" id="modal__slot">
      <div id="modal__container">
        <slot name="modal-contents">

        </slot>
      </div>
    </slot>`;
  }
}