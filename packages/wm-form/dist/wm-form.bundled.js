/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),e=new Map;class s{constructor(t,e){if(this._$cssResult$=!0,e!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){let i=e.get(this.cssText);return t&&void 0===i&&(e.set(this.cssText,i=new CSSStyleSheet),i.replaceSync(this.cssText)),i}toString(){return this.cssText}}const o=t?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new s("string"==typeof t?t:t+"",i))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var n,r;const l={toAttribute(t,i){switch(i){case Boolean:t=t?"":null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,i){let e=t;switch(i){case Boolean:e=null!==t;break;case Number:e=null===t?null:Number(t);break;case Object:case Array:try{e=JSON.parse(t)}catch(t){e=null}}return e}},h=(t,i)=>i!==t&&(i==i||t==t),a={attribute:!0,type:String,converter:l,reflect:!1,hasChanged:h};class c extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(t){var i;null!==(i=this.l)&&void 0!==i||(this.l=[]),this.l.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,e)=>{const s=this._$Eh(e,i);void 0!==s&&(this._$Eu.set(s,e),t.push(s))})),t}static createProperty(t,i=a){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const e="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,e,i);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,i,e){return{get(){return this[i]},set(s){const o=this[t];this[i]=s,this.requestUpdate(t,o,e)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||a}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const e of i)this.createProperty(e,t[e])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const i=[];if(Array.isArray(t)){const e=new Set(t.flat(1/0).reverse());for(const t of e)i.unshift(o(t))}else void 0!==t&&i.push(o(t));return i}static _$Eh(t,i){const e=i.attribute;return!1===e?void 0:"string"==typeof e?e:"string"==typeof t?t.toLowerCase():void 0}o(){var t;this._$Ev=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Ep(),this.requestUpdate(),null===(t=this.constructor.l)||void 0===t||t.forEach((t=>t(this)))}addController(t){var i,e;(null!==(i=this._$Em)&&void 0!==i?i:this._$Em=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(e=t.hostConnected)||void 0===e||e.call(t))}removeController(t){var i;null===(i=this._$Em)||void 0===i||i.splice(this._$Em.indexOf(t)>>>0,1)}_$Ep(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this._$Et.set(i,this[i]),delete this[i])}))}createRenderRoot(){var i;const e=null!==(i=this.shadowRoot)&&void 0!==i?i:this.attachShadow(this.constructor.shadowRootOptions);return((i,e)=>{t?i.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):e.forEach((t=>{const e=document.createElement("style");e.textContent=t.cssText,i.appendChild(e)}))})(e,this.constructor.elementStyles),e}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$Em)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$Em)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)}))}attributeChangedCallback(t,i,e){this._$AK(t,e)}_$Eg(t,i,e=a){var s,o;const n=this.constructor._$Eh(t,e);if(void 0!==n&&!0===e.reflect){const r=(null!==(o=null===(s=e.converter)||void 0===s?void 0:s.toAttribute)&&void 0!==o?o:l.toAttribute)(i,e.type);this._$Ei=t,null==r?this.removeAttribute(n):this.setAttribute(n,r),this._$Ei=null}}_$AK(t,i){var e,s,o;const n=this.constructor,r=n._$Eu.get(t);if(void 0!==r&&this._$Ei!==r){const t=n.getPropertyOptions(r),h=t.converter,a=null!==(o=null!==(s=null===(e=h)||void 0===e?void 0:e.fromAttribute)&&void 0!==s?s:"function"==typeof h?h:null)&&void 0!==o?o:l.fromAttribute;this._$Ei=r,this[r]=a(i,t.type),this._$Ei=null}}requestUpdate(t,i,e){let s=!0;void 0!==t&&(((e=e||this.constructor.getPropertyOptions(t)).hasChanged||h)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),!0===e.reflect&&this._$Ei!==t&&(void 0===this._$ES&&(this._$ES=new Map),this._$ES.set(t,e))):s=!1),!this.isUpdatePending&&s&&(this._$Ev=this._$EC())}async _$EC(){this.isUpdatePending=!0;try{await this._$Ev}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach(((t,i)=>this[i]=t)),this._$Et=void 0);let i=!1;const e=this._$AL;try{i=this.shouldUpdate(e),i?(this.willUpdate(e),null===(t=this._$Em)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(e)):this._$ET()}catch(t){throw i=!1,this._$ET(),t}i&&this._$AE(e)}willUpdate(t){}_$AE(t){var i;null===(i=this._$Em)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$ET(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ev}shouldUpdate(t){return!0}update(t){void 0!==this._$ES&&(this._$ES.forEach(((t,i)=>this._$Eg(i,this[i],t))),this._$ES=void 0),this._$ET()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var d,u;c.finalized=!0,c.elementProperties=new Map,c.elementStyles=[],c.shadowRootOptions={mode:"open"},null===(n=globalThis.reactiveElementPlatformSupport)||void 0===n||n.call(globalThis,{ReactiveElement:c}),(null!==(r=globalThis.reactiveElementVersions)&&void 0!==r?r:globalThis.reactiveElementVersions=[]).push("1.0.0-rc.4");const v=globalThis.trustedTypes,p=v?v.createPolicy("lit-html",{createHTML:t=>t}):void 0,f=`lit$${(Math.random()+"").slice(9)}$`,m="?"+f,b=`<${m}>`,g=document,y=(t="")=>g.createComment(t),w=t=>null===t||"object"!=typeof t&&"function"!=typeof t,S=Array.isArray,x=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,$=/-->/g,_=/>/g,T=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,k=/'/g,A=/"/g,C=/^(?:script|style|textarea)$/i,E=(t=>(i,...e)=>({_$litType$:t,strings:i,values:e}))(1),N=Symbol.for("lit-noChange"),M=Symbol.for("lit-nothing"),O=new WeakMap,U=g.createTreeWalker(g,129,null,!1),R=(t,i)=>{const e=t.length-1,s=[];let o,n=2===i?"<svg>":"",r=x;for(let i=0;i<e;i++){const e=t[i];let l,h,a=-1,c=0;for(;c<e.length&&(r.lastIndex=c,h=r.exec(e),null!==h);)c=r.lastIndex,r===x?"!--"===h[1]?r=$:void 0!==h[1]?r=_:void 0!==h[2]?(C.test(h[2])&&(o=RegExp("</"+h[2],"g")),r=T):void 0!==h[3]&&(r=T):r===T?">"===h[0]?(r=null!=o?o:x,a=-1):void 0===h[1]?a=-2:(a=r.lastIndex-h[2].length,l=h[1],r=void 0===h[3]?T:'"'===h[3]?A:k):r===A||r===k?r=T:r===$||r===_?r=x:(r=T,o=void 0);const d=r===T&&t[i+1].startsWith("/>")?" ":"";n+=r===x?e+b:a>=0?(s.push(l),e.slice(0,a)+"$lit$"+e.slice(a)+f+d):e+f+(-2===a?(s.push(void 0),i):d)}const l=n+(t[e]||"<?>")+(2===i?"</svg>":"");return[void 0!==p?p.createHTML(l):l,s]};class z{constructor({strings:t,_$litType$:i},e){let s;this.parts=[];let o=0,n=0;const r=t.length-1,l=this.parts,[h,a]=R(t,i);if(this.el=z.createElement(h,e),U.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes)}for(;null!==(s=U.nextNode())&&l.length<r;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const i of s.getAttributeNames())if(i.endsWith("$lit$")||i.startsWith(f)){const e=a[n++];if(t.push(i),void 0!==e){const t=s.getAttribute(e.toLowerCase()+"$lit$").split(f),i=/([.?@])?(.*)/.exec(e);l.push({type:1,index:o,name:i[2],strings:t,ctor:"."===i[1]?D:"?"===i[1]?F:"@"===i[1]?L:q})}else l.push({type:6,index:o})}for(const i of t)s.removeAttribute(i)}if(C.test(s.tagName)){const t=s.textContent.split(f),i=t.length-1;if(i>0){s.textContent=v?v.emptyScript:"";for(let e=0;e<i;e++)s.append(t[e],y()),U.nextNode(),l.push({type:2,index:++o});s.append(t[i],y())}}}else if(8===s.nodeType)if(s.data===m)l.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(f,t+1));)l.push({type:7,index:o}),t+=f.length-1}o++}}static createElement(t,i){const e=g.createElement("template");return e.innerHTML=t,e}}function j(t,i,e=t,s){var o,n,r,l;if(i===N)return i;let h=void 0!==s?null===(o=e._$Cl)||void 0===o?void 0:o[s]:e._$Cu;const a=w(i)?void 0:i._$litDirective$;return(null==h?void 0:h.constructor)!==a&&(null===(n=null==h?void 0:h._$AO)||void 0===n||n.call(h,!1),void 0===a?h=void 0:(h=new a(t),h._$AT(t,e,s)),void 0!==s?(null!==(r=(l=e)._$Cl)&&void 0!==r?r:l._$Cl=[])[s]=h:e._$Cu=h),void 0!==h&&(i=j(t,h._$AS(t,i.values),h,s)),i}class P{constructor(t,i){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var i;const{el:{content:e},parts:s}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:g).importNode(e,!0);U.currentNode=o;let n=U.nextNode(),r=0,l=0,h=s[0];for(;void 0!==h;){if(r===h.index){let i;2===h.type?i=new I(n,n.nextSibling,this,t):1===h.type?i=new h.ctor(n,h.name,h.strings,this,t):6===h.type&&(i=new H(n,this,t)),this.v.push(i),h=s[++l]}r!==(null==h?void 0:h.index)&&(n=U.nextNode(),r++)}return o}m(t){let i=0;for(const e of this.v)void 0!==e&&(void 0!==e.strings?(e._$AI(t,e,i),i+=e.strings.length-2):e._$AI(t[i])),i++}}class I{constructor(t,i,e,s){var o;this.type=2,this._$AH=M,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=e,this.options=s,this._$Cg=null===(o=null==s?void 0:s.isConnected)||void 0===o||o}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=j(this,t,i),w(t)?t===M||null==t||""===t?(this._$AH!==M&&this._$AR(),this._$AH=M):t!==this._$AH&&t!==N&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.S(t):(t=>{var i;return S(t)||"function"==typeof(null===(i=t)||void 0===i?void 0:i[Symbol.iterator])})(t)?this.M(t):this.$(t)}A(t,i=this._$AB){return this._$AA.parentNode.insertBefore(t,i)}S(t){this._$AH!==t&&(this._$AR(),this._$AH=this.A(t))}$(t){this._$AH!==M&&w(this._$AH)?this._$AA.nextSibling.data=t:this.S(g.createTextNode(t)),this._$AH=t}T(t){var i;const{values:e,_$litType$:s}=t,o="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=z.createElement(s.h,this.options)),s);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.m(e);else{const t=new P(o,this),i=t.p(this.options);t.m(e),this.S(i),this._$AH=t}}_$AC(t){let i=O.get(t.strings);return void 0===i&&O.set(t.strings,i=new z(t)),i}M(t){S(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let e,s=0;for(const o of t)s===i.length?i.push(e=new I(this.A(y()),this.A(y()),this,this.options)):e=i[s],e._$AI(o),s++;s<i.length&&(this._$AR(e&&e._$AB.nextSibling,s),i.length=s)}_$AR(t=this._$AA.nextSibling,i){var e;for(null===(e=this._$AP)||void 0===e||e.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var i;void 0===this._$AM&&(this._$Cg=t,null===(i=this._$AP)||void 0===i||i.call(this,t))}}class q{constructor(t,i,e,s,o){this.type=1,this._$AH=M,this._$AN=void 0,this.element=t,this.name=i,this._$AM=s,this.options=o,e.length>2||""!==e[0]||""!==e[1]?(this._$AH=Array(e.length-1).fill(new String),this.strings=e):this._$AH=M}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,e,s){const o=this.strings;let n=!1;if(void 0===o)t=j(this,t,i,0),n=!w(t)||t!==this._$AH&&t!==N,n&&(this._$AH=t);else{const s=t;let r,l;for(t=o[0],r=0;r<o.length-1;r++)l=j(this,s[e+r],i,r),l===N&&(l=this._$AH[r]),n||(n=!w(l)||l!==this._$AH[r]),l===M?t=M:t!==M&&(t+=(null!=l?l:"")+o[r+1]),this._$AH[r]=l}n&&!s&&this.k(t)}k(t){t===M?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class D extends q{constructor(){super(...arguments),this.type=3}k(t){this.element[this.name]=t===M?void 0:t}}class F extends q{constructor(){super(...arguments),this.type=4}k(t){t&&t!==M?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)}}class L extends q{constructor(t,i,e,s,o){super(t,i,e,s,o),this.type=5}_$AI(t,i=this){var e;if((t=null!==(e=j(this,t,i,0))&&void 0!==e?e:M)===N)return;const s=this._$AH,o=t===M&&s!==M||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==M&&(s===M||o);o&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var i,e;"function"==typeof this._$AH?this._$AH.call(null!==(e=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==e?e:this.element,t):this._$AH.handleEvent(t)}}class H{constructor(t,i,e){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=e}get _$AU(){return this._$AM._$AU}_$AI(t){j(this,t)}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var J,B,G;null===(d=globalThis.litHtmlPlatformSupport)||void 0===d||d.call(globalThis,z,I),(null!==(u=globalThis.litHtmlVersions)&&void 0!==u?u:globalThis.litHtmlVersions=[]).push("2.0.0-rc.5");class K extends c{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var t,i;const e=super.createRenderRoot();return null!==(t=(i=this.renderOptions).renderBefore)&&void 0!==t||(i.renderBefore=e.firstChild),e}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=((t,i,e)=>{var s,o;const n=null!==(s=null==e?void 0:e.renderBefore)&&void 0!==s?s:i;let r=n._$litPart$;if(void 0===r){const t=null!==(o=null==e?void 0:e.renderBefore)&&void 0!==o?o:null;n._$litPart$=r=new I(i.insertBefore(y(),t),t,void 0,null!=e?e:{})}return r._$AI(t),r})(i,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!1)}render(){return N}}K.finalized=!0,K._$litElement$=!0,null===(J=globalThis.litElementHydrateSupport)||void 0===J||J.call(globalThis,{LitElement:K}),null===(B=globalThis.litElementPlatformSupport)||void 0===B||B.call(globalThis,{LitElement:K}),(null!==(G=globalThis.litElementVersions)&&void 0!==G?G:globalThis.litElementVersions=[]).push("3.0.0-rc.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Z=(t,i)=>"method"===i.kind&&i.descriptor&&!("value"in i.descriptor)?{...i,finisher(e){e.createProperty(i.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:i.key,initializer(){"function"==typeof i.initializer&&(this[i.key]=i.initializer.call(this))},finisher(e){e.createProperty(i.key,t)}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function V(t){return(i,e)=>void 0!==e?((t,i,e)=>{i.constructor.createProperty(e,t)})(t,i,e):Z(t,i)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}function W(t){return V({...t,state:!0})}var Q=function(t,i,e,s){for(var o,n=arguments.length,r=n<3?i:null===s?s=Object.getOwnPropertyDescriptor(i,e):s,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(i,e,r):o(i,e))||r);return n>3&&r&&Object.defineProperty(i,e,r),r};const X="wm-form";let Y=class extends K{constructor(){super(...arguments),this.formSparkID="",this._name="",this._email="",this._phone="",this._message="",this._referralSource=""}_getFormattedDate(){return(new Date).toLocaleString()}_postSubmission(t){t.preventDefault();const i={Name:this._name,Email:this._email,"Phone Number":this._phone,Message:this._message,"Referral Source":this._referralSource,"Submitted Date":this._getFormattedDate()};fetch(`https://submit-form.com/${this.formSparkID}`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(i)}).then((function(t){console.log(t)})).catch((function(t){console.error(t)}))}render(){return E`
      <form
        id="contact-form"
        class="contact-form"
        @submit=${t=>this._postSubmission(t)}
      >
        <input
          type="checkbox"
          name="_honeypot"
          style="display:none"
          tabindex="-1"
          autocomplete="off"
        />
        <div class="w-50">
          <label for="Name">Name</label>
          <input
            required
            id="contact-name"
            type="text"
            name="Name"
            placeholder="Name"
            @change=${t=>this._name=t.target.value}
            .value=${this._name}
          />
        </div>
        <div class="w-50">
          <label for="Email">Email</label>
          <input
            required
            id="contact-email"
            type="email"
            name="Email"
            placeholder="Email"
            @change=${t=>this._email=t.target.value}
          />
        </div>
        <div class="w-50">
          <label for="Number">Phone Number</label>
          <input
            required
            id="contact-number"
            type="tel"
            name="Number"
            placeholder="Phone Number"
            @change=${t=>this._phone=t.target.value}
          />
        </div>
        <div class="w-50">
          <label for="Referral">How did you hear about us?</label>
          <select
            name="Referral"
            id="contact-location"
            required
            @change=${t=>this._referralSource=t.target.value}
          >
            <option disabled selected>==SELECT AN OPTION==</option>
            <option value="Google Search">Google Search</option>
            <option value="Family/Friend Referral">
              <!--@ts-ignore-->
              Family/Friend Referral
            </option>
            <option value="Social Media">Social Media</option>

            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label for="Messages">Messages</label>
          <textarea
            required
            id="contact-messages"
            name="Messages"
            placeholder="Messages"
            @change=${t=>this._message=t.target.value}
          ></textarea>
        </div>
        <div>
          <input type="submit" title="Submit" />
        </div>
      </form>
    `}};Y.styles=((t,...e)=>{const o=1===t.length?t[0]:e.reduce(((i,e,s)=>i+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(e)+t[s+1]),t[0]);return new s(o,i)})`
    .contact-form {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      font-family: inherit;
    }

    .contact-form input[type='text'],
    .contact-form input[type='email'],
    .contact-form textarea,
    .contact-form input[type='tel'],
    .contact-form select {
      box-sizing: border-box;
      border: 1px solid #dcdcdc;
      background: transparent;
      color: inherit;
      height: 58px;
      width: 100%;
      border-radius: 5px;
      padding: 10px 20px 10px 20px;
      outline-style: none;
      -webkit-transition: all 300ms ease-in;
      transition: all 300ms ease-in;
      box-shadow: 0 0 0 3px transparent inset;
      font-size: 18px;
      font-family: inherit;
    }

    .contact-form textarea {
      height: 160px;
    }

    .contact-form .w-50 {
      width: 100%;
    }

    .contact-form div {
      box-sizing: border-box;
      display: flex;
      flex-flow: column;
      padding: 0.8rem;
      width: 100%;
    }

    .contact-form label {
      font-size: 15px;
      color: #424242;
      margin: 0;
      font-weight: normal;
      text-align: left;
    }

    .contact-form input[type='submit'] {
      display: inline-block;
      font-size: 26px;
      line-height: 1.2;
      text-align: center;
      color: #fff !important;
      padding: 12px 52px;
      margin: 4px 0;
      background-color: #15222b;
      border: 2px solid #15222b;
      transition: all 450ms;
    }

    .contact-form input[type='submit']:hover {
      background: transparent;
      color: #15222b !important;
      cursor: pointer;
    }

    @media only screen and (min-width: 768px) {
      .contact-form .w-50 {
        width: 50%;
      }
    }
  `,Q([V({type:String,reflect:!0,attribute:"formspark-form-id"})],Y.prototype,"formSparkID",void 0),Q([W()],Y.prototype,"_name",void 0),Q([W()],Y.prototype,"_email",void 0),Q([W()],Y.prototype,"_phone",void 0),Q([W()],Y.prototype,"_message",void 0),Q([W()],Y.prototype,"_referralSource",void 0),Y=Q([(t=>i=>"function"==typeof i?((t,i)=>(window.customElements.define(t,i),i))(t,i):((t,i)=>{const{kind:e,elements:s}=i;return{kind:e,elements:s,finisher(i){window.customElements.define(t,i)}}})(t,i))("wm-form")],Y);export{Y as WebmarketsForm,X as tagName};
