var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement } from "lit";
import { customElement, property } from "lit/decorators";
import { XSelection } from './selection';
let LitSelector = class LitSelector extends LitElement {
    constructor() {
        super(...arguments);
        this.activateEvent = 'tap';
        this.selectedAttribute = null;
        this.selected = null;
        this._selection = new XSelection((item, isSelected) => this.applySelection(item, isSelected));
        this._items = [];
    }
    get items() {
        return this._items;
    }
    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('slotchange', event => {
            event.stopPropagation();
            this.updateItems();
            this.dispatchEvent(new CustomEvent("selector-items-changed", { detail: {}, composed: true }));
        });
        this.addListener(this.activateEvent);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeListener(this.activateEvent);
    }
    attributeChangedCallback(name, oldval, newval) {
        super.attributeChangedCallback(name, oldval, newval);
        switch (name) {
            case 'selected': {
                this.updateSelected();
                break;
            }
        }
    }
    applySelection(item, isSelected) {
        if (this.selectedAttribute && item instanceof Element) {
            if (isSelected != item.hasAttribute(this.selectedAttribute))
                item.toggleAttribute(this.selectedAttribute);
        }
    }
    updateItems() {
        var _a;
        var slotElement = this.querySelector("slot");
        this._items = (_a = slotElement === null || slotElement === void 0 ? void 0 : slotElement.assignedNodes()) !== null && _a !== void 0 ? _a : [];
    }
    addListener(eventName) {
        this.addEventListener(eventName, (event) => this.activateHandler(event));
    }
    removeListener(eventName) {
        this.removeEventListener(eventName, (event) => this.activateHandler(event));
    }
    activateHandler(event) {
        var t = event.target;
        var items = this.items;
        while (t && t != this) {
            var i = items.indexOf(t);
            if (i >= 0) {
                var value = this.indexToValue(i);
                this.itemActivate(value, t);
                return;
            }
            // @ts-ignore
            t = t.parentNode;
        }
    }
    itemActivate(value, item) {
        if (this.dispatchEvent(new CustomEvent('selector-item-activate', { detail: { selected: value, item: item }, composed: true, cancelable: true })))
            this.select(value);
    }
    select(value) {
        this.selected = value;
    }
    updateSelected() {
        this.selectSelected(this.selected);
    }
    selectSelected(selected) {
        if (!this._items)
            return;
        var item = this.valueToItem(this.selected);
        if (item) {
            this._selection.select(item);
        }
        else {
            this._selection.clear();
        }
    }
    valueToItem(value) {
        return (value == null) ? null : this._items[this.valueToIndex(value)];
    }
    valueToIndex(value) {
        return Number(value);
    }
    indexToValue(index) {
        return index;
    }
    indexOf(item) {
        return this._items ? this._items.indexOf(item) : -1;
    }
};
__decorate([
    property({ type: String, attribute: 'activate-event' })
], LitSelector.prototype, "activateEvent", void 0);
__decorate([
    property({ type: String, attribute: 'selected-attribute' })
], LitSelector.prototype, "selectedAttribute", void 0);
__decorate([
    property({ type: Number, reflect: true })
], LitSelector.prototype, "selected", void 0);
LitSelector = __decorate([
    customElement('lit-selector')
], LitSelector);
export { LitSelector };
//# sourceMappingURL=lit-selector.js.map