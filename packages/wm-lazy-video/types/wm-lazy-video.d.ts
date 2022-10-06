import { LitElement, PropertyValueMap } from 'lit';
export declare class WebMarketsLazyVideo extends LitElement {
    static styles: import("lit").CSSResult;
    src: string;
    private mediaType;
    youtubeEmbedId: string;
    private videoSource;
    private videoId;
    protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    private _init;
    render(): import("lit-html").TemplateResult<1>;
}
