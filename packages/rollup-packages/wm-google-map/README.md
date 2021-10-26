# wm-google-map

This is a component for adding a Google Map on page with minimal styles

## Example

```html
<wm-google-map
      api-key=""
      lat="43.612255"
      lng="-116.292516"
      show-marker
      auto-open-marker
    >
      <div>
        <h3>Steven Williams, MD</h3>
        <p>8854 Emerald St Ste 140, Boise, ID 83704</p>
        <a
          target="_blank"
          rel="noreferrer noopener"
          href="https://www.google.com/search?hl=en-US&gl=us&q=Steven+Williams,+MD+-+Boise+General+Surgeon,+8854+Emerald+St+Ste+140,+Boise,+ID+83704&ludocid=17340090931558700075&lsig=AB86z5W6-Lrgb-vbqCCh-CT2HxDg&hl=en&gl=US#lrd=0x54ae561e751ffd4f:0xf0a460d49c87542b,1"
          >View Reviews</a
        >
        <br />
        <br />
        <a
          target="_blank"
          rel="noreferrer noopener"
          href="https://g.page/drstevenwilliams?share"
          >Get Directions</a
        >
      </div>
    </wm-google-map>
```