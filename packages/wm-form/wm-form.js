var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
// this is for Astro
export const tagName = 'wm-form';
let WebmarketsForm = class WebmarketsForm extends LitElement {
    constructor() {
        super(...arguments);
        this.formSparkID = '';
        this.redirectURL = '';
        this.fields = 'default';
        this.fullWidthButton = false;
        this.referralOptions = [
            'Google Search',
            'Family/Friend Referral',
            'Social Media',
            'Other',
        ];
    }
    _getFormattedDate() {
        let formattedDate = new Date().toLocaleString();
        return formattedDate;
    }
    render() {
        const referralOptionsElements = this.referralOptions.map((option) => {
            return html `
      <option value=${option}>${option}</option>
      `;
        });
        return html `
      <form
        action=${`https://submit-form.com/${this.formSparkID}`}
        class="wm-form"
      >
        <input type="hidden" name="_redirect" value=${this.redirectURL} />
        <input type="hidden" name="_append" value="false" />

        <input
          type="checkbox"
          name="_honeypot"
          style="display:none"
          tabindex="-1"
          autocomplete="off"
        />
        ${this.fields === 'default'
            ? html `
              <div class="w-50">
                <label for="Name">Name *</label>
                <input
                  required
                  id="contact-name"
                  type="text"
                  name="Name"
                  placeholder="Name"
                />
              </div>
              <div class="w-50">
                <label for="Email">Email *</label>
                <input
                  required
                  id="contact-email"
                  type="email"
                  name="Email"
                  placeholder="Email"
                />
              </div>
              <div class="w-50">
                <label for="Number">Phone Number *</label>
                <input
                  required
                  id="contact-number"
                  type="tel"
                  name="Number"
                  placeholder="Phone Number"
                />
              </div>
              <div class="w-50">
                <label for="Referral">How did you hear about us? *</label>
                <select name="Referral" id="contact-location" required>
                  <option disabled selected>==SELECT AN OPTION==</option>
                  ${referralOptionsElements}
                </select>
              </div>
              <div>
                <label for="Message">Message *</label>
                <textarea
                  required
                  id="contact-message"
                  name="Message"
                  placeholder="Message"
                ></textarea>
              </div>
            `
            : ''}
        ${this.fields.includes('name')
            ? html `
              <div>
                <label for="Name">Name *</label>
                <input
                  required
                  id="contact-name"
                  type="text"
                  name="Name"
                  placeholder="Name"
                />
              </div>
            `
            : ''}
        ${this.fields.includes('email')
            ? html `
              <div>
                <label for="Email">Email *</label>
                <input
                  required
                  id="contact-email"
                  type="email"
                  name="Email"
                  placeholder="Email"
                />
              </div>
            `
            : ''}
        ${this.fields.includes('phone')
            ? html `
              <div>
                <label for="Number">Phone Number *</label>
                <input
                  required
                  id="contact-number"
                  type="tel"
                  name="Number"
                  placeholder="Phone Number"
                />
              </div>
            `
            : ''}
        ${this.fields.includes('referral')
            ? html `
              <div>
                <label for="Referral">How did you hear about us? *</label>
                <select name="Referral" id="contact-location" required>
                  <option disabled selected>==SELECT AN OPTION==</option>
                  ${referralOptionsElements}
                </select>
              </div>
            `
            : ''}
        ${this.fields.includes('message')
            ? html `
              <div>
                <label for="Message">Message *</label>
                <textarea
                  required
                  id="contact-message"
                  name="Message"
                  placeholder="Message"
                ></textarea>
              </div>
            `
            : ''}
        ${this.fields === ''
            ? html `
              <div>
                <p style="color: red; font-size: 1.5rem;">
                  Please provide a valid field value
                </p>
              </div>
            `
            : ''}

        <div class="wm-form-submit__container ${this.fullWidthButton ? 'wm-form-submit__container--wide' : ''}">
          <input type="submit" title="Submit" />
        </div>
      </form>
    `;
    }
};
WebmarketsForm.styles = css `
    .wm-form {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      font-family: inherit;
    }

    .wm-form input[type='text'],
    .wm-form input[type='email'],
    .wm-form textarea,
    .wm-form input[type='tel'],
    .wm-form select {
      box-sizing: border-box;
      border: 1px solid #dcdcdc;
      color: inherit;
      height: 58px;
      width: 100%;
      border-radius: 5px;
      padding: 10px 20px 10px 20px;
      outline-style: none;
      -webkit-transition: all 300ms ease-in;
      transition: all 300ms ease-in;
      box-shadow: 0 0 0 3px transparent inset;
      font-size: 18px;
      font-family: inherit;
    }

    .wm-form select {
      color: black;
    }

    .wm-form textarea {
      color: black;
      min-height: 160px;
    }

    .wm-form .w-50 {
      width: 100%;
    }

    .wm-form div {
      box-sizing: border-box;
      display: flex;
      flex-flow: column;
      padding: 0.8rem;
      width: 100%;
    }

    .wm-form label {
      font-size: 1rem;
      color: inherit;
      margin-bottom: 0.25rem;
      font-weight: normal;
      text-align: left;
    }

    .wm-form .wm-form-submit__container {
      display: block;
    }

    .wm-form .wm-form-submit__container--wide {
      display: flex;
    }

    .wm-form input[type='submit'] {
      display: inline-block;
      font-size: 1.5rem;
      line-height: 1.2;
      text-align: center;
      color: var(--wm-theme-on-primary, #ffffff);
      padding: 12px 52px;
      margin: 0.25rem 0;
      background-color: var(--wm-theme-primary, #15222b);
      border: none;
      border-radius: var(--wm-form-submit-button-radius, 0px);
      transition: ease-in-out 350ms;
    }

    .wm-form input[type='submit']:hover {
      opacity: 0.8;
      cursor: pointer;
    }

    @media only screen and (min-width: 768px) {
      .wm-form .w-50 {
        width: 50%;
      }
    }
  `;
__decorate([
    property({ type: String, reflect: true, attribute: 'formspark-form-id' })
], WebmarketsForm.prototype, "formSparkID", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: 'redirect-url' })
], WebmarketsForm.prototype, "redirectURL", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: 'fields' })
], WebmarketsForm.prototype, "fields", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'full-width-button' })
], WebmarketsForm.prototype, "fullWidthButton", void 0);
__decorate([
    property({ type: Array, reflect: true, attribute: 'referral-options' })
], WebmarketsForm.prototype, "referralOptions", void 0);
WebmarketsForm = __decorate([
    customElement('wm-form')
], WebmarketsForm);
export { WebmarketsForm };
// This doesn't work at the moment
// ${this.fields === 'custom'
// ? html`
//     <slot name="fields"></slot>
//   `
// : ''}
//# sourceMappingURL=wm-form.js.map