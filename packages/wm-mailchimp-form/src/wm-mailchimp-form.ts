import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("wm-mailchimp-form")
export class WebmarketsMailchimpForm extends LitElement {
  static styles = css`
    :host {
      padding: var(--wm-mailchimp-padding, 0);
      border-radius: var(--wm-mailchimp-border-radius, 0);
      background-color: var(--wm-mailchimp-background, #ffffff);
    }
    #title {
      margin: 0 0 0.25rem 0;
      padding-left: 0.8rem;
      font-size: 2rem;
      font-weight: 700;
    }
    .wm-mailchimp-form {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      font-family: inherit;
    }
    .wm-mailchimp-form div {
      box-sizing: border-box;
      display: flex;
      flex-flow: column;
      padding: 0.8rem;
      width: 100%;
    }
    .wm-mailchimp-form .w-50 {
      width: 100%;
    }

    .wm-mailchimp-form label {
      font-size: 1rem;
      color: inherit;
      margin-bottom: 0.25rem;
      font-weight: normal;
      text-align: left;
    }

    .wm-mailchimp-form input[type="text"],
    .wm-mailchimp-form input[type="email"] {
      padding: 0.75rem;
      box-sizing: border-box;
      border: 2px solid #dcdcdc;
      color: var(--wm-form-input-color, #000000);
      width: 100%;
      border-radius: 5px;
      outline-style: none;
      /* -webkit-transition: all 300ms ease-in; */
      /* transition: all 300ms ease-in; */
      /* box-shadow: 0 0 0 3px transparent inset; */
      font-size: 1rem;
      font-family: inherit;
    }

    .wm-mailchimp-form input:focus {
      border: 2px solid #000;
    }
    /* #mc_embed_signup {
      background: var(--wm-mailchimp-background, #fff);
      clear: left;
      font-family: inherit;
      border-radius: 1rem;
      color: var(--wm-mailchimp-text, #000000);
    } */
    .wm-mailchimp-form input.button {
      width: fit-content;
      padding: 14px 24px;
      border-radius: 3rem;
      height: auto;
      padding: 0.5rem 1.5rem;
      display: inline-flex;
      font-size: 1.2rem;
      line-height: 1;
      color: var(--wm-mailchimp-background, #ffffff);
      border: 2px solid var(--wm-theme-primary, #0255ff);
      background-color: var(--wm-theme-primary, #0255ff);
      /* border-radius: 999px; */
      cursor: pointer;
      transition: all 300ms ease-in;
    }

    .wm-mailchimp-form input.button:hover {
      opacity: 0.8;
    }
    .wm-mailchimp-form input {
      border-radius: var(--wm-mailchimp, 0px);
      border-color: var(--wm-mailchimp-text, #000000);
    }
    @media only screen and (min-width: 768px) {
      .wm-mailchimp-form .w-50 {
        width: 50%;
      }
    }
  `;

  @property({ type: String, reflect: true, attribute: "title" })
  title = "Subscribe";

  @property({ type: String, reflect: true, attribute: "form-action-url" })
  formActionURL = "";

  @property({ type: String, reflect: true, attribute: "mailchimp-u-value" })
  mailchimpUValue = "";

  @property({ type: String, reflect: true, attribute: "mailchimp-id-value" })
  mailchimpIdValue = "";

  @property({ type: String, reflect: true, attribute: "fields" })
  fields = "default";

  @property({ type: Boolean, reflect: true, attribute: "hide-labels" })
  hideLabels = false;

  @property({ type: String, reflect: true, attribute: "fname-merge-id" })
  fNameMergeID = "0";

  @property({ type: String, reflect: true, attribute: "lname-merge-id" })
  lNameMergeID = "0";

  @property({ type: String, reflect: true, attribute: "email-merge-id" })
  emailMergeID = "0";

  render() {
    return html`
      <!-- Begin Mailchimp Signup Form -->
      <!-- <link
        href="//cdn-images.mailchimp.com/embedcode/classic-10_7.css"
        rel="stylesheet"
        type="text/css"
      /> -->
      <div id="mc_embed_signup">
        <p id="title">${this.title}</p>
        <form
          action=${`${this.formActionURL}?u=${this.mailchimpUValue}&amp;id=${this.mailchimpIdValue}`}
          method="POST"
          class="wm-mailchimp-form"
        >
          <input type="hidden" name="u" value=${this.mailchimpUValue} />
          <input type="hidden" name="id" valu=${this.mailchimpIdValue} />
          ${this.fields === "default"
            ? html`
                <div class="w-50">
                  ${this.hideLabels
                    ? ""
                    : html`<label for=${`MERGE${this.fNameMergeID}`}
                        >First Name</label
                      >`}
                  <input
                    type="text"
                    value=""
                    required
                    name=${`MERGE${this.fNameMergeID}`}
                    placeholder="First Name"
                    id=${`MERGE${this.fNameMergeID}`}
                  />
                </div>
                <div class="w-50">
                  ${this.hideLabels
                    ? ""
                    : html`<label for=${`MERGE${this.lNameMergeID}`}
                        >Last Name</label
                      >`}
                  <input
                    type="text"
                    value=""
                    required
                    name=${`MERGE${this.lNameMergeID}`}
                    placeholder="Last Name"
                    id=${`MERGE${this.lNameMergeID}`}
                  />
                </div>
                <div>
                  ${this.hideLabels
                    ? ""
                    : html`<label for=${`MERGE${this.emailMergeID}`}
                        >Email Address</label
                      >`}
                  <input
                    type="email"
                    value=""
                    required
                    name=${`MERGE${this.emailMergeID}`}
                    placeholder="Email Address"
                    id=${`MERGE${this.emailMergeID}`}
                  />
                </div>
              `
            : ""}
          ${this.fields.includes("fname")
            ? html`
                <div>
                  ${this.hideLabels
                    ? ""
                    : html`<label for=${`MERGE${this.fNameMergeID}`}
                        >First Name</label
                      >`}
                  <input
                    type="text"
                    value=""
                    required
                    name=${`MERGE${this.fNameMergeID}`}
                    placeholder="First Name"
                    id=${`MERGE${this.fNameMergeID}`}
                  />
                </div>
              `
            : ""}
          ${this.fields.includes("lname")
            ? html`
                <div>
                  ${this.hideLabels
                    ? ""
                    : html`<label for=${`MERGE${this.lNameMergeID}`}
                        >Last Name</label
                      >`}
                  <input
                    type="text"
                    value=""
                    required
                    name=${`MERGE${this.lNameMergeID}`}
                    placeholder="Last Name"
                    id=${`MERGE${this.lNameMergeID}`}
                  />
                </div>
              `
            : ""}
          ${this.fields.includes("email")
            ? html`
                <div>
                  ${this.hideLabels
                    ? ""
                    : html`<label for=${`MERGE${this.emailMergeID}`}
                        >Email Address</label
                      >`}
                  <input
                    type="email"
                    value=""
                    required
                    name=${`MERGE${this.emailMergeID}`}
                    placeholder="Email Address"
                    class="required email"
                    id=${`MERGE${this.emailMergeID}`}
                  />
                </div>
              `
            : ""}

          <div>
            <input
              type="submit"
              value="Subscribe"
              name="subscribe"
              id="mc-embedded-subscribe"
              class="button"
            />
          </div>
        </form>
      </div>
      <!--End mc_embed_signup-->
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "wm-mailchimp-form": WebmarketsMailchimpForm;
  }
}
