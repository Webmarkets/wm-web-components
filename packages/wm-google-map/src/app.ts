import WebmarketsGoogleMap, { WmGoogleMapMarker } from "./wm-google-map";
import "./wm-google-map";

let map: WebmarketsGoogleMap = document.querySelector("wm-google-map") as WebmarketsGoogleMap;

const markericon = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";

map.addMarker(new WmGoogleMapMarker(43.655613, -116.3536647, markericon));
map.addMarker(new WmGoogleMapMarker(43.755613, -116.35366));
const icon = {
  url: "https://totallyboise.com/portals/0/pages/restaurant_tour/assets/pin.svg",
  scaledSize: { x: 30.375, y: 40 },
};

map.addMarkers([new WmGoogleMapMarker(43.655613, -116.3536647, icon, `<h1>Hello</h1>`), new WmGoogleMapMarker(43.755613, -116.35366, icon, `<h1>Hello 2</h1>`)]);
