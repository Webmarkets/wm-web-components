import { LitElement, css, html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";

@customElement("storage-size")
export class StorageSize extends LitElement {
  static styles = css`
    .size__container {
      width: 100%;
      display: grid;
      grid-template-rows: auto auto;
      grid-template-columns: 1fr 1fr;
      row-gap: 4rem;

      box-sizing: border-box;

      z-index: 2;
      position: relative;
      margin: 2rem 0;
      padding: 4rem;
      border-radius: 2rem;
    }
    .size-title__container {
      grid-column: 1/3;
    }
    .size__title,
    .size__subtitle {
      width: 100%;
      text-align: center;
      margin: 0;
    }
    .size__title {
      font-size: var(--font-size-xl);
    }
    .size__subtitle {
      font-size: var(--font-size-lg);
      font-weight: 400;
      font-style: italic;
    }
    .size-labels__container {
      width: 80%;
      place-self: center;

      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(7.5rem, 1fr));
      grid-auto-rows: 4rem;

      padding: 2rem;
      box-sizing: border-box;

      background-color: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(10px);
      border: solid #fff 0.5rem;
      border-radius: 16px;
    }
    .size-label {
      font-weight: 700;
      font-size: var(--font-size-base);
      margin: 0.5rem 1rem;
      border-radius: 64px;
      transition: all 0.2s;

      display: flex;
      align-items: center;
      justify-content: center;

      box-sizing: border-box;
    }
    .size-label:hover,
    .size-label--active {
      background-color: #fb7c35;
      box-shadow: -3px 4px 16px rgba(0, 0, 0, 0.3);
      cursor: pointer;
    }
    .size-label--more {
      grid-column: 1/-1;
      text-align: center;
    }
    .size-image__container {
      place-self: center;

      max-width: 90%;

      display: flex;
      align-items: center;
      justify-content: center;

      box-sizing: border-box;

      border: solid #fff 0.5rem;
      border-radius: 16px;

      background-color: #fff;

      opacity: 1;
      transition: opacity 0.5s;
    }
    .size-image__container--hidden {
      opacity: 0;
    }
    .size__main-image {
      max-height: 100%;
      max-width: 100%;
    }
    .size-bg__img {
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
    }
    .size-labels__arrows {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 1rem;
      padding-top: 1rem;
    }
    @media (max-width: 1400px) {
      .size__container {
        grid-template-columns: 100%;
        grid-template-rows: repeat(4, auto);
      }
      .size-title__container {
        grid-column: 1/2;
      }
      .size-labels__container {
        width: 90%;
        padding: 2rem;
      }
    }

    @media (max-width: 992px) {
      .size-labels__container {
        display: flex;
        flex-direction: column;
      }
      .size-labels__slice {
        display: grid;
        grid-template-rows: 50% 50%;
        grid-template-columns: 1fr 1fr;

        width: 100%;
        gap: 1rem;
      }
      .size-label {
        padding: 1rem 1rem;
        margin: 0;
      }
    }
  `;

  @property({ type: Array, attribute: "sizes" })
  sizes: any[] = [];

  @property({ type: String, attribute: "category" })
  category = "";

  @property({ type: String, attribute: "bg-image" })
  bgImage = "";
  
  @query(".size-labels__container")
  // @ts-ignore
  _sizeLabelContainer: HTMLDivElement;

  @state()
  _index = 0;

  @state()
  _sliceIndex = 0;

  @state()
  _viewMode = "desktop";

  @state()
  _isExpanded = false;

  firstUpdated() {
    const firstLabel: Function = () => this.renderRoot.querySelector("[data-index='0']");
    firstLabel().setAttribute("data-active", "true");
    firstLabel().classList.add("size-label--active");

    const getViewMode = () => {
      if (window.innerWidth < 992) {
        return "mobile";
      } else if (window.innerWidth < 1400) {
        return "tablet";
      } else {
        return "desktop";
      }
    };

    this._viewMode = getViewMode();

    window.addEventListener("resize", () => {
      this._viewMode = getViewMode();
    });
  }

  render() {
    const allSizeLabels = this.sizes.map(({ size }, index) => {
      return html` <span class="size-label" data-index=${index} @click="${(e: any) => this._switchIndex(e.target)}">${size}</span> `;
    });
    let sizeLabels = allSizeLabels;

    if (this._viewMode === "tablet" && !this._isExpanded) {
      sizeLabels.length = 20;
    } else if (this._viewMode === "mobile") {
      //@ts-ignore
      sizeLabels = this._getMobileView(this._splitArray(allSizeLabels, 4))[this._sliceIndex];
    } else {
      sizeLabels = allSizeLabels;
    }

    return html`<div class="size__container">
      <div class="size-title__container">
        <h2 class="size__title">${this.category}</h2>
        <h3 class="size__subtitle">Storage unit sizes depend on location</h3>
      </div>
      <div class="size-labels__container">
        ${sizeLabels}
        ${this._viewMode === "mobile"
          ? html`
              <div class="size-labels__arrows">
                <span class="size-label size-labels__left" @click=${() => this._switchSliceIndex("left", Math.ceil(allSizeLabels.length / 4))}>
                  <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFF">
                    <rect fill="none" height="24" width="24" />
                    <path d="M9,19l1.41-1.41L5.83,13H22V11H5.83l4.59-4.59L9,5l-7,7L9,19z" />
                  </svg>
                </span>
                <span class="size-label size-labels__right" @click=${() => this._switchSliceIndex("right", Math.ceil(allSizeLabels.length / 4))}>
                  <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFF">
                    <rect fill="none" height="24" width="24" />
                    <path d="M15,5l-1.41,1.41L18.17,11H2V13h16.17l-4.59,4.59L15,19l7-7L15,5z" />
                  </svg>
                </span>
              </div>
            `
          : null}
        ${this._viewMode === "tablet" ? html` <span class="size-label size-label--more" @click="${this._toggleExpanded}">Show ${this._isExpanded ? "Less" : "More"}</span> ` : null}
      </div>
      <div class="size-image__container">
        <img class="size__main-image" src="${this.sizes[0].image}" />
      </div>
      <img class="size-bg__img" src="${this.bgImage}" />
    </div>`;
  }

  _splitArray(array: Array<any>, limit: number) {
    let amount = Math.ceil(array.length / limit);
    let parentArray = [];
    for (let i = 0; i < amount; i++) {
      parentArray.push(array.slice(i * limit, i * limit + limit));
    }
    return parentArray;
  }

  _getMobileView(array: any[][]) {
    return array.map((elementArray, index) => {
      return html` <div class="size-labels__slice" slice-index="${index}">${elementArray}</div> `;
    });
  }

  _switchSliceIndex(string: "left" | "right", arrayLength: number) {
    if (string === "left") {
      let newIndex = this._sliceIndex - 1;
      if (newIndex < 0) {
        newIndex = arrayLength - 1;
      }
      this._sliceIndex = newIndex;
    } else {
      let newIndex = this._sliceIndex + 1;
      if (newIndex >= arrayLength) {
        newIndex = 0;
      }
      this._sliceIndex = newIndex;
    }
    // ! Attempts to get the new label index before the next slice is rendered
    // ! Causes image to switch to the wrong index
    const label = this.renderRoot.querySelector(`.size-label`) as HTMLElement;
    if (label) {
      this._switchIndex(label);
    }
  }

  _toggleExpanded() {
    this._isExpanded = !this._isExpanded;
  }

  _switchIndex(e: HTMLElement) {
    let target = e as Element;
    const idx = target.getAttribute("data-index") as string;

    let newIndex = parseInt(idx, 10);
    this._index = newIndex;

    const active: Function = () => this.renderRoot.querySelector("[data-active]");

    if (active()) {
      active().classList.remove("size-label--active");
      active().removeAttribute("data-active");
    }

    target.setAttribute("data-active", "true");
    target.classList.add("size-label--active");

    this._switchImage(this.sizes[newIndex].image);
  }

  _switchImage(url: string) {
    const imageContainer: Function = () => this.shadowRoot?.querySelector(".size-image__container");
    const image: Function = () => this.shadowRoot?.querySelector(".size__main-image");

    imageContainer().classList.add("size-image__container--hidden");
    setTimeout(() => {
      image().setAttribute("src", url);
    }, 500);
    image().addEventListener("load", () => {
      imageContainer().classList.remove("size-image__container--hidden");
    });
  }
}
