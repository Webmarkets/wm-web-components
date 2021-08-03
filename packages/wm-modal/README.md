# wm-modal

## Available Attributes

`autopopup` - Makes the modal automatically popup when the tag is added to the page. It defaults to display after 5 seconds.

**Requires `autopopup` Attribute**

- `popupeveryvisit` - Makes the modal popup every single user visit
- `popupeonce` - Makes the modal popup only once permanently unless the user cleares their local storage cache
- `popupdelay` - This is a numeric value in miliseconds. If not specified the value is 5000 

## Example CSS

```css 
    body[no-scroll] {
        overflow: hidden;
    }
    wm-modal {
      display: none;
    }
    wm-modal[isopen] {
      display: block;
    }
    #modal__container {
        width: 60%;
        height: 50%;
        display: flex;
        z-index: 9999;
        position: absolute;
        top: 50%;
        left: 50%;
        min-height: 100px;
        padding: 15px;
        border-radius: 10px;
        transform: translate(-50%, -50%);
        background: #fff;
        overflow: auto;
    }
    @media only screen and (max-width: 905px) {
      #modal__container {
        width: 80%;
        height: 60%;
      }
    }
```

## Example HTML

```html
<wm-modal autopopulate>
    <div id="modal__container">
    </div>
</wm-modal>
```

## Javascript

```js
 // Modal
 const WmModal = document.querySelector('wm-modal');
 const modalCloseBtn = document.querySelector('#modal-close__button');

 WmModal ? WmModal.addEventListener('clicked-away', (event) => toggleEquipmentModal(event)) : null;
 modalCloseBtn ? modalCloseBtn.addEventListener('click', (event) => toggleEquipmentModal(event)) : null;

 function toggleEquipmentModal(event) {
      event.stopPropagation();
     WmModal.toggleAttribute('isopen');
     document.body.toggleAttribute('no-scroll');
 }
 ```

