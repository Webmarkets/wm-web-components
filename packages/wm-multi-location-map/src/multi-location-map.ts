import { html, css, LitElement, PropertyValueMap } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
//@ts-ignore
import WebmarketsGoogleMap, { WmGoogleMapMarker } from '@webmarkets/wm-google-map';
import MapLocation from './models/MapLocation.ts';

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
  locations: MapLocation[] = [];

  @property({ type: String, attribute: 'api-key' })
  apiKey: string | undefined;
  @property({ type: String, attribute: 'zoom' })
  zoom: string = '11';

  @query('#source-map')
  map: WebmarketsGoogleMap | undefined;

  @state()
  private averageLat: number | undefined;

  @state()
  private averageLng: number | undefined;

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

  public importLocations(locations: MapLocation[]) {
    this.locations = locations;
    this.requestUpdate();
  }
  private deferMapUpdates(changedProperty: string) {
    if (!this.map) {
      setTimeout(() => this.deferMapUpdates(changedProperty), 10);
    } else {
      this.requestUpdate(changedProperty);
    }
  }
  protected update(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    if (changedProperties.has('locations') && this.locations && this.map) {
      let averageLat = 0;
      let averageLng = 0;
      this.locations.forEach((location) => {
        // Calculating center of map
        averageLat += location.lat;
        averageLng += location.lng;
        // Generating the pins' information windows
        const infoTitle = `${location.nameLink != null ? `<a href="${location.nameLink.url}" ${location.nameLink.newTab ? `target="_blank" rel="noopener noreferrer"` : ''}>${location.name}</a>` : location.name}`;
        const infoWindowContent = `
        <p style="color:black;">${infoTitle}</p>
        <p><a href="${location.getDirectionsLink}" target="_blank" rel="noopener noreferrer">Get Directions</a></p>`;
        const marker = new WmGoogleMapMarker(location.lat, location.lng, undefined, infoWindowContent);
        this.map?.addMarker(marker);
      });
      this.averageLat = averageLat / this.locations.length;
      this.averageLng = averageLng / this.locations.length;
      this.map?.requestUpdate('lat');
    } else {
      this.deferMapUpdates('locations');
    }
    super.update(changedProperties);
  }
  render() {
    return html`
      <section class="gmap__section">
        <wm-google-map id="source-map" api-key=${this.apiKey ? this.apiKey : ''} lat=${this.averageLat ? this.averageLat : 0} lng=${this.averageLng ? this.averageLng : 0} zoom=${this.zoom}></wm-google-map>
      </section>
    `;
  }
}

export type { default as MapLocation } from './models/MapLocation.ts';
