import { LitElement } from 'lit';
import { City, Stone } from './data';
export declare class LiveInventory extends LitElement {
    private phase;
    private selectedCity;
    selectCity(city: City): void;
    selectStone(stone: Stone): void;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'live-inventory': LiveInventory;
    }
}
