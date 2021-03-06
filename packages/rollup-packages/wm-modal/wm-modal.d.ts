import { LitElement } from "lit";
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 *
 */
export declare const tagName = "wm-modal";
export declare class WebmarketsModal extends LitElement {
    static styles: import("lit").CSSResult;
    isOpen: boolean;
    popuponce: boolean;
    autopopup: boolean;
    popupeveryvisit: boolean;
    popupdelay: number;
    modalSlot: HTMLDivElement;
    connectedCallback(): void;
    disconnectedCallback(): void;
    _autoPopupModal(e: Event): void;
    _handleClickedAway: (e: MouseEvent) => void;
    _dispatchClickedAway(): void;
    _keyListener(e: KeyboardEvent): void;
    render(): import("lit-html").TemplateResult<1>;
}
//# sourceMappingURL=wm-modal.d.ts.map