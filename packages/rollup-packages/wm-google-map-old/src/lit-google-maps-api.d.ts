import { LitElement } from "lit";
declare abstract class JsonpLibraryElement extends LitElement {
    libraryLoaded: boolean;
    libraryErrorMessage: string | null;
    abstract get libraryUrl(): string;
    abstract get notifyEvent(): string;
    get callbackName(): string | null;
    private isReady;
    libraryUrlChanged(): void;
    libraryLoadCallback(error: Error, detail: any): void;
    /** loads the library, and fires this.notifyEvent upon completion */
    loadLibrary(): void;
    connectedCallback(): void;
}
export declare class LitGoogleMapsApi extends JsonpLibraryElement {
    apiKey: string;
    clientId: string;
    mapsUrl: string;
    version: string;
    language: string;
    get libraryUrl(): string;
    get notifyEvent(): string;
    computeUrl(mapsUrl: string, version: string, apiKey: string, clientId: string, language: string): string;
}
export {};
//# sourceMappingURL=lit-google-maps-api.d.ts.map