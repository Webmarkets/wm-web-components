var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators";
let WebmarketsGoogleMap = class WebmarketsGoogleMap extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * A Maps API key. To obtain an API key, see https://developers.google.com/maps/documentation/javascript/tutorial#api_key.
         */
        this.apiKey = '';
        /**
         * Version of the Google Maps API to use.
         */
        this.version = '3.39';
        /**
         * If set, custom styles can be applied to the map.
         * For style documentation see https://developers.google.com/maps/documentation/javascript/reference#MapTypeStyle
        */
        this.styles = [{ "featureType": "administrative", "elementType": "geometry", "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative.land_parcel", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi", "stylers": [{ "visibility": "off" }] }, { "featureType": "road", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "road.local", "eleme ntType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "stylers": [{ "visibility": "off" }] }];
        /**
         * A zoom level to set the map to.
         */
        this.zoom = 8;
        /**
         * If set, the zoom level is set such that all markers (google-map-marker children) are brought into view.
         */
        this.fitToMarkers = false;
        /**
         * Map type to display. One of 'roadmap', 'satellite', 'hybrid', 'terrain'.
         */
        this.mapType = 'roadmap';
        this.centerLatitude = -34.397;
        this.centerLongitude = 150.644;
        this.map = null;
    }
    initGMap() {
        if (this.map != null) {
            return; // already initialized
        }
        var gMapApiElement = this.shadowRoot.getElementById('api');
        if (gMapApiElement == null || gMapApiElement.libraryLoaded != true) {
            return;
        }
        this.map = new google.maps.Map(this.shadowRoot.getElementById('map'), this.getMapOptions());
        this.updateMarkers();
    }
    getMapOptions() {
        return {
            zoom: this.zoom,
            center: { lat: this.centerLatitude, lng: this.centerLongitude },
            mapTypeId: this.mapType,
            // @ts-ignore
            styles: this.styles
        };
    }
    mapApiLoaded() {
        this.initGMap();
    }
    connectedCallback() {
        super.connectedCallback();
        this.initGMap();
    }
    attachChildrenToMap(children) {
        if (this.map) {
            for (var i = 0, child; child = children[i]; ++i) {
                child.changeMap(this.map);
            }
        }
    }
    observeMarkers() {
        if (this.marketObserverSet)
            return;
        this.addEventListener("items-changed", event => { this.updateMarkers(); });
        this.marketObserverSet = true;
    }
    updateMarkers() {
        this.observeMarkers();
        var markersSelector = this.shadowRoot.getElementById("markers-selector");
        if (!markersSelector)
            return;
        var newMarkers = markersSelector.items;
        // do not recompute if markers have not been added or removed
        if (this.markers && newMarkers.length === this.markers.length) {
            var added = newMarkers.filter(m => {
                return this.markers && this.markers.indexOf(m) === -1;
            });
            if (added.length == 0)
                return;
        }
        this.markers = newMarkers;
        this.attachChildrenToMap(this.markers);
        if (this.fitToMarkers) {
            this.fitToMarkersChanged();
        }
    }
    fitToMarkersChanged() {
        if (this.map && this.fitToMarkers && this.markers.length > 0) {
            var latLngBounds = new google.maps.LatLngBounds();
            for (var i = 0, m; m = this.markers[i]; ++i) {
                latLngBounds.extend(new google.maps.LatLng(m.latitude, m.longitude));
            }
            // For one marker, don't alter zoom, just center it.
            if (this.markers.length > 1) {
                this.map.fitBounds(latLngBounds);
            }
            this.map.setCenter(latLngBounds.getCenter());
        }
    }
    deselectMarker(event) {
    }
    static get styles() {
        return css `
            #map {
                width: 100%;
                height: 100%;
            }
        `;
    }
    render() {
        return html `
            <lit-google-maps-api id="api" api-key=${this.apiKey} version=${this.version} @api-load=${() => this.mapApiLoaded()}></lit-google-maps-api>
            <lit-selector 
                id="markers-selector"
                selected-attribute="open"
                activate-event="google-map-marker-open"
                @google-map-marker-close=${(e) => this.deselectMarker(e)}>
                    <slot id="markers" name="markers"></slot>
            </lit-selector>
            <div id="map">
            </div>
        `;
    }
};
__decorate([
    property({ type: String, attribute: 'api-key' })
], WebmarketsGoogleMap.prototype, "apiKey", void 0);
__decorate([
    property({ type: String })
], WebmarketsGoogleMap.prototype, "version", void 0);
__decorate([
    property({ type: Object })
], WebmarketsGoogleMap.prototype, "styles", void 0);
__decorate([
    property({ type: Number })
], WebmarketsGoogleMap.prototype, "zoom", void 0);
__decorate([
    property({ type: Boolean, attribute: 'fit-to-markers' })
], WebmarketsGoogleMap.prototype, "fitToMarkers", void 0);
__decorate([
    property({ type: String, attribute: 'map-type' })
], WebmarketsGoogleMap.prototype, "mapType", void 0);
__decorate([
    property({ type: Number, attribute: 'center-latitude' })
], WebmarketsGoogleMap.prototype, "centerLatitude", void 0);
__decorate([
    property({ type: Number, attribute: 'center-longitude' })
], WebmarketsGoogleMap.prototype, "centerLongitude", void 0);
WebmarketsGoogleMap = __decorate([
    customElement('wm-google-map')
], WebmarketsGoogleMap);
export { WebmarketsGoogleMap };
//# sourceMappingURL=wm-google-map.js.map