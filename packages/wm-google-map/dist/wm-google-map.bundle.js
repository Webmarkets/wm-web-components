(function (exports) {
    'use strict';

    /**
     * @license
     * Copyright 2019 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    const t=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,e=Symbol(),s=new Map;class n{constructor(t,s){if(this._$cssResult$=!0,s!==e)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t;}get styleSheet(){let e=s.get(this.cssText);return t&&void 0===e&&(s.set(this.cssText,e=new CSSStyleSheet),e.replaceSync(this.cssText)),e}toString(){return this.cssText}}const o=t=>new n("string"==typeof t?t:t+"",e),r=(t,...s)=>{const o=1===t.length?t[0]:s.reduce(((e,s,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[n+1]),t[0]);return new n(o,e)},S=(e,s)=>{t?e.adoptedStyleSheets=s.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):s.forEach((t=>{const s=document.createElement("style");s.textContent=t.cssText,e.appendChild(s);}));},i=t?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return o(e)})(t):t;

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */var s$1,e$1,r$1,h;const o$1={toAttribute(t,i){switch(i){case Boolean:t=t?"":null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t);}catch(t){s=null;}}return s}},n$1=(t,i)=>i!==t&&(i==i||t==t),l={attribute:!0,type:String,converter:o$1,reflect:!1,hasChanged:n$1};class a extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o();}static addInitializer(t){var i;null!==(i=this.l)&&void 0!==i||(this.l=[]),this.l.push(t);}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this._$Eh(s,i);void 0!==e&&(this._$Eu.set(e,s),t.push(e));})),t}static createProperty(t,i=l){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e);}}static getPropertyDescriptor(t,i,s){return {get(){return this[i]},set(e){const r=this[t];this[i]=e,this.requestUpdate(t,r,s);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||l}static finalize(){if(this.hasOwnProperty("finalized"))return !1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s]);}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(i$1){const s=[];if(Array.isArray(i$1)){const e=new Set(i$1.flat(1/0).reverse());for(const i$1 of e)s.unshift(i(i$1));}else void 0!==i$1&&s.push(i(i$1));return s}static _$Eh(t,i){const s=i.attribute;return !1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}o(){var t;this._$Ev=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Ep(),this.requestUpdate(),null===(t=this.constructor.l)||void 0===t||t.forEach((t=>t(this)));}addController(t){var i,s;(null!==(i=this._$Em)&&void 0!==i?i:this._$Em=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t));}removeController(t){var i;null===(i=this._$Em)||void 0===i||i.splice(this._$Em.indexOf(t)>>>0,1);}_$Ep(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this._$Et.set(i,this[i]),delete this[i]);}));}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return S(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$Em)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)}));}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$Em)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)}));}attributeChangedCallback(t,i,s){this._$AK(t,s);}_$Eg(t,i,s=l){var e,r;const h=this.constructor._$Eh(t,s);if(void 0!==h&&!0===s.reflect){const n=(null!==(r=null===(e=s.converter)||void 0===e?void 0:e.toAttribute)&&void 0!==r?r:o$1.toAttribute)(i,s.type);this._$Ei=t,null==n?this.removeAttribute(h):this.setAttribute(h,n),this._$Ei=null;}}_$AK(t,i){var s,e,r;const h=this.constructor,n=h._$Eu.get(t);if(void 0!==n&&this._$Ei!==n){const t=h.getPropertyOptions(n),l=t.converter,a=null!==(r=null!==(e=null===(s=l)||void 0===s?void 0:s.fromAttribute)&&void 0!==e?e:"function"==typeof l?l:null)&&void 0!==r?r:o$1.fromAttribute;this._$Ei=n,this[n]=a(i,t.type),this._$Ei=null;}}requestUpdate(t,i,s){let e=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||n$1)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),!0===s.reflect&&this._$Ei!==t&&(void 0===this._$ES&&(this._$ES=new Map),this._$ES.set(t,s))):e=!1),!this.isUpdatePending&&e&&(this._$Ev=this._$EC());}async _$EC(){this.isUpdatePending=!0;try{await this._$Ev;}catch(t){Promise.reject(t);}const t=this.performUpdate();return null!=t&&await t,!this.isUpdatePending}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach(((t,i)=>this[i]=t)),this._$Et=void 0);let i=!1;const s=this._$AL;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this._$Em)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this._$E_();}catch(t){throw i=!1,this._$E_(),t}i&&this._$AE(s);}willUpdate(t){}_$AE(t){var i;null===(i=this._$Em)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}_$E_(){this._$AL=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ev}shouldUpdate(t){return !0}update(t){void 0!==this._$ES&&(this._$ES.forEach(((t,i)=>this._$Eg(i,this[i],t))),this._$ES=void 0),this._$E_();}updated(t){}firstUpdated(t){}}a.finalized=!0,a.elementProperties=new Map,a.elementStyles=[],a.shadowRootOptions={mode:"open"},null===(e$1=(s$1=globalThis).reactiveElementPlatformSupport)||void 0===e$1||e$1.call(s$1,{ReactiveElement:a}),(null!==(r$1=(h=globalThis).reactiveElementVersions)&&void 0!==r$1?r$1:h.reactiveElementVersions=[]).push("1.0.0-rc.3");

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    var t$1,i$1,s$2,e$2;const o$2=globalThis.trustedTypes,n$2=o$2?o$2.createPolicy("lit-html",{createHTML:t=>t}):void 0,l$1=`lit$${(Math.random()+"").slice(9)}$`,h$1="?"+l$1,r$2=`<${h$1}>`,u=document,c=(t="")=>u.createComment(t),d=t=>null===t||"object"!=typeof t&&"function"!=typeof t,v=Array.isArray,a$1=t=>{var i;return v(t)||"function"==typeof(null===(i=t)||void 0===i?void 0:i[Symbol.iterator])},f=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,$=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,g=/'/g,p=/"/g,y=/^(?:script|style|textarea)$/i,b=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),T=b(1),w=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),C=new WeakMap,P=(t,i,s)=>{var e,o;const n=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let l=n._$litPart$;if(void 0===l){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=l=new k(i.insertBefore(c(),t),t,void 0,null!=s?s:{});}return l._$AI(t),l},V=u.createTreeWalker(u,129,null,!1),E=(t,i)=>{const s=t.length-1,e=[];let o,h=2===i?"<svg>":"",u=f;for(let i=0;i<s;i++){const s=t[i];let n,c,d=-1,v=0;for(;v<s.length&&(u.lastIndex=v,c=u.exec(s),null!==c);)v=u.lastIndex,u===f?"!--"===c[1]?u=_:void 0!==c[1]?u=m:void 0!==c[2]?(y.test(c[2])&&(o=RegExp("</"+c[2],"g")),u=$):void 0!==c[3]&&(u=$):u===$?">"===c[0]?(u=null!=o?o:f,d=-1):void 0===c[1]?d=-2:(d=u.lastIndex-c[2].length,n=c[1],u=void 0===c[3]?$:'"'===c[3]?p:g):u===p||u===g?u=$:u===_||u===m?u=f:(u=$,o=void 0);const a=u===$&&t[i+1].startsWith("/>")?" ":"";h+=u===f?s+r$2:d>=0?(e.push(n),s.slice(0,d)+"$lit$"+s.slice(d)+l$1+a):s+l$1+(-2===d?(e.push(void 0),i):a);}const c=h+(t[s]||"<?>")+(2===i?"</svg>":"");return [void 0!==n$2?n$2.createHTML(c):c,e]};class M{constructor({strings:t,_$litType$:i},s){let e;this.parts=[];let n=0,r=0;const u=t.length-1,d=this.parts,[v,a]=E(t,i);if(this.el=M.createElement(v,s),V.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes);}for(;null!==(e=V.nextNode())&&d.length<u;){if(1===e.nodeType){if(e.hasAttributes()){const t=[];for(const i of e.getAttributeNames())if(i.endsWith("$lit$")||i.startsWith(l$1)){const s=a[r++];if(t.push(i),void 0!==s){const t=e.getAttribute(s.toLowerCase()+"$lit$").split(l$1),i=/([.?@])?(.*)/.exec(s);d.push({type:1,index:n,name:i[2],strings:t,ctor:"."===i[1]?I:"?"===i[1]?L:"@"===i[1]?R:H});}else d.push({type:6,index:n});}for(const i of t)e.removeAttribute(i);}if(y.test(e.tagName)){const t=e.textContent.split(l$1),i=t.length-1;if(i>0){e.textContent=o$2?o$2.emptyScript:"";for(let s=0;s<i;s++)e.append(t[s],c()),V.nextNode(),d.push({type:2,index:++n});e.append(t[i],c());}}}else if(8===e.nodeType)if(e.data===h$1)d.push({type:2,index:n});else{let t=-1;for(;-1!==(t=e.data.indexOf(l$1,t+1));)d.push({type:7,index:n}),t+=l$1.length-1;}n++;}}static createElement(t,i){const s=u.createElement("template");return s.innerHTML=t,s}}function N(t,i,s=t,e){var o,n,l,h;if(i===w)return i;let r=void 0!==e?null===(o=s._$Cl)||void 0===o?void 0:o[e]:s._$Cu;const u=d(i)?void 0:i._$litDirective$;return (null==r?void 0:r.constructor)!==u&&(null===(n=null==r?void 0:r._$AO)||void 0===n||n.call(r,!1),void 0===u?r=void 0:(r=new u(t),r._$AT(t,s,e)),void 0!==e?(null!==(l=(h=s)._$Cl)&&void 0!==l?l:h._$Cl=[])[e]=r:s._$Cu=r),void 0!==r&&(i=N(t,r._$AS(t,i.values),r,e)),i}class S$1{constructor(t,i){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get _$AU(){return this._$AM._$AU}p(t){var i;const{el:{content:s},parts:e}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:u).importNode(s,!0);V.currentNode=o;let n=V.nextNode(),l=0,h=0,r=e[0];for(;void 0!==r;){if(l===r.index){let i;2===r.type?i=new k(n,n.nextSibling,this,t):1===r.type?i=new r.ctor(n,r.name,r.strings,this,t):6===r.type&&(i=new z(n,this,t)),this.v.push(i),r=e[++h];}l!==(null==r?void 0:r.index)&&(n=V.nextNode(),l++);}return o}m(t){let i=0;for(const s of this.v)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class k{constructor(t,i,s,e){this.type=2,this._$C_=!0,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e;}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$C_}get parentNode(){return this._$AA.parentNode}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=N(this,t,i),d(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==w&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.A(t):a$1(t)?this.M(t):this.$(t);}C(t,i=this._$AB){return this._$AA.parentNode.insertBefore(t,i)}A(t){this._$AH!==t&&(this._$AR(),this._$AH=this.C(t));}$(t){const i=this._$AA.nextSibling;null!==i&&3===i.nodeType&&(null===this._$AB?null===i.nextSibling:i===this._$AB.previousSibling)?i.data=t:this.A(u.createTextNode(t)),this._$AH=t;}T(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=M.createElement(e.h,this.options)),e);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.m(s);else{const t=new S$1(o,this),i=t.p(this.options);t.m(s),this.A(i),this._$AH=t;}}_$AC(t){let i=C.get(t.strings);return void 0===i&&C.set(t.strings,i=new M(t)),i}M(t){v(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const o of t)e===i.length?i.push(s=new k(this.C(c()),this.C(c()),this,this.options)):s=i[e],s._$AI(o),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){var i;void 0===this._$AM&&(this._$C_=t,null===(i=this._$AP)||void 0===i||i.call(this,t));}}class H{constructor(t,i,s,e,o){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(A),this.strings=s):this._$AH=A;}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,e){const o=this.strings;let n=!1;if(void 0===o)t=N(this,t,i,0),n=!d(t)||t!==this._$AH&&t!==w,n&&(this._$AH=t);else{const e=t;let l,h;for(t=o[0],l=0;l<o.length-1;l++)h=N(this,e[s+l],i,l),h===w&&(h=this._$AH[l]),n||(n=!d(h)||h!==this._$AH[l]),h===A?t=A:t!==A&&(t+=(null!=h?h:"")+o[l+1]),this._$AH[l]=h;}n&&!e&&this.P(t);}P(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"");}}class I extends H{constructor(){super(...arguments),this.type=3;}P(t){this.element[this.name]=t===A?void 0:t;}}class L extends H{constructor(){super(...arguments),this.type=4;}P(t){t&&t!==A?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name);}}class R extends H{constructor(){super(...arguments),this.type=5;}_$AI(t,i=this){var s;if((t=null!==(s=N(this,t,i,0))&&void 0!==s?s:A)===w)return;const e=this._$AH,o=t===A&&e!==A||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,n=t!==A&&(e===A||o);o&&this.element.removeEventListener(this.name,this,e),n&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){var i,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t);}}class z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){N(this,t);}}null===(i$1=(t$1=globalThis).litHtmlPlatformSupport)||void 0===i$1||i$1.call(t$1,M,k),(null!==(s$2=(e$2=globalThis).litHtmlVersions)&&void 0!==s$2?s$2:e$2.litHtmlVersions=[]).push("2.0.0-rc.4");

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */var i$2,l$2,o$3,s$3,n$3,a$2;class h$2 extends a{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0;}createRenderRoot(){var t,e;const r=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=r.firstChild),r}update(t){const r=this.render();super.update(t),this._$Dt=P(r,this.renderRoot,this.renderOptions);}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!0);}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!1);}render(){return w}}h$2.finalized=!0,h$2._$litElement$=!0,null===(l$2=(i$2=globalThis).litElementHydrateSupport)||void 0===l$2||l$2.call(i$2,{LitElement:h$2}),null===(s$3=(o$3=globalThis).litElementPlatformSupport)||void 0===s$3||s$3.call(o$3,{LitElement:h$2});(null!==(n$3=(a$2=globalThis).litElementVersions)&&void 0!==n$3?n$3:a$2.litElementVersions=[]).push("3.0.0-rc.3");

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    const n$4=n=>e=>"function"==typeof e?((n,e)=>(window.customElements.define(n,e),e))(n,e):((n,e)=>{const{kind:t,elements:i}=e;return {kind:t,elements:i,finisher(e){window.customElements.define(n,e);}}})(n,e);

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    const i$3=(i,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(n){n.createProperty(e.key,i);}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this));},finisher(n){n.createProperty(e.key,i);}};function e$3(e){return (n,t)=>void 0!==t?((i,e,n)=>{e.constructor.createProperty(n,i);})(e,n,t):i$3(e,n)}

    class ScriptLoaderMap {
        constructor() {
            this.apiMap = {};
        }
        require(url, notifyCallback, jsonpCallbackName) {
            var name = this.nameFromUrl(url);
            if (!this.apiMap[name])
                this.apiMap[name] = new ScriptLoader(name, url, jsonpCallbackName);
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

    var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    class JsonpLibraryElement extends h$2 {
        constructor() {
            super(...arguments);
            this.libraryLoaded = false;
            this.libraryErrorMessage = null;
            this.isReady = false;
        }
        get callbackName() {
            return null;
        }
        libraryUrlChanged() {
            if (this.isReady && this.libraryUrl != null)
                this.loadLibrary();
        }
        libraryLoadCallback(error, detail) {
            if (error) {
                console.warn('Library load failed:', error.message);
                this.libraryErrorMessage = error.message;
            }
            else {
                this.libraryErrorMessage = null;
                this.libraryLoaded = true;
                if (this.notifyEvent != null) {
                    this.dispatchEvent(new CustomEvent(this.notifyEvent, { detail: detail, composed: true }));
                }
            }
        }
        loadLibrary() {
            ScriptLoaderMap.getInstance().require(this.libraryUrl, this.libraryLoadCallback.bind(this), this.callbackName);
        }
        connectedCallback() {
            super.connectedCallback();
            this.isReady = true;
            if (this.libraryUrl != null)
                this.loadLibrary();
        }
    }
    exports.LitGoogleMapsApi = class LitGoogleMapsApi extends JsonpLibraryElement {
        constructor() {
            super(...arguments);
            this.apiKey = '';
            this.clientId = '';
            this.mapsUrl = 'https://maps.googleapis.com/maps/api/js?callback=%%callback%%';
            this.version = '3.39';
            this.language = '';
        }
        get libraryUrl() {
            return this.computeUrl(this.mapsUrl, this.version, this.apiKey, this.clientId, this.language);
        }
        get notifyEvent() {
            return 'api-load';
        }
        computeUrl(mapsUrl, version, apiKey, clientId, language) {
            var url = mapsUrl + '&v=' + version;
            url += '&libraries=drawing,geometry,places,visualization';
            if (apiKey && !clientId) {
                url += '&key=' + apiKey;
            }
            if (clientId) {
                url += '&client=' + clientId;
            }
            if (!apiKey && !clientId) {
                var warning = 'No Google Maps API Key or Client ID specified. ' +
                    'See https://developers.google.com/maps/documentation/javascript/get-api-key ' +
                    'for instructions to get started with a key or client id.';
                console.warn(warning);
            }
            if (language) {
                url += '&language=' + language;
            }
            return url;
        }
    };
    __decorate([
        e$3({ type: String, attribute: 'api-key' }),
        __metadata("design:type", Object)
    ], exports.LitGoogleMapsApi.prototype, "apiKey", void 0);
    __decorate([
        e$3({ type: String, attribute: 'client-id' }),
        __metadata("design:type", Object)
    ], exports.LitGoogleMapsApi.prototype, "clientId", void 0);
    __decorate([
        e$3({ type: String, attribute: 'maps-url' }),
        __metadata("design:type", Object)
    ], exports.LitGoogleMapsApi.prototype, "mapsUrl", void 0);
    __decorate([
        e$3({ type: String }),
        __metadata("design:type", Object)
    ], exports.LitGoogleMapsApi.prototype, "version", void 0);
    __decorate([
        e$3({ type: String }),
        __metadata("design:type", Object)
    ], exports.LitGoogleMapsApi.prototype, "language", void 0);
    exports.LitGoogleMapsApi = __decorate([
        n$4('lit-google-maps-api')
    ], exports.LitGoogleMapsApi);

    var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$1 = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    exports.WebmarketsGoogleMapMarker = class WebmarketsGoogleMapMarker extends h$2 {
        constructor() {
            super(...arguments);
            this.latitude = 0;
            this.longitude = 0;
            this.label = null;
            this.zIndex = 0;
            this.open = false;
            this.map = null;
            this.marker = null;
            this.autopopup = false;
        }
        connectedCallback() {
            super.connectedCallback();
            window.addEventListener("load", this.autopopup
                ? () => this._autoPopupMarker()
                : () => console.log("Not auto"));
        }
        disconnectedCallback() {
            window.removeEventListener("load", this.autopopup
                ? () => this._autoPopupMarker()
                : () => console.log("Not auto"));
            super.disconnectedCallback();
        }
        _autoPopupMarker() {
            if (!this.info)
                return;
            this.info.open(this.map, this.marker);
            this.dispatchEvent(new CustomEvent("google-map-marker-open", { bubbles: true }));
        }
        attributeChangedCallback(name, oldval, newval) {
            var _a, _b;
            super.attributeChangedCallback(name, oldval, newval);
            switch (name) {
                case "open": {
                    this.openChanged();
                    break;
                }
                case "latitude": {
                    this.updatePosition();
                    break;
                }
                case "longitude": {
                    this.updatePosition();
                    break;
                }
                case "label": {
                    (_a = this.marker) === null || _a === void 0 ? void 0 : _a.setLabel(newval);
                    break;
                }
                case "z-index": {
                    (_b = this.marker) === null || _b === void 0 ? void 0 : _b.setZIndex(newval);
                    break;
                }
            }
        }
        openChanged() {
            if (!this.info)
                return;
            if (this.open) {
                this.info.open(this.map, this.marker);
                this.dispatchEvent(new CustomEvent("google-map-marker-open", { bubbles: true }));
            }
            else {
                this.info.close();
                this.dispatchEvent(new CustomEvent("google-map-marker-close", { bubbles: true }));
            }
        }
        updatePosition() {
            var _a;
            (_a = this.marker) === null || _a === void 0 ? void 0 : _a.setPosition(new google.maps.LatLng(this.latitude, this.longitude));
        }
        changeMap(newMap) {
            this.map = newMap;
            this.mapChanged();
        }
        mapChanged() {
            if (this.marker) {
                this.marker.setMap(null);
                google.maps.event.clearInstanceListeners(this.marker);
            }
            if (this.map && this.map instanceof google.maps.Map) {
                this.mapReady();
            }
        }
        mapReady() {
            this.marker = new google.maps.Marker({
                map: this.map,
                position: {
                    lat: this.latitude,
                    lng: this.longitude,
                },
                label: this.label,
                zIndex: this.zIndex,
            });
            this.contentChanged();
        }
        contentChanged() {
            if (this.contentObserver)
                this.contentObserver.disconnect();
            this.contentObserver = new MutationObserver(this.contentChanged.bind(this));
            this.contentObserver.observe(this, {
                childList: true,
                subtree: true,
            });
            var content = this.innerHTML.trim();
            if (content) {
                if (!this.info) {
                    this.info = new google.maps.InfoWindow();
                    this.openInfoHandler = google.maps.event.addListener(this.marker, "click", function () {
                        this.open = true;
                    }.bind(this));
                    this.closeInfoHandler = google.maps.event.addListener(this.info, "closeclick", function () {
                        this.open = false;
                    }.bind(this));
                }
                this.info.setContent(content);
            }
            else {
                if (this.info) {
                    google.maps.event.removeListener(this.openInfoHandler);
                    google.maps.event.removeListener(this.closeInfoHandler);
                    this.info = null;
                }
            }
        }
    };
    __decorate$1([
        e$3({ type: Number, reflect: true }),
        __metadata$1("design:type", Number)
    ], exports.WebmarketsGoogleMapMarker.prototype, "latitude", void 0);
    __decorate$1([
        e$3({ type: Number, reflect: true }),
        __metadata$1("design:type", Number)
    ], exports.WebmarketsGoogleMapMarker.prototype, "longitude", void 0);
    __decorate$1([
        e$3({ type: String, reflect: true }),
        __metadata$1("design:type", String)
    ], exports.WebmarketsGoogleMapMarker.prototype, "label", void 0);
    __decorate$1([
        e$3({ type: Number, reflect: true, attribute: "z-index" }),
        __metadata$1("design:type", Number)
    ], exports.WebmarketsGoogleMapMarker.prototype, "zIndex", void 0);
    __decorate$1([
        e$3({ type: Boolean, reflect: true }),
        __metadata$1("design:type", Boolean)
    ], exports.WebmarketsGoogleMapMarker.prototype, "open", void 0);
    __decorate$1([
        e$3({ type: Boolean, reflect: true }),
        __metadata$1("design:type", Boolean)
    ], exports.WebmarketsGoogleMapMarker.prototype, "autopopup", void 0);
    exports.WebmarketsGoogleMapMarker = __decorate$1([
        n$4("wm-google-map-marker")
    ], exports.WebmarketsGoogleMapMarker);

    var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$2 = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    exports.WebmarketsGoogleMap = class WebmarketsGoogleMap extends h$2 {
        constructor() {
            super(...arguments);
            this.apiKey = '';
            this.version = '3.39';
            this.styles = [{ "featureType": "administrative", "elementType": "geometry", "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative.land_parcel", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi", "stylers": [{ "visibility": "off" }] }, { "featureType": "road", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "road.local", "eleme ntType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "stylers": [{ "visibility": "off" }] }];
            this.zoom = 8;
            this.fitToMarkers = false;
            this.mapType = 'roadmap';
            this.centerLatitude = -34.397;
            this.centerLongitude = 150.644;
            this.map = null;
        }
        initGMap() {
            if (this.map != null) {
                return;
            }
            var gMapApiElement = this.shadowRoot.getElementById('api');
            if (gMapApiElement == null || gMapApiElement.libraryLoaded != true) {
                return;
            }
            this.map = new google.maps.Map(this.shadowRoot.getElementById('map'), this.getMapOptions());
            this.updateMarkers();
        }
        getMapOptions() {
            return {
                zoom: this.zoom,
                center: { lat: this.centerLatitude, lng: this.centerLongitude },
                mapTypeId: this.mapType,
                styles: this.styles
            };
        }
        mapApiLoaded() {
            this.initGMap();
        }
        connectedCallback() {
            super.connectedCallback();
            this.initGMap();
        }
        attachChildrenToMap(children) {
            if (this.map) {
                for (var i = 0, child; child = children[i]; ++i) {
                    child.changeMap(this.map);
                }
            }
        }
        observeMarkers() {
            if (this.marketObserverSet)
                return;
            this.addEventListener("items-changed", event => { this.updateMarkers(); });
            this.marketObserverSet = true;
        }
        updateMarkers() {
            this.observeMarkers();
            var markersSelector = this.shadowRoot.getElementById("markers-selector");
            if (!markersSelector)
                return;
            var newMarkers = markersSelector.items;
            if (this.markers && newMarkers.length === this.markers.length) {
                var added = newMarkers.filter(m => {
                    return this.markers && this.markers.indexOf(m) === -1;
                });
                if (added.length == 0)
                    return;
            }
            this.markers = newMarkers;
            this.attachChildrenToMap(this.markers);
            if (this.fitToMarkers) {
                this.fitToMarkersChanged();
            }
        }
        fitToMarkersChanged() {
            if (this.map && this.fitToMarkers && this.markers.length > 0) {
                var latLngBounds = new google.maps.LatLngBounds();
                for (var i = 0, m; m = this.markers[i]; ++i) {
                    latLngBounds.extend(new google.maps.LatLng(m.latitude, m.longitude));
                }
                if (this.markers.length > 1) {
                    this.map.fitBounds(latLngBounds);
                }
                this.map.setCenter(latLngBounds.getCenter());
            }
        }
        deselectMarker(event) {
        }
        static get styles() {
            return r `
            #map {
                width: 100%;
                height: 100%;
            }
        `;
        }
        render() {
            return T `
            <lit-google-maps-api id="api" api-key=${this.apiKey} version=${this.version} @api-load=${() => this.mapApiLoaded()}></lit-google-maps-api>
            <lit-selector 
                id="markers-selector"
                selected-attribute="open"
                activate-event="google-map-marker-open"
                @google-map-marker-close=${(e) => this.deselectMarker(e)}>
                    <slot id="markers" name="markers"></slot>
            </lit-selector>
            <div id="map">
            </div>
        `;
        }
    };
    __decorate$2([
        e$3({ type: String, attribute: 'api-key' }),
        __metadata$2("design:type", String)
    ], exports.WebmarketsGoogleMap.prototype, "apiKey", void 0);
    __decorate$2([
        e$3({ type: String }),
        __metadata$2("design:type", String)
    ], exports.WebmarketsGoogleMap.prototype, "version", void 0);
    __decorate$2([
        e$3({ type: Object }),
        __metadata$2("design:type", Object)
    ], exports.WebmarketsGoogleMap.prototype, "styles", void 0);
    __decorate$2([
        e$3({ type: Number }),
        __metadata$2("design:type", Number)
    ], exports.WebmarketsGoogleMap.prototype, "zoom", void 0);
    __decorate$2([
        e$3({ type: Boolean, attribute: 'fit-to-markers' }),
        __metadata$2("design:type", Boolean)
    ], exports.WebmarketsGoogleMap.prototype, "fitToMarkers", void 0);
    __decorate$2([
        e$3({ type: String, attribute: 'map-type' }),
        __metadata$2("design:type", String)
    ], exports.WebmarketsGoogleMap.prototype, "mapType", void 0);
    __decorate$2([
        e$3({ type: Number, attribute: 'center-latitude' }),
        __metadata$2("design:type", Number)
    ], exports.WebmarketsGoogleMap.prototype, "centerLatitude", void 0);
    __decorate$2([
        e$3({ type: Number, attribute: 'center-longitude' }),
        __metadata$2("design:type", Number)
    ], exports.WebmarketsGoogleMap.prototype, "centerLongitude", void 0);
    exports.WebmarketsGoogleMap = __decorate$2([
        n$4('wm-google-map')
    ], exports.WebmarketsGoogleMap);

    class XSelection {
        constructor(selectCallback) {
            this.multi = false;
            this.selection = [];
            this.selectCallback = selectCallback;
        }
        get() {
            return this.multi ? this.selection.slice() : this.selection[0];
        }
        clear(excludes) {
            this.selection.slice().forEach(item => {
                if (!excludes || excludes.indexOf(item) < 0)
                    this.setItemSelected(item, false);
            });
        }
        isSelected(item) {
            return this.selection.indexOf(item) >= 0;
        }
        setItemSelected(item, isSelected) {
            if (item == null || isSelected == this.isSelected(item))
                return;
            if (isSelected) {
                this.selection.push(item);
            }
            else {
                var i = this.selection.indexOf(item);
                if (i >= 0) {
                    this.selection.splice(i, 1);
                }
            }
            if (this.selectCallback) {
                this.selectCallback(item, isSelected);
            }
        }
        select(item) {
            if (this.multi) {
                this.toggle(item);
            }
            else if (this.get() !== item) {
                this.setItemSelected(this.get(), false);
                this.setItemSelected(item, true);
            }
        }
        toggle(item) {
            this.setItemSelected(item, !this.isSelected(item));
        }
    }

    var __decorate$3 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$3 = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    exports.LitSelector = class LitSelector extends h$2 {
        constructor() {
            super(...arguments);
            this.activateEvent = 'tap';
            this.selectedAttribute = null;
            this.selected = null;
            this._selection = new XSelection((item, isSelected) => this.applySelection(item, isSelected));
            this._items = [];
        }
        get items() {
            return this._items;
        }
        connectedCallback() {
            super.connectedCallback();
            this.addEventListener('slotchange', event => {
                event.stopPropagation();
                this.updateItems();
                this.dispatchEvent(new CustomEvent("selector-items-changed", { detail: {}, composed: true }));
            });
            this.addListener(this.activateEvent);
        }
        disconnectedCallback() {
            super.disconnectedCallback();
            this.removeListener(this.activateEvent);
        }
        attributeChangedCallback(name, oldval, newval) {
            super.attributeChangedCallback(name, oldval, newval);
            switch (name) {
                case 'selected': {
                    this.updateSelected();
                    break;
                }
            }
        }
        applySelection(item, isSelected) {
            if (this.selectedAttribute && item instanceof Element) {
                if (isSelected != item.hasAttribute(this.selectedAttribute))
                    item.toggleAttribute(this.selectedAttribute);
            }
        }
        updateItems() {
            var _a;
            var slotElement = this.querySelector("slot");
            this._items = (_a = slotElement === null || slotElement === void 0 ? void 0 : slotElement.assignedNodes()) !== null && _a !== void 0 ? _a : [];
        }
        addListener(eventName) {
            this.addEventListener(eventName, (event) => this.activateHandler(event));
        }
        removeListener(eventName) {
            this.removeEventListener(eventName, (event) => this.activateHandler(event));
        }
        activateHandler(event) {
            var t = event.target;
            var items = this.items;
            while (t && t != this) {
                var i = items.indexOf(t);
                if (i >= 0) {
                    var value = this.indexToValue(i);
                    this.itemActivate(value, t);
                    return;
                }
                t = t.parentNode;
            }
        }
        itemActivate(value, item) {
            if (this.dispatchEvent(new CustomEvent('selector-item-activate', { detail: { selected: value, item: item }, composed: true, cancelable: true })))
                this.select(value);
        }
        select(value) {
            this.selected = value;
        }
        updateSelected() {
            this.selectSelected(this.selected);
        }
        selectSelected(selected) {
            if (!this._items)
                return;
            var item = this.valueToItem(this.selected);
            if (item) {
                this._selection.select(item);
            }
            else {
                this._selection.clear();
            }
        }
        valueToItem(value) {
            return (value == null) ? null : this._items[this.valueToIndex(value)];
        }
        valueToIndex(value) {
            return Number(value);
        }
        indexToValue(index) {
            return index;
        }
        indexOf(item) {
            return this._items ? this._items.indexOf(item) : -1;
        }
    };
    __decorate$3([
        e$3({ type: String, attribute: 'activate-event' }),
        __metadata$3("design:type", String)
    ], exports.LitSelector.prototype, "activateEvent", void 0);
    __decorate$3([
        e$3({ type: String, attribute: 'selected-attribute' }),
        __metadata$3("design:type", String)
    ], exports.LitSelector.prototype, "selectedAttribute", void 0);
    __decorate$3([
        e$3({ type: Number, reflect: true }),
        __metadata$3("design:type", Object)
    ], exports.LitSelector.prototype, "selected", void 0);
    exports.LitSelector = __decorate$3([
        n$4('lit-selector')
    ], exports.LitSelector);

    return exports;

}({}));
