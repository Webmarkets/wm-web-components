import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */

@customElement("wm-mobile-menu")
export class MobileMenu extends LitElement {
  static styles = css`
    #mobile-menu__container {
      position: fixed;
      height: 105vh;
      width: 100%;
      z-index: 999;
      top: 0px;
      bottom: 0px;
      left: 0px;
      right: 0px;
      background: var(--theme-light-background, #ffffff);
      color: var(--theme-light-text-on-background, #000000);
    }
  `;

  @property({ type: Boolean, reflect: true }) isOpen = false;

  render() {
    return html`${this.isOpen
      ? html`<div id="mobile-menu__container">
          <slot name="mobile-menu"></slot>
        </div>`
      : null} `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "wm-mobile-menu": MobileMenu;
  }
}
