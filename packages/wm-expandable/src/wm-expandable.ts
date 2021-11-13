import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { expandMoreIcon } from "./icons";
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement("wm-expandable")
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
    .expand-more__icon {
      display: flex;
      transition: transform .3s ease-out;
    }
    :host([open]) .expand-more__icon {
      transform: rotate(180deg);
    }
    .expanded-body__container {
      padding-top: 1rem;
      display: none;
      font-size: inherit;
    }
    :host([open]) .expanded-body__container {
      display: block;
    }
  `;

  /**
   * The name to say "Hello" to.
   */
  @property({ type: Boolean, reflect: true, attribute: "open" })
  isOpen: boolean = false;

  firstUpdated() {
    this.ariaLabel = 'collapsed'
  }

  public toggleOpen() {
    if(this.isOpen) {
      this.ariaLabel = 'collapsed'
    } else {
      this.ariaLabel = 'expanded'
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
      <div class="expanded-body__container">
        <slot name="body">
          <p>I'm open!</p>
        </slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "wm-expandable": MyElement;
  }
}
