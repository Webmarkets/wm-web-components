import { html, css, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import CarouselItem from "./Carousel_Item_v2";

//TODO: Default mobile responsiveness
//TODO: Handle slot cards

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
    .carousel-item-wrapper {
      padding: var(--carousel-item-gap, 0.5rem);
      box-sizing: border-box;
      display: none;
    }
    .carousel-item {
      color: var(--wm-carousel-item-color, black);
      padding: var(--wm-carousel-item-padding, 1rem);
      border-radius: 1rem;
      background-color: var(--wm-carousel-item-background-color, #aaaaaa);
    }
    .carousel-item h3 {
      margin-top: 0;
    }
    .carousel-item p {
      margin-bottom: 0;
    }
  `;
  // Properties for settings
  @property({ type: Number, reflect: true, attribute: "num-cards" })
  _numCards: number = 3;

  // I kinda don't want to use this
  @property({ type: String, reflect: true, attribute: "cards-data" })
  _cardsData: string = "";

  // Property for transition time in ms
  @property({ type: Number, reflect: true, attribute: "transition-time" })
  _transitionTime: number = 1000;

  // Property for looping
  @property({ type: Boolean, reflect: true, attribute: "no-loop" })
  _notLooping: boolean = false;

  // Current index determines which cards are active
  @state()
  private _currentIndex: number = 0;
  // These are all the carousel cards
  @state()
  private _carouselChildren: CarouselItem[] = [];

  // Tracks if the carousel is currently spinning
  private _isSpinning: boolean = false;

  /**
   * Runs on component initialization
   */
  private _init() {
    // push all children in slot to the array
    while (this.children.length > 0) {
      let item = this.children[0];
      this._carouselChildren.push(new CarouselItem(undefined, undefined, item));
    }
    this.renderActiveSlideSet();
  }

  render() {
    return html`
      <slot name="carousel-items"></slot>
      <div class="carousel-supreme">
        ${this._carouselChildren.map((item) => {
          return item;
        })}
        <!-- <slot name="carousel-items"></slot> -->
      </div>
      <div class="carousel-buttons">
        <button @click=${this.nextSlide}>Next</button>
        <button @click=${this.lastSlide}>Last</button>
      </div>
    `;
  }

  public connectedCallback() {
    super.connectedCallback();
    this._init();
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
    if (
      this._carouselChildren.length < this._numCards ||
      this._currentIndex < (this._numCards + 2) / 2 ||
      this._carouselChildren.length - this._currentIndex < (this._numCards + 2) / 2
    ) {
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
    this._handleSpin(1);
  }
  /**
   * Cycles to the previous Carousel item
   */
  public lastSlide() {
    this._handleSpin(-1);
  }

  private _handleSpin(diff: number) {
    if (!this._isSpinning) {
      const oldIndex = this._currentIndex;
      this._currentIndex = this._calcIndex(diff);
      if (this._currentIndex !== oldIndex) {
        this._isSpinning = true;
        this.renderActiveSlideSet();
        setTimeout(() => {
          this._isSpinning = false;
        }, this._transitionTime);
      }
    }
  }

  /**
   * Finds an appropriate index based on an offset
   * @param diff The index of the offset to find
   * @returns An in-bounds index that is offset from the current index
   */
  private _calcIndex(diff: number) {
    let index = this._currentIndex + diff;
    if (this._notLooping) {
      // debugger;
      if (index < 0) {
        index = 0;
      } else if (index > this._carouselChildren.length - this._numCards) {
        index = this._carouselChildren.length - this._numCards;
      }
    } else {
      while (index < 0) {
        index += this._carouselChildren.length;
      }
      while (index >= this._carouselChildren.length) {
        index -= this._carouselChildren.length;
      }
    }
    return index;
  }
  /**
   * Gets an array of CarouselItems that will cycle around the current carousel card
   * @returns An ordered array of CarouselItems
   */
  private getActiveSlideSet(): CarouselItem[] {
    let slideSet: CarouselItem[] = [];
    if (this._notLooping) {
      for (let i = this._currentIndex - 1; i < this._currentIndex + this._numCards + 1; i++) {
        if (i >= 0 && i < this._carouselChildren.length) {
          console.log(i);
          slideSet.push(this._carouselChildren[i]);
        }
      }
    } else {
      // Figure out how many cards are surrounding the current card
      let layers = Math.ceil(this._numCards / 2);
      for (let i = 0 - layers; i <= layers; i++) {
        // For each card, add in order
        slideSet.push(this._carouselChildren[this._calcIndex(i)]);
      }
      // Check if the desired number of active cards is even.
      if (this._numCards % 2 === 0) {
        slideSet.push(this._carouselChildren[this._calcIndex(layers + 1)]);
      }
    }
    return slideSet;
  }
  private renderActiveSlideSet() {
    // debugger;
    let currentAtZero = false;
    let currentAtEnd = false;
    let set = this.getActiveSlideSet();
    console.log(set);
    let width = 100 / this._numCards;

    const baseStyle = css`
      display: inline-block;
      width: ${width}%;
      transition: ${this._transitionTime}ms all;
      position: absolute;
      top: 0;
    `;
    //TODO: Handle not looping
    if (this._currentIndex !== 0) {
      set[0].setStyle(
        baseStyle +
          `
      transform: translateX(-100%);
      visibility: hidden;
      opacity:0;`
      );
    } else {
      currentAtZero = true;
    }
    if (this._currentIndex < this._carouselChildren.length - this._numCards - 1) {
      set[set.length - 1].setStyle(
        baseStyle +
          `
          visibility: hidden;
          opacity:0;
          transform: translateX(${this._numCards * 100}%);`
      );
    } else {
      currentAtEnd = true;
    }
    if (currentAtZero) {
      for (let i = 0; i < set.length - 1; i++) {
        set[i].setStyle(
          baseStyle +
            `
          visibility: visible;
          opacity: 1;
          transform: translateX(${i * 100}%);`
        );
      }
    } else if (currentAtEnd) {
      for (let i = 1; i < set.length; i++) {
        set[i].setStyle(
          baseStyle +
            `
          visibility: visible;
          opacity: 1;
          transform: translateX(${(i - 1) * 100}%);`
        );
      }
    } else {
      for (let i = 1; i < set.length - 1; i++) {
        set[i].setStyle(
          baseStyle +
            `
          visibility: visible;
          opacity: 1;
          transform: translateX(${(i - 1) * 100}%);`
        );
      }
    }
    this.requestUpdate();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "wm-carousel": WebMarketsCarousel;
  }
}
