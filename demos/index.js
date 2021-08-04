import {LitElement, html, css} from 'lit-element/lit-element.js';
import '@material/mwc-list';
import '@material/mwc-list/mwc-list-item';

class DemoView extends LitElement {
  static get styles() {
    return [
      css`
        header {
          background-color: #0255ff;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 4;
          width: 100%;
          display: flex;
          align-items: center;
          padding: 8px 12px;
          box-sizing: border-box;
          font-family: "Roboto Mono", monospace;
          -webkit-font-smoothing: antialiased;
          font-size: 1.25rem;
          line-height: 2rem;
          letter-spacing: 0.02em;
          color: white;
          min-height: 64px;
          box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
        }
        mwc-list {
          margin-top: 64px;
        }
        .demo-catalog-list-icon {
          margin: 0 24px 0 12px;
        }
        .demo-heading {
          margin-left: 8px;
        }
        mwc-list-item {
          --mdc-list-side-padding: 28px;
          --mdc-list-item-graphic-margin: 24px;
        }
        mwc-button {
          --mdc-theme-primary: white;
        }`,
    ];
  }

  constructor() {
    super();

    const sortFn = (first, second) => {
      const isEqual = first.name === second.name;

      if (isEqual) {
        return 0;
      }

      if (first.name < second.name) {
        return -1;
      } else {
        return 1;
      }
    };

    this.listItems = [
      {
        name: 'WM Modal',
        secondary: 'A popup, dialog, or modal for announcements or alerts',
        href: 'wm-modal/',
      },
    ].sort(sortFn);
  }


  render() {
    const listItems = this.listItems.map((item) => {
      return html`
        <mwc-list-item twoline data-href=${item.href}>
          <span>${item.name}</span>
          <span slot="secondary">${item.secondary}</span>
          <!-- <img
              slot="graphic"
              alt="${item.name} icon" 
              src=${item.img}
              aria-hidden="true"> -->
        </mwc-list-item>`;
    });

    return html`
      <header>
        <span class="demo-heading">webmarkets Web Components</span>
      </header>
      <div class="demo-list">
        <mwc-list wrapFocus innerRole="navigation" innerAriaLabel="webmarkets Web Component Demos" itemRoles="link" rootTabbable @selected=${this.onSelected}>
          ${listItems}
        </mwc-list>
      </div>
    `;
  }

  onSelected(e) {
    const list = this.shadowRoot.querySelector('mwc-list');
    const index = e.detail.index;
    const item = list.items[index];
    const href = item.dataset.href;
    window.location.href = `${window.location.href}/../${href}`;
  }
}

customElements.define('demo-view', DemoView);