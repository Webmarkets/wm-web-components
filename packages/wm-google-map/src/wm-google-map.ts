import { html, css, LitElement, PropertyValueMap } from 'lit';
import { customElement, property, query, state, queryAssignedNodes } from 'lit/decorators.js';
import { Loader } from '@googlemaps/js-api-loader';
import WmGoogleMapMarker from './WmGoogleMapMarker';

export { default as WmGoogleMapMarker } from './WmGoogleMapMarker';

@customElement('wm-google-map')
export default class WebmarketsGoogleMap extends LitElement {
  static styles = css`
    #map {
      height: 100%;
      width: 100%;
    }
  `;

  @property({ type: String, reflect: true, attribute: 'api-key' })
  apiKey = '';

  @property({ type: Number, attribute: 'lat' })
  private lat: number = 0;

  @property({ type: Number, attribute: 'lng' })
  private lng: number = 0;

  @property({ type: Number, reflect: true, attribute: 'zoom' })
  zoom = 14;

  @property({ type: Object, reflect: false, attribute: 'styles' })
  styles: object = [
    {
      featureType: 'administrative',
      elementType: 'geometry',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'administrative.land_parcel',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
    { featureType: 'poi', stylers: [{ visibility: 'off' }] },
    {
      featureType: 'road',
      elementType: 'labels.icon',
      stylers: [{ visibility: 'on' }],
    },
    {
      featureType: 'road.local',
      elementType: 'labels',
      stylers: [{ visibility: 'on' }],
    },
    { featureType: 'transit', stylers: [{ visibility: 'off' }] },
  ];

  @property({ type: Boolean, reflect: true, attribute: 'show-marker' })
  showMarker = false;

  @property({ type: Boolean, reflect: true, attribute: 'auto-open-marker' })
  autoOpenMarker = false;

  @property({ type: String })
  infoWindowContent = '';

  @state()
  loader?: Loader;

  @state()
  map?: google.maps.Map;

  @state()
  marker?: google.maps.Marker;

  @state()
  wmGoogleMapMarkers: WmGoogleMapMarker[] = [];

  @state()
  infoWindow?: google.maps.InfoWindow;

  @query('#map')
  mapContainer!: HTMLElement;

  @queryAssignedNodes()
  _infoWindowContentNodes: any;

  connectedCallback() {
    super.connectedCallback();
    this._initMap();
    window.addEventListener('load', this.autoOpenMarker ? () => this._autoOpenInfoWindow() : () => {});
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('load', this.autoOpenMarker ? () => this._autoOpenInfoWindow() : () => {});
  }
  protected update(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    if (changedProperties.has('lat') || changedProperties.has('lng')) {
      this.map?.setCenter({ lat: this.lat, lng: this.lng });
    }
    super.update(changedProperties);
  }
  private _initMap() {
    this.loader = new Loader({
      apiKey: this.apiKey,
      version: 'weekly',
    });

    this.loader
      .load()
      .then(() => {
        this.map = new google.maps.Map(this.mapContainer, {
          center: { lat: this.lat, lng: this.lng },
          zoom: this.zoom,
          //@ts-ignore
          styles: this.styles,
        });

        if (this.showMarker) {
          this.marker = new google.maps.Marker({
            position: { lat: this.lat, lng: this.lng },
            map: this.map,
          });

          this.marker?.addListener('click', () => {
            this.infoWindow?.open({
              anchor: this.marker,
              map: this.map,
              shouldFocus: false,
            });
          });
        }

        this.infoWindow = new google.maps.InfoWindow({
          content: this.infoWindowContent,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return html`
      <div id="map">
        <slot @slotchange=${this.handleSlotchange}></slot>
      </div>
    `;
  }

  /**
   * Adds a marker to the map
   * @param marker WmGoogleMapMarker to add to the map
   */
  public addMarker(marker: WmGoogleMapMarker) {
    this.wmGoogleMapMarkers.push(marker);

    this.loader
      ?.load()
      .then(() => {
        const infoWindow = new google.maps.InfoWindow({
          content: marker.infoWindowContent,
        });

        const localMarker = new google.maps.Marker({
          position: { lat: marker.lat, lng: marker.lng },
          map: this.map,
          icon: marker.icon,
        });

        if (marker.infoWindowContent) {
          localMarker.addListener('click', () => {
            infoWindow.open({
              anchor: localMarker,
              map: this.map,
              shouldFocus: true,
            });
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  /**
   * Adds a marker to the map
   * @param marker WmGoogleMapMarker to add to the map
   */
  public addMarkers(markers: WmGoogleMapMarker[]) {
    this.wmGoogleMapMarkers.push(...markers);

    this.loader
      ?.load()
      .then(() => {
        // for each marker we'll create a new marker
        this.wmGoogleMapMarkers.forEach((marker) => {
          const infoWindow = new google.maps.InfoWindow({
            content: marker.infoWindowContent,
          });

          const localMarker = new google.maps.Marker({
            position: { lat: marker.lat, lng: marker.lng },
            map: this.map,
            icon: marker.icon,
          });

          if (marker.infoWindowContent) {
            localMarker.addListener('click', () => {
              infoWindow.open({
                anchor: localMarker,
                map: this.map,
                shouldFocus: true,
              });
            });
          }
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // TODO We need to figure out how to treat marker content as a slot
  // https://lit.dev/docs/components/shadow-dom/#accessing-slotted-children

  handleSlotchange(e: any) {
    const childNodes = e.target.assignedNodes({ flatten: true });
    // ... do something with childNodes ...
    this.infoWindowContent = Array.prototype.map
      .call(childNodes, (node) => {
        return node.innerHTML ? node.innerHTML : '';
      })
      .join('');
  }

  _autoOpenInfoWindow() {
    // if there is nothing in the info window return
    if (!this.infoWindow) return;
    // open the info window for the map and marker
    this.infoWindow.open(this.map, this.marker);
  }
}
