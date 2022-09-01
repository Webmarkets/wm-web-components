import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import inventory, { City, Stone } from './data';

@customElement('live-inventory')
export class LiveInventory extends LitElement {
  @state()
  private phase: string = 'cities';

  private selectedCity: City | undefined;
  selectCity(city: City) {
    this.selectedCity = city;
    this.phase = 'stones';
  }
  selectStone(stone: Stone) {
    window.open(`http://inventory.francinimarble.com${this.selectedCity && this.selectedCity.name !== 'all' ? `/location/${this.selectedCity.url}` : ''}${stone.name !== 'all' ? `/subcategory/${stone.url ? stone.url : stone.name}` : ''}`, '_blank');
  }

  render() {
    return html`
      <section class="inventory__section">
        <h2 class="inventory__prompt">Which ${this.phase === 'cities' ? 'location' : 'stone'} would you like to view inventory?</h2>
        <p>Pictures are a general representative of shade, movement, veining, and color tone and may vary from actual slab. Natural stone is a product of nature and no two pieces will be exactly alike. Viewing the full slabs prior to fabrication is recommended.</p>
        <div class="home-stones">
          ${this.phase === 'cities'
            ? inventory.cities.map(
                (city) => html`
                  <div class="item img-back" style="background-color: #677075">
                    <button title=${city.title} @click=${() => this.selectCity(city)}>
                      <span>${city.title}</span>
                      <img alt-size="" src="https://francinimarble.com/Portals/0/Images/Home/SpecialtySlabCorner.png" alt="Specialty slab offered by Francini, Inc." title="Specialty slab offered by Francini, Inc." />
                    </button>
                  </div>
                `
              )
            : this.phase === 'stones'
            ? inventory.stones.map(
                (stone) => html`
                  <div class="item img-back" style=${stone.name === 'all' ? 'background-color: #677075' : `background-image: url('https://francinimarble.com/Portals/0/Images/Home/${stone.bgRef ? stone.bgRef : stone.name}BG.jpg')`}>
                    <button title=${stone.title} @click=${() => this.selectStone(stone)}>
                      <span>${stone.title}</span>
                      <img alt-size="" src="https://francinimarble.com/Portals/0/Images/Home/${stone.slabRef ? stone.slabRef : stone.name}SlabCorner.png" alt="${stone.title} slab offered by Francini, Inc." title="${stone.title} slab offered by Francini, Inc." />
                    </button>
                  </div>
                `
              )
            : ''}
        </div>
        <nav class="inventory__nav">
          ${this.phase !== 'cities'
            ? html`
                <button class="btn-primary" @click=${() => (this.phase = 'cities')}>Back</button>
              `
            : ''}
        </nav>
      </section>
    `;
  }

  static styles = css`
    :host {
    }
    .home-stones {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 1rem;
    }
    .home-stones .item {
      width: 100%;
      background-size: cover;
      background-repeat: no-repeat;
      margin-bottom: 20px;
      position: relative;
    }
    .home-stones .item button {
      display: inline-block;
      position: relative;
      width: 100%;
      height: 100%;
      border: unset;
      background-color: transparent;
      text-align: left;
    }
    .home-stones .item button:hover {
      cursor: pointer;
    }
    .home-stones .item button span {
      display: inline-block;
      padding: 30px 30px 100px 30px;
      color: #fff;
      font-size: 30px;
      line-height: 1.2;
      font-family: 'Cinzel';
    }
    .home-stones .item button img {
      position: absolute;
      bottom: 0;
      right: 0;
      max-width: 200px;
      transition: all 440ms;
    }
    .home-stones .item button:hover img {
      -webkit-filter: drop-shadow(-25px 0px 0px rgba(0, 0, 0, 0.55));
      filter: drop-shadow(-25px 0px 0px rgba(0, 0, 0, 0.55));
    }
    .inventory__nav {
      text-align: center;
    }
    .btn-primary {
      display: inline-block;
      font-family: 'Cinzel';
      font-size: 26px;
      line-height: 1.2;
      text-align: center;
      color: #fff !important;
      padding: 12px 52px;
      margin: 4px 0;
      background-color: #15222b;
      border: 2px solid #15222b;
      transition: all 450ms;
    }
    .btn-primary:hover {
      background: transparent;
      color: #15222b !important;
      cursor: pointer;
    }
    h2 {
      color: #15222b;
      font-family: 'Cinzel';
      font-weight: 400;
      font-size: 48px;
      line-height: 1.1;
      letter-spacing: 0;
      text-align: center;
      margin: 0 0 1rem;
    }
    p {
      text-align: center;
      font-family: 'Open Sans';
      font-size: 18px;
    }
    @media only screen and (max-width: 1600px) {
      .home-stones .item button span {
        max-width: 70%;
      }
    }
    @media only screen and (max-width: 1200px) {
      .home-stones .item {
        min-height: 179px;
      }
      .home-stones .item button span {
        max-width: 70%;
        padding: 30px 30px 70px 30px;
      }
    }
    @media only screen and (max-width: 992px) {
      .btn-primary {
        font-size: 23px;
        padding: 11px 44px;
      }
    }
    @media only screen and (max-width: 768px) {
      h2 {
        font-size: 43px;
      }
      .home-stones {
        grid-template-columns: 1fr 1fr;
      }
      .home-stones .item button img {
        max-width: 150px;
      }
      .btn-primary {
        font-size: 21px;
        padding: 10px 34px;
      }
    }
    @media only screen and (max-width: 599px) {
      h2 {
        font-size: 37px;
      }
      .home-stones {
        grid-template-columns: 1fr;
      }
      .home-stones .item button img {
        max-width: 200px;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'live-inventory': LiveInventory;
  }
}
