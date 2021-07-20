import { LitElement } from "lit";
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 *
 */
export declare class WebmarketsModal extends LitElement {
    static styles: import("lit").CSSResultGroup;
    isOpen: boolean;
    modalContainer: HTMLDivElement;
    connectedCallback(): void;
    disconnectedCallback(): void;
    _handleClickedAway: (e: MouseEvent) => void;
    _dispatchClickedAway(): void;
    _keyListener(e: KeyboardEvent): void;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "wm-modal": WebmarketsModal;
    }
}
//# sourceMappingURL=wm-modal.d.ts.map