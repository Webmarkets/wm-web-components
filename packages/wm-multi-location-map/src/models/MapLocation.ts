export interface Link {
  url: string;
  newTab: boolean;
}
export interface MapIcon {
  url: string;
  size: any;
}
export default interface MapLocation {
  lat: number;
  lng: number;
  name: string;
  getDirectionsLink: string;
  nameLink: Link;
  icon?: string | MapIcon;
}
