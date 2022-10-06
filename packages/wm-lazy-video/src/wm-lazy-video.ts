import { html, css, LitElement, PropertyValueMap } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

type MediaType = 'local' | 'hosted';

@customElement('wm-lazy-video')
export class WebMarketsLazyVideo extends LitElement {
  static styles = css`
    :root {
      max-width: 100%;
    }
    .video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .video__wrapper {
      position: relative;
      width: 100%;
      padding-bottom: 56.25%;
    }
  `;

  @property({ type: String, attribute: 'src' })
  public src: string = '';

  @property({ type: String, attribute: 'media-type' })
  private mediaType: MediaType | undefined;

  @property({ type: String, attribute: 'yt-id' })
  public youtubeEmbedId = '';

  @state()
  private videoSource: string = '';

  @state()
  private videoId: number = Math.ceil(Math.random() * 1000000);

  protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    this._init();
  }

  private _init() {
    const videoElem = this.shadowRoot?.getElementById(this.videoId.toString());
    const onIntersection = (entries: any) => {
      entries.forEach((entry: any) => {
        if (entry.target === videoElem && !this.videoSource && entry.intersectionRatio > 0) {
          switch (this.mediaType) {
            case 'hosted':
              this.videoSource = `https://www.youtube.com/embed/${this.youtubeEmbedId}`;
              break;
            case 'local':
              this.videoSource = this.src;
              break;
          }
        }
      });
    };
    const observer = new IntersectionObserver(onIntersection, {
      threshold: [0, 1],
      root: null,
    });
    if (videoElem) {
      observer.observe(videoElem);
    }
  }

  render() {
    return html`
      <div class="video__wrapper">
        ${this.mediaType === 'local' || !this.mediaType
          ? html`
              <video id=${this.videoId} class="video" src=${this.videoSource} autoplay loop muted playsinline></video>
            `
          : html`
              <iframe id=${this.videoId} class="video" src=${this.videoSource} width="100%" height="100%" title="Eustachian Tube Dysfunction" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
            `}
      </div>
    `;
  }
}
