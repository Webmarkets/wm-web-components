var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement } from "lit";
import { customElement, property } from "lit/decorators";
import { ScriptLoaderMap } from './script-loader-map';
class JsonpLibraryElement extends LitElement {
    constructor() {
        super(...arguments);
        this.libraryLoaded = false;
        this.libraryErrorMessage = null;
        this.isReady = false;
    }
    get callbackName() {
        return null;
    }
    libraryUrlChanged() {
        // can't load before ready because notifyEvent might not be set
        if (this.isReady && this.libraryUrl != null)
            this.loadLibrary();
    }
    libraryLoadCallback(error, detail) {
        if (error) {
            console.warn('Library load failed:', error.message);
            this.libraryErrorMessage = error.message;
        }
        else {
            this.libraryErrorMessage = null;
            this.libraryLoaded = true;
            if (this.notifyEvent != null) {
                this.dispatchEvent(new CustomEvent(this.notifyEvent, { detail: detail, composed: true }));
            }
        }
    }
    /** loads the library, and fires this.notifyEvent upon completion */
    loadLibrary() {
        ScriptLoaderMap.getInstance().require(this.libraryUrl, this.libraryLoadCallback.bind(this), this.callbackName);
    }
    connectedCallback() {
        super.connectedCallback();
        this.isReady = true;
        if (this.libraryUrl != null)
            this.loadLibrary();
    }
}
let LitGoogleMapsApi = class LitGoogleMapsApi extends JsonpLibraryElement {
    constructor() {
        super(...arguments);
        this.apiKey = '';
        this.clientId = '';
        this.mapsUrl = 'https://maps.googleapis.com/maps/api/js?callback=%%callback%%';
        this.version = 'weekly';
        this.language = '';
    }
    get libraryUrl() {
        return this.computeUrl(this.mapsUrl, this.version, this.apiKey, this.clientId, this.language);
    }
    get notifyEvent() {
        return 'api-load';
    }
    computeUrl(mapsUrl, version, apiKey, clientId, language) {
        var url = mapsUrl + '&v=' + version;
        // Always load all Maps API libraries.
        url += '&libraries=drawing,geometry,places,visualization';
        if (apiKey && !clientId) {
            url += '&key=' + apiKey;
        }
        if (clientId) {
            url += '&client=' + clientId;
        }
        // Log a warning if the user is not using an API Key or Client ID.
        if (!apiKey && !clientId) {
            var warning = 'No Google Maps API Key or Client ID specified. ' +
                'See https://developers.google.com/maps/documentation/javascript/get-api-key ' +
                'for instructions to get started with a key or client id.';
            console.warn(warning);
        }
        if (language) {
            url += '&language=' + language;
        }
        return url;
    }
};
__decorate([
    property({ type: String, attribute: 'api-key' })
], LitGoogleMapsApi.prototype, "apiKey", void 0);
__decorate([
    property({ type: String, attribute: 'client-id' })
], LitGoogleMapsApi.prototype, "clientId", void 0);
__decorate([
    property({ type: String, attribute: 'maps-url' })
], LitGoogleMapsApi.prototype, "mapsUrl", void 0);
__decorate([
    property({ type: String })
], LitGoogleMapsApi.prototype, "version", void 0);
__decorate([
    property({ type: String })
], LitGoogleMapsApi.prototype, "language", void 0);
LitGoogleMapsApi = __decorate([
    customElement('lit-google-maps-api')
], LitGoogleMapsApi);
export { LitGoogleMapsApi };
//# sourceMappingURL=lit-google-maps-api.js.map