import { html, css, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import CarouselItem from './Carousel_Item';
import { nextIcon, lastIcon } from './icons';

//TODO: Default mobile responsiveness

interface CarouselBreakpoint {
  [breakpoint: number]: number;
}

/**
 * A carousel with adaptable contents
 *
 * @slot - This element has a slot
 * @csspart button - The button
 * @author Bradley Graham
 */
@customElement('wm-carousel')
export class WebMarketsCarousel extends LitElement {
  static styles = css`
    :host {
      width: 100%;
      box-sizing: border-box;
      display: block;
      position: relative;
      padding: 0 3.5rem;
    }
    .carousel-supreme {
      position: relative;
      overflow: hidden;
      height: 100%;
      z-index: 0;
    }
    .carousel-item-wrapper {
      padding: var(--carousel-item-gap, 1rem);
      box-sizing: border-box;
      display: none;
      min-height: 100%;
      align-items: center;
      justify-content: center;
    }
    .carousel-item {
      color: var(--wm-carousel-item-color, black);
      padding: var(--wm-carousel-item-padding, 1rem);
      border-radius: 1rem;
    }
    .carousel-item h3 {
      margin-top: 0;
    }
    .carousel-item p {
      margin-bottom: 0;
    }
    .carousel-back {
      width: 100%;
      height: 100%;
      z-index: 0;
      position: relative;
      background-color: var(--background-color, transparent);
    }
    :host .prev-btn,
    :host .next-btn {
      background-color: transparent;
      border: 2px solid var(--btn-color, #333);
      border-color: var(--btn-color, #333);
      fill: var(--btn-color, #333);
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      border-radius: 100%;
      height: 3rem;
      width: 3rem;
      transition: 250ms all;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    :host .prev-btn:hover,
    :host .next-btn:hover {
      cursor: pointer;
      background: var(--btn-color, #333);
      fill: white;
    }
    :host .prev-btn {
      padding-right: 0.15rem;
      left: 0.5rem;
    }
    :host .next-btn {
      padding-left: 0.15rem;
      right: 0.5rem;
    }

    :host .prev-btn svg,
    :host .next-btn svg {
      fill: inherit;
      height: 2.5rem;
      width: 2.5rem;
    }
  `;
  private _style?: Element = undefined;
  // Number of cards to display in the carousel by default
  @property({ type: Number, attribute: 'num-cards', state: true, reflect: true })
  _numCards: number = 3;

  // An Array of breakpoints needed for mobile responsiveness (i.e. [768, 1440])
  @property({
    type: Object, state: false, attribute: 'card-breakpoints', converter(value) {
      if (value) {
        const jsonValue = value.replaceAll("'", '"');
        return JSON.parse(jsonValue);
      }
    }
  })
  _cardBreakpoints: CarouselBreakpoint | undefined;

  //TODO: Add a property for autoplay breakpoints

  // I kinda don't want to use this
  @property({ type: String, reflect: true, attribute: 'cards-data' })
  _cardsData: string = '';

  // Property for transition time in ms
  @property({ type: Number, reflect: true, attribute: 'transition-time' })
  _transitionTime: number = 1000;

  // Property for looping
  @property({ type: Boolean, reflect: true, attribute: 'no-loop' })
  _notLooping: boolean = false;

  // Property for controls
  @property({ type: Boolean, reflect: true, attribute: 'no-controls' })
  _noControls: boolean = false;

  // Property for auto-play
  @property({ type: Boolean, reflect: true, attribute: 'auto-play' })
  _autoPlay: boolean = false;

  //TODO: Override auto-play variable if value is specified
  // Property for auto-play interval
  @property({ type: Number, reflect: true, attribute: 'auto-play-interval' })
  _autoPlayInterval: number = 5000;

  // Current index determines which cards are active
  @state()
  private _currentIndex: number = 0;
  // These are all the carousel cards
  @state()
  private _carouselChildren: CarouselItem[] = [];

  private swipeStartX: number = 0;
  private lastSwipeX: number = 0;
  private wrapHeight: number = 0;

  // Tracks if the carousel is currently spinning
  private _isSpinning: boolean = false;

  public setNumCards(num: number) {
    this._numCards = num;
  }

  setBreakpoint() {
    if (this._cardBreakpoints) {
      const breakpoints = (Object.keys(this._cardBreakpoints)).map(key => {
        return Number.parseInt(key);
      });
      let eligibleBreakpoints = breakpoints.filter(breakpoint => breakpoint >= window.innerWidth);
      if (eligibleBreakpoints.length > 0) {
        const currentBreakpoint = eligibleBreakpoints.sort((a, b) => a - b)[0];
        this._numCards = this._cardBreakpoints[currentBreakpoint];
      }
    }
  }

  /**
   * Runs on component initialization
   */
  private _init() {
    // Setting up Mobile Responsiveness
    if (this._cardBreakpoints) {
      this.setBreakpoint();
    }
    // push all children in slot to the array
    let carouselItems = document.querySelectorAll('*[slot="carousel-items"]');
    let style = document.querySelector('*[slot="carousel-style"]');
    let prevBtn = document.querySelector('*[slot="prev-btn"]');
    let nextBtn = document.querySelector('*[slot="next-btn"]');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        this.previousSlide();
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.nextSlide();
      });
    }
    if (style) {
      this._style = style;
    }
    carouselItems.forEach((item) => {
      this._carouselChildren.push(new CarouselItem(undefined, undefined, item));
    });
    if (this._noControls) {
      this.style.padding = '0';
    }
    if (this._autoPlay) {
      setInterval(() => {
        this.nextSlide();
      }, this._autoPlayInterval);
    }
    this.renderActiveSlideSet();
  }

  render() {
    return html`
      ${this._style}
      <slot name="carousel-style"></slot>
      <slot name="carousel-items"></slot>
      <div class="carousel-supreme" id="inner-wrap">
        ${this._carouselChildren.map((item) => {
      return item;
    })}
        <div class="carousel-back"></div>
      </div>
      <slot name="prev-btn"><button style=${this._noControls ? 'display: none;' : ''} class="prev-btn" @click=${this.previousSlide}>${lastIcon}</button></slot>
      <slot name="next-btn"><button style=${this._noControls ? 'display: none;' : ''} class="next-btn" @click=${this.nextSlide}>${nextIcon}</button></slot>
    `;
  }
  firstUpdated() {
    const observer = new ResizeObserver(() => this._setHeight(this._carouselChildren));
    this._carouselChildren.forEach((item) => {
      observer.observe(item);
      item.addEventListener('touchmove', (e) => {
        this.lastSwipeX = e.touches[0].clientX;
        this.renderActiveSlideSet(e.touches[0].clientX - this.swipeStartX);
      });
      item.addEventListener('touchstart', (e) => {
        this.swipeStartX = e.touches[0].clientX;
      });
      item.addEventListener('touchend', () => {
        this.handleSwipeEnd(this.swipeStartX, this.lastSwipeX);
      });
    });
    this._setHeight(this._carouselChildren);
  }

  private _setHeight(carouselItems: CarouselItem[]) {
    carouselItems.forEach((item) => {
      if (this.wrapHeight < item.clientHeight) {
        this.wrapHeight = item.clientHeight;
      }
    });
    this.style.height = `${this.wrapHeight}px`;
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
    if (this._carouselChildren.length < this._numCards || this._currentIndex < (this._numCards + 2) / 2 || this._carouselChildren.length - this._currentIndex < (this._numCards + 2) / 2) {
      rendering = true;
    }
    this._carouselChildren.push(...items);
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
  public previousSlide() {
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
  private handleSwipeEnd(swipeStart: number, swipeEnd: number) {
    const wrapperWidth = this.shadowRoot?.getElementById('inner-wrap')?.clientWidth;
    const offset = swipeEnd - swipeStart;
    if (wrapperWidth) {
      const desiredWidth = wrapperWidth / this._numCards;
      if (offset > desiredWidth / 2) {
        this._handleSpin(-1);
      } else if (offset * -1 > desiredWidth / 2) {
        this._handleSpin(1);
      } else {
        this.renderActiveSlideSet();
      }
    }
  }
  private renderActiveSlideSet(offset?: number) {
    let currentAtZero = false;
    let set = this.getActiveSlideSet();
    let width = 100 / this._numCards;
    const wrapperWidth = this.shadowRoot?.getElementById('inner-wrap')?.clientWidth;
    let percentOffset = 0;
    //TODO: Make this logarithmic
    if (offset && wrapperWidth) {
      const desiredWidth = wrapperWidth / this._numCards;
      percentOffset = (offset / this._numCards / desiredWidth) * 100;
    }

    const baseStyle = `
      display: inline-flex;
      width: ${width}%;
      position: absolute;
      top: 0;
      transition-duration: ${percentOffset !== 0 ? 0 : this._transitionTime}ms;
      transition-property: visibility, opacity, transform;
    `;
    this._carouselChildren.forEach((slide) => {
      slide.setStyle(
        `transition: 0ms all;
          transform: translateX(-100%);
        opacity: 0;
        z-index: 1;`
      );
    });
    if (this._currentIndex !== 0 || !this._notLooping) {
      set[0].setStyle(
        baseStyle +
        `
          transform: translateX(${percentOffset - 100}%);
          opacity: ${percentOffset !== 0 ? 1 : 0};
          z-index: 1;`
      );
    } else {
      currentAtZero = true;
    }
    if (this._currentIndex < this._carouselChildren.length - this._numCards - 1 || !this._notLooping) {
      set[set.length - 1].setStyle(
        baseStyle +
        `
          opacity: ${percentOffset !== 0 ? 1 : 0};
          z-index: 1;
          transform: translateX(${this._numCards * 100 + percentOffset}%);`
      );
    }
    if (currentAtZero) {
      for (let i = 0; i < set.length - 1; i++) {
        set[i].setStyle(
          baseStyle +
          `
          opacity: 1;
          z-index: 1;
          transform: translateX(${i * 100 + percentOffset}%);`
        );
      }
    } else {
      for (let i = 1; i < set.length - 1; i++) {
        set[i].setStyle(
          baseStyle + `opacity: 1;
            z-index: 1;
            transform: translateX(${(i - 1) * 100 + percentOffset}%);`
        );
      }
    }
    this.requestUpdate();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wm-carousel': WebMarketsCarousel;
  }
}
