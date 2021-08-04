import {LitElement, html, css} from 'lit';
import { customElement } from "lit/decorators.js";

export const tagName = 'demo-view';

@customElement('demo-view')
export class DemoView extends LitElement {
  static get styles() {
    return [
      css`
        ul{
          padding: 1rem;
          list-style-type: none;
        }
       `,
    ];
  }


  render() {
    return html`
      <div class="demo-list">
        <ul>
          <li>
            <a href="/wm-modal">WM Modal</a>
          </li>
          <li>
            <a href="/wm-background-video">WM Background Video</a>
          </li>
        </ul>
      </div>
    `;
  }
}
