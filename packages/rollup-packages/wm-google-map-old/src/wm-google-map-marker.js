var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement } from "lit";
import { customElement, property } from "lit/decorators";
let WebmarketsGoogleMapMarker = class WebmarketsGoogleMapMarker extends LitElement {
    constructor() {
        super(...arguments);
        this.latitude = 0;
        this.longitude = 0;
        this.label = null;
        this.zIndex = 0;
        this.open = false;
        this.map = null;
        this.marker = null;
        this.autopopup = false;
    }
    connectedCallback() {
        super.connectedCallback();
        window.addEventListener("load", this.autopopup
            ? () => this._autoPopupMarker()
            : () => console.log("Not auto"));
    }
    disconnectedCallback() {
        window.removeEventListener("load", this.autopopup
            ? () => this._autoPopupMarker()
            : () => console.log("Not auto"));
        super.disconnectedCallback();
    }
    _autoPopupMarker() {
        if (!this.info)
            return;
        this.info.open(this.map, this.marker);
        this.dispatchEvent(new CustomEvent("google-map-marker-open", { bubbles: true }));
    }
    attributeChangedCallback(name, oldval, newval) {
        var _a, _b;
        super.attributeChangedCallback(name, oldval, newval);
        switch (name) {
            case "open": {
                this.openChanged();
                break;
            }
            case "latitude": {
                this.updatePosition();
                break;
            }
            case "longitude": {
                this.updatePosition();
                break;
            }
            case "label": {
                (_a = this.marker) === null || _a === void 0 ? void 0 : _a.setLabel(newval);
                break;
            }
            case "z-index": {
                (_b = this.marker) === null || _b === void 0 ? void 0 : _b.setZIndex(newval);
                break;
            }
        }
    }
    openChanged() {
        if (!this.info)
            return;
        if (this.open) {
            this.info.open(this.map, this.marker);
            this.dispatchEvent(new CustomEvent("google-map-marker-open", { bubbles: true }));
        }
        else {
            this.info.close();
            this.dispatchEvent(new CustomEvent("google-map-marker-close", { bubbles: true }));
        }
    }
    updatePosition() {
        var _a;
        (_a = this.marker) === null || _a === void 0 ? void 0 : _a.setPosition(new google.maps.LatLng(this.latitude, this.longitude));
    }
    changeMap(newMap) {
        this.map = newMap;
        this.mapChanged();
    }
    mapChanged() {
        // Marker will be rebuilt, so disconnect existing one from old map and listeners.
        if (this.marker) {
            this.marker.setMap(null);
            google.maps.event.clearInstanceListeners(this.marker);
        }
        if (this.map && this.map instanceof google.maps.Map) {
            this.mapReady();
        }
    }
    mapReady() {
        this.marker = new google.maps.Marker({
            map: this.map,
            position: {
                lat: this.latitude,
                lng: this.longitude,
            },
            label: this.label,
            zIndex: this.zIndex,
        });
        this.contentChanged();
    }
    contentChanged() {
        if (this.contentObserver)
            this.contentObserver.disconnect();
        this.contentObserver = new MutationObserver(this.contentChanged.bind(this));
        this.contentObserver.observe(this, {
            childList: true,
            subtree: true,
        });
        var content = this.innerHTML.trim();
        if (content) {
            if (!this.info) {
                this.info = new google.maps.InfoWindow();
                this.openInfoHandler = google.maps.event.addListener(this.marker, "click", function () {
                    this.open = true;
                }.bind(this));
                this.closeInfoHandler = google.maps.event.addListener(this.info, "closeclick", function () {
                    this.open = false;
                }.bind(this));
            }
            this.info.setContent(content);
        }
        else {
            if (this.info) {
                // Destroy the existing infowindow.  It doesn't make sense to have an empty one.
                google.maps.event.removeListener(this.openInfoHandler);
                google.maps.event.removeListener(this.closeInfoHandler);
                this.info = null;
            }
        }
    }
};
__decorate([
    property({ type: Number, reflect: true })
], WebmarketsGoogleMapMarker.prototype, "latitude", void 0);
__decorate([
    property({ type: Number, reflect: true })
], WebmarketsGoogleMapMarker.prototype, "longitude", void 0);
__decorate([
    property({ type: String, reflect: true })
], WebmarketsGoogleMapMarker.prototype, "label", void 0);
__decorate([
    property({ type: Number, reflect: true, attribute: "z-index" })
], WebmarketsGoogleMapMarker.prototype, "zIndex", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], WebmarketsGoogleMapMarker.prototype, "open", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], WebmarketsGoogleMapMarker.prototype, "autopopup", void 0);
WebmarketsGoogleMapMarker = __decorate([
    customElement("wm-google-map-marker")
], WebmarketsGoogleMapMarker);
export { WebmarketsGoogleMapMarker };
//# sourceMappingURL=wm-google-map-marker.js.map