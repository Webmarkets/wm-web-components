import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import ididBadgeAvifWide from "./idid-badge-wide.avif?url";
import ididBadgeWebpWide from "./idid-badge-wide.webp?url";
import ididBadgePngWide from "./idid-badge-wide.png?url";

import ididBadgeAvif from "./idid-badge.avif?url";
import ididBadgeWebp from "./idid-badge.webp?url";
import ididBadgePng from "./idid-badge.png?url";
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement("wm-idid-badge")
export class MyElement extends LitElement {
  static styles = css`
    :host {
      margin: 0 auto;
      display: flex;
      flex-direction: row;
      justify-content: center;
      max-width: 1200px;
    }
    img {
      max-width: 1200px;
      width: 100%;
      height: auto;
    }
  `;

  /**
   * The name to say "Hello" to.
   */
  @property()
  name = "World";

  /**
   * The number of times the button has been clicked.
   */
  @property({ type: Number })
  count = 0;

  render() {
    return html`
      <a
        href="https://independentdocsid.com/"
        rel="noopener noreferrer"
        target="_blank"
      >
        <picture>
          <source
            media="(min-width: 900px)"
            srcset="${ididBadgeAvifWide}"
            type="image/avif"
          />
          <source
            media="(min-width: 900px)"
            srcset="${ididBadgeWebpWide}"
            type="image/webp"
          />
          <source
            media="(min-width: 900px)"
            srcset="${ididBadgePngWide}"
            type="image/png"
          />
          <source srcset="${ididBadgeAvif}" type="image/avif" />
          <source srcset="${ididBadgeWebp}" type="image/webp" />
          <img
            src="${ididBadgePng}"
            alt="Independent Doctors of Idaho Badge"
            width="500"
            height="600"
          />
        </picture>
      </a>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "wm-idid-badge": MyElement;
  }
}
