export declare class XSelection<TItem> {
    multi: boolean;
    selection: Array<TItem>;
    selectCallback: (item: TItem, isSelected: boolean) => void;
    constructor(selectCallback?: (item: TItem, isSelected: boolean) => void);
    get(): Array<TItem> | TItem;
    clear(excludes?: Array<TItem>): void;
    isSelected(item: TItem): boolean;
    setItemSelected(item: TItem, isSelected: boolean): void;
    select(item: TItem): void;
    toggle(item: TItem): void;
}
//# sourceMappingURL=selection.d.ts.map