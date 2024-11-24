"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[545],{4462:(e,t,n)=>{let r;n.d(t,{C1:()=>eY,It:()=>eF,Mk:()=>F,XF:()=>ea,bv:()=>eS,iB:()=>eN,kp:()=>ew,lY:()=>eD,s3:()=>eE,s9:()=>eL,we:()=>eC,zR:()=>ey});var o,u=n(2115),l=n(5527),i=n(9590),c=n(5640),a=n(5684),s=n(7650),f=n(6932);let d={...o||(o=n.t(u,2))},v=d.useInsertionEffect||(e=>e());function m(e){let t=u.useRef(()=>{});return v(()=>{t.current=e}),u.useCallback(function(){for(var e=arguments.length,n=Array(e),r=0;r<e;r++)n[r]=arguments[r];return null==t.current?void 0:t.current(...n)},[])}let p="ArrowUp",g="ArrowDown",E="ArrowLeft",b="ArrowRight";function h(e,t,n){return Math.floor(e/t)!==n}function y(e,t){return t<0||t>=e.current.length}function R(e,t){return x(e,{disabledIndices:t})}function w(e,t){return x(e,{decrement:!0,startingIndex:e.current.length,disabledIndices:t})}function x(e,t){let{startingIndex:n=-1,decrement:r=!1,disabledIndices:o,amount:u=1}=void 0===t?{}:t,l=e.current,i=n;do i+=r?-u:u;while(i>=0&&i<=l.length-1&&k(l,i,o));return i}function k(e,t,n){if(n)return n.includes(t);let r=e[t];return null==r||r.hasAttribute("disabled")||"true"===r.getAttribute("aria-disabled")}var M="undefined"!=typeof document?u.useLayoutEffect:u.useEffect;function L(){return(L=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}let C=!1,T=0,A=()=>"floating-ui-"+Math.random().toString(36).slice(2,6)+T++,I=d.useId||function(){let[e,t]=u.useState(()=>C?A():void 0);return M(()=>{null==e&&t(A())},[]),u.useEffect(()=>{C=!0},[]),e},S=u.createContext(null),O=u.createContext(null),q=()=>{var e;return(null==(e=u.useContext(S))?void 0:e.id)||null},j=()=>u.useContext(O);function W(e){return"data-floating-ui-"+e}function P(e){let t=(0,u.useRef)(e);return M(()=>{t.current=e}),t}let Y=W("safe-polygon");function K(e,t,n){return n&&!(0,l.Go)(n)?0:"number"==typeof e?e:null==e?void 0:e[t]}function F(e,t){void 0===t&&(t={});let{open:n,onOpenChange:r,dataRef:o,events:i,elements:a}=e,{enabled:s=!0,delay:f=0,handleClose:d=null,mouseOnly:v=!1,restMs:p=0,move:g=!0}=t,E=j(),b=q(),h=P(d),y=P(f),R=P(n),w=u.useRef(),x=u.useRef(-1),k=u.useRef(),L=u.useRef(-1),C=u.useRef(!0),T=u.useRef(!1),A=u.useRef(()=>{}),I=u.useRef(!1),S=u.useCallback(()=>{var e;let t=null==(e=o.current.openEvent)?void 0:e.type;return(null==t?void 0:t.includes("mouse"))&&"mousedown"!==t},[o]);u.useEffect(()=>{if(s)return i.on("openchange",e),()=>{i.off("openchange",e)};function e(e){let{open:t}=e;t||(clearTimeout(x.current),clearTimeout(L.current),C.current=!0,I.current=!1)}},[s,i]),u.useEffect(()=>{if(!s||!h.current||!n)return;function e(e){S()&&r(!1,e,"hover")}let t=(0,l.YE)(a.floating).documentElement;return t.addEventListener("mouseleave",e),()=>{t.removeEventListener("mouseleave",e)}},[a.floating,n,r,s,h,S]);let O=u.useCallback(function(e,t,n){void 0===t&&(t=!0),void 0===n&&(n="hover");let o=K(y.current,"close",w.current);o&&!k.current?(clearTimeout(x.current),x.current=window.setTimeout(()=>r(!1,e,n),o)):t&&(clearTimeout(x.current),r(!1,e,n))},[y,r]),W=m(()=>{A.current(),k.current=void 0}),F=m(()=>{if(T.current){let e=(0,l.YE)(a.floating).body;e.style.pointerEvents="",e.removeAttribute(Y),T.current=!1}}),D=m(()=>!!o.current.openEvent&&["click","mousedown"].includes(o.current.openEvent.type));u.useEffect(()=>{if(s&&(0,c.vq)(a.domReference)){var e;let r=a.domReference;return n&&r.addEventListener("mouseleave",i),null==(e=a.floating)||e.addEventListener("mouseleave",i),g&&r.addEventListener("mousemove",t,{once:!0}),r.addEventListener("mouseenter",t),r.addEventListener("mouseleave",u),()=>{var e;n&&r.removeEventListener("mouseleave",i),null==(e=a.floating)||e.removeEventListener("mouseleave",i),g&&r.removeEventListener("mousemove",t),r.removeEventListener("mouseenter",t),r.removeEventListener("mouseleave",u)}}function t(e){if(clearTimeout(x.current),C.current=!1,v&&!(0,l.Go)(w.current)||p>0&&!K(y.current,"open"))return;let t=K(y.current,"open",w.current);t?x.current=window.setTimeout(()=>{R.current||r(!0,e,"hover")},t):n||r(!0,e,"hover")}function u(e){if(D())return;A.current();let t=(0,l.YE)(a.floating);if(clearTimeout(L.current),I.current=!1,h.current&&o.current.floatingContext){n||clearTimeout(x.current),k.current=h.current({...o.current.floatingContext,tree:E,x:e.clientX,y:e.clientY,onClose(){F(),W(),D()||O(e,!0,"safe-polygon")}});let r=k.current;t.addEventListener("mousemove",r),A.current=()=>{t.removeEventListener("mousemove",r)};return}"touch"===w.current&&(0,l.gR)(a.floating,e.relatedTarget)||O(e)}function i(e){!D()&&o.current.floatingContext&&(null==h.current||h.current({...o.current.floatingContext,tree:E,x:e.clientX,y:e.clientY,onClose(){F(),W(),D()||O(e)}})(e))}},[a,s,e,v,p,g,O,W,F,r,n,R,E,y,h,o,D]),M(()=>{var e,t;if(s&&n&&null!=(e=h.current)&&e.__options.blockPointerEvents&&S()){T.current=!0;let e=a.floating;if((0,c.vq)(a.domReference)&&e){let n=(0,l.YE)(a.floating).body;n.setAttribute(Y,"");let r=a.domReference,o=null==E||null==(t=E.nodesRef.current.find(e=>e.id===b))||null==(t=t.context)?void 0:t.elements.floating;return o&&(o.style.pointerEvents=""),n.style.pointerEvents="none",r.style.pointerEvents="auto",e.style.pointerEvents="auto",()=>{n.style.pointerEvents="",r.style.pointerEvents="",e.style.pointerEvents=""}}}},[s,n,b,a,E,h,S]),M(()=>{n||(w.current=void 0,I.current=!1,W(),F())},[n,W,F]),u.useEffect(()=>()=>{W(),clearTimeout(x.current),clearTimeout(L.current),F()},[s,a.domReference,W,F]);let _=u.useMemo(()=>{function e(e){w.current=e.pointerType}return{onPointerDown:e,onPointerEnter:e,onMouseMove(e){let{nativeEvent:t}=e;function o(){C.current||R.current||r(!0,t,"hover")}!(!v||(0,l.Go)(w.current))||n||0===p||I.current&&e.movementX**2+e.movementY**2<2||(clearTimeout(L.current),"touch"===w.current?o():(I.current=!0,L.current=window.setTimeout(o,p)))}}},[v,r,n,R,p]),N=u.useMemo(()=>({onMouseEnter(){clearTimeout(x.current)},onMouseLeave(e){D()||O(e.nativeEvent,!1)}}),[O,D]);return u.useMemo(()=>s?{reference:_,floating:N}:{},[s,_,N])}let D=()=>{},_=0;function N(e,t){void 0===t&&(t={});let{preventScroll:n=!1,cancelPrevious:r=!0,sync:o=!1}=t;r&&cancelAnimationFrame(_);let u=()=>null==e?void 0:e.focus({preventScroll:n});o?u():_=requestAnimationFrame(u)}function B(e,t){let n=e.filter(e=>{var n;return e.parentId===t&&(null==(n=e.context)?void 0:n.open)}),r=n;for(;r.length;)r=e.filter(e=>{var t;return null==(t=r)?void 0:t.some(t=>{var n;return e.parentId===t.id&&(null==(n=e.context)?void 0:n.open)})}),n=n.concat(r);return n}let X=new WeakMap,H=new WeakSet,V={},G=0,U=()=>"undefined"!=typeof HTMLElement&&"inert"in HTMLElement.prototype,z=e=>e&&(e.host||z(e.parentNode)),Z=(e,t)=>t.map(t=>{if(e.contains(t))return t;let n=z(t);return e.contains(n)?n:null}).filter(e=>null!=e);function $(e,t,n){void 0===t&&(t=!1),void 0===n&&(n=!1);let r=(0,l.YE)(e[0]).body;return function(e,t,n,r){let o="data-floating-ui-inert",u=r?"inert":n?"aria-hidden":null,l=Z(t,e),i=new Set,a=new Set(l),s=[];V[o]||(V[o]=new WeakMap);let f=V[o];return l.forEach(function e(t){!(!t||i.has(t))&&(i.add(t),t.parentNode&&e(t.parentNode))}),function e(t){!t||a.has(t)||[].forEach.call(t.children,t=>{if("script"!==(0,c.mq)(t)){if(i.has(t))e(t);else{let e=u?t.getAttribute(u):null,n=null!==e&&"false"!==e,r=(X.get(t)||0)+1,l=(f.get(t)||0)+1;X.set(t,r),f.set(t,l),s.push(t),1===r&&n&&H.add(t),1===l&&t.setAttribute(o,""),!n&&u&&t.setAttribute(u,"true")}}})}(t),i.clear(),G++,()=>{s.forEach(e=>{let t=(X.get(e)||0)-1,n=(f.get(e)||0)-1;X.set(e,t),f.set(e,n),t||(!H.has(e)&&u&&e.removeAttribute(u),H.delete(e)),n||e.removeAttribute(o)}),--G||(X=new WeakMap,X=new WeakMap,H=new WeakSet,V={})}}(e.concat(Array.from(r.querySelectorAll("[aria-live]"))),r,t,n)}let J=()=>({getShadowRoot:!0,displayCheck:"function"==typeof ResizeObserver&&ResizeObserver.toString().includes("[native code]")?"full":"none"});function Q(e,t){let n=(0,a.Kr)(e,J());"prev"===t&&n.reverse();let r=n.indexOf((0,l.RS)((0,l.YE)(e)));return n.slice(r+1)[0]}function ee(){return Q(document.body,"next")}function et(){return Q(document.body,"prev")}function en(e,t){let n=t||e.currentTarget,r=e.relatedTarget;return!r||!(0,l.gR)(n,r)}function er(e){e.querySelectorAll("[data-tabindex]").forEach(e=>{let t=e.dataset.tabindex;delete e.dataset.tabindex,t?e.setAttribute("tabindex",t):e.removeAttribute("tabindex")})}let eo={border:0,clip:"rect(0 0 0 0)",height:"1px",margin:"-1px",overflow:"hidden",padding:0,position:"fixed",whiteSpace:"nowrap",width:"1px",top:0,left:0};function eu(e){"Tab"===e.key&&(e.target,clearTimeout(r))}let el=u.forwardRef(function(e,t){let[n,r]=u.useState();M(()=>((0,l.nr)()&&r("button"),document.addEventListener("keydown",eu),()=>{document.removeEventListener("keydown",eu)}),[]);let o={ref:t,tabIndex:0,role:n,"aria-hidden":!n||void 0,[W("focus-guard")]:"",style:eo};return u.createElement("span",L({},e,o))}),ei=u.createContext(null),ec=W("portal");function ea(e){let{children:t,id:n,root:r,preserveTabOrder:o=!0}=e,l=function(e){void 0===e&&(e={});let{id:t,root:n}=e,r=I(),o=es(),[l,i]=u.useState(null),a=u.useRef(null);return M(()=>()=>{null==l||l.remove(),queueMicrotask(()=>{a.current=null})},[l]),M(()=>{if(!r||a.current)return;let e=t?document.getElementById(t):null;if(!e)return;let n=document.createElement("div");n.id=r,n.setAttribute(ec,""),e.appendChild(n),a.current=n,i(n)},[t,r]),M(()=>{if(null===n||!r||a.current)return;let e=n||(null==o?void 0:o.portalNode);e&&!(0,c.vq)(e)&&(e=e.current),e=e||document.body;let u=null;t&&((u=document.createElement("div")).id=t,e.appendChild(u));let l=document.createElement("div");l.id=r,l.setAttribute(ec,""),(e=u||e).appendChild(l),a.current=l,i(l)},[t,n,r,o]),l}({id:n,root:r}),[i,f]=u.useState(null),d=u.useRef(null),v=u.useRef(null),m=u.useRef(null),p=u.useRef(null),g=null==i?void 0:i.modal,E=null==i?void 0:i.open,b=!!i&&!i.modal&&i.open&&o&&!!(r||l);return u.useEffect(()=>{if(l&&o&&!g)return l.addEventListener("focusin",e,!0),l.addEventListener("focusout",e,!0),()=>{l.removeEventListener("focusin",e,!0),l.removeEventListener("focusout",e,!0)};function e(e){l&&en(e)&&("focusin"===e.type?er:function(e){(0,a.Kr)(e,J()).forEach(e=>{e.dataset.tabindex=e.getAttribute("tabindex")||"",e.setAttribute("tabindex","-1")})})(l)}},[l,o,g]),u.useEffect(()=>{l&&(E||er(l))},[E,l]),u.createElement(ei.Provider,{value:u.useMemo(()=>({preserveTabOrder:o,beforeOutsideRef:d,afterOutsideRef:v,beforeInsideRef:m,afterInsideRef:p,portalNode:l,setFocusManagerState:f}),[o,l])},b&&l&&u.createElement(el,{"data-type":"outside",ref:d,onFocus:e=>{if(en(e,l)){var t;null==(t=m.current)||t.focus()}else{let e=et()||(null==i?void 0:i.refs.domReference.current);null==e||e.focus()}}}),b&&l&&u.createElement("span",{"aria-owns":l.id,style:eo}),l&&s.createPortal(t,l),b&&l&&u.createElement(el,{"data-type":"outside",ref:v,onFocus:e=>{if(en(e,l)){var t;null==(t=p.current)||t.focus()}else{let t=ee()||(null==i?void 0:i.refs.domReference.current);null==t||t.focus(),(null==i?void 0:i.closeOnFocusOut)&&(null==i||i.onOpenChange(!1,e.nativeEvent,"focus-out"))}}}))}let es=()=>u.useContext(ei),ef="data-floating-ui-focusable";function ed(e){return e?e.hasAttribute(ef)?e:e.querySelector("["+ef+"]")||e:null}let ev=[];function em(e){ev=ev.filter(e=>e.isConnected);let t=e;if(t&&"body"!==(0,c.mq)(t)){if(!(0,a.AO)(t,J())){let e=(0,a.Kr)(t,J())[0];e&&(t=e)}ev.push(t),ev.length>20&&(ev=ev.slice(-20))}}function ep(){return ev.slice().reverse().find(e=>e.isConnected)}let eg=u.forwardRef(function(e,t){return u.createElement("button",L({},e,{type:"button",ref:t,tabIndex:-1,style:eo}))});function eE(e){let{context:t,children:n,disabled:r=!1,order:o=["content"],guards:i=!0,initialFocus:s=0,returnFocus:f=!0,restoreFocus:d=!1,modal:v=!0,visuallyHiddenDismiss:p=!1,closeOnFocusOut:g=!0}=e,{open:E,refs:b,nodeId:h,onOpenChange:y,events:R,dataRef:w,floatingId:x,elements:{domReference:k,floating:L}}=t,C="number"==typeof s&&s<0,T=(0,l.WZ)(k)&&C,A=!U()||i,I=P(o),S=P(s),O=P(f),q=j(),Y=es(),K=u.useRef(null),F=u.useRef(null),D=u.useRef(!1),_=u.useRef(!1),X=u.useRef(-1),H=null!=Y,V=ed(L),G=m(function(e){return void 0===e&&(e=V),e?(0,a.Kr)(e,J()):[]}),z=m(e=>{let t=G(e);return I.current.map(e=>k&&"reference"===e?k:V&&"floating"===e?V:t).filter(Boolean).flat()});function Z(e){return!r&&p&&v?u.createElement(eg,{ref:"start"===e?K:F,onClick:e=>y(!1,e.nativeEvent)},"string"==typeof p?p:"Dismiss"):null}u.useEffect(()=>{if(r||!v)return;function e(e){if("Tab"===e.key){(0,l.gR)(V,(0,l.RS)((0,l.YE)(V)))&&0===G().length&&!T&&(0,l.jo)(e);let t=z(),n=(0,l.EW)(e);"reference"===I.current[0]&&n===k&&((0,l.jo)(e),e.shiftKey?N(t[t.length-1]):N(t[1])),"floating"===I.current[1]&&n===V&&e.shiftKey&&((0,l.jo)(e),N(t[0]))}}let t=(0,l.YE)(V);return t.addEventListener("keydown",e),()=>{t.removeEventListener("keydown",e)}},[r,k,V,v,I,T,G,z]),u.useEffect(()=>{if(!r&&L)return L.addEventListener("focusin",e),()=>{L.removeEventListener("focusin",e)};function e(e){let t=(0,l.EW)(e),n=G().indexOf(t);-1!==n&&(X.current=n)}},[r,L,G]),u.useEffect(()=>{if(!r&&g&&L&&(0,c.sb)(k))return k.addEventListener("focusout",t),k.addEventListener("pointerdown",e),L.addEventListener("focusout",t),()=>{k.removeEventListener("focusout",t),k.removeEventListener("pointerdown",e),L.removeEventListener("focusout",t)};function e(){_.current=!0,setTimeout(()=>{_.current=!1})}function t(e){let t=e.relatedTarget;queueMicrotask(()=>{let n=!((0,l.gR)(k,t)||(0,l.gR)(L,t)||(0,l.gR)(t,L)||(0,l.gR)(null==Y?void 0:Y.portalNode,t)||null!=t&&t.hasAttribute(W("focus-guard"))||q&&(B(q.nodesRef.current,h).find(e=>{var n,r;return(0,l.gR)(null==(n=e.context)?void 0:n.elements.floating,t)||(0,l.gR)(null==(r=e.context)?void 0:r.elements.domReference,t)})||(function(e,t){var n;let r=[],o=null==(n=e.find(e=>e.id===t))?void 0:n.parentId;for(;o;){let t=e.find(e=>e.id===o);o=null==t?void 0:t.parentId,t&&(r=r.concat(t))}return r})(q.nodesRef.current,h).find(e=>{var n,r;return(null==(n=e.context)?void 0:n.elements.floating)===t||(null==(r=e.context)?void 0:r.elements.domReference)===t})));if(d&&n&&(0,l.RS)((0,l.YE)(V))===(0,l.YE)(V).body){(0,c.sb)(V)&&V.focus();let e=X.current,t=G(),n=t[e]||t[t.length-1]||V;(0,c.sb)(n)&&n.focus()}(T||!v)&&t&&n&&!_.current&&t!==ep()&&(D.current=!0,y(!1,e,"focus-out"))})}},[r,k,L,V,v,h,q,Y,y,g,d,G,T]),u.useEffect(()=>{var e;if(r)return;let t=Array.from((null==Y||null==(e=Y.portalNode)?void 0:e.querySelectorAll("["+W("portal")+"]"))||[]);if(L){let e=[L,...t,K.current,F.current,I.current.includes("reference")||T?k:null].filter(e=>null!=e),n=v||T?$(e,A,!A):$(e);return()=>{n()}}},[r,k,L,v,I,Y,T,A]),M(()=>{if(r||!(0,c.sb)(V))return;let e=(0,l.YE)(V),t=(0,l.RS)(e);queueMicrotask(()=>{let e=z(V),n=S.current,r=("number"==typeof n?e[n]:n.current)||V,o=(0,l.gR)(V,t);C||o||!E||N(r,{preventScroll:r===V})})},[r,E,V,C,z,S]),M(()=>{if(r||!V)return;let e=!1,t=(0,l.YE)(V),n=(0,l.RS)(t),o=w.current.openEvent;function u(t){let{open:n,reason:r,event:u,nested:i}=t;n&&(o=u),"escape-key"===r&&b.domReference.current&&em(b.domReference.current),"hover"===r&&"mouseleave"===u.type&&(D.current=!0),"outside-press"===r&&(i?(D.current=!1,e=!0):D.current=!((0,l.YF)(u)||(0,l.Pg)(u)))}em(n),R.on("openchange",u);let i=t.createElement("span");return i.setAttribute("tabindex","-1"),i.setAttribute("aria-hidden","true"),Object.assign(i.style,eo),H&&k&&k.insertAdjacentElement("afterend",i),()=>{R.off("openchange",u);let n=(0,l.RS)(t),r=(0,l.gR)(L,n)||q&&B(q.nodesRef.current,h).some(e=>{var t;return(0,l.gR)(null==(t=e.context)?void 0:t.elements.floating,n)});(r||o&&["click","mousedown"].includes(o.type))&&b.domReference.current&&em(b.domReference.current);let a="boolean"==typeof O.current?ep()||i:O.current.current||i;queueMicrotask(()=>{O.current&&!D.current&&(0,c.sb)(a)&&(a===n||n===t.body||r)&&a.focus({preventScroll:e}),i.remove()})}},[r,L,V,O,w,b,R,q,h,H,k]),u.useEffect(()=>{queueMicrotask(()=>{D.current=!1})},[r]),M(()=>{if(!r&&Y)return Y.setFocusManagerState({modal:v,closeOnFocusOut:g,open:E,onOpenChange:y,refs:b}),()=>{Y.setFocusManagerState(null)}},[r,Y,v,E,y,b,g]),M(()=>{if(r||!V||"function"!=typeof MutationObserver||C)return;let e=()=>{let e=V.getAttribute("tabindex"),t=G(),n=(0,l.RS)((0,l.YE)(L)),r=t.indexOf(n);-1!==r&&(X.current=r),I.current.includes("floating")||n!==b.domReference.current&&0===t.length?"0"!==e&&V.setAttribute("tabindex","0"):"-1"!==e&&V.setAttribute("tabindex","-1")};e();let t=new MutationObserver(e);return t.observe(V,{childList:!0,subtree:!0,attributes:!0}),()=>{t.disconnect()}},[r,L,V,b,I,G,C]);let Q=!r&&A&&(!v||!T)&&(H||v);return u.createElement(u.Fragment,null,Q&&u.createElement(el,{"data-type":"inside",ref:null==Y?void 0:Y.beforeInsideRef,onFocus:e=>{if(v){let e=z();N("reference"===o[0]?e[0]:e[e.length-1])}else if(null!=Y&&Y.preserveTabOrder&&Y.portalNode){if(D.current=!1,en(e,Y.portalNode)){let e=ee()||k;null==e||e.focus()}else{var t;null==(t=Y.beforeOutsideRef.current)||t.focus()}}}}),!T&&Z("start"),n,Z("end"),Q&&u.createElement(el,{"data-type":"inside",ref:null==Y?void 0:Y.afterInsideRef,onFocus:e=>{if(v)N(z()[0]);else if(null!=Y&&Y.preserveTabOrder&&Y.portalNode){if(g&&(D.current=!0),en(e,Y.portalNode)){let e=et()||k;null==e||e.focus()}else{var t;null==(t=Y.afterOutsideRef.current)||t.focus()}}}}))}let eb=0,eh=()=>{},ey=u.forwardRef(function(e,t){let{lockScroll:n=!1,...r}=e;return M(()=>{if(n)return 1==++eb&&(eh=function(){let e=/iP(hone|ad|od)|iOS/.test((0,l.uo)()),t=document.body.style,n=Math.round(document.documentElement.getBoundingClientRect().left)+document.documentElement.scrollLeft?"paddingLeft":"paddingRight",r=window.innerWidth-document.documentElement.clientWidth,o=t.left?parseFloat(t.left):window.scrollX,u=t.top?parseFloat(t.top):window.scrollY;if(t.overflow="hidden",r&&(t[n]=r+"px"),e){var i,c;let e=(null==(i=window.visualViewport)?void 0:i.offsetLeft)||0;Object.assign(t,{position:"fixed",top:-(u-Math.floor((null==(c=window.visualViewport)?void 0:c.offsetTop)||0))+"px",left:-(o-Math.floor(e))+"px",right:"0"})}return()=>{Object.assign(t,{overflow:"",[n]:""}),e&&(Object.assign(t,{position:"",top:"",left:"",right:""}),window.scrollTo(o,u))}}()),()=>{0==--eb&&eh()}},[n]),u.createElement("div",L({ref:t},r,{style:{position:"fixed",overflow:"auto",top:0,right:0,bottom:0,left:0,...r.style}}))});function eR(e){return(0,c.sb)(e.target)&&"BUTTON"===e.target.tagName}function ew(e,t){void 0===t&&(t={});let{open:n,onOpenChange:r,dataRef:o,elements:{domReference:i}}=e,{enabled:c=!0,event:a="click",toggle:s=!0,ignoreMouse:f=!1,keyboardHandlers:d=!0,stickIfOpen:v=!0}=t,m=u.useRef(),p=u.useRef(!1),g=u.useMemo(()=>({onPointerDown(e){m.current=e.pointerType},onMouseDown(e){let t=m.current;0===e.button&&"click"!==a&&((0,l.Go)(t,!0)&&f||(n&&s&&(!o.current.openEvent||!v||"mousedown"===o.current.openEvent.type)?r(!1,e.nativeEvent,"click"):(e.preventDefault(),r(!0,e.nativeEvent,"click"))))},onClick(e){let t=m.current;if("mousedown"===a&&m.current){m.current=void 0;return}(0,l.Go)(t,!0)&&f||(n&&s&&(!o.current.openEvent||!v||"click"===o.current.openEvent.type)?r(!1,e.nativeEvent,"click"):r(!0,e.nativeEvent,"click"))},onKeyDown(e){m.current=void 0,e.defaultPrevented||!d||eR(e)||(" "!==e.key||(0,l.$u)(i)||(e.preventDefault(),p.current=!0),"Enter"===e.key&&(n&&s?r(!1,e.nativeEvent,"click"):r(!0,e.nativeEvent,"click")))},onKeyUp(e){!(e.defaultPrevented||!d||eR(e)||(0,l.$u)(i))&&" "===e.key&&p.current&&(p.current=!1,n&&s?r(!1,e.nativeEvent,"click"):r(!0,e.nativeEvent,"click"))}}),[o,i,a,f,d,r,n,v,s]);return u.useMemo(()=>c?{reference:g}:{},[c,g])}let ex={pointerdown:"onPointerDown",mousedown:"onMouseDown",click:"onClick"},ek={pointerdown:"onPointerDownCapture",mousedown:"onMouseDownCapture",click:"onClickCapture"},eM=e=>{var t,n;return{escapeKey:"boolean"==typeof e?e:null!=(t=null==e?void 0:e.escapeKey)&&t,outsidePress:"boolean"==typeof e?e:null==(n=null==e?void 0:e.outsidePress)||n}};function eL(e,t){void 0===t&&(t={});let{open:n,onOpenChange:r,elements:o,dataRef:i}=e,{enabled:a=!0,escapeKey:s=!0,outsidePress:f=!0,outsidePressEvent:d="pointerdown",referencePress:v=!1,referencePressEvent:p="pointerdown",ancestorScroll:g=!1,bubbles:E,capture:b}=t,h=j(),y=m("function"==typeof f?f:()=>!1),R="function"==typeof f?y:f,w=u.useRef(!1),x=u.useRef(!1),{escapeKey:k,outsidePress:M}=eM(E),{escapeKey:L,outsidePress:C}=eM(b),T=u.useRef(!1),A=m(e=>{var t;if(!n||!a||!s||"Escape"!==e.key||T.current)return;let o=null==(t=i.current.floatingContext)?void 0:t.nodeId,u=h?B(h.nodesRef.current,o):[];if(!k&&(e.stopPropagation(),u.length>0)){let e=!0;if(u.forEach(t=>{var n;if(null!=(n=t.context)&&n.open&&!t.context.dataRef.current.__escapeKeyBubbles){e=!1;return}}),!e)return}r(!1,(0,l.O_)(e)?e.nativeEvent:e,"escape-key")}),I=m(e=>{var t;let n=()=>{var t;A(e),null==(t=(0,l.EW)(e))||t.removeEventListener("keydown",n)};null==(t=(0,l.EW)(e))||t.addEventListener("keydown",n)}),S=m(e=>{var t;let n=w.current;w.current=!1;let u=x.current;if(x.current=!1,"click"===d&&u||n||"function"==typeof R&&!R(e))return;let a=(0,l.EW)(e),s="["+W("inert")+"]",f=(0,l.YE)(o.floating).querySelectorAll(s),v=(0,c.vq)(a)?a:null;for(;v&&!(0,c.eu)(v);){let e=(0,c.$4)(v);if((0,c.eu)(e)||!(0,c.vq)(e))break;v=e}if(f.length&&(0,c.vq)(a)&&!(0,l.tZ)(a)&&!(0,l.gR)(a,o.floating)&&Array.from(f).every(e=>!(0,l.gR)(v,e)))return;if((0,c.sb)(a)&&P){let t=a.clientWidth>0&&a.scrollWidth>a.clientWidth,n=a.clientHeight>0&&a.scrollHeight>a.clientHeight,r=n&&e.offsetX>a.clientWidth;if(n&&"rtl"===(0,c.L9)(a).direction&&(r=e.offsetX<=a.offsetWidth-a.clientWidth),r||t&&e.offsetY>a.clientHeight)return}let m=null==(t=i.current.floatingContext)?void 0:t.nodeId,p=h&&B(h.nodesRef.current,m).some(t=>{var n;return(0,l.F2)(e,null==(n=t.context)?void 0:n.elements.floating)});if((0,l.F2)(e,o.floating)||(0,l.F2)(e,o.domReference)||p)return;let g=h?B(h.nodesRef.current,m):[];if(g.length>0){let e=!0;if(g.forEach(t=>{var n;if(null!=(n=t.context)&&n.open&&!t.context.dataRef.current.__outsidePressBubbles){e=!1;return}}),!e)return}r(!1,e,"outside-press")}),O=m(e=>{var t;let n=()=>{var t;S(e),null==(t=(0,l.EW)(e))||t.removeEventListener(d,n)};null==(t=(0,l.EW)(e))||t.addEventListener(d,n)});u.useEffect(()=>{if(!n||!a)return;i.current.__escapeKeyBubbles=k,i.current.__outsidePressBubbles=M;let e=-1;function t(e){r(!1,e,"ancestor-scroll")}function u(){window.clearTimeout(e),T.current=!0}function f(){e=window.setTimeout(()=>{T.current=!1},(0,c.Tc)()?5:0)}let v=(0,l.YE)(o.floating);s&&(v.addEventListener("keydown",L?I:A,L),v.addEventListener("compositionstart",u),v.addEventListener("compositionend",f)),R&&v.addEventListener(d,C?O:S,C);let m=[];return g&&((0,c.vq)(o.domReference)&&(m=(0,c.v9)(o.domReference)),(0,c.vq)(o.floating)&&(m=m.concat((0,c.v9)(o.floating))),!(0,c.vq)(o.reference)&&o.reference&&o.reference.contextElement&&(m=m.concat((0,c.v9)(o.reference.contextElement)))),(m=m.filter(e=>{var t;return e!==(null==(t=v.defaultView)?void 0:t.visualViewport)})).forEach(e=>{e.addEventListener("scroll",t,{passive:!0})}),()=>{s&&(v.removeEventListener("keydown",L?I:A,L),v.removeEventListener("compositionstart",u),v.removeEventListener("compositionend",f)),R&&v.removeEventListener(d,C?O:S,C),m.forEach(e=>{e.removeEventListener("scroll",t)}),window.clearTimeout(e)}},[i,o,s,R,d,n,r,g,a,k,M,A,L,I,S,C,O]),u.useEffect(()=>{w.current=!1},[R,d]);let q=u.useMemo(()=>({onKeyDown:A,[ex[p]]:e=>{v&&r(!1,e.nativeEvent,"reference-press")}}),[A,r,v,p]),P=u.useMemo(()=>({onKeyDown:A,onMouseDown(){x.current=!0},onMouseUp(){x.current=!0},[ek[d]]:()=>{w.current=!0}}),[A,d]);return u.useMemo(()=>a?{reference:q,floating:P}:{},[a,q,P])}function eC(e){void 0===e&&(e={});let{nodeId:t}=e,n=function(e){let{open:t=!1,onOpenChange:n,elements:r}=e,o=I(),l=u.useRef({}),[i]=u.useState(()=>(function(){let e=new Map;return{emit(t,n){var r;null==(r=e.get(t))||r.forEach(e=>e(n))},on(t,n){e.set(t,[...e.get(t)||[],n])},off(t,n){var r;e.set(t,(null==(r=e.get(t))?void 0:r.filter(e=>e!==n))||[])}}})()),c=null!=q(),[a,s]=u.useState(r.reference),f=m((e,t,r)=>{l.current.openEvent=e?t:void 0,i.emit("openchange",{open:e,event:t,reason:r,nested:c}),null==n||n(e,t,r)}),d=u.useMemo(()=>({setPositionReference:s}),[]),v=u.useMemo(()=>({reference:a||r.reference||null,floating:r.floating||null,domReference:r.reference}),[a,r.reference,r.floating]);return u.useMemo(()=>({dataRef:l,open:t,onOpenChange:f,elements:v,events:i,floatingId:o,refs:d}),[t,f,v,i,o,d])}({...e,elements:{reference:null,floating:null,...e.elements}}),r=e.rootContext||n,o=r.elements,[l,i]=u.useState(null),[a,s]=u.useState(null),d=(null==o?void 0:o.domReference)||l,v=u.useRef(null),p=j();M(()=>{d&&(v.current=d)},[d]);let g=(0,f.we)({...e,elements:{...o,...a&&{reference:a}}}),E=u.useCallback(e=>{let t=(0,c.vq)(e)?{getBoundingClientRect:()=>e.getBoundingClientRect(),contextElement:e}:e;s(t),g.refs.setReference(t)},[g.refs]),b=u.useCallback(e=>{((0,c.vq)(e)||null===e)&&(v.current=e,i(e)),((0,c.vq)(g.refs.reference.current)||null===g.refs.reference.current||null!==e&&!(0,c.vq)(e))&&g.refs.setReference(e)},[g.refs]),h=u.useMemo(()=>({...g.refs,setReference:b,setPositionReference:E,domReference:v}),[g.refs,b,E]),y=u.useMemo(()=>({...g.elements,domReference:d}),[g.elements,d]),R=u.useMemo(()=>({...g,...r,refs:h,elements:y,nodeId:t}),[g,h,y,t,r]);return M(()=>{r.dataRef.current.floatingContext=R;let e=null==p?void 0:p.nodesRef.current.find(e=>e.id===t);e&&(e.context=R)}),u.useMemo(()=>({...g,context:R,refs:h,elements:y}),[g,h,y,R])}let eT="active",eA="selected";function eI(e,t,n){let r=new Map,o="item"===n,u=e;if(o&&e){let{[eT]:t,[eA]:n,...r}=e;u=r}return{..."floating"===n&&{tabIndex:-1,[ef]:""},...u,...t.map(t=>{let r=t?t[n]:null;return"function"==typeof r?e?r(e):null:r}).concat(e).reduce((e,t)=>(t&&Object.entries(t).forEach(t=>{let[n,u]=t;if(!(o&&[eT,eA].includes(n))){if(0===n.indexOf("on")){if(r.has(n)||r.set(n,[]),"function"==typeof u){var l;null==(l=r.get(n))||l.push(u),e[n]=function(){for(var e,t=arguments.length,o=Array(t),u=0;u<t;u++)o[u]=arguments[u];return null==(e=r.get(n))?void 0:e.map(e=>e(...o)).find(e=>void 0!==e)}}}else e[n]=u}}),e),{})}}function eS(e){void 0===e&&(e=[]);let t=e.map(e=>null==e?void 0:e.reference),n=e.map(e=>null==e?void 0:e.floating),r=e.map(e=>null==e?void 0:e.item),o=u.useCallback(t=>eI(t,e,"reference"),t),l=u.useCallback(t=>eI(t,e,"floating"),n),i=u.useCallback(t=>eI(t,e,"item"),r);return u.useMemo(()=>({getReferenceProps:o,getFloatingProps:l,getItemProps:i}),[o,l,i])}let eO=!1;function eq(e,t,n){switch(e){case"vertical":return t;case"horizontal":return n;default:return t||n}}function ej(e,t){return eq(t,e===p||e===g,e===E||e===b)}function eW(e,t,n){return eq(t,e===g,n?e===E:e===b)||"Enter"===e||" "===e||""===e}function eP(e,t,n){return eq(t,n?e===b:e===E,e===p)}function eY(e,t){let{open:n,onOpenChange:r,elements:o}=e,{listRef:a,activeIndex:s,onNavigate:f=()=>{},enabled:d=!0,selectedIndex:v=null,allowEscape:L=!1,loop:C=!1,nested:T=!1,rtl:A=!1,virtual:I=!1,focusItemOnOpen:S="auto",focusItemOnHover:O=!0,openOnArrowKeyDown:W=!0,disabledIndices:Y,orientation:K="vertical",cols:F=1,scrollItemIntoView:D=!0,virtualItemRef:_,itemSizes:X,dense:H=!1}=t,V=P(ed(o.floating)),G=q(),U=j(),z=m(f),Z=(0,l.WZ)(o.domReference),$=u.useRef(S),J=u.useRef(null!=v?v:-1),Q=u.useRef(null),ee=u.useRef(!0),et=u.useRef(z),en=u.useRef(!!o.floating),er=u.useRef(n),eo=u.useRef(!1),eu=u.useRef(!1),el=P(Y),ei=P(n),ec=P(D),ea=P(v),[es,ef]=u.useState(),[ev,em]=u.useState(),ep=m(function(e,t,n){function r(e){I?(ef(e.id),null==U||U.events.emit("virtualfocus",e),_&&(_.current=e)):N(e,{preventScroll:!0,sync:!!((0,l.cX)()&&(0,l.nr)())&&(eO||eo.current)})}void 0===n&&(n=!1);let o=e.current[t.current];o&&r(o),requestAnimationFrame(()=>{let u=e.current[t.current]||o;if(!u)return;o||r(u);let l=ec.current;l&&eE&&(n||!ee.current)&&(null==u.scrollIntoView||u.scrollIntoView("boolean"==typeof l?{block:"nearest",inline:"nearest"}:l))})});M(()=>{document.createElement("div").focus({get preventScroll(){return eO=!0,!1}})},[]),M(()=>{d&&(n&&o.floating?$.current&&null!=v&&(eu.current=!0,J.current=v,z(v)):en.current&&(J.current=-1,et.current(null)))},[d,n,o.floating,v,z]),M(()=>{if(d&&n&&o.floating){if(null==s){if(eo.current=!1,null==ea.current&&(en.current&&(J.current=-1,ep(a,J)),(!er.current||!en.current)&&$.current&&(null!=Q.current||!0===$.current&&null==Q.current))){let e=0,t=()=>{null==a.current[0]?(e<2&&(e?requestAnimationFrame:queueMicrotask)(t),e++):(J.current=null==Q.current||eW(Q.current,K,A)||T?R(a,el.current):w(a,el.current),Q.current=null,z(J.current))};t()}}else y(a,s)||(J.current=s,ep(a,J,eu.current),eu.current=!1)}},[d,n,o.floating,s,ea,T,a,K,A,z,ep,el]),M(()=>{var e;if(!d||o.floating||!U||I||!en.current)return;let t=U.nodesRef.current,n=null==(e=t.find(e=>e.id===G))||null==(e=e.context)?void 0:e.elements.floating,r=(0,l.RS)((0,l.YE)(o.floating)),u=t.some(e=>e.context&&(0,l.gR)(e.context.elements.floating,r));n&&!u&&ee.current&&n.focus({preventScroll:!0})},[d,o.floating,U,G,I]),M(()=>{if(d&&U&&I&&!G)return U.events.on("virtualfocus",e),()=>{U.events.off("virtualfocus",e)};function e(e){em(e.id),_&&(_.current=e)}},[d,U,I,G,_]),M(()=>{et.current=z,en.current=!!o.floating}),M(()=>{n||(Q.current=null)},[n]),M(()=>{er.current=n},[n]);let eg=null!=s,eE=u.useMemo(()=>{function e(e){if(!n)return;let t=a.current.indexOf(e);-1!==t&&z(t)}return{onFocus(t){let{currentTarget:n}=t;e(n)},onClick:e=>{let{currentTarget:t}=e;return t.focus({preventScroll:!0})},...O&&{onMouseMove(t){let{currentTarget:n}=t;e(n)},onPointerLeave(e){let{pointerType:t}=e;ee.current&&"touch"!==t&&(J.current=-1,ep(a,J),z(null),I||N(V.current,{preventScroll:!0}))}}}},[n,V,ep,O,a,z,I]),eb=m(e=>{if(ee.current=!1,eo.current=!0,229===e.which||!ei.current&&e.currentTarget===V.current)return;if(T&&eP(e.key,K,A)){(0,l.jo)(e),r(!1,e.nativeEvent,"list-navigation"),(0,c.sb)(o.domReference)&&(I?null==U||U.events.emit("virtualfocus",o.domReference):o.domReference.focus());return}let t=J.current,u=R(a,Y),s=w(a,Y);if(Z||("Home"===e.key&&((0,l.jo)(e),J.current=u,z(J.current)),"End"===e.key&&((0,l.jo)(e),J.current=s,z(J.current))),F>1){var f;let t=X||Array.from({length:a.current.length},()=>({width:1,height:1})),n=function(e,t,n){let r=[],o=0;return e.forEach((e,u)=>{let{width:l,height:i}=e,c=!1;for(n&&(o=0);!c;){let e=[];for(let n=0;n<l;n++)for(let r=0;r<i;r++)e.push(o+n+r*t);o%t+l<=t&&e.every(e=>null==r[e])?(e.forEach(e=>{r[e]=u}),c=!0):o++}}),[...r]}(t,F,H),r=n.findIndex(e=>null!=e&&!k(a.current,e,Y)),o=n.reduce((e,t,n)=>null==t||k(a.current,t,Y)?e:n,-1),c=n[function(e,t){let{event:n,orientation:r,loop:o,rtl:u,cols:c,disabledIndices:a,minIndex:s,maxIndex:f,prevIndex:d,stopEvent:v=!1}=t,m=d;if(n.key===p){if(v&&(0,l.jo)(n),-1===d)m=f;else if(m=x(e,{startingIndex:m,amount:c,decrement:!0,disabledIndices:a}),o&&(d-c<s||m<0)){let e=d%c,t=f%c,n=f-(t-e);m=t===e?f:t>e?n:n-c}y(e,m)&&(m=d)}if(n.key===g&&(v&&(0,l.jo)(n),-1===d?m=s:(m=x(e,{startingIndex:d,amount:c,disabledIndices:a}),o&&d+c>f&&(m=x(e,{startingIndex:d%c-c,amount:c,disabledIndices:a}))),y(e,m)&&(m=d)),"both"===r){let t=(0,i.RI)(d/c);n.key===(u?E:b)&&(v&&(0,l.jo)(n),d%c!=c-1?(m=x(e,{startingIndex:d,disabledIndices:a}),o&&h(m,c,t)&&(m=x(e,{startingIndex:d-d%c-1,disabledIndices:a}))):o&&(m=x(e,{startingIndex:d-d%c-1,disabledIndices:a})),h(m,c,t)&&(m=d)),n.key===(u?b:E)&&(v&&(0,l.jo)(n),d%c!=0?(m=x(e,{startingIndex:d,decrement:!0,disabledIndices:a}),o&&h(m,c,t)&&(m=x(e,{startingIndex:d+(c-d%c),decrement:!0,disabledIndices:a}))):o&&(m=x(e,{startingIndex:d+(c-d%c),decrement:!0,disabledIndices:a})),h(m,c,t)&&(m=d));let r=(0,i.RI)(f/c)===t;y(e,m)&&(m=o&&r?n.key===(u?b:E)?f:x(e,{startingIndex:d-d%c-1,disabledIndices:a}):d)}return m}({current:n.map(e=>null!=e?a.current[e]:null)},{event:e,orientation:K,loop:C,rtl:A,cols:F,disabledIndices:(f=[...Y||a.current.map((e,t)=>k(a.current,t)?t:void 0),void 0],n.flatMap((e,t)=>f.includes(e)?[t]:[])),minIndex:r,maxIndex:o,prevIndex:function(e,t,n,r,o){if(-1===e)return -1;let u=n.indexOf(e),l=t[e];switch(o){case"tl":return u;case"tr":if(!l)return u;return u+l.width-1;case"bl":if(!l)return u;return u+(l.height-1)*r;case"br":return n.lastIndexOf(e)}}(J.current>s?u:J.current,t,n,F,e.key===g?"bl":e.key===(A?E:b)?"tr":"tl"),stopEvent:!0})];if(null!=c&&(J.current=c,z(J.current)),"both"===K)return}if(ej(e.key,K)){if((0,l.jo)(e),n&&!I&&(0,l.RS)(e.currentTarget.ownerDocument)===e.currentTarget){J.current=eW(e.key,K,A)?u:s,z(J.current);return}eW(e.key,K,A)?C?J.current=t>=s?L&&t!==a.current.length?-1:u:x(a,{startingIndex:t,disabledIndices:Y}):J.current=Math.min(s,x(a,{startingIndex:t,disabledIndices:Y})):C?J.current=t<=u?L&&-1!==t?a.current.length:s:x(a,{startingIndex:t,decrement:!0,disabledIndices:Y}):J.current=Math.max(u,x(a,{startingIndex:t,decrement:!0,disabledIndices:Y})),y(a,J.current)?z(null):z(J.current)}}),eh=u.useMemo(()=>I&&n&&eg&&{"aria-activedescendant":ev||es},[I,n,eg,ev,es]),ey=u.useMemo(()=>({"aria-orientation":"both"===K?void 0:K,...!(0,l.WZ)(o.domReference)&&eh,onKeyDown:eb,onPointerMove(){ee.current=!0}}),[eh,eb,o.domReference,K]),eR=u.useMemo(()=>{function e(e){"auto"===S&&(0,l.YF)(e.nativeEvent)&&($.current=!0)}return{...eh,onKeyDown(e){var t,o,u,i,c,s;ee.current=!1;let f=e.key.startsWith("Arrow"),d=["Home","End"].includes(e.key),m=(t=e.key,eq(K,A?t===E:t===b,t===g)),p=eP(e.key,K,A),h=ej(e.key,K),y=(T?m:h)||"Enter"===e.key||""===e.key.trim();if(I&&n){let t,n;let r=null==U?void 0:U.nodesRef.current.find(e=>null==e.parentId),v=U&&r?(o=U.nodesRef.current,u=r.id,n=-1,!function e(r,u){u>n&&(t=r,n=u),B(o,r).forEach(t=>{e(t.id,u+1)})}(u,0),o.find(e=>e.id===t)):null;if((f||d)&&v&&_){let t=new KeyboardEvent("keydown",{key:e.key,bubbles:!0});if(m||p){let n=(null==(i=v.context)?void 0:i.elements.domReference)===e.currentTarget,r=p&&!n?null==(c=v.context)?void 0:c.elements.domReference:m?a.current.find(e=>(null==e?void 0:e.id)===es):null;r&&((0,l.jo)(e),r.dispatchEvent(t),em(void 0))}if((h||d)&&v.context&&v.context.open&&v.parentId&&e.currentTarget!==v.context.elements.domReference){(0,l.jo)(e),null==(s=v.context.elements.domReference)||s.dispatchEvent(t);return}}return eb(e)}if(n||W||!f){if(y&&(Q.current=T&&h?null:e.key),T){m&&((0,l.jo)(e),n?(J.current=R(a,el.current),z(J.current)):r(!0,e.nativeEvent,"list-navigation"));return}h&&(null!=v&&(J.current=v),(0,l.jo)(e),!n&&W?r(!0,e.nativeEvent,"list-navigation"):eb(e),n&&z(J.current))}},onFocus(){n&&!I&&z(null)},onPointerDown:function(e){$.current=S,"auto"===S&&(0,l.Pg)(e.nativeEvent)&&($.current=!0)},onMouseDown:e,onClick:e}},[es,eh,eb,el,S,a,T,z,r,n,W,K,A,v,U,I,_]);return u.useMemo(()=>d?{reference:eR,floating:ey,item:eE}:{},[d,eR,ey,eE])}let eK=new Map([["select","listbox"],["combobox","listbox"],["label",!1]]);function eF(e,t){var n;void 0===t&&(t={});let{open:r,floatingId:o}=e,{enabled:l=!0,role:i="dialog"}=t,c=null!=(n=eK.get(i))?n:i,a=I(),s=null!=q(),f=u.useMemo(()=>"tooltip"===c||"label"===i?{["aria-"+("label"===i?"labelledby":"describedby")]:r?o:void 0}:{"aria-expanded":r?"true":"false","aria-haspopup":"alertdialog"===c?"dialog":c,"aria-controls":r?o:void 0,..."listbox"===c&&{role:"combobox"},..."menu"===c&&{id:a},..."menu"===c&&s&&{role:"menuitem"},..."select"===i&&{"aria-autocomplete":"none"},..."combobox"===i&&{"aria-autocomplete":"list"}},[c,o,s,r,a,i]),d=u.useMemo(()=>{let e={id:o,...c&&{role:c}};return"tooltip"===c||"label"===i?e:{...e,..."menu"===c&&{"aria-labelledby":a}}},[c,o,a,i]),v=u.useCallback(e=>{let{active:t,selected:n}=e,r={role:"option",...t&&{id:o+"-option"}};switch(i){case"select":return{...r,"aria-selected":t&&n};case"combobox":return{...r,...t&&{"aria-selected":!0}}}return{}},[o,i]);return u.useMemo(()=>l?{reference:f,floating:d,item:v}:{},[l,f,d,v])}function eD(e,t){var n;let{open:r,dataRef:o}=e,{listRef:i,activeIndex:c,onMatch:a,onTypingChange:s,enabled:f=!0,findMatch:d=null,resetMs:v=750,ignoreKeys:p=[],selectedIndex:g=null}=t,E=u.useRef(),b=u.useRef(""),h=u.useRef(null!=(n=null!=g?g:c)?n:-1),y=u.useRef(null),R=m(a),w=m(s),x=P(d),k=P(p);M(()=>{r&&(clearTimeout(E.current),y.current=null,b.current="")},[r]),M(()=>{if(r&&""===b.current){var e;h.current=null!=(e=null!=g?g:c)?e:-1}},[r,g,c]);let L=m(e=>{e?o.current.typing||(o.current.typing=e,w(e)):o.current.typing&&(o.current.typing=e,w(e))}),C=m(e=>{function t(e,t,n){let r=x.current?x.current(t,n):t.find(e=>(null==e?void 0:e.toLocaleLowerCase().indexOf(n.toLocaleLowerCase()))===0);return r?e.indexOf(r):-1}let n=i.current;if(b.current.length>0&&" "!==b.current[0]&&(-1===t(n,n,b.current)?L(!1):" "===e.key&&(0,l.jo)(e)),null==n||k.current.includes(e.key)||1!==e.key.length||e.ctrlKey||e.metaKey||e.altKey)return;r&&" "!==e.key&&((0,l.jo)(e),L(!0)),n.every(e=>{var t,n;return!e||(null==(t=e[0])?void 0:t.toLocaleLowerCase())!==(null==(n=e[1])?void 0:n.toLocaleLowerCase())})&&b.current===e.key&&(b.current="",h.current=y.current),b.current+=e.key,clearTimeout(E.current),E.current=setTimeout(()=>{b.current="",h.current=y.current,L(!1)},v);let o=h.current,u=t(n,[...n.slice((o||0)+1),...n.slice(0,(o||0)+1)],b.current);-1!==u?(R(u),y.current=u):" "!==e.key&&(b.current="",L(!1))}),T=u.useMemo(()=>({onKeyDown:C}),[C]),A=u.useMemo(()=>({onKeyDown:C,onKeyUp(e){" "===e.key&&L(!1)}}),[C,L]);return u.useMemo(()=>f?{reference:T,floating:A}:{},[f,T,A])}function e_(e,t){let[n,r]=e,o=!1,u=t.length;for(let e=0,l=u-1;e<u;l=e++){let[u,i]=t[e]||[0,0],[c,a]=t[l]||[0,0];i>=r!=a>=r&&n<=(c-u)*(r-i)/(a-i)+u&&(o=!o)}return o}function eN(e){let t;void 0===e&&(e={});let{buffer:n=.5,blockPointerEvents:r=!1,requireIntent:o=!0}=e,u=!1,i=null,a=null,s=performance.now(),f=e=>{let{x:r,y:f,placement:d,elements:v,onClose:m,nodeId:p,tree:g}=e;return function(e){function E(){clearTimeout(t),m()}if(clearTimeout(t),!v.domReference||!v.floating||null==d||null==r||null==f)return;let{clientX:b,clientY:h}=e,y=[b,h],R=(0,l.EW)(e),w="mouseleave"===e.type,x=(0,l.gR)(v.floating,R),k=(0,l.gR)(v.domReference,R),M=v.domReference.getBoundingClientRect(),L=v.floating.getBoundingClientRect(),C=d.split("-")[0],T=r>L.right-L.width/2,A=f>L.bottom-L.height/2,I=y[0]>=M.x&&y[0]<=M.x+M.width&&y[1]>=M.y&&y[1]<=M.y+M.height,S=L.width>M.width,O=L.height>M.height,q=(S?M:L).left,j=(S?M:L).right,W=(O?M:L).top,P=(O?M:L).bottom;if(x&&(u=!0,!w))return;if(k&&(u=!1),k&&!w){u=!0;return}if(w&&(0,c.vq)(e.relatedTarget)&&(0,l.gR)(v.floating,e.relatedTarget)||g&&B(g.nodesRef.current,p).some(e=>{let{context:t}=e;return null==t?void 0:t.open}))return;if("top"===C&&f>=M.bottom-1||"bottom"===C&&f<=M.top+1||"left"===C&&r>=M.right-1||"right"===C&&r<=M.left+1)return E();let Y=[];switch(C){case"top":Y=[[q,M.top+1],[q,L.bottom-1],[j,L.bottom-1],[j,M.top+1]];break;case"bottom":Y=[[q,L.top+1],[q,M.bottom-1],[j,M.bottom-1],[j,L.top+1]];break;case"left":Y=[[L.right-1,P],[L.right-1,W],[M.left+1,W],[M.left+1,P]];break;case"right":Y=[[M.right-1,P],[M.right-1,W],[L.left+1,W],[L.left+1,P]]}if(!e_([b,h],Y)){if(u&&!I)return E();if(!w&&o){let t=function(e,t){let n=performance.now(),r=n-s;if(null===i||null===a||0===r)return i=e,a=t,s=n,null;let o=e-i,u=t-a,l=Math.sqrt(o*o+u*u);return i=e,a=t,s=n,l/r}(e.clientX,e.clientY);if(null!==t&&t<.1)return E()}e_([b,h],function(e){let[t,r]=e;switch(C){case"top":{let e=[[L.left,T?L.bottom-n:S?L.bottom-n:L.top],[L.right,T?S?L.bottom-n:L.top:L.bottom-n]];return[[S?t+n/2:T?t+4*n:t-4*n,r+n+1],[S?t-n/2:T?t+4*n:t-4*n,r+n+1],...e]}case"bottom":{let e=[[L.left,T?L.top+n:S?L.top+n:L.bottom],[L.right,T?S?L.top+n:L.bottom:L.top+n]];return[[S?t+n/2:T?t+4*n:t-4*n,r-n],[S?t-n/2:T?t+4*n:t-4*n,r-n],...e]}case"left":return[[A?L.right-n:O?L.right-n:L.left,L.top],[A?O?L.right-n:L.left:L.right-n,L.bottom],[t+n+1,O?r+n/2:A?r+4*n:r-4*n],[t+n+1,O?r-n/2:A?r+4*n:r-4*n]];case"right":{let e=[[A?L.left+n:O?L.left+n:L.right,L.top],[A?O?L.left+n:L.right:L.left+n,L.bottom]];return[[t-n,O?r+n/2:A?r+4*n:r-4*n],[t-n,O?r-n/2:A?r+4*n:r-4*n],...e]}}}([r,f]))?!u&&o&&(t=window.setTimeout(E,40)):E()}}};return f.__options={blockPointerEvents:r},f}}}]);