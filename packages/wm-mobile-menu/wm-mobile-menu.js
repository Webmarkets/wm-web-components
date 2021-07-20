var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
/**
 * An example element.
 *
 * @slot - This element has a slot
 */
let MobileMenu = class MobileMenu extends LitElement {
    constructor() {
        super(...arguments);
        this.isOpen = false;
    }
    render() {
        return html `${this.isOpen
            ? html `<slot>
        </slot>`
            : null} `;
    }
};
__decorate([
    property({ type: Boolean, reflect: true })
], MobileMenu.prototype, "isOpen", void 0);
MobileMenu = __decorate([
    customElement("wm-mobile-menu")
], MobileMenu);
export { MobileMenu };
//# sourceMappingURL=wm-mobile-menu.js.map