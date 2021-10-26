/// <reference types="google.maps" />
import { LitElement } from 'lit';
export declare class WebmarketsGoogleMap extends LitElement {
    static styles: import("lit").CSSResult;
    apiKey: string;
    lat: number;
    lng: number;
    zoom: number;
    styles: object;
    showMarker: boolean;
    autoOpenMarker: boolean;
    infoWindowContent: string;
    map?: google.maps.Map;
    marker?: google.maps.Marker;
    infoWindow?: google.maps.InfoWindow;
    mapContainer: HTMLElement;
    _infoWindowContentNodes: any;
    connectedCallback(): void;
    disconnectedCallback(): void;
    handleSlotchange(e: any): void;
    private _initMap;
    _autoOpenInfoWindow(): void;
    render(): import("lit-html").TemplateResult<1>;
}
//# sourceMappingURL=wm-google-map.d.ts.map