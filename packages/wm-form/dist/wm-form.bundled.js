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
 */;var r,n;const l={toAttribute(t,i){switch(i){case Boolean:t=t?"":null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,i){let e=t;switch(i){case Boolean:e=null!==t;break;case Number:e=null===t?null:Number(t);break;case Object:case Array:try{e=JSON.parse(t)}catch(t){e=null}}return e}},a=(t,i)=>i!==t&&(i==i||t==t),h={attribute:!0,type:String,converter:l,reflect:!1,hasChanged:a};class d extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(t){var i;null!==(i=this.l)&&void 0!==i||(this.l=[]),this.l.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,e)=>{const s=this._$Eh(e,i);void 0!==s&&(this._$Eu.set(s,e),t.push(s))})),t}static createProperty(t,i=h){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const e="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,e,i);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,i,e){return{get(){return this[i]},set(s){const o=this[t];this[i]=s,this.requestUpdate(t,o,e)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||h}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const e of i)this.createProperty(e,t[e])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const i=[];if(Array.isArray(t)){const e=new Set(t.flat(1/0).reverse());for(const t of e)i.unshift(o(t))}else void 0!==t&&i.push(o(t));return i}static _$Eh(t,i){const e=i.attribute;return!1===e?void 0:"string"==typeof e?e:"string"==typeof t?t.toLowerCase():void 0}o(){var t;this._$Ev=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Ep(),this.requestUpdate(),null===(t=this.constructor.l)||void 0===t||t.forEach((t=>t(this)))}addController(t){var i,e;(null!==(i=this._$Em)&&void 0!==i?i:this._$Em=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(e=t.hostConnected)||void 0===e||e.call(t))}removeController(t){var i;null===(i=this._$Em)||void 0===i||i.splice(this._$Em.indexOf(t)>>>0,1)}_$Ep(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this._$Et.set(i,this[i]),delete this[i])}))}createRenderRoot(){var i;const e=null!==(i=this.shadowRoot)&&void 0!==i?i:this.attachShadow(this.constructor.shadowRootOptions);return((i,e)=>{t?i.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):e.forEach((t=>{const e=document.createElement("style");e.textContent=t.cssText,i.appendChild(e)}))})(e,this.constructor.elementStyles),e}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$Em)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$Em)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)}))}attributeChangedCallback(t,i,e){this._$AK(t,e)}_$Eg(t,i,e=h){var s,o;const r=this.constructor._$Eh(t,e);if(void 0!==r&&!0===e.reflect){const n=(null!==(o=null===(s=e.converter)||void 0===s?void 0:s.toAttribute)&&void 0!==o?o:l.toAttribute)(i,e.type);this._$Ei=t,null==n?this.removeAttribute(r):this.setAttribute(r,n),this._$Ei=null}}_$AK(t,i){var e,s,o;const r=this.constructor,n=r._$Eu.get(t);if(void 0!==n&&this._$Ei!==n){const t=r.getPropertyOptions(n),a=t.converter,h=null!==(o=null!==(s=null===(e=a)||void 0===e?void 0:e.fromAttribute)&&void 0!==s?s:"function"==typeof a?a:null)&&void 0!==o?o:l.fromAttribute;this._$Ei=n,this[n]=h(i,t.type),this._$Ei=null}}requestUpdate(t,i,e){let s=!0;void 0!==t&&(((e=e||this.constructor.getPropertyOptions(t)).hasChanged||a)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),!0===e.reflect&&this._$Ei!==t&&(void 0===this._$ES&&(this._$ES=new Map),this._$ES.set(t,e))):s=!1),!this.isUpdatePending&&s&&(this._$Ev=this._$EC())}async _$EC(){this.isUpdatePending=!0;try{await this._$Ev}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach(((t,i)=>this[i]=t)),this._$Et=void 0);let i=!1;const e=this._$AL;try{i=this.shouldUpdate(e),i?(this.willUpdate(e),null===(t=this._$Em)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(e)):this._$ET()}catch(t){throw i=!1,this._$ET(),t}i&&this._$AE(e)}willUpdate(t){}_$AE(t){var i;null===(i=this._$Em)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$ET(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ev}shouldUpdate(t){return!0}update(t){void 0!==this._$ES&&(this._$ES.forEach(((t,i)=>this._$Eg(i,this[i],t))),this._$ES=void 0),this._$ET()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var u,c;d.finalized=!0,d.elementProperties=new Map,d.elementStyles=[],d.shadowRootOptions={mode:"open"},null===(r=globalThis.reactiveElementPlatformSupport)||void 0===r||r.call(globalThis,{ReactiveElement:d}),(null!==(n=globalThis.reactiveElementVersions)&&void 0!==n?n:globalThis.reactiveElementVersions=[]).push("1.0.0-rc.4");const v=globalThis.trustedTypes,m=v?v.createPolicy("lit-html",{createHTML:t=>t}):void 0,f=`lit$${(Math.random()+"").slice(9)}$`,p="?"+f,b=`<${p}>`,y=document,w=(t="")=>y.createComment(t),g=t=>null===t||"object"!=typeof t&&"function"!=typeof t,$=Array.isArray,x=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,S=/-->/g,_=/>/g,N=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,E=/'/g,k=/"/g,A=/^(?:script|style|textarea)$/i,T=(t=>(i,...e)=>({_$litType$:t,strings:i,values:e}))(1),C=Symbol.for("lit-noChange"),M=Symbol.for("lit-nothing"),O=new WeakMap,U=y.createTreeWalker(y,129,null,!1),R=(t,i)=>{const e=t.length-1,s=[];let o,r=2===i?"<svg>":"",n=x;for(let i=0;i<e;i++){const e=t[i];let l,a,h=-1,d=0;for(;d<e.length&&(n.lastIndex=d,a=n.exec(e),null!==a);)d=n.lastIndex,n===x?"!--"===a[1]?n=S:void 0!==a[1]?n=_:void 0!==a[2]?(A.test(a[2])&&(o=RegExp("</"+a[2],"g")),n=N):void 0!==a[3]&&(n=N):n===N?">"===a[0]?(n=null!=o?o:x,h=-1):void 0===a[1]?h=-2:(h=n.lastIndex-a[2].length,l=a[1],n=void 0===a[3]?N:'"'===a[3]?k:E):n===k||n===E?n=N:n===S||n===_?n=x:(n=N,o=void 0);const u=n===N&&t[i+1].startsWith("/>")?" ":"";r+=n===x?e+b:h>=0?(s.push(l),e.slice(0,h)+"$lit$"+e.slice(h)+f+u):e+f+(-2===h?(s.push(void 0),i):u)}const l=r+(t[e]||"<?>")+(2===i?"</svg>":"");return[void 0!==m?m.createHTML(l):l,s]};class z{constructor({strings:t,_$litType$:i},e){let s;this.parts=[];let o=0,r=0;const n=t.length-1,l=this.parts,[a,h]=R(t,i);if(this.el=z.createElement(a,e),U.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes)}for(;null!==(s=U.nextNode())&&l.length<n;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const i of s.getAttributeNames())if(i.endsWith("$lit$")||i.startsWith(f)){const e=h[r++];if(t.push(i),void 0!==e){const t=s.getAttribute(e.toLowerCase()+"$lit$").split(f),i=/([.?@])?(.*)/.exec(e);l.push({type:1,index:o,name:i[2],strings:t,ctor:"."===i[1]?L:"?"===i[1]?D:"@"===i[1]?B:I})}else l.push({type:6,index:o})}for(const i of t)s.removeAttribute(i)}if(A.test(s.tagName)){const t=s.textContent.split(f),i=t.length-1;if(i>0){s.textContent=v?v.emptyScript:"";for(let e=0;e<i;e++)s.append(t[e],w()),U.nextNode(),l.push({type:2,index:++o});s.append(t[i],w())}}}else if(8===s.nodeType)if(s.data===p)l.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(f,t+1));)l.push({type:7,index:o}),t+=f.length-1}o++}}static createElement(t,i){const e=y.createElement("template");return e.innerHTML=t,e}}function P(t,i,e=t,s){var o,r,n,l;if(i===C)return i;let a=void 0!==s?null===(o=e._$Cl)||void 0===o?void 0:o[s]:e._$Cu;const h=g(i)?void 0:i._$litDirective$;return(null==a?void 0:a.constructor)!==h&&(null===(r=null==a?void 0:a._$AO)||void 0===r||r.call(a,!1),void 0===h?a=void 0:(a=new h(t),a._$AT(t,e,s)),void 0!==s?(null!==(n=(l=e)._$Cl)&&void 0!==n?n:l._$Cl=[])[s]=a:e._$Cu=a),void 0!==a&&(i=P(t,a._$AS(t,i.values),a,s)),i}class q{constructor(t,i){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var i;const{el:{content:e},parts:s}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:y).importNode(e,!0);U.currentNode=o;let r=U.nextNode(),n=0,l=0,a=s[0];for(;void 0!==a;){if(n===a.index){let i;2===a.type?i=new j(r,r.nextSibling,this,t):1===a.type?i=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(i=new H(r,this,t)),this.v.push(i),a=s[++l]}n!==(null==a?void 0:a.index)&&(r=U.nextNode(),n++)}return o}m(t){let i=0;for(const e of this.v)void 0!==e&&(void 0!==e.strings?(e._$AI(t,e,i),i+=e.strings.length-2):e._$AI(t[i])),i++}}class j{constructor(t,i,e,s){var o;this.type=2,this._$AH=M,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=e,this.options=s,this._$Cg=null===(o=null==s?void 0:s.isConnected)||void 0===o||o}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=P(this,t,i),g(t)?t===M||null==t||""===t?(this._$AH!==M&&this._$AR(),this._$AH=M):t!==this._$AH&&t!==C&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.S(t):(t=>{var i;return $(t)||"function"==typeof(null===(i=t)||void 0===i?void 0:i[Symbol.iterator])})(t)?this.M(t):this.$(t)}A(t,i=this._$AB){return this._$AA.parentNode.insertBefore(t,i)}S(t){this._$AH!==t&&(this._$AR(),this._$AH=this.A(t))}$(t){this._$AH!==M&&g(this._$AH)?this._$AA.nextSibling.data=t:this.S(y.createTextNode(t)),this._$AH=t}T(t){var i;const{values:e,_$litType$:s}=t,o="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=z.createElement(s.h,this.options)),s);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.m(e);else{const t=new q(o,this),i=t.p(this.options);t.m(e),this.S(i),this._$AH=t}}_$AC(t){let i=O.get(t.strings);return void 0===i&&O.set(t.strings,i=new z(t)),i}M(t){$(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let e,s=0;for(const o of t)s===i.length?i.push(e=new j(this.A(w()),this.A(w()),this,this.options)):e=i[s],e._$AI(o),s++;s<i.length&&(this._$AR(e&&e._$AB.nextSibling,s),i.length=s)}_$AR(t=this._$AA.nextSibling,i){var e;for(null===(e=this._$AP)||void 0===e||e.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var i;void 0===this._$AM&&(this._$Cg=t,null===(i=this._$AP)||void 0===i||i.call(this,t))}}class I{constructor(t,i,e,s,o){this.type=1,this._$AH=M,this._$AN=void 0,this.element=t,this.name=i,this._$AM=s,this.options=o,e.length>2||""!==e[0]||""!==e[1]?(this._$AH=Array(e.length-1).fill(new String),this.strings=e):this._$AH=M}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,e,s){const o=this.strings;let r=!1;if(void 0===o)t=P(this,t,i,0),r=!g(t)||t!==this._$AH&&t!==C,r&&(this._$AH=t);else{const s=t;let n,l;for(t=o[0],n=0;n<o.length-1;n++)l=P(this,s[e+n],i,n),l===C&&(l=this._$AH[n]),r||(r=!g(l)||l!==this._$AH[n]),l===M?t=M:t!==M&&(t+=(null!=l?l:"")+o[n+1]),this._$AH[n]=l}r&&!s&&this.k(t)}k(t){t===M?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class L extends I{constructor(){super(...arguments),this.type=3}k(t){this.element[this.name]=t===M?void 0:t}}class D extends I{constructor(){super(...arguments),this.type=4}k(t){t&&t!==M?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)}}class B extends I{constructor(t,i,e,s,o){super(t,i,e,s,o),this.type=5}_$AI(t,i=this){var e;if((t=null!==(e=P(this,t,i,0))&&void 0!==e?e:M)===C)return;const s=this._$AH,o=t===M&&s!==M||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==M&&(s===M||o);o&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var i,e;"function"==typeof this._$AH?this._$AH.call(null!==(e=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==e?e:this.element,t):this._$AH.handleEvent(t)}}class H{constructor(t,i,e){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=e}get _$AU(){return this._$AM._$AU}_$AI(t){P(this,t)}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var F,J,K;null===(u=globalThis.litHtmlPlatformSupport)||void 0===u||u.call(globalThis,z,j),(null!==(c=globalThis.litHtmlVersions)&&void 0!==c?c:globalThis.litHtmlVersions=[]).push("2.0.0-rc.5");class W extends d{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var t,i;const e=super.createRenderRoot();return null!==(t=(i=this.renderOptions).renderBefore)&&void 0!==t||(i.renderBefore=e.firstChild),e}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=((t,i,e)=>{var s,o;const r=null!==(s=null==e?void 0:e.renderBefore)&&void 0!==s?s:i;let n=r._$litPart$;if(void 0===n){const t=null!==(o=null==e?void 0:e.renderBefore)&&void 0!==o?o:null;r._$litPart$=n=new j(i.insertBefore(w(),t),t,void 0,null!=e?e:{})}return n._$AI(t),n})(i,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!1)}render(){return C}}W.finalized=!0,W._$litElement$=!0,null===(F=globalThis.litElementHydrateSupport)||void 0===F||F.call(globalThis,{LitElement:W}),null===(J=globalThis.litElementPlatformSupport)||void 0===J||J.call(globalThis,{LitElement:W}),(null!==(K=globalThis.litElementVersions)&&void 0!==K?K:globalThis.litElementVersions=[]).push("3.0.0-rc.4");
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
 */function G(t){return(i,e)=>void 0!==e?((t,i,e)=>{i.constructor.createProperty(e,t)})(t,i,e):Z(t,i)}var V=function(t,i,e,s){for(var o,r=arguments.length,n=r<3?i:null===s?s=Object.getOwnPropertyDescriptor(i,e):s,l=t.length-1;l>=0;l--)(o=t[l])&&(n=(r<3?o(n):r>3?o(i,e,n):o(i,e))||n);return r>3&&n&&Object.defineProperty(i,e,n),n};const Q="wm-form";let X=class extends W{constructor(){super(...arguments),this.formSparkID="",this.redirectURL="",this.fields="default",this.fullWidthButton=!1,this.referralOptions=["Google Search","Family/Friend Referral","Social Media","Other"]}_getFormattedDate(){return(new Date).toLocaleString()}render(){const t=this.referralOptions.map((t=>T`
      <option value=${t}>${t}</option>
      `));return T`
      <form
        action=${`https://submit-form.com/${this.formSparkID}`}
        class="wm-form"
      >
        <input type="hidden" name="_redirect" value=${this.redirectURL} />
        <input type="hidden" name="_append" value="false" />

        <input
          type="checkbox"
          name="_honeypot"
          style="display:none"
          tabindex="-1"
          autocomplete="off"
        />
        ${"default"===this.fields?T`
              <div class="w-50">
                <label for="Name">Name *</label>
                <input
                  required
                  id="contact-name"
                  type="text"
                  name="Name"
                  placeholder="Name"
                />
              </div>
              <div class="w-50">
                <label for="Email">Email *</label>
                <input
                  required
                  id="contact-email"
                  type="email"
                  name="Email"
                  placeholder="Email"
                />
              </div>
              <div class="w-50">
                <label for="Number">Phone Number *</label>
                <input
                  required
                  id="contact-number"
                  type="tel"
                  name="Number"
                  placeholder="Phone Number"
                />
              </div>
              <div class="w-50">
                <label for="Referral">How did you hear about us? *</label>
                <select name="Referral" id="contact-location" required>
                  <option disabled selected>==SELECT AN OPTION==</option>
                  ${t}
                </select>
              </div>
              <div>
                <label for="Message">Message *</label>
                <textarea
                  required
                  id="contact-message"
                  name="Message"
                  placeholder="Message"
                ></textarea>
              </div>
            `:""}
        ${this.fields.includes("name")?T`
              <div>
                <label for="Name">Name *</label>
                <input
                  required
                  id="contact-name"
                  type="text"
                  name="Name"
                  placeholder="Name"
                />
              </div>
            `:""}
        ${this.fields.includes("email")?T`
              <div>
                <label for="Email">Email *</label>
                <input
                  required
                  id="contact-email"
                  type="email"
                  name="Email"
                  placeholder="Email"
                />
              </div>
            `:""}
        ${this.fields.includes("phone")?T`
              <div>
                <label for="Number">Phone Number *</label>
                <input
                  required
                  id="contact-number"
                  type="tel"
                  name="Number"
                  placeholder="Phone Number"
                />
              </div>
            `:""}
        ${this.fields.includes("referral")?T`
              <div>
                <label for="Referral">How did you hear about us? *</label>
                <select name="Referral" id="contact-location" required>
                  <option disabled selected>==SELECT AN OPTION==</option>
                  ${t}
                </select>
              </div>
            `:""}
        ${this.fields.includes("message")?T`
              <div>
                <label for="Message">Message *</label>
                <textarea
                  required
                  id="contact-message"
                  name="Message"
                  placeholder="Message"
                ></textarea>
              </div>
            `:""}
        ${""===this.fields?T`
              <div>
                <p style="color: red; font-size: 1.5rem;">
                  Please provide a valid field value
                </p>
              </div>
            `:""}

        <div class="wm-form-submit__container ${this.fullWidthButton?"wm-form-submit__container--wide":""}">
          <input type="submit" title="Submit" />
        </div>
      </form>
    `}};X.styles=((t,...e)=>{const o=1===t.length?t[0]:e.reduce(((i,e,s)=>i+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(e)+t[s+1]),t[0]);return new s(o,i)})`
    .wm-form {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      font-family: inherit;
    }

    .wm-form input[type='text'],
    .wm-form input[type='email'],
    .wm-form textarea,
    .wm-form input[type='tel'],
    .wm-form select {
      box-sizing: border-box;
      border: 1px solid #dcdcdc;
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

    .wm-form select {
      color: black;
    }

    .wm-form textarea {
      color: black;
      min-height: 160px;
    }

    .wm-form .w-50 {
      width: 100%;
    }

    .wm-form div {
      box-sizing: border-box;
      display: flex;
      flex-flow: column;
      padding: 0.8rem;
      width: 100%;
    }

    .wm-form label {
      font-size: 1rem;
      color: inherit;
      margin-bottom: 0.25rem;
      font-weight: normal;
      text-align: left;
    }

    .wm-form .wm-form-submit__container {
      display: block;
    }

    .wm-form .wm-form-submit__container--wide {
      display: flex;
    }

    .wm-form input[type='submit'] {
      display: inline-block;
      font-size: 1.5rem;
      line-height: 1.2;
      text-align: center;
      color: var(--wm-theme-on-primary, #ffffff);
      padding: 12px 52px;
      margin: 0.25rem 0;
      background-color: var(--wm-theme-primary, #15222b);
      border: none;
      border-radius: var(--wm-form-submit-button-radius, 0px);
      transition: ease-in-out 350ms;
    }

    .wm-form input[type='submit']:hover {
      opacity: 0.8;
      cursor: pointer;
    }

    @media only screen and (min-width: 768px) {
      .wm-form .w-50 {
        width: 50%;
      }
    }
  `,V([G({type:String,reflect:!0,attribute:"formspark-form-id"})],X.prototype,"formSparkID",void 0),V([G({type:String,reflect:!0,attribute:"redirect-url"})],X.prototype,"redirectURL",void 0),V([G({type:String,reflect:!0,attribute:"fields"})],X.prototype,"fields",void 0),V([G({type:Boolean,reflect:!0,attribute:"full-width-button"})],X.prototype,"fullWidthButton",void 0),V([G({type:Array,reflect:!0,attribute:"referral-options"})],X.prototype,"referralOptions",void 0),X=V([(t=>i=>"function"==typeof i?((t,i)=>(window.customElements.define(t,i),i))(t,i):((t,i)=>{const{kind:e,elements:s}=i;return{kind:e,elements:s,finisher(i){window.customElements.define(t,i)}}})(t,i))("wm-form")],X);export{X as WebmarketsForm,Q as tagName};
