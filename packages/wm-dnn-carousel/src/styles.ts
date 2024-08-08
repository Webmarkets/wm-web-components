// import { css } from "lit";

const styles = `
  wm-dnn-carousel {
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
  .carousel-item-wrapper,
  *[card] {
    padding: var(--carousel-item-gap, 1rem);
    box-sizing: border-box;
    display: none;
    min-height: 100%;
    height: 100%;
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
  wm-dnn-carousel .prev-btn,
  wm-dnn-carousel .next-btn {
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
  wm-dnn-carousel .prev-btn:hover,
  wm-dnn-carousel .next-btn:hover {
    cursor: pointer;
    background: var(--btn-color, #333);
    fill: white;
  }
  wm-dnn-carousel .prev-btn {
    padding-right: 0.15rem;
    left: 0.5rem;
  }
  wm-dnn-carousel .next-btn {
    padding-left: 0.15rem;
    right: 0.5rem;
  }

  wm-dnn-carousel .prev-btn svg,
  wm-dnn-carousel .next-btn svg {
    fill: inherit;
    height: 2.5rem;
    width: 2.5rem;
  }
  /* Bubble Control Scheme Styling */
  .bubbles {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);
    line-height: 1;
    display: inline-flex;
    gap: 0.2rem;
  }
  .nav-bubble {
    width: 0.4rem;
    height: 0.4rem;
    border-radius: 50%;
    background-color: #c4c4c4;
    display: inline-block;
    cursor: pointer;
    transition: 150ms all;
  }
  .nav-bubble[active] {
    background-color: var(--theme-secondary, #333);
    cursor: not-allowed;
    transition: 150ms all;
  }
  @media screen and (max-width: 768px) {
    wm-dnn-carousel {
      padding: 0;
    }
  }
`;
export default styles;
