// import { LitElement } from "lit";

/**
 * A class for standardizing HTML slides.
 * @author Bradley Graham
 */
export default class CarouselItem extends HTMLElement {
  constructor(title?: string, description?: string, elem?: Element) {
    super();
    this.setAttribute('class', 'carousel-item-wrapper');
    if (elem) {
      this.appendChild(elem);
    } else {
      this.innerHTML = `<div class="carousel-item">
          <h3 class="carousel-item-title">${title ? title : 'Title'}</h3>
          <p class="carousel-item-description">${description ? description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eu blandit consectetur, nisl nunc euismod nisi, vitae porttitor nisl nunc euismod nisi.'}</p>
        </div>`;
    }
  }

  public setStyle(style: string) {
    this.setAttribute('style', style);
  }
}
customElements.define('carousel-item', CarouselItem);
