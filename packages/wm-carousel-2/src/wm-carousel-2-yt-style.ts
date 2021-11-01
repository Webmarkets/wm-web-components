import { html, css, LitElement } from "lit";
import { customElement, state, query } from "lit/decorators.js";

@customElement("wm-carousel-2")
export class MyElement extends LitElement {
  static styles = css`
    #wrapper {
      margin: 0 auto;
      width: 100%;
      max-width: 800px;
      position: relative;
    }

    #carousel {
      overflow: auto;
      scroll-behavior: smooth;
      scrollbar-width: none;
    }

    #carousel::-webkit-scrollbar {
      height: 0;
    }

    #prev,
    #next {
      display: flex;
      justify-content: center;
      align-content: center;
      background: white;
      border: none;
      padding: 8px;
      border-radius: 50%;
      outline: 0;
      cursor: pointer;
      position: absolute;
    }

    #prev {
      top: 50%;
      left: 0;
      transform: translate(50%, -50%);
      display: none;
    }

    #next {
      top: 50%;
      right: 0;
      transform: translate(-50%, -50%);
    }

    #content {
      display: grid;
      grid-gap: 16px;
      grid-auto-flow: column;
      margin: auto;
      box-sizing: border-box;
    }

    blockquote {
      width: 300px;
      height: 100px;
      padding: 1rem;
      border: 2px solid black;
    }
  `;

  @query("#carousel")
  _carousel!: HTMLDivElement;

  @query("#content")
  _content!: HTMLSlotElement;

  @query("#prev")
  _prev!: HTMLButtonElement;

  @query("#content")
  _next!: HTMLButtonElement;

  @state()
  _carouselWidth: any;

  @state()
  _gap = 16;

  // connectedCallback() {
  //   super.connectedCallback();

  //   window.addEventListener('resize', this._init);
  // }

  // disconnectedCallback() {
  //   super.disconnectedCallback();

  //   window.removeEventListener('resize',this._init);
  // }

  firstUpdated() {
    this._carouselWidth = this._carousel.offsetWidth;
  }

  render() {
    return html`
      <div id="wrapper">
        <div id="carousel">
          <div id="content">
            <blockquote>
              <p>Words can be like X-rays, if you use them properly—they’ll go through anything. You read and you’re pierced.</p>
            </blockquote>
            <blockquote>
              <p>Words can be like X-rays, if you use them properly—they’ll go through anything. You read and you’re pierced.</p>
            </blockquote>
            <blockquote>
              <p>Words can be like X-rays, if you use them properly—they’ll go through anything. You read and you’re pierced.</p>
            </blockquote>
            <blockquote>
              <p>Words can be like X-rays, if you use them properly—they’ll go through anything. You read and you’re pierced.</p>
            </blockquote>
          </div>
        </div>
        <button id="prev" @click=${this.scrollPrevious}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path fill="none" d="M0 0h24v24H0V0z" />
            <path
              d="M15.61 7.41L14.2 6l-6 6 6 6 1.41-1.41L11.03 12l4.58-4.59z"
            />
          </svg>
        </button>
        <button id="next" @click=${this.scrollNext}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path fill="none" d="M0 0h24v24H0V0z" />
            <path
              d="M10.02 6L8.61 7.41 13.19 12l-4.58 4.59L10.02 18l6-6-6-6z"
            />
          </svg>
        </button>
      </div>
    `;
  }

  public scrollNext() {
    this._carousel.scrollBy(this._carouselWidth + this._gap, 0);
    if (this._carousel.scrollWidth !== 0) {
      this._prev.style.display = "flex";
    }
    if (
      this._content.scrollWidth - this._carouselWidth - this._gap <=
      this._carousel.scrollLeft + this._carouselWidth
    ) {
      this._next.style.display = "none";
    }
  }

  public scrollPrevious() {
    this._carousel.scrollBy(-(this._carouselWidth + this._gap), 0);
    if (this._carousel.scrollLeft - this._carouselWidth - this._gap <= 0) {
      this._prev.style.display = "none";
    }
    if (
      !this._content.scrollWidth - this._carouselWidth - this._gap <=
      this._carousel.scrollLeft + this._carouselWidth
    ) {
      this._next.style.display = "flex";
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "wm-carousel-2": MyElement;
  }
}
