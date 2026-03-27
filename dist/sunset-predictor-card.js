function t(t,e,i,s){var r,o=arguments.length,n=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(n=(o<3?r(n):o>3?r(e,i,n):r(e,i))||n);return o>3&&n&&Object.defineProperty(e,i,n),n}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),r=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new o(i,t,s)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,g=globalThis,f=g.trustedTypes,m=f?f.emptyScript:"",_=g.reactiveElementPolyfillSupport,v=(t,e)=>t,$={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},y=(t,e)=>!l(t,e),b={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:y};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:r}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);r?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...h(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),r=e.litNonce;void 0!==r&&s.setAttribute("nonce",r),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:$).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:$;this._$Em=s;const o=r.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i,s=!1,r){if(void 0!==t){const o=this.constructor;if(!1===s&&(r=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??y)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==r||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[v("elementProperties")]=new Map,w[v("finalized")]=new Map,_?.({ReactiveElement:w}),(g.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x=globalThis,A=t=>t,E=x.trustedTypes,S=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+k,M=`<${P}>`,T=document,U=()=>T.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,H=Array.isArray,N="[ \t\n\f\r]",R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,z=/-->/g,I=/>/g,j=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,L=/"/g,q=/^(?:script|style|textarea|title)$/i,B=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),W=B(1),F=B(2),V=Symbol.for("lit-noChange"),G=Symbol.for("lit-nothing"),Z=new WeakMap,J=T.createTreeWalker(T,129);function K(t,e){if(!H(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const Q=(t,e)=>{const i=t.length-1,s=[];let r,o=2===e?"<svg>":3===e?"<math>":"",n=R;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,d=0;for(;d<i.length&&(n.lastIndex=d,l=n.exec(i),null!==l);)d=n.lastIndex,n===R?"!--"===l[1]?n=z:void 0!==l[1]?n=I:void 0!==l[2]?(q.test(l[2])&&(r=RegExp("</"+l[2],"g")),n=j):void 0!==l[3]&&(n=j):n===j?">"===l[0]?(n=r??R,c=-1):void 0===l[1]?c=-2:(c=n.lastIndex-l[2].length,a=l[1],n=void 0===l[3]?j:'"'===l[3]?L:D):n===L||n===D?n=j:n===z||n===I?n=R:(n=j,r=void 0);const h=n===j&&t[e+1].startsWith("/>")?" ":"";o+=n===R?i+M:c>=0?(s.push(a),i.slice(0,c)+C+i.slice(c)+k+h):i+k+(-2===c?e:h)}return[K(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class X{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,o=0;const n=t.length-1,a=this.parts,[l,c]=Q(t,e);if(this.el=X.createElement(l,i),J.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=J.nextNode())&&a.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(C)){const e=c[o++],i=s.getAttribute(t).split(k),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:n[2],strings:i,ctor:"."===n[1]?st:"?"===n[1]?rt:"@"===n[1]?ot:it}),s.removeAttribute(t)}else t.startsWith(k)&&(a.push({type:6,index:r}),s.removeAttribute(t));if(q.test(s.tagName)){const t=s.textContent.split(k),e=t.length-1;if(e>0){s.textContent=E?E.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],U()),J.nextNode(),a.push({type:2,index:++r});s.append(t[e],U())}}}else if(8===s.nodeType)if(s.data===P)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=s.data.indexOf(k,t+1));)a.push({type:7,index:r}),t+=k.length-1}r++}}static createElement(t,e){const i=T.createElement("template");return i.innerHTML=t,i}}function Y(t,e,i=t,s){if(e===V)return e;let r=void 0!==s?i._$Co?.[s]:i._$Cl;const o=O(e)?void 0:e._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(t),r._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=r:i._$Cl=r),void 0!==r&&(e=Y(t,r._$AS(t,e.values),r,s)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??T).importNode(e,!0);J.currentNode=s;let r=J.nextNode(),o=0,n=0,a=i[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new et(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new nt(r,this,t)),this._$AV.push(e),a=i[++n]}o!==a?.index&&(r=J.nextNode(),o++)}return J.currentNode=T,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=G,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Y(this,t,e),O(t)?t===G||null==t||""===t?(this._$AH!==G&&this._$AR(),this._$AH=G):t!==this._$AH&&t!==V&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>H(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==G&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(T.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=X.createElement(K(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new tt(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=Z.get(t.strings);return void 0===e&&Z.set(t.strings,e=new X(t)),e}k(t){H(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const r of t)s===e.length?e.push(i=new et(this.O(U()),this.O(U()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class it{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=G,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=G}_$AI(t,e=this,i,s){const r=this.strings;let o=!1;if(void 0===r)t=Y(this,t,e,0),o=!O(t)||t!==this._$AH&&t!==V,o&&(this._$AH=t);else{const s=t;let n,a;for(t=r[0],n=0;n<r.length-1;n++)a=Y(this,s[i+n],e,n),a===V&&(a=this._$AH[n]),o||=!O(a)||a!==this._$AH[n],a===G?t=G:t!==G&&(t+=(a??"")+r[n+1]),this._$AH[n]=a}o&&!s&&this.j(t)}j(t){t===G?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class st extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===G?void 0:t}}class rt extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==G)}}class ot extends it{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=Y(this,t,e,0)??G)===V)return;const i=this._$AH,s=t===G&&i!==G||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==G&&(i===G||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Y(this,t)}}const at=x.litHtmlPolyfillSupport;at?.(X,et),(x.litHtmlVersions??=[]).push("3.3.2");const lt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ct extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let r=s._$litPart$;if(void 0===r){const t=i?.renderBefore??null;s._$litPart$=r=new et(e.insertBefore(U(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return V}}ct._$litElement$=!0,ct.finalized=!0,lt.litElementHydrateSupport?.({LitElement:ct});const dt=lt.litElementPolyfillSupport;dt?.({LitElement:ct}),(lt.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ht={attribute:!0,type:String,converter:$,reflect:!1,hasChanged:y},pt=(t=ht,e,i)=>{const{kind:s,metadata:r}=i;let o=globalThis.litPropertyMetadata.get(r);if(void 0===o&&globalThis.litPropertyMetadata.set(r,o=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const r=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,r,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const r=this[s];e.call(this,i),this.requestUpdate(s,r,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function ut(t){return(e,i)=>"object"==typeof i?pt(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function gt(t){return ut({...t,state:!0,attribute:!1})}const ft=["clouds","humidity","wind","temperature","visibility","rain","pressure","aqi"],mt={clouds:!0,humidity:!0,wind:!0,temperature:!0,visibility:!0,rain:!0,pressure:!0,aqi:!0},_t={show_weather_details:!0,show_explanation:!0,units:"metric",time_format:"auto",weather_items:{...mt}},vt={ring:"#a78bfa",glow:"rgba(139, 92, 246, 0.3)",text:"#a78bfa",label:"#c084fc"},$t={ring:"#f97316",glow:"rgba(249, 115, 22, 0.3)",text:"#fb923c",label:"#fdba74"},yt={ring:"#facc15",glow:"rgba(245, 158, 11, 0.25)",text:"#fbbf24",label:"#fcd34d"},bt={ring:"#94a3b8",glow:"rgba(100, 116, 139, 0.2)",text:"#94a3b8",label:"#cbd5e1"};const wt={1:"Good",2:"Fair",3:"Moderate",4:"Poor",5:"Very Poor"};const xt={clouds:"Clouds",humidity:"Humidity",wind:"Wind",temperature:"Temperature",visibility:"Visibility",rain:"Rain probability",pressure:"Pressure",aqi:"Air quality (AQI)"},At=n`
  :host {
    display: block;
  }

  ha-card {
    padding: 16px;
    overflow: hidden;
  }

  /* Header */
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .header-logo {
    width: 28px;
    height: 28px;
    flex-shrink: 0;
  }

  .header .title {
    font-size: 16px;
    font-weight: 500;
    color: var(--primary-text-color);
  }

  .header-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 2px;
    min-width: 0;
  }

  .header .location {
    font-size: 12px;
    color: var(--secondary-text-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100%;
  }

  .header .updated-ago {
    font-size: 10px;
    color: var(--secondary-text-color);
    opacity: 0.7;
  }

  /* Score Section */
  .score-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px 0 16px;
  }

  .score-ring-container {
    position: relative;
    width: 140px;
    height: 140px;
  }

  .score-ring-container svg {
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
  }

  .score-ring-bg {
    fill: none;
    stroke: var(--divider-color, rgba(255, 255, 255, 0.05));
    stroke-width: 8;
  }

  .score-ring-fill {
    fill: none;
    stroke-width: 8;
    stroke-linecap: round;
    transition: stroke-dashoffset 1s ease-out, stroke 0.5s ease;
  }

  .score-glow {
    position: absolute;
    inset: 8px;
    border-radius: 50%;
    filter: blur(18px);
    opacity: 0.4;
    transition: background 0.5s ease;
    pointer-events: none;
  }

  .score-value {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
  }

  .score-value .number {
    font-size: 36px;
    font-weight: 700;
    line-height: 1;
    transition: color 0.5s ease;
  }

  .score-value .max {
    font-size: 11px;
    color: var(--secondary-text-color);
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .score-label {
    margin-top: 8px;
    font-size: 16px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    transition: color 0.5s ease;
  }

  /* Explanation */
  .explanation {
    text-align: center;
    font-size: 13px;
    color: var(--secondary-text-color);
    line-height: 1.5;
    margin: 0 8px 16px;
  }

  /* Gradient Divider */
  .gradient-divider {
    height: 1px;
    background: linear-gradient(
      to right,
      transparent,
      var(--divider-color, rgba(255, 255, 255, 0.1)),
      transparent
    );
    margin: 0;
  }

  /* Times Section */
  .times-section {
    display: flex;
    justify-content: center;
    gap: 12px;
    padding: 14px 0;
  }

  .time-pill {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 16px;
    border-radius: 16px;
    background: var(--card-background-color, rgba(255, 255, 255, 0.05));
    border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.05));
    transition: background 0.2s ease;
  }

  .time-pill:hover {
    background: var(--secondary-background-color, rgba(255, 255, 255, 0.08));
  }

  .time-pill .time-icon-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }

  .time-pill .time-icon-wrap.sunrise {
    background: rgba(251, 191, 36, 0.2);
    color: #fbbf24;
  }

  .time-pill .time-icon-wrap.sunset {
    background: rgba(249, 115, 22, 0.2);
    color: #fb923c;
  }

  .time-pill .time-icon-wrap ha-icon {
    --mdc-icon-size: 18px;
  }

  .time-pill .time-text {
    display: flex;
    flex-direction: column;
  }

  .time-pill .time-label {
    font-size: 10px;
    color: var(--secondary-text-color);
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 0.5px;
  }

  .time-pill .time-value {
    font-size: 18px;
    font-weight: 700;
    color: var(--primary-text-color);
    line-height: 1.2;
  }

  /* Weather Grid */
  .weather-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 8px;
    padding: 14px 0;
  }

  .weather-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 12px 6px;
    border-radius: 12px;
    min-width: 0;
    background: var(--card-background-color, rgba(255, 255, 255, 0.05));
    border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.05));
    transition: background 0.2s ease;
  }

  .weather-card:hover {
    background: var(--secondary-background-color, rgba(255, 255, 255, 0.08));
  }

  .weather-card .weather-icon-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--divider-color, rgba(255, 255, 255, 0.05));
    margin-bottom: 6px;
    transition: transform 0.2s ease;
  }

  .weather-card:hover .weather-icon-wrap {
    transform: scale(1.1);
  }

  .weather-card .weather-icon-wrap ha-icon {
    --mdc-icon-size: 16px;
  }

  .weather-card .weather-label {
    font-size: 9px;
    color: var(--secondary-text-color);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 2px;
  }

  .weather-card .weather-value {
    font-size: 14px;
    font-weight: 700;
    color: var(--primary-text-color);
    line-height: 1.2;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100%;
  }

  .weather-card .weather-sub {
    font-size: 10px;
    color: var(--secondary-text-color);
    margin-top: 1px;
  }

  /* Wind direction arrow */
  .wind-dir {
    display: inline-block;
    font-size: 10px;
    color: var(--secondary-text-color);
    transition: transform 0.3s ease;
  }

  /* Error / Loading */
  .error {
    padding: 16px;
    text-align: center;
    color: var(--error-color, #db4437);
  }

  .unavailable {
    padding: 16px;
    text-align: center;
    color: var(--secondary-text-color);
  }
`,Et=[{name:"entity",selector:{entity:{domain:"sensor"}}},{name:"title",selector:{text:{}}},{name:"units",selector:{select:{options:[{value:"metric",label:"Metric (°C, m/s, km)"},{value:"imperial",label:"Imperial (°F, mph, mi)"}],mode:"dropdown"}}},{name:"time_format",selector:{select:{options:[{value:"auto",label:"Auto (browser default)"},{value:"12h",label:"12-hour (AM/PM)"},{value:"24h",label:"24-hour"}],mode:"dropdown"}}},{name:"show_explanation",selector:{boolean:{}}},{name:"show_weather_details",selector:{boolean:{}}}];class St extends ct{constructor(){super(...arguments),this._computeLabel=t=>({entity:"Entity",title:"Title (optional)",units:"Units",time_format:"Time format",show_weather_details:"Show weather details",show_explanation:"Show explanation"}[t.name]||t.name)}setConfig(t){this._config=t}_valueChanged(t){const e=t.detail.value,i=new CustomEvent("config-changed",{detail:{config:{...this._config,...e}},bubbles:!0,composed:!0});this.dispatchEvent(i)}_weatherItemToggled(t,e){const i={...{...mt,...this._config.weather_items},[t]:e},s=new CustomEvent("config-changed",{detail:{config:{...this._config,weather_items:i}},bubbles:!0,composed:!0});this.dispatchEvent(s)}render(){if(!this.hass||!this._config)return W``;const t={show_weather_details:_t.show_weather_details,show_explanation:_t.show_explanation,units:_t.units,time_format:_t.time_format,...this._config},e=!1!==t.show_weather_details,i={...mt,...this._config.weather_items};return W`
      <ha-form
        .hass=${this.hass}
        .data=${t}
        .schema=${Et}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
      ${e?W`
            <div class="weather-toggles">
              <div class="section-label">Weather items</div>
              <div class="toggle-grid">
                ${ft.map(t=>W`
                    <label class="toggle-item">
                      <ha-switch
                        .checked=${!1!==i[t]}
                        @change=${e=>this._weatherItemToggled(t,e.target.checked)}
                      ></ha-switch>
                      <span class="toggle-label">${xt[t]}</span>
                    </label>
                  `)}
              </div>
            </div>
          `:G}
    `}static get styles(){return n`
      :host {
        display: block;
      }
      .weather-toggles {
        margin-top: 16px;
        padding: 0 16px;
      }
      .section-label {
        font-size: 12px;
        font-weight: 500;
        color: var(--secondary-text-color);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 8px;
      }
      .toggle-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px 16px;
      }
      .toggle-item {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
      }
      .toggle-label {
        font-size: 14px;
        color: var(--primary-text-color);
      }
    `}}t([ut({attribute:!1})],St.prototype,"hass",void 0),t([gt()],St.prototype,"_config",void 0),customElements.define("sunset-predictor-card-editor",St);const Ct=2*Math.PI*52;let kt=0;class Pt extends ct{constructor(){super(...arguments),this._now=Date.now(),this._instanceId=`sp-${kt++}-${Math.random().toString(36).slice(2,7)}`}static getConfigElement(){return document.createElement("sunset-predictor-card-editor")}static getStubConfig(){return{entity:""}}setConfig(t){if(!t.entity)throw new Error("Entity is required");this._config={..._t,...t}}getCardSize(){let t=4;return this._config?.show_explanation&&(t+=1),this._config?.show_weather_details&&(t+=2),t}connectedCallback(){super.connectedCallback(),this._tickInterval=setInterval(()=>{this._now=Date.now()},3e4)}disconnectedCallback(){super.disconnectedCallback(),this._tickInterval&&(clearInterval(this._tickInterval),this._tickInterval=void 0)}render(){if(!this._config||!this.hass)return W``;const t=this._config.entity,e=this.hass.states[t];if(!e)return W`
        <ha-card>
          <div class="error">Entity not found: ${t}</div>
        </ha-card>
      `;const i=e.last_updated;if("unavailable"===e.state||"unknown"===e.state)return W`
        <ha-card>
          ${this._renderHeader(e.attributes,i)}
          <div class="unavailable">Data currently unavailable</div>
        </ha-card>
      `;const s=Number(e.state);if(Number.isNaN(s))return W`
        <ha-card>
          ${this._renderHeader(e.attributes,i)}
          <div class="unavailable">Invalid score data</div>
        </ha-card>
      `;const r=e.attributes;return W`
      <ha-card>
        ${this._renderHeader(r,i)}
        ${this._renderScore(s,r)}
        ${!1!==this._config.show_explanation?this._renderExplanation(r.explanation):G}
        <div class="gradient-divider"></div>
        ${this._renderTimes(r)}
        ${!1!==this._config.show_weather_details?W`
              <div class="gradient-divider"></div>
              ${this._renderWeatherGrid(r)}
            `:G}
      </ha-card>
    `}_renderHeader(t,e){const i=this._config.title||"Sunset Prediction",s=`${this._instanceId}-grad`,r=`${this._instanceId}-glow`,o=e?function(t,e){const i=new Date(t).getTime();if(Number.isNaN(i))return"";const s=Math.floor((e-i)/1e3);if(s<10)return"just now";if(s<60)return`${s}s ago`;const r=Math.floor(s/60);if(r<60)return`${r}m ago`;const o=Math.floor(r/60);return o<24?`${o}h ago`:`${Math.floor(o/24)}d ago`}(e,this._now):"";return W`
      <div class="header">
        <div class="header-left">
          ${F`
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="header-logo">
              <defs>
                <linearGradient id="${s}" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#8B5CF6" />
                  <stop offset="50%" stop-color="#EC4899" />
                  <stop offset="100%" stop-color="#F59E0B" />
                </linearGradient>
                <filter id="${r}">
                  <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <g transform="matrix(1.5, 0, 0, 1.5, -25, -25)">
                <circle cx="50" cy="50" r="25" fill="url(#${s})" filter="url(#${r})" />
                <path d="M 10 60 L 90 60" stroke="white" stroke-width="1" opacity="0.5" />
                <path d="M 20 67 L 80 67" stroke="white" stroke-width="1" opacity="0.3" />
                <path d="M 30 74 L 70 74" stroke="white" stroke-width="1" opacity="0.1" />
              </g>
            </svg>
          `}
          <span class="title">${i}</span>
        </div>
        <div class="header-right">
          ${t.location?W`<span class="location">${t.location}</span>`:G}
          ${o?W`<span class="updated-ago">${o}</span>`:G}
        </div>
      </div>
    `}_renderScore(t,e){const i=function(t){return t>=90?vt:t>=70?$t:t>=40?yt:bt}(t),s=Ct-t/100*Ct;return W`
      <div class="score-section">
        <div class="score-ring-container">
          <div class="score-glow" style="background: ${i.glow}"></div>
          <svg viewBox="0 0 128 128">
            <circle class="score-ring-bg" cx="64" cy="64" r="${52}" />
            <circle
              class="score-ring-fill"
              cx="64"
              cy="64"
              r="${52}"
              stroke="${i.ring}"
              stroke-dasharray="${Ct}"
              stroke-dashoffset="${s}"
              style="filter: drop-shadow(0 0 6px ${i.ring})"
            />
          </svg>
          <div class="score-value">
            <span class="number" style="color: ${i.text}">${t}</span>
            <span class="max">quality</span>
          </div>
        </div>
        <span class="score-label" style="color: ${i.label}">
          ${e.label}
        </span>
      </div>
    `}_renderExplanation(t){return t?W`<div class="explanation">${t}</div>`:W``}_renderTimes(t){const e=t.timezone||void 0,i=this._config.time_format||"auto",s=t=>{if(!t)return"--:--";try{const s={hour:"2-digit",minute:"2-digit",timeZone:e};return"12h"===i?s.hour12=!0:"24h"===i&&(s.hour12=!1),new Date(t).toLocaleTimeString([],s)}catch{return"--:--"}};return W`
      <div class="times-section">
        <div class="time-pill">
          <span class="time-icon-wrap sunrise">
            <ha-icon icon="mdi:weather-sunset-up"></ha-icon>
          </span>
          <div class="time-text">
            <span class="time-label">Sunrise</span>
            <span class="time-value">${s(t.sunrise_time)}</span>
          </div>
        </div>
        <div class="time-pill">
          <span class="time-icon-wrap sunset">
            <ha-icon icon="mdi:weather-sunset-down"></ha-icon>
          </span>
          <div class="time-text">
            <span class="time-label">Sunset</span>
            <span class="time-value">${s(t.sunset_time)}</span>
          </div>
        </div>
      </div>
    `}_isItemVisible(t){return!1!=={...mt,...this._config.weather_items}[t]}_renderWeatherGrid(t){const e="imperial"===this._config.units,i=(t,i)=>function(t,e,i){if(null==e)return"—";switch(t){case"clouds":case"humidity":case"rain":return`${e}%`;case"wind":return i?`${(2.237*e).toFixed(1)} mph`:`${e.toFixed(1)} m/s`;case"temperature":return i?`${(9*e/5+32).toFixed(1)}°F`:`${e.toFixed(1)}°C`;case"visibility":return i?`${(e/1609.34).toFixed(1)} mi`:`${(e/1e3).toFixed(1)} km`;case"pressure":return i?`${(.02953*e).toFixed(2)} inHg`:`${e} hPa`;case"aqi":return`${e}/5`}}(t,i,e),s=null!=t.wind_degree?`transform: rotate(${t.wind_degree}deg)`:"",r=[{key:"clouds",icon:"mdi:cloud",label:"Clouds",value:i("clouds",t.cloud_cover),color:"var(--weather-clouds, #93c5fd)"},{key:"humidity",icon:"mdi:water-percent",label:"Humidity",value:i("humidity",t.humidity),color:"var(--weather-humidity, #60a5fa)"},{key:"wind",icon:"mdi:weather-windy",label:"Wind",value:i("wind",t.wind_speed),sub:null!=t.wind_degree?W`<span class="wind-dir" style="${s}">▲</span> ${t.wind_degree}°`:G,color:"var(--weather-wind, #d1d5db)"},{key:"temperature",icon:"mdi:thermometer",label:"Temp",value:i("temperature",t.temperature),color:"var(--weather-temp, #fbbf24)"},{key:"visibility",icon:"mdi:eye",label:"Visibility",value:i("visibility",t.visibility),color:"var(--weather-visibility, #2dd4bf)"},{key:"rain",icon:"mdi:weather-rainy",label:"Rain",value:i("rain",t.rain_probability),color:"var(--weather-rain, #818cf8)"},{key:"pressure",icon:"mdi:gauge",label:"Pressure",value:i("pressure",t.pressure),color:"var(--weather-pressure, #a78bfa)"},{key:"aqi",icon:"mdi:leaf",label:"AQI",value:i("aqi",t.aqi),sub:null!=t.aqi?wt[t.aqi]||"":G,color:"var(--weather-aqi, #34d399)"}].filter(t=>this._isItemVisible(t.key));return 0===r.length?W``:W`
      <div class="weather-grid">
        ${r.map(t=>W`
            <div class="weather-card">
              <div class="weather-icon-wrap" style="color: ${t.color}">
                <ha-icon icon="${t.icon}"></ha-icon>
              </div>
              <span class="weather-label">${t.label}</span>
              <span class="weather-value">${t.value}</span>
              ${t.sub?W`<span class="weather-sub">${t.sub}</span>`:G}
            </div>
          `)}
      </div>
    `}}Pt.styles=At,t([ut({attribute:!1})],Pt.prototype,"hass",void 0),t([gt()],Pt.prototype,"_config",void 0),t([gt()],Pt.prototype,"_now",void 0),customElements.define("sunset-predictor-card",Pt),window.customCards=window.customCards||[],window.customCards.push({type:"sunset-predictor-card",name:"Sunset Predictor",description:"Display sunset quality predictions from sunset-predictor.com"});
