import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("wm-carousel-2")
export class MyElement extends LitElement {
  static styles = css`
    :host {
      --item-margin: 10px;
      --item-offset: 0px;
      --item-width: 150px;
      max-width: 800px;
      display: flex;
      flex-direction: row;
      font: normal 14px/1.4 Helvetica, Arial, sans-serif;
      -webkit-tap-highlight-color: transparent;
    }

    .btn-next,
    .btn-prev {
      background: none;
      border: 0;
      color: black;
      cursor: pointer;
      font-size: 36px;
      outline: none;
    }

    .hidden {
      visibility: hidden;
    }

    #contents {
      display: flex;
      flex: 1;
      overflow: hidden;
      position: relative;
    }

    #contents::after {
      background: linear-gradient(
        to right,
        #fff 0%,
        transparent 3%,
        transparent 97%,
        #fff 100%
      );
      content: "";
      position: absolute;
      height: 100%;
      width: 100%;
    }

    article {
      box-shadow: 0 0 0 1px rgba(63, 63, 68, 0.05),
        0 1px 3px 0 rgba(63, 63, 68, 0.15);
      box-sizing: border-box;
      flex-shrink: 0;
      margin: var(--item-margin);
      padding: 10px;
      /* width + left and right margins */
      transform: translateX(calc(-1 * var(--item-offset)));
      transition: transform 300ms;
      width: var(--item-width);
    }

    :host([looping]) article {
      transition: none;
    }
  `;

  /**
   * The items.
   * @type {Array}
   */
  @property({ type: Array })
  items = [
    {
      title: "1. Integer in velit at nisi varius dapibus",
      contents: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      title: "2. Aliquam nec est condimentum orci tempus dapibus at ut sapien",
      contents: "Vivamus ut orci eget nibh luctus scelerisque",
    },
    {
      title:
        "3. Vivamus porttitor neque in justo rutrum, sed porttitor risus bibendum",
      contents: "Curabitur id metus id lectus egestas euismod",
    },
    {
      title: "4. Pellentesque tincidunt tellus vel auctor vestibulum",
      contents:
        "Phasellus bibendum, nulla convallis malesuada posuere, nisi nisi convallis est, ac ultricies mauris tortor nec magna",
    },
    {
      title: "5. Donec sit amet lorem sed justo luctus bibendum",
      contents: "Maecenas vulputate nunc a elementum porta",
    },
    {
      title: "6. Cras eget purus non ligula finibus egestas quis vel orci",
      contents: "Donec malesuada nunc orci, finibus iaculis est volutpat in",
    },
  ];

  /**
   * Flag whether the carousel can loop or not.
   * @type {boolean}
   */
  @property({ type: Boolean })
  looping = false;

  /**
   * The item offset (position in the container).
   * @type {number}
   */
  @state()
  _offset = 0;

  @state()
  _firstIndex = 0;

  connectedCallback() {
    super.connectedCallback();

    window.addEventListener("resize", this._initiateContainers);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    window.removeEventListener("resize", this._initiateContainers);
  }

  render() {
    return html`
      <button class="btn-prev" @click=${() => this._move("left")}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path fill="none" d="M0 0h24v24H0V0z" />
          <path d="M15.61 7.41L14.2 6l-6 6 6 6 1.41-1.41L11.03 12l4.58-4.59z" />
        </svg>
      </button>
      <div id="contents">
        ${this.items.map(
          ({ contents, title }) => html`
            <article>
              <h3>${title}</h3>
              <p>${contents}</p>
            </article>
          `
        )}
      </div>
      <button class="btn-next" @click=${() => this._move("right")}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path fill="none" d="M0 0h24v24H0V0z" />
          <path d="M10.02 6L8.61 7.41 13.19 12l-4.58 4.59L10.02 18l6-6-6-6z" />
        </svg>
      </button>
    `;
  }

  _initiateContainers() {}

  /**
   * Moves the items to the specified direction.
   * @param {string} direction The movement direction.
   */
  _move(direction) {
    const container = this.shadowRoot!.getElementById("contents");
    const styles = getComputedStyle(this);
    const itemMargin = parseFloat(styles.getPropertyValue("--item-margin"));
    const itemWidth = parseFloat(styles.getPropertyValue("--item-width"));
    const itemTotalWidth = itemWidth + 2 * itemMargin;

    if (this.looping) {
      const items = container!.querySelectorAll("article");
      const lastIndex = items.length - 1;

      if (direction === "left") {
        this._firstIndex =
          this._firstIndex === 0 ? lastIndex : this._firstIndex - 1;
      } else {
        this._firstIndex =
          this._firstIndex === lastIndex ? 0 : this._firstIndex + 1;
      }

      // Move items from this._firstIndex to the lastIndex left.
      for (let i = this._firstIndex; i < items.length; i++) {
        items[i].style.transform = `translateX(-${
          itemTotalWidth * this._firstIndex
        }px)`;
      }

      // Move the rest of the items right.
      for (let i = 0; i < this._firstIndex; i++) {
        items[i].style.transform = `translateX(${
          itemTotalWidth * (items.length - this._firstIndex)
        }px)`;
      }
    } else {
      const itemsTotalWidth = itemTotalWidth * this.items.length;
      const buffer = itemsTotalWidth - container!.clientWidth;

      if (direction === "left") {
        this._offset =
          this._offset - itemTotalWidth >= 0
            ? this._offset - itemTotalWidth
            : 0;
      } else {
        this._offset =
          this._offset + itemTotalWidth > buffer
            ? buffer
            : this._offset + itemTotalWidth;
      }
    }

    this.style.setProperty("--item-offset", `${this._offset}px`);

    console.log(this._offset);
  }
}

customElements.define("my-element", MyElement);
