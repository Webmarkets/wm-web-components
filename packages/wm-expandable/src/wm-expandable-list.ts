import { html, LitElement } from "lit";
import { customElement, property, query, queryAssignedElements, state } from "lit/decorators.js";

@customElement("wm-expandable-list")
export class MyElement extends LitElement {
    @property({ type: Boolean, reflect: true, attribute: "indexed"})
    isIndexed: boolean = false;

    @state()
    _index: number | false = false;

    firstUpdated() {
        if (this.isIndexed) {
            let children = Array.from(this.children);
            let childComponents = children.map((item, index) => {
                let indexedItem = item;
                indexedItem.setAttribute("index", index.toString());
                indexedItem.addEventListener("opened", e => this.switchIndex(e))
                return indexedItem;
            });
            this.shadowRoot ? this.shadowRoot.replaceChildren(...childComponents) : null;
        }
    }

    switchIndex(e: Event) {
        // @ts-ignore
        let openedIndex = e.target.getAttribute("index");
        if (this._index && this._index !== openedIndex) {
            this.shadowRoot ? this.shadowRoot.children[this._index].toggleAttribute("open") : null;
        }
        this._index = openedIndex;
    }

    render() {
        return;
    }
}