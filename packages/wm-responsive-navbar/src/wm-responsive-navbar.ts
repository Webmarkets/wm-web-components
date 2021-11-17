import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { menuIcon, closeIcon } from "./icons";

@customElement("wm-responsive-navbar")
export class WebmarketsResponsiveNavbar extends LitElement {
  static styles = css`
    :host([collapsed]) .nav {
      justify-content: initial;
    }
    :host([collapsed]) #menu-icon__button {
      padding: 1rem;
      display: flex;
      background-color: transparent;
      border: none;
      align-items: center;
      justify-content: center;
      margin-right: 0.5rem;
      color: inherit;
    }
    :host([collapsed]) .nav-links__container {
      width: 100%;
      height: calc(100vh - var(--navbar-height, 64px));
      display: none;
      background-color: var(--menu-background-color, #ffffff);
      position: absolute;
      top: var(--navbar-height, 64px);
      right: 0;
      bottom: 0;
      left: 0;
      overflow-y: auto;
      z-index: 9999;
    }
    :host([collapsed]) .nav-links__container--open {
      display: block;
    }

    header {
      width: 100%;
      height: var(--navbar-height, 64px);
      display: flex;
      background-color: var(--navbar-background-color, #ffffff);
      /* padding: 1rem; */
      align-items: center;
    }
    .navbar__container {
      width: 100%;
      height: 64px;
      display: flex;
      align-items: center;
    }
    .nav {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
    }
    .nav--align-right {
      justify-content: space-between;
    }
    .action-items__section {
      height: 100%;
      display: flex;
      align-self: flex-end;
      align-items: center;
      justify-content: center;
    }
    #menu-icon__button {
      display: none;
    }
  `;

  // TODO add property to make navbar stick on scroll up
  // @property({ type: Boolean, reflect: true, attribute: "sticky" })
  // sticky = false;

  @property({ type: Boolean, reflect: true, attribute: "menu-open" })
  menuOpen: boolean = false;

  @property({ type: String, reflect: true, attribute: "nav-align" })
  navAlign: string = "left";

  @property({ type: Boolean, reflect: true, attribute: "collapsed" })
  collapsed: boolean = false;

  @property({ type: Number, reflect: true, attribute: "breakpoint" })
  breakpoint = 475;

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("resize", () => this._handleResize());
  }

  disconnectedCallback() {
    window.removeEventListener("resize", () => this._handleResize());
    super.disconnectedCallback();
  }

  private _handleResize() {
    if (document.documentElement.clientWidth < this.breakpoint) {
      this.collapsed = true;
    } else {
      this.collapsed = false;
    }
  }

  firstUpdated() {
    this._init();
  }

  private _init() {
    // if the window is less than the breakpoint, collapse the navbar
    if (document.documentElement.clientWidth < this.breakpoint) {
      this.collapsed = true;
    }
  }

  render() {
    return html`<header>
      <div class="navbar__container">
        <nav class="nav ${this.navAlign === "right" ? "nav--align-right" : ""}">
          <button id="menu-icon__button" @click=${this._toggleMenu}>
            ${this.menuOpen
              ? html`<slot name="close-icon"><span>${closeIcon}</span></slot>`
              : html`<slot name="menu-icon"><span>${menuIcon}</span></slot>`}
          </button>
          <div class="logo__container">
            <slot name="logo"> </slot>
          </div>
          <div
            class="nav-links__container ${this.menuOpen
              ? "  nav-links__container--open"
              : ""}"
          >
            <slot name="nav-links"></slot>
          </div>
        </nav>
        <section class="action-items__section">
          <slot name="action-items"></slot>
        </section>
      </div>
    </header>`;
  }

  private _toggleMenu() {
    this.menuOpen = !this.menuOpen;
    document.body.toggleAttribute("no-scroll");
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "wm-responsive-navbar": WebmarketsResponsiveNavbar;
  }
}
