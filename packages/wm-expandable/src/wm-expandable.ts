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
    :host {
      gap: 0.5rem;
    }
    .expanded-title__container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      position: relative;
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
    [slot="icon"] {
      display: flex;
      transition: transform 0.3s ease-out;
    }
    :host([open]) .expand-more__icon,
    :host([open]) [slot="icon"] {
      transform: rotate(180deg);
    }
    .expanded-body__container {
      padding-top: 0;
      box-sizing: border-box;
      font-size: inherit;
      transition: 150ms all;
    }
    :host([open]) .expanded-body__container {
      display: block;
      transition: 150ms all;
    }
    .expanded-title__container::before {
      content: "";
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 0;
      height: 2px;
      background-color: #000;
      transition: width 500ms ease, left 500ms ease;
    }
    :host([open]) .expanded-title__container::before {
      width: 100%;
      left: 0;
    }
  `;

  /**
   * The name to say "Hello" to.
   */
  @property({ type: Boolean, reflect: true, attribute: "open" })
  isOpen: boolean = false;
  @property({ type: String, reflect: true, attribute: "id" })
  id: string = "expandable-" + Math.floor(Math.random() * 1000000).toString();

  contentStyle: string = "overflow: hidden; transition: 500ms all; height: ";
  oldContentHeight: string = "0";

  firstUpdated() {
    this.setHeight();
  }

  public toggleOpen() {
    this.isOpen = !this.isOpen;
    const heightDelta = this.setHeight();

    this.dispatchEvent(
      new CustomEvent("expanding", {
        bubbles: true,
        detail: heightDelta,
      })
    );
  }

  private setHeight(childHeightDelta?: number): number {
    const content = document.querySelector(`#${this.id}>.body__container`);
    let height = this.isOpen ? (content?.scrollHeight as number) : 0;
    let oldHeight = Number.parseInt(this.oldContentHeight);

    if (childHeightDelta !== undefined) {
      height = oldHeight + childHeightDelta;
    }

    this.oldContentHeight = height.toString();
    this.ariaLabel = this.isOpen ? "collapsed" : "expanded";
    content?.setAttribute("style", `${this.contentStyle}${height}px`);

    return height - oldHeight;
  }

  private closeSiblings() {
    let parentNode = this.parentElement;
    let currentNode = parentNode?.firstChild as MyElement;

    while (currentNode) {
      if (
        currentNode !== this &&
        currentNode.nodeName.toLowerCase() === "wm-expandable" &&
        currentNode.isOpen
      ) {
        currentNode.toggleOpen();
      }
      currentNode = currentNode.nextSibling as MyElement;
    }
  }

  private handleClick() {
    this.toggleOpen();

    if (this.isOpen) {
      this.closeSiblings();
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("expanding", (e: Event) => {
      if (e.target !== this) {
        const event = e as CustomEvent;
        this.setHeight(event.detail);
      }
    });
  }

  render() {
    return html`
      <div class="expanded-title__container" @click=${this.handleClick}>
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
    "wm-expandable": MyElement;
  }
}
