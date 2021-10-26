import { html, css, LitElement } from 'lit';
import { customElement, property, query, state, queryAssignedNodes } from 'lit/decorators.js';
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
  lat = 0;
  @property({ type: Number, reflect: true, attribute: 'lng' })
  lng = 0;
  @property({ type: Number, reflect: true, attribute: 'zoom' })
  zoom = 14;
  @property({type : Object, reflect: false, attribute: 'styles'})
    styles: object = [{"featureType":"administrative","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"administrative.land_parcel","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"on"}]},{"featureType":"road.local","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"transit","stylers":[{"visibility":"off"}]}];
  @property({type: Boolean, reflect: true, attribute: 'show-marker'})
  showMarker = false;
  @property({type: Boolean, reflect: true, attribute: 'auto-open-marker'})
  autoOpenMarker = false;
  @property({type: String})
  infoWindowContent = '';


  @state()
  map?: google.maps.Map;
  @state()
  marker?: google.maps.Marker;
  @state()
  infoWindow?: google.maps.InfoWindow;

  @query('#map')
  mapContainer!: HTMLElement;

  @queryAssignedNodes()
  _infoWindowContentNodes: any;

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
  // TODO We need to figure out how to treat marker content as a slot
  // https://lit.dev/docs/components/shadow-dom/#accessing-slotted-children

  handleSlotchange(e: any) {
    const childNodes = e.target.assignedNodes({flatten: true});
    // ... do something with childNodes ...
    this.infoWindowContent = Array.prototype.map.call(childNodes, (node) => {
      return node.innerHTML ? node.innerHTML : ''
    }).join('');
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
    // if there is nothing in the info window return
    if (!this.infoWindow) return;
    // open the info window for the map and marker
    this.infoWindow.open(this.map, this.marker);
  }

  render() {
    return html`
      <div id="map">
        <slot @slotchange=${this.handleSlotchange}></slot>      
      </div>
    `;
  }
}
