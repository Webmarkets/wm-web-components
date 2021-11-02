/**
 * Regulates marker's position
 */
export default class WmGoogleMapMarker {
  lat: number;
  lng: number;
  icon?: string;

  constructor(lat: number, lng: number, icon?: string) {
    this.lat = lat;
    this.lng = lng;
    this.icon = icon;
  }
}
