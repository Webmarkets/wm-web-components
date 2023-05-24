export interface Link {
  url: string;
  newTab: boolean;
}
export default interface MapLocation {
  lat: number;
  lng: number;
  name: string;
  getDirectionsLink: string;
  nameLink: Link;
}
