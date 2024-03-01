import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { expandMoreIcon } from './icons';
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('wm-expandable')
export class MyElement extends LitElement {
  static styles = css`
    .expanded-title__container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
    }
    .expanded-title__container button {
      margin-right: 0.5rem;
      padding: 0;
      background: none;
      font-size: inherit;
      border: none;
      cursor: pointer;
    }
    .expand-more__icon,
    [slot='icon'] {
      display: flex;
      transition: transform 0.3s ease-out;
    }
    :host([open]) .expand-more__icon,
    :host([open]) [slot='icon'] {
      transform: rotate(180deg);
    }
    .expanded-body__container {
      padding-top: 0;
      box-sizing: border-box;
      font-size: inherit;
      transition: 150ms all;
    }
    :host([open]) .expanded-body__container {
      padding-top: 1rem;
      display: block;
      transition: 150ms all;
    }
  `;

  /**
   * The name to say "Hello" to.
   */
  @property({ type: Boolean, reflect: true, attribute: 'open' })
  isOpen: boolean = false;
  @property({ type: String, reflect: true, attribute: 'id' })
  id: string = 'expandable-' + Math.floor(Math.random() * 1000000).toString();

  contentStyle: string = 'overflow: hidden; transition: 150ms all; height: ';

  firstUpdated() {
    this.ariaLabel = 'collapsed';
    const content = document.querySelector(`#${this.id}>.body__container`);
    content?.setAttribute('style', `${this.contentStyle}0px;`);
  }

  public toggleOpen() {
    const content = document.querySelector(`#${this.id}>.body__container`);
    if (this.isOpen) {
      this.ariaLabel = 'collapsed';
      content?.setAttribute('style', `${this.contentStyle}0px;`);
    } else {
      this.ariaLabel = 'expanded';
      content?.setAttribute('style', `${this.contentStyle}${content.scrollHeight}px;`);
    }
    this.isOpen = !this.isOpen;
  }

  render() {
    return html`
      <div class="expanded-title__container" @click=${this.toggleOpen}>
        <slot name="title">
          <button>Expand Me</button>
        </slot>
        <slot name="icon">
          <span class="expand-more__icon">${expandMoreIcon}</span>
        </slot>
      </div>
      <div class="expanded-body__container" id="content">
        <slot name="body">
          <p>I'm open!</p>
        </slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wm-expandable': MyElement;
  }
}
