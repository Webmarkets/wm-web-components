import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

/**
 * An element for setting a background video on a container
 *
 * @slot - This element has a slot
 * @csspart button - The button
 *
 */

@customElement("wm-background-video")
export class WebmarketsBackgroundVideo extends LitElement {
  static styles = css`
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

  @property({ type: String, reflect: true }) mp4Src = "";
  @property({ type: String, reflect: true }) webmSrc = "";
  @property({ type: String, reflect: true }) imgSrc = "";

  render() {
    return html`<div id="background-video__container">
      <video id="background__video" autoplay playsinline muted autoplay loop>
        <source src=${this.webmSrc} type="video/webm;" />
        <source src=${this.mp4Src} type="video/mp4;" />
        <img
          src=${this.imgSrc}
          title="Your browser does not support the <video> tag"
        />
      </video>
      <slot></slot>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "wm-background-video": WebmarketsBackgroundVideo;
  }
}
