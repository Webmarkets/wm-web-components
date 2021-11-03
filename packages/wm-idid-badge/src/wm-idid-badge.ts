import { html, css, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import ididBadgeAvif from './idid-badge.avif'
import ididBadgeWebp from './idid-badge.webp'
import ididBadgePng from './idid-badge.png'
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('wm-idid-badge')
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
      max-width: 100%;
      height: auto;
    }
  `

  /**
   * The name to say "Hello" to.
   */
  @property()
  name = 'World'

  /**
   * The number of times the button has been clicked.
   */
  @property({ type: Number })
  count = 0

  render() {
    return html`
    <a href="https://independentdocsid.com/" rel="noopener noreferrer" target="_blank">
      <picture>
        <source srcset="${ididBadgeAvif}" type="image/avif">
        <source srcset="${ididBadgeWebp}" type="image/webp">
        <img src="${ididBadgePng}" alt="Independent Doctors of Idaho Badge" width="1200" height="195">
      </picture>
      </a>
    `
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'wm-idid-badge': MyElement
  }
}
