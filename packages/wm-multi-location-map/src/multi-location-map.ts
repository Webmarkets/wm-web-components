import { html, css, LitElement, PropertyValueMap } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import WebmarketsGoogleMap, { WmGoogleMapMarker } from '@webmarkets/wm-google-map';

@customElement('multi-location-map')
export class MultiLocationMap extends LitElement {
  static styles = css`
    :host {
      --map-height: 450px;
      --map-width: 100%;
    }
    .gmap__section {
      display: flex;
      height: var(--map-height);
      width: var(--map-width);
    }
    wm-google-map {
      opacity: 0;
      width: 100%;
    }
    wm-google-map:defined {
      opacity: 1;
    }
  `;

  @property({ type: Array, attribute: true, state: true })
  locations: any[] | undefined;

  @property({ type: String, attribute: 'api-key' })
  apiKey: string | undefined;

  @query('#source-map')
  map: WebmarketsGoogleMap | undefined;

  @state()
  averageLat = 0;

  @state()
  averageLng = 0;

  // mapStyles = [
  //   {
  //     elementType: 'geometry',
  //     stylers: [
  //       {
  //         color: '#212121',
  //       },
  //     ],
  //   },
  //   {
  //     elementType: 'labels.icon',
  //     stylers: [
  //       {
  //         visibility: 'off',
  //       },
  //     ],
  //   },
  //   {
  //     elementType: 'labels.text.fill',
  //     stylers: [
  //       {
  //         color: '#757575',
  //       },
  //     ],
  //   },
  //   {
  //     elementType: 'labels.text.stroke',
  //     stylers: [
  //       {
  //         color: '#212121',
  //       },
  //     ],
  //   },
  //   {
  //     featureType: 'administrative',
  //     elementType: 'geometry',
  //     stylers: [
  //       {
  //         color: '#757575',
  //       },
  //       {
  //         visibility: 'off',
  //       },
  //     ],
  //   },
  //   {
  //     featureType: 'administrative.country',
  //     elementType: 'labels.text.fill',
  //     stylers: [
  //       {
  //         color: '#9e9e9e',
  //       },
  //     ],
  //   },
  //   {
  //     featureType: 'administrative.land_parcel',
  //     stylers: [
  //       {
  //         visibility: 'off',
  //       },
  //     ],
  //   },
  //   {
  //     featureType: 'administrative.locality',
  //     elementType: 'labels.text.fill',
  //     stylers: [
  //       {
  //         color: '#bdbdbd',
  //       },
  //     ],
  //   },
  //   {
  //     featureType: 'poi',
  //     stylers: [
  //       {
  //         visibility: 'off',
  //       },
  //     ],
  //   },
  //   {
  //     featureType: 'poi',
  //     elementType: 'labels.text.fill',
  //     stylers: [
  //       {
  //         color: '#757575',
  //       },
  //     ],
  //   },
  //   {
  //     featureType: 'poi.park',
  //     elementType: 'geometry',
  //     stylers: [
  //       {
  //         color: '#181818',
  //       },
  //     ],
  //   },
  //   {
  //     featureType: 'poi.park',
  //     elementType: 'labels.text.fill',
  //     stylers: [
  //       {
  //         color: '#616161',
  //       },
  //     ],
  //   },
  //   {
  //     featureType: 'poi.park',
  //     elementType: 'labels.text.stroke',
  //     stylers: [
  //       {
  //         color: '#1b1b1b',
  //       },
  //     ],
  //   },
  //   {
  //     featureType: 'road',
  //     elementType: 'geometry.fill',
  //     stylers: [
  //       {
  //         color: '#2c2c2c',
  //       },
  //     ],
  //   },
  //   {
  //     featureType: 'road',
  //     elementType: 'labels.icon',
  //     stylers: [
  //       {
  //         visibility: 'off',
  //       },
  //     ],
  //   },
  //   {
  //     featureType: 'road',
  //     elementType: 'labels.text.fill',
  //     stylers: [
  //       {
  //         color: '#8a8a8a',
  //       },
  //     ],
  //   },
  //   {
  //     featureType: 'road.arterial',
  //     elementType: 'geometry',
  //     stylers: [
  //       {
  //         color: '#373737',
  //       },
  //     ],
  //   },
  //   {
  //     featureType: 'road.highway',
  //     elementType: 'geometry',
  //     stylers: [
  //       {
  //         color: '#3c3c3c',
  //       },
  //     ],
  //   },
  //   {
  //     featureType: 'road.highway.controlled_access',
  //     elementType: 'geometry',
  //     stylers: [
  //       {
  //         color: '#4e4e4e',
  //       },
  //     ],
  //   },
  //   {
  //     featureType: 'road.local',
  //     elementType: 'labels.text.fill',
  //     stylers: [
  //       {
  //         color: '#616161',
  //       },
  //     ],
  //   },
  //   {
  //     featureType: 'transit',
  //     stylers: [
  //       {
  //         visibility: 'off',
  //       },
  //     ],
  //   },
  //   {
  //     featureType: 'transit',
  //     elementType: 'labels.text.fill',
  //     stylers: [
  //       {
  //         color: '#757575',
  //       },
  //     ],
  //   },
  //   {
  //     featureType: 'water',
  //     elementType: 'geometry',
  //     stylers: [
  //       {
  //         color: '#000000',
  //       },
  //     ],
  //   },
  //   {
  //     featureType: 'water',
  //     elementType: 'labels.text.fill',
  //     stylers: [
  //       {
  //         color: '#3d3d3d',
  //       },
  //     ],
  //   },
  // ];

  public importLocations(locations: any[]) {
    this.locations = locations;
    this.requestUpdate();
  }
  protected update(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    if (changedProperties.has('locations') && this.locations) {
      this.locations.forEach((location: any) => {
        this.averageLat += location.lat;
        this.averageLng += location.lng;
      });
      this.averageLat = this.averageLat / this.locations.length;
      this.averageLng = this.averageLng / this.locations.length;
      this.locations.forEach((location: any) => {
        const infoWindowContent = `
        <p style="color:black;">${location.name}</p>
        <p><a href="${location.getDirectionsLink}" target="_blank" rel="noopener noreferrer">Get Directions</a></p>`;
        const marker = new WmGoogleMapMarker(location.lat, location.lng, undefined, infoWindowContent);
        this.map?.addMarker(marker);
      });
      this.map?.requestUpdate('lat');
    }
    super.update(changedProperties);
  }

  render() {
    return html`
      <section class="gmap__section">
        <wm-google-map id="source-map" api-key=${this.apiKey ? this.apiKey : ''} lat=${this.averageLat} lng=${this.averageLng} zoom="11"></wm-google-map>
      </section>
    `;
  }
}
