export declare class City {
    name: string;
    title: string;
    url: string | undefined;
}
export declare class Stone {
    name: string;
    title: string;
    slabRef?: string | undefined;
    bgRef?: string | undefined;
    url?: string | undefined;
}
export declare class InventoryData {
    cities: City[];
    stones: Stone[];
}
declare const inventory: InventoryData;
export default inventory;
