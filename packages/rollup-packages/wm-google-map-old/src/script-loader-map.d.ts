export interface notifyCallback {
    (error: Error, result: any): void;
}
export declare class ScriptLoaderMap {
    private static instance;
    private apiMap;
    require(url: string, notifyCallback: notifyCallback, jsonpCallbackName: string): void;
    static getInstance(): ScriptLoaderMap;
    private nameFromUrl;
}
//# sourceMappingURL=script-loader-map.d.ts.map