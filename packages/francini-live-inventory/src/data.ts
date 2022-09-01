export class City {
  name: string = '';
  title: string = '';
  url: string | undefined;
}
export class Stone {
  name: string = '';
  title: string = '';
  slabRef?: string | undefined;
  bgRef?: string | undefined;
  url?: string | undefined;
}
export class InventoryData {
  cities: City[] = [];
  stones: Stone[] = [];
}
const inventory: InventoryData = {
  cities: [
    {
      name: 'all',
      title: 'All Locations',
      url: '',
    },
    {
      name: 'boise',
      title: 'Boise, ID',
      url: 'BOISE',
    },
    {
      name: 'saltLake',
      title: 'Salt Lake City, UT',
      url: 'SALT%20LAKE%20CITY',
    },
    {
      name: 'sunValley',
      title: 'Sun Valley, CA',
      url: 'SUN%20VALLEY',
    },
    {
      name: 'denver',
      title: 'Denver, CO',
      url: 'DENVER',
    },
    {
      name: 'indio',
      title: 'Indio, CA',
      url: 'INDIO',
    },
    {
      name: 'raleigh',
      title: 'Raleigh, NC',
      url: 'Raleigh-Knightdale',
    },
    {
      name: 'kernersville',
      title: 'Kernersville, NC',
      url: 'KERNERSVILLE',
    },
    {
      name: 'wilmington',
      title: 'Wilmington, NC',
      url: 'WILMINGTON',
    },
  ],
  stones: [
    { name: 'all', title: 'All Stones', slabRef: 'exotics' },
    { name: 'granite', title: 'Granite' },
    { name: 'marble', title: 'Marble' },
    { name: 'lucastone', title: 'Lucastone', url: 'lucastone%20quartz' },
    { name: 'vetrite', title: 'Vetrite', url: 'vetrite%20glass' },
    { name: 'soapstone', title: 'Soapstone' },
    { name: 'forte', bgRef: 'forteporcelain', title: 'Forte', url: 'francini%20forte%20porcelain' },
    { name: 'limestone', title: 'Limestone' },
  ],
};
export default inventory;
