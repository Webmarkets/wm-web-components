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

  // Property for scroll direction during auto-play
  @property({ type: String, reflect: true, attribute: "scroll-direction" })
  _scrollDirection: "left" | "right" = "right";

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

  private _clonedHead: Element[] = [];
  private _clonedTail: Element[] = [];
  private _hasClones: boolean = false;
  private _cloneOffset: number = 0;

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
    let carouselItems = Array.from(this.querySelectorAll("*[card]")).map((child: Element) => {
      return child.cloneNode(true) as Element;
    });
    let prevBtn = this.querySelector('*[slot="prev-btn"]');
    let nextBtn = this.querySelector('*[slot="next-btn"]');
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
        if (this._scrollDirection === "right") {
          this.nextSlide();
        } else {
          this.previousSlide();
        }
      }, this._autoPlayInterval);
    }
    this._setupClones();

    if (this._hasClones) {
      // Start at the first real slide (after prepended clones)
      this._currentIndex = this._cloneOffset;
    } else {
      this._currentIndex = 0;
    }
    this._styleSlides(this._getAllSlides(), true);
  }

  render() {
    return html`
      <slot name="carousel-style"></slot>
      <slot name="carousel-items"></slot>
      <div class="carousel-supreme" id="inner-wrap">
        ${this._getAllSlides().map((item) => {
          return item;
        })}
        <div class="carousel-back"></div>
      </div>
      ${this.renderingButtons
        ? html` <slot name="prev-btn"
              ><div
                role="button"
                aria-label="Previous Carousel Item"
                style=${this._noControls || this._controlsStyle != "arrows" ? "display: none;" : ""}
                class="prev-btn"
                @click=${this.previousSlide}
              >
                ${lastIcon}
              </div></slot
            >
            <slot name="next-btn"
              ><div
                role="button"
                aria-label="Next Carousel Item"
                style=${this._noControls || this._controlsStyle != "arrows" ? "display: none;" : ""}
                class="next-btn"
                @click=${this.nextSlide}
              >
                ${nextIcon}
              </div></slot
            >`
        : ""}
      ${this._controlsStyle === "bubbles"
        ? html` <div class="bubbles">
            ${
              //@ts-ignore
              this._getAllSlides().map((child, key) =>
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
    if (
      this._carouselChildren.length < this._numCards ||
      this._currentIndex < (this._numCards + 2) / 2 ||
      this._carouselChildren.length - this._currentIndex < (this._numCards + 2) / 2
    ) {
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
      const newIndex = oldIndex + delta;
      if (newIndex !== oldIndex) {
        this._isSpinning = true;
        this._animateSlides(delta);

        setTimeout(() => {
          // If looping and moved into clones, jump to real slide instantly
          if (this._hasClones) {
            const total = this._carouselChildren.length;
            if (this._currentIndex < this._cloneOffset) {
              // Jump to end
              this._currentIndex = total + this._currentIndex;
              this._styleSlides(this._getAllSlides(), true);
            } else if (this._currentIndex >= total + this._cloneOffset) {
              // Jump to start
              this._currentIndex = this._currentIndex - total;
              this._styleSlides(this._getAllSlides(), true);
            }
          }
          this._isSpinning = false;
          this._styleSlides(this._getAllSlides(), true);
        }, this._transitionTime);
      }
    }
  }

  /**
   * Positions CarouselItems to animate to the selected slide
   * @param delta The delta of the current slide index
   */
  private _animateSlides(delta: number) {
    this._styleSlides(this._getAllSlides(), true);
    this._currentIndex += delta;
    this._styleSlides(this._getAllSlides(), false);
  }

  private _styleSlides(slideSet: Element[], instant: boolean, swipeOffset?: number) {
    const n = this._numCards;
    slideSet.forEach((slide, index) => {
      const width = 100 / n;
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
          transform: translateX(${
            swipeOffset ? `calc(${percentageOffset}% + ${swipeOffset}px)` : `${percentageOffset}%`
          });
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

  private _setupClones() {
    if (this._notLooping || this._carouselChildren.length === 0) return;

    // Remove previous clones if any
    this._clonedHead = [];
    this._clonedTail = [];
    this._hasClones = false;

    const n = this._numCards;
    const children = this._carouselChildren;

    // Clone last n slides and prepend
    for (let i = children.length - n; i < children.length; i++) {
      const clone = children[i].cloneNode(true) as Element;
      clone.setAttribute("data-clone", "head");
      this._clonedHead.push(clone);
    }
    // Clone first n slides and append
    for (let i = 0; i < n; i++) {
      const clone = children[i].cloneNode(true) as Element;
      clone.setAttribute("data-clone", "tail");
      this._clonedTail.push(clone);
    }

    this._hasClones = true;
    this._cloneOffset = n;
  }

  private _getAllSlides(): Element[] {
    if (!this._hasClones) return this._carouselChildren;
    return [...this._clonedHead, ...this._carouselChildren, ...this._clonedTail];
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
