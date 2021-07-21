import { LitElement } from "lit";
/**
 * An element for setting a background video on a container
 *
 * @slot - This element has a slot
 * @csspart button - The button
 *
 */
export declare class WebmarketsBackgroundVideo extends LitElement {
    static styles: import("lit").CSSResultGroup;
    mp4Src: string;
    webmSrc: string;
    imgSrc: string;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "wm-background-video": WebmarketsBackgroundVideo;
    }
}
//# sourceMappingURL=wm-background-video.d.ts.map