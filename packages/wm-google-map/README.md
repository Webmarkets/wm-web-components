# wm-google-map

This is a component for adding a Google Map on page with minimal styles

## Examples

### Simple HTML Single Marker

```html
<wm-google-map api-key="" lat="43.612255" lng="-116.292516" show-marker auto-open-marker>
  <div>
    <h3>Steven Williams, MD</h3>
    <p>8854 Emerald St Ste 140, Boise, ID 83704</p>
    <a target="_blank" rel="noreferrer noopener" href="https://www.google.com/search?hl=en-US&gl=us&q=Steven+Williams,+MD+-+Boise+General+Surgeon,+8854+Emerald+St+Ste+140,+Boise,+ID+83704&ludocid=17340090931558700075&lsig=AB86z5W6-Lrgb-vbqCCh-CT2HxDg&hl=en&gl=US#lrd=0x54ae561e751ffd4f:0xf0a460d49c87542b,1">View Reviews</a>
    <br />
    <br />
    <a target="_blank" rel="noreferrer noopener" href="https://g.page/drstevenwilliams?share">Get Directions</a>
  </div>
</wm-google-map>
```

### Multiple Markers

```html
<wm-google-map id="home-map" api-key="INSERTGOOGLEMAPSKEY" lat="38.4602662" lng="-123.0080742" zoom="10">
  <div>
    <h3>North Bay Eye Associates - Healdsburg</h3>
    <p>
      1310 Prentice Dr # F
      <br />
      Healdsburg, CA 95448, USA
    </p>
  </div>
</wm-google-map>
```

```js
// CDN imports
import 'https://cdn.jsdelivr.net/npm/@webmarkets/wm-google-map@1.3.1/dist/wm-google-map.es.min.js';
import { WmGoogleMapMarker } from 'https://cdn.jsdelivr.net/npm/@webmarkets/wm-google-map@1.3.1/dist/wm-google-map.es.min.js';

// get the map programatically
let map = document.getElementById('home-map');

// add a custom marker with a URL to an image (20px x 32px recommended)
const customMarkerIcon = '/Portals/0/Images/Icons/MapPin.png';

// single marker
// map.addMarker(new WmGoogleMapMarker(38.6266173, -122.8685504));

// multiple markets
map.addMarkers([
  // Headlesburg Location
  new WmGoogleMapMarker(38.6269463, -122.8660559, customMarkerIcon),
  // Santa Rosa Location
  new WmGoogleMapMarker(38.447645, -122.7345767, customMarkerIcon),
]);
```
