import { html, css, LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { Loader } from '@googlemaps/js-api-loader';

@customElement('wm-google-map')
export class WebmarketsGoogleMap extends LitElement {
  static styles = css`
    #map {
      height: 100%;
      width: 100%;
    }
  `;

  @property({ type: String, reflect: true, attribute: 'api-key' })
  apiKey = 'AIzaSyC0460_sJ5K4hOyvCHVr_BwgxNdBpaPoy0';
  @property({ type: Number, reflect: true, attribute: 'lat' })
  lat = 43.6554718;
  @property({ type: Number, reflect: true, attribute: 'long' })
  lng = -116.3537875;
  @property({ type: Number, reflect: true, attribute: 'zoom' })
  zoom = 14;
  @property({type : Object, reflect: false, attribute: 'styles'})
    styles: object = [{"featureType":"administrative","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"administrative.land_parcel","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"on"}]},{"featureType":"road.local","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"transit","stylers":[{"visibility":"off"}]}];
  @property({type: Boolean, reflect: true, attribute: 'show-marker'})
  showMarker = false;
  @property({type: Boolean, reflect: true, attribute: 'auto-open-marker'})
  autoOpenMarker = false;
  @property({type: String})
  infoWindowContent =
  '<div><p>Info Window</p></div>';


  @state()
  map?: google.maps.Map;
  @state()
  marker?: google.maps.Marker;
  @state()
  infoWindow?: google.maps.InfoWindow;

  @query('#map')
  mapContainer!: HTMLElement;

  connectedCallback() {
    super.connectedCallback();
    this._initMap();
    window.addEventListener(
      "load",
      this.autoOpenMarker
        ? () => this._autoOpenInfoWindow()
        : () => console.log("Not auto")
    );
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener(
      "load",
      this.autoOpenMarker
        ? () => this._autoOpenInfoWindow()
        : () => console.log("Not auto")
    );
  }

  private _initMap() {
    const loader = new Loader({
      apiKey: this.apiKey,
      version: 'weekly'
    });

    loader
      .load()
      .then(() => {
        this.map = new google.maps.Map(this.mapContainer, {
          center: { lat: this.lat, lng: this.lng },
          zoom: this.zoom,
          //@ts-ignore
          styles: this.styles
        });

        if(this.showMarker){
          this.marker = new google.maps.Marker({
            position: { lat: this.lat, lng: this.lng },
            map: this.map
          });

          this.marker?.addListener('click', () => {
            this.infoWindow?.open({
              anchor: this.marker,
              map: this.map,
              shouldFocus: false
            });
          });
        }

        this.infoWindow = new google.maps.InfoWindow({
          content: this.infoWindowContent
        });
       
      })
      .catch(error => {
        console.log(error);
      });
  }


  _autoOpenInfoWindow() {
    if (!this.infoWindow) return;

    this.infoWindow.open(this.map, this.marker);
    this.dispatchEvent(
      new CustomEvent("google-map-marker-open", { bubbles: true })
    );
  }

  render() {
    return html`
      <div id="map"></div>
    `;
  }
}
