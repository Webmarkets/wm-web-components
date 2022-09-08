import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { nextIcon, lastIcon } from './icons';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('my-element')
export class MyElement extends LitElement {
  /**
   * Copy for the read the docs hint.
   */
  @property()
  docsHint = 'Click on the Vite and Lit logos to learn more';

  /**
   * The number of times the button has been clicked.
   */
  @property({ type: Number })
  count = 0;

  render() {
    return html`
      <div class="glide">
        <div class="glide__track" data-glide-el="track">
          <ul class="glide__slides">
            <slot name="slides"></slot>
            <li class="glide__slide"></li>
          </ul>
        </div>

        <div class="glide__arrows" data-glide-el="controls">
          <slot name="prev-btn"><button data-glide-dir="<" style=${this._noControls ? 'display: none;' : ''} class="prev-btn glide__arrow glide__arrow--left">${lastIcon}</button></slot>
          <slot name="next-btn"><button data-glide-dir=">" style=${this._noControls ? 'display: none;' : ''} class="next-btn glide__arrow glide__arrow--right">${nextIcon}</button></slot>
        </div>
      </div>
    `;
  }

  static styles = css``;
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement;
  }
}
