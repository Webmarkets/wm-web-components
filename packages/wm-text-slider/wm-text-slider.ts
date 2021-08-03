import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

/**
 * An element for setting a background video on a container
 *
 * @slot - This element has a slot
 * @csspart button - The button
 *
 */

@customElement("wm-text-slider")
export class WebmarketsTextSlider extends LitElement {
  static styles = css``;

  render() {
    return html``;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "wm-text-slider": WebmarketsTextSlider;
  }
}
