# wm-form 

This form uses [Formspark](https://formspark.io) as the backend.

## Properties

 - `formspark-form-id` - Fill this out with the form id given to you by Formspark
 - `redirect-url` - This is the url you would like to send the user once the form is submitted successfully. (**Note:** This is an absolute URL not relative ex. https://example.com/thank-you)
 - `full-witdh-button` - This will make the submit button display flex to take up the full width of the form
 - `fields` - If left blank the form will use its default fields. This is a way to manually enable specific fields for the form. Values can be `name`, `phone`, `email`, `referral`, and/or `message`
 - `referral-options` - This is a array of options for the referral field. Default value is `referral-options='["Google Search", "Doctor Referral", "Family/Friend Referral","Social Media","Other"]'` and you can customize as needed.

## Styles 

- `--wm-theme-primary` - Color for the submitt button
- `--wm-form-submit-button-radius` - Border radius value for the submit button

```css
wm-form {
  --wm-theme-primary: green;
  --wm-form-submit-button-radius: 0.75rem;
}
```

## Example

```html
<wm-form formspark-form-id="XXXXXX" redirect-url="https://webmarketsonline.com" fields="name, email, phone, message" full-width-button></wm-form>
```