var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, css, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
// this is for Astro
export const tagName = 'wm-form';
let WebmarketsForm = class WebmarketsForm extends LitElement {
    constructor() {
        super(...arguments);
        this.formSparkID = '';
        // @state()
        // _formState = {};
        this._name = '';
        this._email = '';
        this._phone = '';
        this._message = '';
        this._referralSource = '';
    }
    _getFormattedDate() {
        let formattedDate = new Date().toLocaleString();
        return formattedDate;
    }
    // _logSubmit(e: any) {
    //   e.preventDefault();
    //   console.log(this._name);
    //   console.log(this._email);
    //   console.log(this._phone);
    //   console.log(this._message);
    //   console.log(this._referralSource);
    //   console.log(this._getFormattedDate());
    // }
    _postSubmission(e) {
        e.preventDefault();
        const formSubmission = {
            Name: this._name,
            Email: this._email,
            'Phone Number': this._phone,
            Message: this._message,
            'Referral Source': this._referralSource,
            'Submitted Date': this._getFormattedDate()
        };
        // console.log(formSubmission);
        fetch(`https://submit-form.com/${this.formSparkID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(formSubmission)
        })
            .then(function (response) {
            console.log(response);
        })
            .catch(function (error) {
            console.error(error);
        });
    }
    render() {
        return html `
      <form
        id="contact-form"
        class="contact-form"
        @submit=${(e) => this._postSubmission(e)}
      >
        <input
          type="checkbox"
          name="_honeypot"
          style="display:none"
          tabindex="-1"
          autocomplete="off"
        />
        <div class="w-50">
          <label for="Name">Name</label>
          <input
            required
            id="contact-name"
            type="text"
            name="Name"
            placeholder="Name"
            @change=${(e) => (this._name = e.target.value)}
            .value=${this._name}
          />
        </div>
        <div class="w-50">
          <label for="Email">Email</label>
          <input
            required
            id="contact-email"
            type="email"
            name="Email"
            placeholder="Email"
            @change=${(e) => (this._email = e.target.value)}
          />
        </div>
        <div class="w-50">
          <label for="Number">Phone Number</label>
          <input
            required
            id="contact-number"
            type="tel"
            name="Number"
            placeholder="Phone Number"
            @change=${(e) => (this._phone = e.target.value)}
          />
        </div>
        <div class="w-50">
          <label for="Referral">How did you hear about us?</label>
          <select
            name="Referral"
            id="contact-location"
            required
            @change=${(e) => (this._referralSource = e.target.value)}
          >
            <option disabled selected>==SELECT AN OPTION==</option>
            <option value="Google Search">Google Search</option>
            <option value="Family/Friend Referral">
              <!--@ts-ignore-->
              Family/Friend Referral
            </option>
            <option value="Social Media">Social Media</option>

            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label for="Messages">Messages</label>
          <textarea
            required
            id="contact-messages"
            name="Messages"
            placeholder="Messages"
            @change=${(e) => (this._message = e.target.value)}
          ></textarea>
        </div>
        <div>
          <input type="submit" title="Submit" />
        </div>
      </form>
    `;
    }
};
WebmarketsForm.styles = css `
    .contact-form {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      font-family: inherit;
    }

    .contact-form input[type='text'],
    .contact-form input[type='email'],
    .contact-form textarea,
    .contact-form input[type='tel'],
    .contact-form select {
      box-sizing: border-box;
      border: 1px solid #dcdcdc;
      background: transparent;
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

    .contact-form textarea {
      height: 160px;
    }

    .contact-form .w-50 {
      width: 100%;
    }

    .contact-form div {
      box-sizing: border-box;
      display: flex;
      flex-flow: column;
      padding: 0.8rem;
      width: 100%;
    }

    .contact-form label {
      font-size: 15px;
      color: #424242;
      margin: 0;
      font-weight: normal;
      text-align: left;
    }

    .contact-form input[type='submit'] {
      display: inline-block;
      font-size: 26px;
      line-height: 1.2;
      text-align: center;
      color: #fff !important;
      padding: 12px 52px;
      margin: 4px 0;
      background-color: #15222b;
      border: 2px solid #15222b;
      transition: all 450ms;
    }

    .contact-form input[type='submit']:hover {
      background: transparent;
      color: #15222b !important;
      cursor: pointer;
    }

    @media only screen and (min-width: 768px) {
      .contact-form .w-50 {
        width: 50%;
      }
    }
  `;
__decorate([
    property({ type: String, reflect: true, attribute: 'formspark-form-id' })
], WebmarketsForm.prototype, "formSparkID", void 0);
__decorate([
    state()
], WebmarketsForm.prototype, "_name", void 0);
__decorate([
    state()
], WebmarketsForm.prototype, "_email", void 0);
__decorate([
    state()
], WebmarketsForm.prototype, "_phone", void 0);
__decorate([
    state()
], WebmarketsForm.prototype, "_message", void 0);
__decorate([
    state()
], WebmarketsForm.prototype, "_referralSource", void 0);
WebmarketsForm = __decorate([
    customElement('wm-form')
], WebmarketsForm);
export { WebmarketsForm };
//# sourceMappingURL=wm-form.js.map