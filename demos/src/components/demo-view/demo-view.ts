import {LitElement, html, css} from 'lit';
import { customElement } from "lit/decorators.js";

export const tagName = 'demo-view';

@customElement('demo-view')
export class DemoView extends LitElement {
  static get styles() {
    return [
      css`
        ul{
          padding: 0;
          list-style-type: none;
        }
        ul li a {
          padding: 1rem;
          font-size: 2rem;
          border-radius: 0.75rem;
          display: flex;
          text-decoration: none;
          color: inherit;
        }
        ul li a:hover{
          background-color: rgb(216 214 214 / 25%);
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
