var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
/**
 * An element for setting a background video on a container
 *
 * @slot - This element has a slot
 * @csspart button - The button
 *
 */
let WebmarketsBackgroundVideo = class WebmarketsBackgroundVideo extends LitElement {
    constructor() {
        super(...arguments);
        this.mp4Src = "";
        this.webmSrc = "";
        this.imgSrc = "";
    }
    render() {
        return html `<div id="background-video__container">
      <video id="background__video" autoplay playsinline muted autoplay loop>
        <source src=${this.mp4Src} type="video/mp4;" />
        <source src=${this.webmSrc} type="video/webm;" />
        <img
          src=${this.imgSrc}
          title="Your browser does not support the <video> tag"
        />
      </video>
      <slot></slot>
    </div>`;
    }
};
WebmarketsBackgroundVideo.styles = css `
    #background-video__container {
      overflow: hidden;
      z-index: 1;
      position: relative;
    }
    #background__video {
      z-index: 0;
      position: absolute;
      left: 50%;
      top: 50%;
      min-width: 100%;
      transform: translate(-50%, -50%);
    }
    @media only screen and (max-width: 1600px) {
      #background__video  {
        min-height: 100%;
        min-width: auto;
      }
    }
  `;
__decorate([
    property({ type: String, reflect: true })
], WebmarketsBackgroundVideo.prototype, "mp4Src", void 0);
__decorate([
    property({ type: String, reflect: true })
], WebmarketsBackgroundVideo.prototype, "webmSrc", void 0);
__decorate([
    property({ type: String, reflect: true })
], WebmarketsBackgroundVideo.prototype, "imgSrc", void 0);
WebmarketsBackgroundVideo = __decorate([
    customElement("wm-background-video")
], WebmarketsBackgroundVideo);
export { WebmarketsBackgroundVideo };
//# sourceMappingURL=wm-background-video.js.map