import { LitElement, html, css } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { closeIcon } from "./icons";

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
    #scrim__container {
      display: none;
    }
    :host([open]) #scrim__container {
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
    #close-icon__span {
      position: absolute;
      top: 1rem;
      right: 1rem;
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
      padding: 1rem;
      border-radius: 0.5rem;
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
  @property({ type: Boolean, reflect: true, attribute: "hide-close-icon" })
  hideCloseIcon = false;
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
        ? () => this._autoPopupModal()
        : () => console.log("Not auto")
    );
    window.addEventListener("keydown", (e: KeyboardEvent) =>
      this._keyListener(e)
    );
  }
  disconnectedCallback() {
    window.removeEventListener(
      "load",
      this.autoPopup
        ? () => this._autoPopupModal()
        : () => console.log("Not auto")
    );
    window.removeEventListener("keydown", (e: KeyboardEvent) =>
      this._keyListener(e)
    );
    super.disconnectedCallback();
  }

  private _autoPopupModal() {
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
          this.openModal();
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
          this.openModal();
        }, this.popupDelay);
        // set a local storage item named popup-loaded
        sessionStorage.setItem("popup-loaded", "true");
      }
    }
    // if popupeveryvisit or popuponce aren't enabled then open the popup after whatever the delay is
    else {
      setTimeout(() => {
        this.openModal();
      }, this.popupDelay);
    }
  }

  private _handleScrimClick = (e: MouseEvent) => {
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
      this.closeModal();
    }
  };

  /**
   * Open the modal
   */
  public openModal() {
    this.open = true;
    document.body.style.overflow = "hidden";
  }

  /**
   * Close the modal
   */
  public closeModal() {
    this.open = false;
    document.body.style.overflow = "";
  }

  /**
   * Toggle the open property of the modal
   */
  // public toggleModal () {
  //   this.open = !this.open;
  // }

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
      this.closeModal();
      // document.body.toggleAttribute("no-scroll");
      document.body.style.overflow = "";
    }
  }

  render() {
    return html`<div id="scrim__container" @click=${this._handleScrimClick}>
      <slot name="modal" id="modal__slot">
        <div id="modal__container">
          ${this.hideCloseIcon
            ? ""
            : html`<slot name="close-icon" @click=${this.closeModal}
                ><span id="close-icon__span">${closeIcon}</span></slot
              >`}
          <slot name="modal-content"> </slot>
        </div>
      </slot>
    </div>`;
  }
}
