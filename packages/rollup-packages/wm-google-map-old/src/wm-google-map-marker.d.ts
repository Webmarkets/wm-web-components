/// <reference types="google.maps" />
import { LitElement } from "lit";
export declare class WebmarketsGoogleMapMarker extends LitElement {
    latitude: number;
    longitude: number;
    label: string | null;
    zIndex: number;
    open: boolean;
    map: google.maps.Map;
    marker: google.maps.Marker;
    info: google.maps.InfoWindow;
    contentObserver: MutationObserver;
    openInfoHandler: google.maps.MapsEventListener;
    closeInfoHandler: google.maps.MapsEventListener;
    autopopup: boolean;
    connectedCallback(): void;
    disconnectedCallback(): void;
    _autoPopupMarker(): void;
    attributeChangedCallback(name: string, oldval: any, newval: any): void;
    openChanged(): void;
    updatePosition(): void;
    changeMap(newMap: google.maps.Map): void;
    mapChanged(): void;
    mapReady(): void;
    contentChanged(): void;
}
//# sourceMappingURL=wm-google-map-marker.d.ts.map