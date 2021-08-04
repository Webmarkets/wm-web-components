import {LitElement, html, css} from 'lit';
import { customElement, state } from "lit/decorators.js";

export const tagName = 'demo-list';

@customElement('demo-list')
export class DemoList extends LitElement {
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

  @state()
  demoListItems = [
    {
      href: '/wm-modal',
      title: 'WM Modal',
    },
    {
      href: '/wm-background-video',
      title: 'WM Background Video',
    },
  ];


  render() {
    const demoListItems = this.demoListItems.map((item) => {
      return html`<li>
      <a href=${item.href}>${item.title}</a>
    </li>`;
    });

    return html`
      <div class="demo-list">
        <ul>
          ${demoListItems}
        </ul>
      </div>
    `;
  }
}
