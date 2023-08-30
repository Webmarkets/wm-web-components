/**
 * Regulates marker's position
 */
export default class WmGoogleMapMarker {
  lat: number;
  lng: number;
  icon?: string | WmGoogleMapIcon;
  infoWindowContent?: string;

  constructor(lat: number, lng: number, icon?: string | WmGoogleMapIcon, infoWindowContent?: string) {
    this.lat = lat;
    this.lng = lng;
    this.icon = icon;
    this.infoWindowContent = infoWindowContent;
  }
}
export interface WmGoogleMapIcon {
  url: string;
  size?: TwoDimensionalValue;
  origin?: TwoDimensionalValue;
  anchor?: TwoDimensionalValue;
  scaledSize?: TwoDimensionalValue;
}
export interface TwoDimensionalValue {
  x: number;
  y: number;
}
