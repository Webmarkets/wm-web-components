import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

/**
 * An example element.
 *
 * @slot - This element has a slot
 */

export const tagName = 'wm-mobile-menu';

@customElement("wm-mobile-menu")
export class MobileMenu extends LitElement {

  @property({ type: Boolean, reflect: true }) isOpen = false;

  render() {
    return html`${this.isOpen
      ? html`<slot>
        </slot>`
      : null} `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "wm-mobile-menu": MobileMenu;
  }
}
