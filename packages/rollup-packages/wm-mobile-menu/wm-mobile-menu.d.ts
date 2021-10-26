import { LitElement } from "lit";
/**
 * An example element.
 *
 * @slot - This element has a slot
 */
export declare const tagName = "wm-mobile-menu";
export declare class MobileMenu extends LitElement {
    isOpen: boolean;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "wm-mobile-menu": MobileMenu;
    }
}
//# sourceMappingURL=wm-mobile-menu.d.ts.map