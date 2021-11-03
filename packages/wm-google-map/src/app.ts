import WmGoogleMapMarker from "./WmGoogleMapMarker";
import { WebmarketsGoogleMap } from "./wm-google-map";

let map: WebmarketsGoogleMap = document.querySelector(
  "wm-google-map"
) as WebmarketsGoogleMap;

const markericon =
  "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";

map.addMarker(new WmGoogleMapMarker(43.655613, -116.3536647, markericon));
// map.addMarker(new WmGoogleMapMarker(43.755613, -116.35366));

// map.addMarkers([
//   new WmGoogleMapMarker(43.655613, -116.3536647),
//   new WmGoogleMapMarker(43.755613, -116.35366),
// ]);
