/// <reference types="google.maps" />
import { LitElement } from "lit";
export declare class WebmarketsGoogleMap extends LitElement {
    /**
     * A Maps API key. To obtain an API key, see https://developers.google.com/maps/documentation/javascript/tutorial#api_key.
     */
    apiKey: string;
    /**
     * Version of the Google Maps API to use.
     */
    version: string;
    /**
     * If set, custom styles can be applied to the map.
     * For style documentation see https://developers.google.com/maps/documentation/javascript/reference#MapTypeStyle
    */
    styles: object;
    /**
     * A zoom level to set the map to.
     */
    zoom: number;
    /**
     * If set, the zoom level is set such that all markers (google-map-marker children) are brought into view.
     */
    fitToMarkers: boolean;
    /**
     * Map type to display. One of 'roadmap', 'satellite', 'hybrid', 'terrain'.
     */
    mapType: string;
    centerLatitude: number;
    centerLongitude: number;
    map: google.maps.Map;
    markers: Array<Node>;
    marketObserverSet: boolean;
    initGMap(): void;
    getMapOptions(): google.maps.MapOptions;
    mapApiLoaded(): void;
    connectedCallback(): void;
    attachChildrenToMap(children: Array<Node>): void;
    observeMarkers(): void;
    updateMarkers(): void;
    fitToMarkersChanged(): void;
    deselectMarker(event: Event): void;
    static get styles(): import("lit").CSSResult;
    render(): import("lit").TemplateResult<1>;
}
//# sourceMappingURL=wm-google-map.d.ts.map