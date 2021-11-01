import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("wm-mailchimp-form")
export class WebmarketsMailchimpForm extends LitElement {
  static styles = css`
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

    .w-50 {
      width: 100%;
    }
    #mc_embed_signup {
      background: var(--wm-mailchimp-background, #fff);
      clear: left;
      font-family: inherit;
      /* border-radius: 1rem; */
      color: var(--wm-mailchimp-text, #000000);
    }
    #mc_embed_signup input.button {
      margin: 1rem 0;
      padding: 14px 24px;
      border-radius: 3rem;
      height: auto;
      padding: 0.5rem 1.5rem;
      display: inline-flex;
      font-size: 1.2rem;
      line-height: 1;
      color: var(--wm-mailchimp-background, white);
      border: 2px solid var(--wm-mailchimp-accent, #39b44a);
      background-color: var(--wm-mailchimp-accent, #39b44a);
      /* border-radius: 999px; */
      cursor: pointer;
      transition: all 300ms ease-in;
    }

    #mc_embed_signup input.button:hover {
      opacity: 0.8;
    }
    /* #mc_embed_signup input.button:hover {
      background: var(--wm-mailchimp-background, white);
      color: var(--wm-mailchimp-accent, #39b44a);
    } */
    #mc_embed_signup .mc-field-group input {
      border-radius: var(--wm-mailchimp, 0px);
      border-color: var(--wm-mailchimp-text, #000000);
    }
  `;

  @property({ type: String, reflect: true, attribute: "fields" })
  fields = "default";

  @property({ type: Boolean, reflect: true, attribute: "show-labels" })
  showLabels = true;

  @property({ type: String, reflect: true, attribute: "form-action-url" })
  formActionURL = "";

  render() {
    return html`
      <!-- Begin Mailchimp Signup Form -->
      <!-- <link
        href="//cdn-images.mailchimp.com/embedcode/classic-10_7.css"
        rel="stylesheet"
        type="text/css"
      /> -->
      <div id="mc_embed_signup">
        <form
          action=${this.formActionURL}
          method="POST"
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          class="wm-mailchimp-form validate"
          target="_blank"
          novalidate
        >
          <slot name="form-label">
            <p>Subscribe</p>
          </slot>
          <div id="mc_embed_signup_scroll">
            ${this.fields === "default"
              ? html`
                  <div class="w-50">
                    <label for="mce-EMAIL">Email Address</label>
                    <input
                      type="email"
                      value=""
                      required
                      name="EMAIL"
                      class="required email"
                      id="mce-EMAIL"
                    />
                  </div>
                `
              : ""}
            ${this.fields === "email"
              ? html`
                  <div class="w-50">
                    <label for="mce-EMAIL">Email Address</label>
                    <input
                      type="email"
                      value=""
                      required
                      name="EMAIL"
                      class="required email"
                      id="mce-EMAIL"
                    />
                  </div>
                `
              : ""}

            <div id="mce-responses" class="clear">
              <div
                class="response"
                id="mce-error-response"
                style="display:none"
              ></div>
              <div
                class="response"
                id="mce-success-response"
                style="display:none"
              ></div>
            </div>
            <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
            <div style="position: absolute; left: -5000px;" aria-hidden="true">
              <input
                type="text"
                name="b_ff4082d1ac23791f7f3fbbb77_c3b9dd0bc6"
                tabindex="-1"
                value=""
              />
            </div>
            <div class="clear">
              <input
                type="submit"
                value="Subscribe"
                name="subscribe"
                id="mc-embedded-subscribe"
                class="button"
              />
            </div>
          </div>
        </form>
      </div>
      <script
        type="text/javascript"
        src="//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js"
      ></script>
      <script type="text/javascript">
        (function ($) {
          window.fnames = new Array();
          window.ftypes = new Array();
          fnames[0] = "EMAIL";
          ftypes[0] = "email";
          fnames[1] = "FNAME";
          ftypes[1] = "text";
          fnames[2] = "LNAME";
          ftypes[2] = "text";
          fnames[3] = "ADDRESS";
          ftypes[3] = "address";
          fnames[4] = "PHONE";
          ftypes[4] = "phone";
        })(jQuery);
        var $mcj = jQuery.noConflict(true);
      </script>
      <!--End mc_embed_signup-->
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "wm-mailchimp-form": WebmarketsMailchimpForm;
  }
}

// Franmetrics CSS
// #mc_embed_signup {
//   background: white;
//   clear: left;
//   font: 1rem "Poppins", Arial, sans-serif;
//   border-radius: 1rem;
//   color: var(--button-color3);
// }
// #mc_embed_signup input.button {
//   font: 1.1em "Poppins";
//   border-radius: 3rem;
//   height: auto;
//   padding: 0.5rem 1.5rem;
//   display: inline-flex;
//   text-align: center;
//   font-size: 1.2rem;
//   line-height: 1;
//   padding: 14px 24px;
//   color: #fff;
//   border: 2px solid var(--accent-color);
//   background-color: var(--accent-color);
//   -webkit-border-radius: 999px;
//   -moz-border-radius: 999px;
//   border-radius: 999px;
//   transition: all 300ms ease-in;
// }
// #mc_embed_signup input.button:hover {
//   background: white;
//   color: var(--accent-color);
// }
// #mc_embed_signup .mc-field-group input {
//   border-radius: 1rem;
//   border-color: var(--button-color3);
// }
