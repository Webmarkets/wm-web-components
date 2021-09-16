import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

// this is for Astro
export const tagName = 'wm-form';

@customElement('wm-form')
export class WebmarketsForm extends LitElement {
  static styles = css`
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

    .contact-form .contact-form-submit__container {
      display: block;
    }

    .contact-form .contact-form-submit__container--wide {
      display: flex;
    }

    .contact-form input[type='submit'] {
      display: inline-block;
      font-size: 26px;
      line-height: 1.2;
      text-align: center;
      color: #fff !important;
      padding: 12px 52px;
      margin: 4px 0;
      background-color: var(--wm-theme-primary, #15222b);
      border: none;
      border-radius: var(--wm-form-submit-button-radius, 0px);
      transition: all 450ms;
    }

    .contact-form input[type='submit']:hover {
      opacity: 0.8;
      cursor: pointer;
    }

    @media only screen and (min-width: 768px) {
      .contact-form .w-50 {
        width: 50%;
      }
    }
  `;

  @property({ type: String, reflect: true, attribute: 'formspark-form-id' })
  formSparkID = '';

  @property({ type: String, reflect: true, attribute: 'redirect-url' })
  redirectURL = '';

  @property({ type: String, reflect: true, attribute: 'fields' })
  fields = 'default';

  @property({ type: Boolean, reflect: true, attribute: 'full-width-button' })
  fullWidthButton = false;

  @property({ type: Array, reflect: true, attribute: 'referral-options' })
  referralOptions = [
    'Google Search',
    'Family/Friend Referral',
    'Social Media',
    'Other',
  ];

  _getFormattedDate() {
    let formattedDate = new Date().toLocaleString();
    return formattedDate;
  }

  render() {
    const referralOptionsElements = this.referralOptions.map((option: any) => {
      return html`
      <option value=${option}>${option}</option>
      `;
    });

    return html`
      <form
        action=${`https://submit-form.com/${this.formSparkID}`}
        class="contact-form"
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
        ${
          this.fields === 'default'
            ? html`
              <div class="w-50">
                <label for="Name">Name</label>
                <input
                  required
                  id="contact-name"
                  type="text"
                  name="Name"
                  placeholder="Name"
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
                />
              </div>
              <div class="w-50">
                <label for="Referral">How did you hear about us?</label>
                <select name="Referral" id="contact-location" required>
                  <option disabled selected>==SELECT AN OPTION==</option>
                  ${referralOptionsElements}
                </select>
              </div>
              <div>
                <label for="Messages">Messages</label>
                <textarea
                  required
                  id="contact-message"
                  name="Messages"
                  placeholder="Messages"
                ></textarea>
              </div>
            `
            : ''
        }
        ${
          this.fields.includes('name')
            ? html`
              <div>
                <label for="Name">Name</label>
                <input
                  required
                  id="contact-name"
                  type="text"
                  name="Name"
                  placeholder="Name"
                />
              </div>
            `
            : ''
        }
        ${
          this.fields.includes('email')
            ? html`
              <div>
                <label for="Email">Email</label>
                <input
                  required
                  id="contact-email"
                  type="email"
                  name="Email"
                  placeholder="Email"
                />
              </div>
            `
            : ''
        }
        ${
          this.fields.includes('phone')
            ? html`
              <div>
                <label for="Number">Phone Number</label>
                <input
                  required
                  id="contact-number"
                  type="tel"
                  name="Number"
                  placeholder="Phone Number"
                />
              </div>
            `
            : ''
        }
        ${
          this.fields.includes('referral')
            ? html`
              <div class="w-50">
                <label for="Referral">How did you hear about us?</label>
                <select name="Referral" id="contact-location" required>
                  <option disabled selected>==SELECT AN OPTION==</option>
                  ${referralOptionsElements}
                </select>
              </div>
            `
            : ''
        }
        ${
          this.fields.includes('message')
            ? html`
              <div>
                <label for="Message">Message</label>
                <textarea
                  required
                  id="contact-message"
                  name="Message"
                  placeholder="Message"
                ></textarea>
              </div>
            `
            : ''
        }
        ${
          this.fields === ''
            ? html`
              <div>
                <p style="color: red; font-size: 1.5rem;">
                  Please provide a valid field value
                </p>
              </div>
            `
            : ''
        }

        <div class="contact-form-submit__container ${
          this.fullWidthButton ? 'contact-form-submit__container--wide' : ''
        }">
          <input type="submit" title="Submit" />
        </div>
      </form>
    `;
  }
}

// This doesn't work at the moment
// ${this.fields === 'custom'
// ? html`
//     <slot name="fields"></slot>
//   `
// : ''}
