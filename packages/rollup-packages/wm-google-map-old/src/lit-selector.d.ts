import { LitElement } from "lit";
import { XSelection } from './selection';
export declare class LitSelector extends LitElement {
    activateEvent: string;
    selectedAttribute: string | null;
    selected: number | string | null;
    _selection: XSelection<Node>;
    _items: Array<Node>;
    get items(): Array<Node>;
    connectedCallback(): void;
    disconnectedCallback(): void;
    attributeChangedCallback(name: string, oldval: any, newval: any): void;
    applySelection(item: Node, isSelected: boolean): void;
    updateItems(): void;
    addListener(eventName: string): void;
    removeListener(eventName: string): void;
    activateHandler(event: Event): void;
    itemActivate(value: any, item: any): void;
    select(value: any): void;
    updateSelected(): void;
    selectSelected(selected: number | string | null): void;
    valueToItem(value: number | string | null): Node;
    valueToIndex(value: number | string): number;
    indexToValue(index: number): any;
    indexOf(item: Node): number;
}
//# sourceMappingURL=lit-selector.d.ts.map