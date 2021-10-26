# @webmarkets/responsive-navbar

## Customization

### Properties

- `menu-open` - Determines whether the mobile menu is open or not
- `nav-align` - Where the navlinks container should be aligned. Defaults to the left.

### Slots

- `close-icon` - The icon for closing the mobile menu. Should be wrapped in a `<span>`.
- `menu-icon` - The icon for opening the mobile menu. Should be wrapped in a `<span>`.
- `logo` - Use this slot to insert your own logo on the left side of the navbar
- `navlinks` - The list of primary navigation links. Shared across desktop and mobile.

### CSS

- `--navbar-background-color` - Background color of the navbar.
- `--menu-background-color` - Background color of the mobile menu.

## Working Example

### HTML

```html
  <wm-responsive-navbar>
    <ul slot="navlinks" class="navlinks__list">
      <li><a href="/#">Home</a></li>
      <li><a href="/#">About</a></li>
      <li><a href="/#">Contact</a></li>
    </ul>
  </wm-responsive-navbar>
```

### CSS

```css
wm-responsive-navbar {
  --navbar-background-color: #000000;
  --menu-background-color: #000000;
  color: #ffffff;
}
.navlinks__list {
  margin: 0;
  padding: 0;
  display: flex;
  list-style: none;
}

.navlinks__list li {
  margin-right: 1rem;
  text-transform: uppercase;
}

.navlinks__list li:last-of-type {
  margin: none;
}

.navlinks__list li a {
  color: inherit;
  text-decoration: none;
}

@media only screen and (max-width: 475px) {
  .navlinks__list {
    padding: 3rem 0 0 2rem;
    align-items: flex-start;
    flex-direction: column;
  }

  .navlinks__list li {
    margin-bottom: 2rem;
    font-size: 1.5rem;
  }
}
```