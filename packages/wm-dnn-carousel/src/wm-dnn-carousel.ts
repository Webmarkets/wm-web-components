import { html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import CarouselItem from "./Carousel_Item.ts";
import { nextIcon, lastIcon } from "./icons.ts";
import styles from "./styles.ts";

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
@customElement("wm-dnn-carousel")
export class WebMarketsDNNCarousel extends LitElement {
  // Number of cards to display in the carousel by default
  @property({ type: Number, attribute: "num-cards", reflect: true })
  _numCards: number = 3;

  // An Array of breakpoints needed for mobile responsiveness (i.e. [768, 1440])
  @property({
    type: Object,
    state: false,
    attribute: "card-breakpoints",
    converter(value: any) {
      if (value) {
        const jsonValue = value.replaceAll("'", '"');
        return JSON.parse(jsonValue);
      }
    },
  })
  _cardBreakpoints: CarouselBreakpoint | undefined;

  //TODO: Add a property for autoplay breakpoints

  // I kinda don't want to use this
  @property({ type: String, reflect: true, attribute: "cards-data" })
  _cardsData: string = "";

  // Property for transition time in ms
  @property({ type: Number, reflect: true, attribute: "transition-time" })
  _transitionTime: number = 1000;

  // Property for looping
  @property({ type: Boolean, reflect: true, attribute: "no-loop" })
  _notLooping: boolean = false;

  // Property for controls
  @property({ type: Boolean, reflect: true, attribute: "no-controls" })
  _noControls: boolean = false;

  // Property for auto-play
  @property({ type: Boolean, reflect: true, attribute: "auto-play" })
  _autoPlay: boolean = false;

  //TODO: Override auto-play variable if value is specified
  // Property for auto-play interval
  @property({ type: Number, reflect: true, attribute: "auto-play-interval" })
  _autoPlayInterval: number = 5000;
  // Property for auto-play interval
  @property({ type: String, reflect: true, attribute: "controls-style" })
  _controlsStyle: "arrows" | "bubbles" = "arrows";

  // Current index determines which cards are active
  @state()
  private _currentIndex: number = 0;
  // These are all the carousel cards
  @state()
  private _carouselChildren: Element[] = [];

  @state()
  private renderingButtons: boolean = true;

  private swipeStartX: number = 0;
  private lastSwipeX: number = 0;

  // Tracks if the carousel is currently spinning
  private _isSpinning: boolean = false;

  public setNumCards(num: number) {
    this._numCards = num;
  }

  public setBreakpoint() {
    if (this._cardBreakpoints) {
      const breakpoints = Object.keys(this._cardBreakpoints).map((key) => {
        return Number.parseInt(key);
      });
      let eligibleBreakpoints = breakpoints.filter((breakpoint) => breakpoint >= window.innerWidth);
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
    let carouselItems = Array.from(document.querySelectorAll("*[card]")).map((child: Element) => {
      return child.cloneNode(true) as Element;
    });
    let prevBtn = document.querySelector('*[slot="prev-btn"]');
    let nextBtn = document.querySelector('*[slot="next-btn"]');
    const headStyle = document.createElement("style");
    headStyle.innerHTML = styles;
    document.head.append(headStyle);
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        this.previousSlide();
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        this.nextSlide();
      });
    }
    this._carouselChildren = carouselItems;
    if (this._noControls) {
      this.style.padding = "0";
    }
    if (this._autoPlay) {
      setInterval(() => {
        this.nextSlide();
      }, this._autoPlayInterval);
    }
    this._styleSlides(this._carouselChildren, true);
  }

  render() {
    return html`
      <slot name="carousel-style"></slot>
      <slot name="carousel-items"></slot>
      <div class="carousel-supreme" id="inner-wrap">
        ${this._carouselChildren.map((item) => {
          return item;
        })}
        <div class="carousel-back"></div>
      </div>
      ${this.renderingButtons
        ? html` <slot name="prev-btn"><div style=${this._noControls || this._controlsStyle != "arrows" ? "display: none;" : ""} class="prev-btn" @click=${this.previousSlide}>${lastIcon}</div></slot>
            <slot name="next-btn"><div style=${this._noControls || this._controlsStyle != "arrows" ? "display: none;" : ""} class="next-btn" @click=${this.nextSlide}>${nextIcon}</div></slot>`
        : ""}
      ${this._controlsStyle === "bubbles"
        ? html` <div class="bubbles">
            ${
              //@ts-ignore
              this._carouselChildren.map((child, key) =>
                this._notLooping && key > this._carouselChildren.length - this._numCards
                  ? ""
                  : html`<span
                      ?active=${this._currentIndex == key}
                      @click=${() => {
                        this._handleSpin(key - this._currentIndex);
                      }}
                      class="nav-bubble"
                    ></span>`
              )
            }
          </div>`
        : ""}
    `;
  }
  firstUpdated() {
    const observer = new ResizeObserver((e) => this._responsiveListener(e));
    observer.observe(this);
    this._carouselChildren.forEach((child) => {
      // observer.observe(item);
      child.addEventListener("touchmove", (e: any) => {
        this.lastSwipeX = e.touches[0].clientX;
        this._styleSlides(this._carouselChildren, false, this.lastSwipeX - this.swipeStartX);
      });
      child.addEventListener("touchstart", (e: any) => {
        this.swipeStartX = e.touches[0].clientX;
      });
      child.addEventListener("touchend", () => {
        this.handleSwipeEnd(this.swipeStartX, this.lastSwipeX);
      });
    });
  }

  public connectedCallback() {
    super.connectedCallback();
    this._init();
  }

  private _setHeight(e: ResizeObserverEntry[]) {
    const carousel = e[0].target as WebMarketsDNNCarousel;
    let height = 0;
    carousel._carouselChildren.forEach((child) => {
      if (height < child.children[0].scrollHeight) {
        height = child.children[0].scrollHeight;
      }
    });
    carousel.setAttribute("style", "height: " + height + "px");
  }

  private _responsiveListener(e: ResizeObserverEntry[]) {
    this._setHeight(e);
    this.setBreakpoint();
    if (window.innerWidth < 768) {
      this.renderingButtons = false;
    } else {
      this.renderingButtons = true;
    }
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
      this._animateSlides(0);
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
      this._animateSlides(0);
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

  private _handleSpin(delta: number) {
    if (!this._isSpinning) {
      const oldIndex = this._currentIndex;
      const newIndex = this._currentIndex + delta;
      if (newIndex !== oldIndex) {
        this._isSpinning = true;
        this._animateSlides(delta);
        setTimeout(() => {
          this._isSpinning = false;
          this._styleSlides(this._carouselChildren, true);
        }, this._transitionTime);
      }
    }
  }

  /**
   * Finds an appropriate index based on delta
   * @param delta The index of the offset to find
   * @returns An in-bounds index that is offset from the current index
   */
  private _calcIndex(delta: number) {
    let index = this._currentIndex + delta;
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
   * Positions CarouselItems to animate to the selected slide
   * @param delta The delta of the current slide index
   */
  private _animateSlides(delta: number) {
    this._styleSlides(this._carouselChildren, true);
    this._currentIndex = this._calcIndex(delta);
    this._styleSlides(this._carouselChildren, false);
  }

  private _styleSlides(slideSet: Element[], instant: boolean, swipeOffset?: number) {
    slideSet.forEach((slide, index) => {
      const width = 100 / this._numCards;
      const baseStyle = `
        display: inline-flex;
        width: ${width}%;
        position: absolute;
        top: 0;
        left: 0;
      `;
      const percentageOffset = 100 * (index - this._currentIndex);
      slide.setAttribute(
        "style",
        `
      ${
        swipeOffset
          ? ""
          : `
          transition-duration: ${instant ? 0 : this._transitionTime}ms;
          transition-property: transform, left;`
      }
          ${baseStyle}
          transform: translateX(${swipeOffset ? `calc(${percentageOffset}% + ${swipeOffset}px)` : `${percentageOffset}%`});
          visibility: visible;
          z-index: 1;`
      );
    });
    this.requestUpdate();
  }

  private handleSwipeEnd(swipeStart: number, swipeEnd: number) {
    const wrapperWidth = document.getElementById("inner-wrap")?.clientWidth;
    const offset = swipeEnd - swipeStart;
    if (wrapperWidth) {
      const desiredWidth = wrapperWidth / this._numCards;
      if (offset > desiredWidth / 2) {
        this._handleSpin(-1);
      } else if (offset * -1 > desiredWidth / 2) {
        this._handleSpin(1);
      } else {
        this._styleSlides(this._carouselChildren, false);
      }
    }
  }
  protected createRenderRoot(): HTMLElement | DocumentFragment {
    return this;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "wm-dnn-carousel": WebMarketsDNNCarousel;
  }
}
