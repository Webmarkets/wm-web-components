
/**
 * Regulates marker's position
 */
export default class WmGoogleMapMarker {
  lat: number;
  lng: number;
  icon?: string;
  infoWindowContent?: string;;

  constructor(lat: number, lng: number, icon?: string, infoWindowContent?: string) {
    this.lat = lat;
    this.lng = lng;
    this.icon = icon;
    this.infoWindowContent = infoWindowContent;
  }
}
