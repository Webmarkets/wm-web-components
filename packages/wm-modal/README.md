# wm-modal

## Available Attributes

- `auto-popup` - Makes the modal automatically popup when the tag is added to the page. It defaults to display after 5 seconds.
- `hide-close-icon` - Hides the close icon from the top right corner of the modal

**Requires `auto-popup` Attribute**

- `popup-every-visit` - Makes the modal popup every single user visit
- `popupe-once` - Makes the modal popup only once permanently unless the user cleares their local storage cache
- `popup-delay` - This is a numeric value in miliseconds. If not specified the value is 5000

## Required CSS

This CSS property is required to avoid a flash of the slotted element

```css
*:not(:defined) {
  display: none;
}
```

## Example HTML

```html
<wm-modal auto-popup>
  <div slot="modal-content">
    <p>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis quae
      exercitationem, ea nam molestias explicabo nisi veritatis nulla, omnis
      ducimus quis commodi facere minus optio itaque et esse asperiores qui?
      Natus quos magnam fugit eaque nostrum cupiditate amet beatae voluptas
      quasi aliquid similique porro cum, recusandae, a minus consequatur
      adipisci doloribus debitis nulla! Ut aperiam voluptatum repudiandae sed,
      dolore ratione!
    </p>
  </div>
</wm-modal>
```
