import { html, css, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import CarouselItem from "./Carousel_Item";

/**
 * A carousel with adaptable contents
 *
 * @slot - This element has a slot
 * @csspart button - The button
 * @author Bradley Graham
 */
@customElement("wm-carousel")
export class WebMarketsCarousel extends LitElement {
  static styles = css`
    :host {
      display: block;
      border: solid 1px gray;
      padding: 16px;
      max-width: 800px;
    }
    .carousel-supreme {
      position: relative;
      overflow: hidden;
      height: 400px;
    }
  `;
  // Properties for settings
  @property({ type: Number, reflect: true, attribute: "numcards" })
  _numCards: number = 3;

  // I kinda don't want to use this
  @property({ type: String, reflect: true, attribute: "cardsdata" })
  _cardsData: string = "";

  // Current index determines which cards are active
  @state()
  private _currentIndex: number = 0;
  // These are all the carousel cards
  @state()
  private _carouselChildren: CarouselItem[] = [];

  /**
   * Runs on component initialization
   */
  private _init() {
    // test if the slot is being used
    if (this.children.length > 0) {
      console.log("slotted!");
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this._init();
  }

  render() {
    return html`
      <div class="carousel-supreme">
        <!-- <slot name="carousel-items"></slot> -->
        ${this._carouselChildren.map((item) => {
          return html` <div class="carousel-card" style=${item.style}>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
          </div>`;
        })}
      </div>
      <div class="carousel-buttons">
        <button @click=${this.nextSlide}>Next</button>
        <button @click=${this.lastSlide}>Last</button>
      </div>
    `;
  }

  /**
   * Adds a pregenerated card to the carousel
   * @param item A CarouselItem to add to the carousel
   */
  public addCarouselItem(item: CarouselItem) {
    let rendering = false;
    if (this._carouselChildren.length < this._numCards) {
      rendering = true;
    }
    this._carouselChildren.push(item);
    // if changes to the active card set are made, render
    if (rendering) {
      this.renderActiveSlideSet();
    }
  }
  /**
   * Adds a set of pregenerated cards to the carousel
   * @param items CarouselItems to add to the carousel
   */
  public addCarouselItems(items: CarouselItem[]) {
    let rendering = false;
    if (this._carouselChildren.length < this._numCards) {
      rendering = true;
    }
    this._carouselChildren.push(...items);
    console.log(this._carouselChildren);
    if (rendering) {
      this.renderActiveSlideSet();
    }
  }
  /**
   * Cycles to the next Carousel item
   */
  public nextSlide() {
    this._currentIndex++;
    if (this._currentIndex == this._carouselChildren.length) {
      this._currentIndex = 0;
    }
    this.renderActiveSlideSet();
  }
  /**
   * Cycles to the previous Carousel item
   */
  public lastSlide() {
    this._currentIndex--;
    if (this._currentIndex < 0) {
      this._currentIndex = this._carouselChildren.length - 1;
    }
    this.renderActiveSlideSet();
  }

  /**
   * Finds an appropriate index based on an offset
   * @param diff The index of the offset to find
   * @returns An in-bounds index that is offset from the current index
   */
  private calcIndex(diff: number) {
    let index = this._currentIndex + diff;
    while (index < 0) {
      index += this._carouselChildren.length;
    }
    while (index >= this._carouselChildren.length) {
      index -= this._carouselChildren.length;
    }
    return index;
  }
  /**
   * Gets an array of CarouselItems that will cycle around the current carousel card
   * @returns An ordered array of CarouselItems
   */
  private getActiveSlideSet(): CarouselItem[] {
    let slideSet: CarouselItem[] = [];
    // Figure out how many cards are surrounding the current card
    let layers = Math.ceil(this._numCards / 2);
    for (let i = 0 - layers; i <= layers; i++) {
      // For each card, add in order
      slideSet.push(this._carouselChildren[this.calcIndex(i)]);
    }
    // Check if the desired number of active cards is even.
    if (this._numCards % 2 === 0) {
      slideSet.push(this._carouselChildren[this.calcIndex(layers + 1)]);
    }
    return slideSet;
  }
  private renderActiveSlideSet() {
    let set = this.getActiveSlideSet();
    let width = 100 / this._numCards;
    let leftAmount = 0;
    set[0].style = `
      display: inline-block;
      width: ${width}%;
      transition: 500ms all;
      position: absolute;
      visibility: hidden;
      opacity:0;
      top: 0;
      left: ${0 - width}%;`;
    set[set.length - 1].style = `
          display: inline-block;
          width: ${width}%;
          transition: 500ms all;
          position: absolute;
          visibility: hidden;
          opacity:0;
          top: 0;
          left: 100%;`;
    for (let i = 1; i < set.length - 1; i++) {
      set[i].style = `
        display: inline-block;
        width: ${width}%;
        transition: 500ms all;
        position: absolute;
        visibility: visible;
        top: 0;
        opacity: 1;
        left: ${leftAmount}%;`;
      leftAmount += width;
    }
    this.requestUpdate();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "wm-carousel": WebMarketsCarousel;
  }
}
