var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement } from "lit/decorators.js";
export const tagName = 'demo-view';
let DemoView = class DemoView extends LitElement {
    static get styles() {
        return [
            css `
        ul{
          padding: 1rem;
          list-style-type: none;
        }
       `,
        ];
    }
    render() {
        return html `
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
};
DemoView = __decorate([
    customElement('demo-view')
], DemoView);
export { DemoView };
//# sourceMappingURL=demo-view.js.map