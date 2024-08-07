import { html } from "lit-html";
import CarouselItem from "./Carousel_Item.ts";

export default class CarouselCard extends CarouselItem {
  private _cardTitle: string = "";
  private _cardDescription: string = "";

  constructor(index: number, cardTitle: string, cardDescription: string) {
    super(index);
    this._cardTitle = cardTitle;
    this._cardDescription = cardDescription;
  }
  render() {
    return html`
      <div class="carousel-item">
        <h3 class="carousel-item-title">${this._cardTitle ? this._cardTitle : "Title"}</h3>
        <p class="carousel-item-description">
          ${this._cardDescription ? this._cardDescription : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eu blandit consectetur, nisl nunc euismod nisi, vitae porttitor nisl nunc euismod nisi."}
        </p>
      </div>
    `;
  }
}
