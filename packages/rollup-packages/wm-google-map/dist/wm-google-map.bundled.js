/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new Map;class e{constructor(t,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){let i=s.get(this.cssText);return t&&void 0===i&&(s.set(this.cssText,i=new CSSStyleSheet),i.replaceSync(this.cssText)),i}toString(){return this.cssText}}const o=t?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let s="";for(const i of t.cssRules)s+=i.cssText;return(t=>new e("string"==typeof t?t:t+"",i))(s)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var n,r;const h={toAttribute(t,i){switch(i){case Boolean:t=t?"":null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},l=(t,i)=>i!==t&&(i==i||t==t),a={attribute:!0,type:String,converter:h,reflect:!1,hasChanged:l};class u extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(t){var i;null!==(i=this.l)&&void 0!==i||(this.l=[]),this.l.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this._$Eh(s,i);void 0!==e&&(this._$Eu.set(e,s),t.push(e))})),t}static createProperty(t,i=a){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e)}}static getPropertyDescriptor(t,i,s){return{get(){return this[i]},set(e){const o=this[t];this[i]=e,this.requestUpdate(t,o,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||a}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const i=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)i.unshift(o(t))}else void 0!==t&&i.push(o(t));return i}static _$Eh(t,i){const s=i.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}o(){var t;this._$Ev=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Ep(),this.requestUpdate(),null===(t=this.constructor.l)||void 0===t||t.forEach((t=>t(this)))}addController(t){var i,s;(null!==(i=this._$Em)&&void 0!==i?i:this._$Em=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t))}removeController(t){var i;null===(i=this._$Em)||void 0===i||i.splice(this._$Em.indexOf(t)>>>0,1)}_$Ep(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this._$Et.set(i,this[i]),delete this[i])}))}createRenderRoot(){var i;const s=null!==(i=this.shadowRoot)&&void 0!==i?i:this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{t?i.adoptedStyleSheets=s.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):s.forEach((t=>{const s=document.createElement("style");s.textContent=t.cssText,i.appendChild(s)}))})(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$Em)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$Em)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)}))}attributeChangedCallback(t,i,s){this._$AK(t,s)}_$Eg(t,i,s=a){var e,o;const n=this.constructor._$Eh(t,s);if(void 0!==n&&!0===s.reflect){const r=(null!==(o=null===(e=s.converter)||void 0===e?void 0:e.toAttribute)&&void 0!==o?o:h.toAttribute)(i,s.type);this._$Ei=t,null==r?this.removeAttribute(n):this.setAttribute(n,r),this._$Ei=null}}_$AK(t,i){var s,e,o;const n=this.constructor,r=n._$Eu.get(t);if(void 0!==r&&this._$Ei!==r){const t=n.getPropertyOptions(r),l=t.converter,a=null!==(o=null!==(e=null===(s=l)||void 0===s?void 0:s.fromAttribute)&&void 0!==e?e:"function"==typeof l?l:null)&&void 0!==o?o:h.fromAttribute;this._$Ei=r,this[r]=a(i,t.type),this._$Ei=null}}requestUpdate(t,i,s){let e=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||l)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),!0===s.reflect&&this._$Ei!==t&&(void 0===this._$ES&&(this._$ES=new Map),this._$ES.set(t,s))):e=!1),!this.isUpdatePending&&e&&(this._$Ev=this._$EC())}async _$EC(){this.isUpdatePending=!0;try{await this._$Ev}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach(((t,i)=>this[i]=t)),this._$Et=void 0);let i=!1;const s=this._$AL;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this._$Em)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this._$ET()}catch(t){throw i=!1,this._$ET(),t}i&&this._$AE(s)}willUpdate(t){}_$AE(t){var i;null===(i=this._$Em)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$ET(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ev}shouldUpdate(t){return!0}update(t){void 0!==this._$ES&&(this._$ES.forEach(((t,i)=>this._$Eg(i,this[i],t))),this._$ES=void 0),this._$ET()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var d,c;u.finalized=!0,u.elementProperties=new Map,u.elementStyles=[],u.shadowRootOptions={mode:"open"},null===(n=globalThis.reactiveElementPlatformSupport)||void 0===n||n.call(globalThis,{ReactiveElement:u}),(null!==(r=globalThis.reactiveElementVersions)&&void 0!==r?r:globalThis.reactiveElementVersions=[]).push("1.0.0-rc.4");const v=globalThis.trustedTypes,p=v?v.createPolicy("lit-html",{createHTML:t=>t}):void 0,f=`lit$${(Math.random()+"").slice(9)}$`,y="?"+f,g=`<${y}>`,b=document,m=(t="")=>b.createComment(t),w=t=>null===t||"object"!=typeof t&&"function"!=typeof t,$=Array.isArray,S=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,k=/-->/g,_=/>/g,T=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,C=/'/g,A=/"/g,O=/^(?:script|style|textarea)$/i,M=(t=>(i,...s)=>({_$litType$:t,strings:i,values:s}))(1),j=Symbol.for("lit-noChange"),N=Symbol.for("lit-nothing"),x=new WeakMap,E=b.createTreeWalker(b,129,null,!1),U=(t,i)=>{const s=t.length-1,e=[];let o,n=2===i?"<svg>":"",r=S;for(let i=0;i<s;i++){const s=t[i];let h,l,a=-1,u=0;for(;u<s.length&&(r.lastIndex=u,l=r.exec(s),null!==l);)u=r.lastIndex,r===S?"!--"===l[1]?r=k:void 0!==l[1]?r=_:void 0!==l[2]?(O.test(l[2])&&(o=RegExp("</"+l[2],"g")),r=T):void 0!==l[3]&&(r=T):r===T?">"===l[0]?(r=null!=o?o:S,a=-1):void 0===l[1]?a=-2:(a=r.lastIndex-l[2].length,h=l[1],r=void 0===l[3]?T:'"'===l[3]?A:C):r===A||r===C?r=T:r===k||r===_?r=S:(r=T,o=void 0);const d=r===T&&t[i+1].startsWith("/>")?" ":"";n+=r===S?s+g:a>=0?(e.push(h),s.slice(0,a)+"$lit$"+s.slice(a)+f+d):s+f+(-2===a?(e.push(void 0),i):d)}const h=n+(t[s]||"<?>")+(2===i?"</svg>":"");return[void 0!==p?p.createHTML(h):h,e]};class I{constructor({strings:t,_$litType$:i},s){let e;this.parts=[];let o=0,n=0;const r=t.length-1,h=this.parts,[l,a]=U(t,i);if(this.el=I.createElement(l,s),E.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes)}for(;null!==(e=E.nextNode())&&h.length<r;){if(1===e.nodeType){if(e.hasAttributes()){const t=[];for(const i of e.getAttributeNames())if(i.endsWith("$lit$")||i.startsWith(f)){const s=a[n++];if(t.push(i),void 0!==s){const t=e.getAttribute(s.toLowerCase()+"$lit$").split(f),i=/([.?@])?(.*)/.exec(s);h.push({type:1,index:o,name:i[2],strings:t,ctor:"."===i[1]?B:"?"===i[1]?J:"@"===i[1]?L:K})}else h.push({type:6,index:o})}for(const i of t)e.removeAttribute(i)}if(O.test(e.tagName)){const t=e.textContent.split(f),i=t.length-1;if(i>0){e.textContent=v?v.emptyScript:"";for(let s=0;s<i;s++)e.append(t[s],m()),E.nextNode(),h.push({type:2,index:++o});e.append(t[i],m())}}}else if(8===e.nodeType)if(e.data===y)h.push({type:2,index:o});else{let t=-1;for(;-1!==(t=e.data.indexOf(f,t+1));)h.push({type:7,index:o}),t+=f.length-1}o++}}static createElement(t,i){const s=b.createElement("template");return s.innerHTML=t,s}}function z(t,i,s=t,e){var o,n,r,h;if(i===j)return i;let l=void 0!==e?null===(o=s._$Cl)||void 0===o?void 0:o[e]:s._$Cu;const a=w(i)?void 0:i._$litDirective$;return(null==l?void 0:l.constructor)!==a&&(null===(n=null==l?void 0:l._$AO)||void 0===n||n.call(l,!1),void 0===a?l=void 0:(l=new a(t),l._$AT(t,s,e)),void 0!==e?(null!==(r=(h=s)._$Cl)&&void 0!==r?r:h._$Cl=[])[e]=l:s._$Cu=l),void 0!==l&&(i=z(t,l._$AS(t,i.values),l,e)),i}class R{constructor(t,i){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var i;const{el:{content:s},parts:e}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:b).importNode(s,!0);E.currentNode=o;let n=E.nextNode(),r=0,h=0,l=e[0];for(;void 0!==l;){if(r===l.index){let i;2===l.type?i=new P(n,n.nextSibling,this,t):1===l.type?i=new l.ctor(n,l.name,l.strings,this,t):6===l.type&&(i=new W(n,this,t)),this.v.push(i),l=e[++h]}r!==(null==l?void 0:l.index)&&(n=E.nextNode(),r++)}return o}m(t){let i=0;for(const s of this.v)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++}}class P{constructor(t,i,s,e){var o;this.type=2,this._$AH=N,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cg=null===(o=null==e?void 0:e.isConnected)||void 0===o||o}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=z(this,t,i),w(t)?t===N||null==t||""===t?(this._$AH!==N&&this._$AR(),this._$AH=N):t!==this._$AH&&t!==j&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.S(t):(t=>{var i;return $(t)||"function"==typeof(null===(i=t)||void 0===i?void 0:i[Symbol.iterator])})(t)?this.M(t):this.$(t)}A(t,i=this._$AB){return this._$AA.parentNode.insertBefore(t,i)}S(t){this._$AH!==t&&(this._$AR(),this._$AH=this.A(t))}$(t){this._$AH!==N&&w(this._$AH)?this._$AA.nextSibling.data=t:this.S(b.createTextNode(t)),this._$AH=t}T(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=I.createElement(e.h,this.options)),e);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.m(s);else{const t=new R(o,this),i=t.p(this.options);t.m(s),this.S(i),this._$AH=t}}_$AC(t){let i=x.get(t.strings);return void 0===i&&x.set(t.strings,i=new I(t)),i}M(t){$(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const o of t)e===i.length?i.push(s=new P(this.A(m()),this.A(m()),this,this.options)):s=i[e],s._$AI(o),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e)}_$AR(t=this._$AA.nextSibling,i){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var i;void 0===this._$AM&&(this._$Cg=t,null===(i=this._$AP)||void 0===i||i.call(this,t))}}class K{constructor(t,i,s,e,o){this.type=1,this._$AH=N,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=N}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,e){const o=this.strings;let n=!1;if(void 0===o)t=z(this,t,i,0),n=!w(t)||t!==this._$AH&&t!==j,n&&(this._$AH=t);else{const e=t;let r,h;for(t=o[0],r=0;r<o.length-1;r++)h=z(this,e[s+r],i,r),h===j&&(h=this._$AH[r]),n||(n=!w(h)||h!==this._$AH[r]),h===N?t=N:t!==N&&(t+=(null!=h?h:"")+o[r+1]),this._$AH[r]=h}n&&!e&&this.k(t)}k(t){t===N?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class B extends K{constructor(){super(...arguments),this.type=3}k(t){this.element[this.name]=t===N?void 0:t}}class J extends K{constructor(){super(...arguments),this.type=4}k(t){t&&t!==N?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)}}class L extends K{constructor(t,i,s,e,o){super(t,i,s,e,o),this.type=5}_$AI(t,i=this){var s;if((t=null!==(s=z(this,t,i,0))&&void 0!==s?s:N)===j)return;const e=this._$AH,o=t===N&&e!==N||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,n=t!==N&&(e===N||o);o&&this.element.removeEventListener(this.name,this,e),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var i,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t)}}class W{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){z(this,t)}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var F,H,D;null===(d=globalThis.litHtmlPlatformSupport)||void 0===d||d.call(globalThis,I,P),(null!==(c=globalThis.litHtmlVersions)&&void 0!==c?c:globalThis.litHtmlVersions=[]).push("2.0.0-rc.5");class G extends u{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var t,i;const s=super.createRenderRoot();return null!==(t=(i=this.renderOptions).renderBefore)&&void 0!==t||(i.renderBefore=s.firstChild),s}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=((t,i,s)=>{var e,o;const n=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let r=n._$litPart$;if(void 0===r){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=r=new P(i.insertBefore(m(),t),t,void 0,null!=s?s:{})}return r._$AI(t),r})(i,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!1)}render(){return j}}G.finalized=!0,G._$litElement$=!0,null===(F=globalThis.litElementHydrateSupport)||void 0===F||F.call(globalThis,{LitElement:G}),null===(H=globalThis.litElementPlatformSupport)||void 0===H||H.call(globalThis,{LitElement:G}),(null!==(D=globalThis.litElementVersions)&&void 0!==D?D:globalThis.litElementVersions=[]).push("3.0.0-rc.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const V=(t,i)=>"method"===i.kind&&i.descriptor&&!("value"in i.descriptor)?{...i,finisher(s){s.createProperty(i.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:i.key,initializer(){"function"==typeof i.initializer&&(this[i.key]=i.initializer.call(this))},finisher(s){s.createProperty(i.key,t)}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Z(t){return(i,s)=>void 0!==s?((t,i,s)=>{i.constructor.createProperty(s,t)})(t,i,s):V(t,i)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}function q(t){return Z({...t,state:!0})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Q=({finisher:t,descriptor:i})=>(s,e)=>{var o;if(void 0===e){const e=null!==(o=s.originalKey)&&void 0!==o?o:s.key,n=null!=i?{kind:"method",placement:"prototype",key:e,descriptor:i(s.key)}:{...s,key:e};return null!=t&&(n.finisher=function(i){t(i,e)}),n}{const o=s.constructor;void 0!==i&&Object.defineProperty(s,e,i(e)),null==t||t(o,e)}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var X=function t(i,s){if(i===s)return!0;if(i&&s&&"object"==typeof i&&"object"==typeof s){if(i.constructor!==s.constructor)return!1;var e,o,n;if(Array.isArray(i)){if((e=i.length)!=s.length)return!1;for(o=e;0!=o--;)if(!t(i[o],s[o]))return!1;return!0}if(i.constructor===RegExp)return i.source===s.source&&i.flags===s.flags;if(i.valueOf!==Object.prototype.valueOf)return i.valueOf()===s.valueOf();if(i.toString!==Object.prototype.toString)return i.toString()===s.toString();if((e=(n=Object.keys(i)).length)!==Object.keys(s).length)return!1;for(o=e;0!=o--;)if(!Object.prototype.hasOwnProperty.call(s,n[o]))return!1;for(o=e;0!=o--;){var r=n[o];if(!t(i[r],s[r]))return!1}return!0}return i!=i&&s!=s};class Y{constructor({apiKey:t,channel:i,client:s,id:e="__googleMapsScriptId",libraries:o=[],language:n,region:r,version:h,mapIds:l,nonce:a,retries:u=3,url:d="https://maps.googleapis.com/maps/api/js"}){if(this.CALLBACK="__googleMapsCallback",this.callbacks=[],this.done=!1,this.loading=!1,this.errors=[],this.version=h,this.apiKey=t,this.channel=i,this.client=s,this.id=e||"__googleMapsScriptId",this.libraries=o,this.language=n,this.region=r,this.mapIds=l,this.nonce=a,this.retries=u,this.url=d,Y.instance){if(!X(this.options,Y.instance.options))throw new Error(`Loader must not be called again with different options. ${JSON.stringify(this.options)} !== ${JSON.stringify(Y.instance.options)}`);return Y.instance}Y.instance=this}get options(){return{version:this.version,apiKey:this.apiKey,channel:this.channel,client:this.client,id:this.id,libraries:this.libraries,language:this.language,region:this.region,mapIds:this.mapIds,nonce:this.nonce,url:this.url}}get failed(){return this.done&&!this.loading&&this.errors.length>=this.retries+1}createUrl(){let t=this.url;return t+=`?callback=${this.CALLBACK}`,this.apiKey&&(t+=`&key=${this.apiKey}`),this.channel&&(t+=`&channel=${this.channel}`),this.client&&(t+=`&client=${this.client}`),this.libraries.length>0&&(t+=`&libraries=${this.libraries.join(",")}`),this.language&&(t+=`&language=${this.language}`),this.region&&(t+=`&region=${this.region}`),this.version&&(t+=`&v=${this.version}`),this.mapIds&&(t+=`&map_ids=${this.mapIds.join(",")}`),t}load(){return this.loadPromise()}loadPromise(){return new Promise(((t,i)=>{this.loadCallback((s=>{s?i(s.error):t(window.google)}))}))}loadCallback(t){this.callbacks.push(t),this.execute()}setScript(){if(document.getElementById(this.id))return void this.callback();const t=this.createUrl(),i=document.createElement("script");i.id=this.id,i.type="text/javascript",i.src=t,i.onerror=this.loadErrorCallback.bind(this),i.defer=!0,i.async=!0,this.nonce&&(i.nonce=this.nonce),document.head.appendChild(i)}deleteScript(){const t=document.getElementById(this.id);t&&t.remove()}reset(){this.deleteScript(),this.done=!1,this.loading=!1,this.errors=[],this.onerrorEvent=null}resetIfRetryingFailed(){this.failed&&this.reset()}loadErrorCallback(t){if(this.errors.push(t),this.errors.length<=this.retries){const t=this.errors.length*Math.pow(2,this.errors.length);console.log(`Failed to load Google Maps script, retrying in ${t} ms.`),setTimeout((()=>{this.deleteScript(),this.setScript()}),t)}else this.onerrorEvent=t,this.callback()}setCallback(){window.__googleMapsCallback=this.callback.bind(this)}callback(){this.done=!0,this.loading=!1,this.callbacks.forEach((t=>{t(this.onerrorEvent)})),this.callbacks=[]}execute(){if(this.resetIfRetryingFailed(),this.done)this.callback();else{if(window.google&&window.google.maps&&window.google.maps.version)return console.warn("Google Maps already loaded outside @googlemaps/js-api-loader.This may result in undesirable behavior as options and script parameters may not match."),void this.callback();this.loading||(this.loading=!0,this.setCallback(),this.setScript())}}}var tt=function(t,i,s,e){for(var o,n=arguments.length,r=n<3?i:null===e?e=Object.getOwnPropertyDescriptor(i,s):e,h=t.length-1;h>=0;h--)(o=t[h])&&(r=(n<3?o(r):n>3?o(i,s,r):o(i,s))||r);return n>3&&r&&Object.defineProperty(i,s,r),r};let it=class extends G{constructor(){super(...arguments),this.apiKey="AIzaSyC0460_sJ5K4hOyvCHVr_BwgxNdBpaPoy0",this.lat=0,this.lng=0,this.zoom=14,this.styles=[{featureType:"administrative",elementType:"geometry",stylers:[{visibility:"off"}]},{featureType:"administrative.land_parcel",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"poi",stylers:[{visibility:"off"}]},{featureType:"road",elementType:"labels.icon",stylers:[{visibility:"on"}]},{featureType:"road.local",elementType:"labels",stylers:[{visibility:"on"}]},{featureType:"transit",stylers:[{visibility:"off"}]}],this.showMarker=!1,this.autoOpenMarker=!1,this.infoWindowContent=""}connectedCallback(){super.connectedCallback(),this._initMap(),window.addEventListener("load",this.autoOpenMarker?()=>this._autoOpenInfoWindow():()=>console.log("Not auto"))}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("load",this.autoOpenMarker?()=>this._autoOpenInfoWindow():()=>console.log("Not auto"))}handleSlotchange(t){const i=t.target.assignedNodes({flatten:!0});this.infoWindowContent=Array.prototype.map.call(i,(t=>t.innerHTML?t.innerHTML:"")).join("")}_initMap(){new Y({apiKey:this.apiKey,version:"weekly"}).load().then((()=>{var t;this.map=new google.maps.Map(this.mapContainer,{center:{lat:this.lat,lng:this.lng},zoom:this.zoom,styles:this.styles}),this.showMarker&&(this.marker=new google.maps.Marker({position:{lat:this.lat,lng:this.lng},map:this.map}),null===(t=this.marker)||void 0===t||t.addListener("click",(()=>{var t;null===(t=this.infoWindow)||void 0===t||t.open({anchor:this.marker,map:this.map,shouldFocus:!1})}))),this.infoWindow=new google.maps.InfoWindow({content:this.infoWindowContent})})).catch((t=>{console.log(t)}))}_autoOpenInfoWindow(){this.infoWindow&&this.infoWindow.open(this.map,this.marker)}render(){return M`
      <div id="map">
        <slot @slotchange=${this.handleSlotchange}></slot>      
      </div>
    `}};it.styles=((t,...s)=>{const o=1===t.length?t[0]:s.reduce(((i,s,e)=>i+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[e+1]),t[0]);return new e(o,i)})`
    #map {
      height: 100%;
      width: 100%;
    }
  `,tt([Z({type:String,reflect:!0,attribute:"api-key"})],it.prototype,"apiKey",void 0),tt([Z({type:Number,reflect:!0,attribute:"lat"})],it.prototype,"lat",void 0),tt([Z({type:Number,reflect:!0,attribute:"lng"})],it.prototype,"lng",void 0),tt([Z({type:Number,reflect:!0,attribute:"zoom"})],it.prototype,"zoom",void 0),tt([Z({type:Object,reflect:!1,attribute:"styles"})],it.prototype,"styles",void 0),tt([Z({type:Boolean,reflect:!0,attribute:"show-marker"})],it.prototype,"showMarker",void 0),tt([Z({type:Boolean,reflect:!0,attribute:"auto-open-marker"})],it.prototype,"autoOpenMarker",void 0),tt([Z({type:String})],it.prototype,"infoWindowContent",void 0),tt([q()],it.prototype,"map",void 0),tt([q()],it.prototype,"marker",void 0),tt([q()],it.prototype,"infoWindow",void 0),tt([function(t,i){return Q({descriptor:s=>{const e={get(){var i,s;return null!==(s=null===(i=this.renderRoot)||void 0===i?void 0:i.querySelector(t))&&void 0!==s?s:null},enumerable:!0,configurable:!0};if(i){const i="symbol"==typeof s?Symbol():"__"+s;e.get=function(){var s,e;return void 0===this[i]&&(this[i]=null!==(e=null===(s=this.renderRoot)||void 0===s?void 0:s.querySelector(t))&&void 0!==e?e:null),this[i]}}return e}})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */("#map")],it.prototype,"mapContainer",void 0),tt([function(t="",i=!1,s=""){return Q({descriptor:e=>({get(){var e,o,n;const r="slot"+(t?`[name=${t}]`:":not([name])");let h=null!==(n=null===(o=null===(e=this.renderRoot)||void 0===e?void 0:e.querySelector(r))||void 0===o?void 0:o.assignedNodes({flatten:i}))&&void 0!==n?n:[];return s&&(h=h.filter((t=>t.nodeType===Node.ELEMENT_NODE&&t.matches(s)))),h},enumerable:!0,configurable:!0})})}()],it.prototype,"_infoWindowContentNodes",void 0),it=tt([(t=>i=>"function"==typeof i?((t,i)=>(window.customElements.define(t,i),i))(t,i):((t,i)=>{const{kind:s,elements:e}=i;return{kind:s,elements:e,finisher(i){window.customElements.define(t,i)}}})(t,i))("wm-google-map")],it);export{it as WebmarketsGoogleMap};