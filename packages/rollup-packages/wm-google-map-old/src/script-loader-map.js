export class ScriptLoaderMap {
    constructor() {
        this.apiMap = {}; // { hash -> Loader }
    }
    require(url, notifyCallback, jsonpCallbackName) {
        var name = this.nameFromUrl(url);
        // create a loader as needed
        if (!this.apiMap[name])
            this.apiMap[name] = new ScriptLoader(name, url, jsonpCallbackName);
        // ask for notification
        this.apiMap[name].requestNotify(notifyCallback);
    }
    static getInstance() {
        if (!ScriptLoaderMap.instance) {
            ScriptLoaderMap.instance = new ScriptLoaderMap();
        }
        return ScriptLoaderMap.instance;
    }
    nameFromUrl(url) {
        return url.replace(/[\:\/\%\?\&\.\=\-\,]/g, '_') + '_api';
    }
}
class ScriptLoader {
    constructor(name, url, callbackName) {
        this.callbackMacro = '%%callback%%';
        this.loaded = false;
        this.script = null;
        this.notifiers = [];
        // callback is specified either as callback name
        // or computed dynamically if url has callbackMacro in it
        if (!callbackName) {
            if (url.indexOf(this.callbackMacro) >= 0) {
                callbackName = name + '_loaded';
                url = url.replace(this.callbackMacro, callbackName);
            }
            else {
                console.error('ScriptLoader class: a %%callback%% parameter is required in libraryUrl');
                return;
            }
        }
        this.callbackName = callbackName;
        window[this.callbackName] = this.success.bind(this);
        this.addScript(url);
    }
    addScript(src) {
        var script = document.createElement('script');
        script.src = src;
        script.onerror = this.handleError.bind(this);
        var s = document.querySelector('script') || document.body;
        s.parentNode.insertBefore(script, s);
        this.script = script;
    }
    removeScript() {
        if (this.script.parentNode) {
            this.script.parentNode.removeChild(this.script);
        }
        this.script = null;
    }
    handleError(ev) {
        this.error = new Error('Library failed to load');
        this.notifyAll();
        this.cleanup();
    }
    success() {
        this.loaded = true;
        this.result = Array.prototype.slice.call(arguments);
        this.notifyAll();
        this.cleanup();
    }
    cleanup() {
        delete window[this.callbackName];
    }
    notifyAll() {
        this.notifiers.forEach(function (notifyCallback) {
            notifyCallback(this.error, this.result);
        }.bind(this));
        this.notifiers = [];
    }
    requestNotify(notifyCallback) {
        if (this.loaded || this.error) {
            notifyCallback(this.error, this.result);
        }
        else {
            this.notifiers.push(notifyCallback);
        }
    }
}
//# sourceMappingURL=script-loader-map.js.map