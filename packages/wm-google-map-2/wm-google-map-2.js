var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, css, LitElement } from 'lit';
import { customElement, property, query, state, queryAssignedNodes } from 'lit/decorators.js';
import { Loader } from '@googlemaps/js-api-loader';
let WebmarketsGoogleMap = class WebmarketsGoogleMap extends LitElement {
    constructor() {
        super(...arguments);
        this.apiKey = 'AIzaSyC0460_sJ5K4hOyvCHVr_BwgxNdBpaPoy0';
        this.lat = 43.6554718;
        this.lng = -116.3537875;
        this.zoom = 14;
        this.styles = [{ "featureType": "administrative", "elementType": "geometry", "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative.land_parcel", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi", "stylers": [{ "visibility": "off" }] }, { "featureType": "road", "elementType": "labels.icon", "stylers": [{ "visibility": "on" }] }, { "featureType": "road.local", "elementType": "labels", "stylers": [{ "visibility": "on" }] }, { "featureType": "transit", "stylers": [{ "visibility": "off" }] }];
        this.showMarker = false;
        this.autoOpenMarker = false;
        this.infoWindowContent = '<div><p>Info Window</p></div>';
        this._allText = '';
    }
    connectedCallback() {
        super.connectedCallback();
        this._initMap();
        window.addEventListener("load", this.autoOpenMarker
            ? () => this._autoOpenInfoWindow()
            : () => console.log("Not auto"));
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener("load", this.autoOpenMarker
            ? () => this._autoOpenInfoWindow()
            : () => console.log("Not auto"));
    }
    // TODO We need to figure out how to treat marker content as a slot
    // https://lit.dev/docs/components/shadow-dom/#accessing-slotted-children
    handleSlotchange(e) {
        const childNodes = e.target.assignedNodes({ flatten: true });
        // ... do something with childNodes ...
        this.infoWindowContent = Array.prototype.map.call(childNodes, (node) => {
            return node.innerHTML ? node.innerHTML : '';
        }).join('');
    }
    _initMap() {
        const loader = new Loader({
            apiKey: this.apiKey,
            version: 'weekly'
        });
        loader
            .load()
            .then(() => {
            var _a;
            this.map = new google.maps.Map(this.mapContainer, {
                center: { lat: this.lat, lng: this.lng },
                zoom: this.zoom,
                //@ts-ignore
                styles: this.styles
            });
            if (this.showMarker) {
                this.marker = new google.maps.Marker({
                    position: { lat: this.lat, lng: this.lng },
                    map: this.map
                });
                (_a = this.marker) === null || _a === void 0 ? void 0 : _a.addListener('click', () => {
                    var _a;
                    (_a = this.infoWindow) === null || _a === void 0 ? void 0 : _a.open({
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
        if (!this.infoWindow)
            return;
        this.infoWindow.open(this.map, this.marker);
        this.dispatchEvent(new CustomEvent("google-map-marker-open", { bubbles: true }));
    }
    render() {
        return html `
      <div id="map">
        <slot @slotchange=${this.handleSlotchange}></slot>      
      </div>
    `;
    }
};
WebmarketsGoogleMap.styles = css `
    #map {
      height: 100%;
      width: 100%;
    }
  `;
__decorate([
    property({ type: String, reflect: true, attribute: 'api-key' })
], WebmarketsGoogleMap.prototype, "apiKey", void 0);
__decorate([
    property({ type: Number, reflect: true, attribute: 'lat' })
], WebmarketsGoogleMap.prototype, "lat", void 0);
__decorate([
    property({ type: Number, reflect: true, attribute: 'long' })
], WebmarketsGoogleMap.prototype, "lng", void 0);
__decorate([
    property({ type: Number, reflect: true, attribute: 'zoom' })
], WebmarketsGoogleMap.prototype, "zoom", void 0);
__decorate([
    property({ type: Object, reflect: false, attribute: 'styles' })
], WebmarketsGoogleMap.prototype, "styles", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'show-marker' })
], WebmarketsGoogleMap.prototype, "showMarker", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'auto-open-marker' })
], WebmarketsGoogleMap.prototype, "autoOpenMarker", void 0);
__decorate([
    property({ type: String })
], WebmarketsGoogleMap.prototype, "infoWindowContent", void 0);
__decorate([
    state()
], WebmarketsGoogleMap.prototype, "map", void 0);
__decorate([
    state()
], WebmarketsGoogleMap.prototype, "marker", void 0);
__decorate([
    state()
], WebmarketsGoogleMap.prototype, "infoWindow", void 0);
__decorate([
    state()
], WebmarketsGoogleMap.prototype, "_allText", void 0);
__decorate([
    query('#map')
], WebmarketsGoogleMap.prototype, "mapContainer", void 0);
__decorate([
    queryAssignedNodes()
], WebmarketsGoogleMap.prototype, "_infoWindowContentNodes", void 0);
WebmarketsGoogleMap = __decorate([
    customElement('wm-google-map')
], WebmarketsGoogleMap);
export { WebmarketsGoogleMap };
//# sourceMappingURL=wm-google-map-2.js.map