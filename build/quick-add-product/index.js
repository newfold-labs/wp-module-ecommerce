/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@headlessui/react/dist/components/description/description.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@headlessui/react/dist/components/description/description.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Description: () => (/* binding */ G),
/* harmony export */   useDescriptions: () => (/* binding */ w)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _hooks_use_event_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../hooks/use-event.js */ "./node_modules/@headlessui/react/dist/hooks/use-event.js");
/* harmony import */ var _hooks_use_id_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../hooks/use-id.js */ "./node_modules/@headlessui/react/dist/hooks/use-id.js");
/* harmony import */ var _hooks_use_iso_morphic_effect_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../hooks/use-iso-morphic-effect.js */ "./node_modules/@headlessui/react/dist/hooks/use-iso-morphic-effect.js");
/* harmony import */ var _hooks_use_sync_refs_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../hooks/use-sync-refs.js */ "./node_modules/@headlessui/react/dist/hooks/use-sync-refs.js");
/* harmony import */ var _utils_render_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/render.js */ "./node_modules/@headlessui/react/dist/utils/render.js");
let d=(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null);function f(){let r=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(d);if(r===null){let t=new Error("You used a <Description /> component, but it is not inside a relevant parent.");throw Error.captureStackTrace&&Error.captureStackTrace(t,f),t}return r}function w(){let[r,t]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);return[r.length>0?r.join(" "):void 0,(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>function(e){let i=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_1__.useEvent)(s=>(t(o=>[...o,s]),()=>t(o=>{let p=o.slice(),c=p.indexOf(s);return c!==-1&&p.splice(c,1),p}))),n=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>({register:i,slot:e.slot,name:e.name,props:e.props}),[i,e.slot,e.name,e.props]);return react__WEBPACK_IMPORTED_MODULE_0__.createElement(d.Provider,{value:n},e.children)},[t])]}let I="p";function S(r,t){let a=(0,_hooks_use_id_js__WEBPACK_IMPORTED_MODULE_2__.useId)(),{id:e=`headlessui-description-${a}`,...i}=r,n=f(),s=(0,_hooks_use_sync_refs_js__WEBPACK_IMPORTED_MODULE_4__.useSyncRefs)(t);(0,_hooks_use_iso_morphic_effect_js__WEBPACK_IMPORTED_MODULE_3__.useIsoMorphicEffect)(()=>n.register(e),[e,n.register]);let o={ref:s,...n.props,id:e};return (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_5__.render)({ourProps:o,theirProps:i,slot:n.slot||{},defaultTag:I,name:n.name||"Description"})}let h=(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_5__.forwardRefWithAs)(S),G=Object.assign(h,{});


/***/ }),

/***/ "./node_modules/@headlessui/react/dist/components/dialog/dialog.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@headlessui/react/dist/components/dialog/dialog.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Dialog: () => (/* binding */ _t)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _components_focus_trap_focus_trap_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/focus-trap/focus-trap.js */ "./node_modules/@headlessui/react/dist/components/focus-trap/focus-trap.js");
/* harmony import */ var _components_portal_portal_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/portal/portal.js */ "./node_modules/@headlessui/react/dist/components/portal/portal.js");
/* harmony import */ var _hooks_document_overflow_use_document_overflow_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../hooks/document-overflow/use-document-overflow.js */ "./node_modules/@headlessui/react/dist/hooks/document-overflow/use-document-overflow.js");
/* harmony import */ var _hooks_use_event_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../hooks/use-event.js */ "./node_modules/@headlessui/react/dist/hooks/use-event.js");
/* harmony import */ var _hooks_use_event_listener_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../hooks/use-event-listener.js */ "./node_modules/@headlessui/react/dist/hooks/use-event-listener.js");
/* harmony import */ var _hooks_use_id_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../hooks/use-id.js */ "./node_modules/@headlessui/react/dist/hooks/use-id.js");
/* harmony import */ var _hooks_use_inert_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../hooks/use-inert.js */ "./node_modules/@headlessui/react/dist/hooks/use-inert.js");
/* harmony import */ var _hooks_use_outside_click_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../hooks/use-outside-click.js */ "./node_modules/@headlessui/react/dist/hooks/use-outside-click.js");
/* harmony import */ var _hooks_use_owner_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../hooks/use-owner.js */ "./node_modules/@headlessui/react/dist/hooks/use-owner.js");
/* harmony import */ var _hooks_use_root_containers_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../hooks/use-root-containers.js */ "./node_modules/@headlessui/react/dist/hooks/use-root-containers.js");
/* harmony import */ var _hooks_use_server_handoff_complete_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../hooks/use-server-handoff-complete.js */ "./node_modules/@headlessui/react/dist/hooks/use-server-handoff-complete.js");
/* harmony import */ var _hooks_use_sync_refs_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../hooks/use-sync-refs.js */ "./node_modules/@headlessui/react/dist/hooks/use-sync-refs.js");
/* harmony import */ var _internal_open_closed_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../internal/open-closed.js */ "./node_modules/@headlessui/react/dist/internal/open-closed.js");
/* harmony import */ var _internal_portal_force_root_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../internal/portal-force-root.js */ "./node_modules/@headlessui/react/dist/internal/portal-force-root.js");
/* harmony import */ var _internal_stack_context_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../internal/stack-context.js */ "./node_modules/@headlessui/react/dist/internal/stack-context.js");
/* harmony import */ var _utils_bugs_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../utils/bugs.js */ "./node_modules/@headlessui/react/dist/utils/bugs.js");
/* harmony import */ var _utils_match_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../utils/match.js */ "./node_modules/@headlessui/react/dist/utils/match.js");
/* harmony import */ var _utils_render_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../utils/render.js */ "./node_modules/@headlessui/react/dist/utils/render.js");
/* harmony import */ var _description_description_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../description/description.js */ "./node_modules/@headlessui/react/dist/components/description/description.js");
/* harmony import */ var _keyboard_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../keyboard.js */ "./node_modules/@headlessui/react/dist/components/keyboard.js");
var Me=(r=>(r[r.Open=0]="Open",r[r.Closed=1]="Closed",r))(Me||{}),we=(e=>(e[e.SetTitleId=0]="SetTitleId",e))(we||{});let He={[0](o,e){return o.titleId===e.id?o:{...o,titleId:e.id}}},I=(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null);I.displayName="DialogContext";function b(o){let e=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(I);if(e===null){let r=new Error(`<${o} /> is missing a parent <Dialog /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(r,b),r}return e}function Be(o,e,r=()=>[document.body]){(0,_hooks_document_overflow_use_document_overflow_js__WEBPACK_IMPORTED_MODULE_3__.useDocumentOverflowLockedEffect)(o,e,i=>{var n;return{containers:[...(n=i.containers)!=null?n:[],r]}})}function Ge(o,e){return (0,_utils_match_js__WEBPACK_IMPORTED_MODULE_17__.match)(e.type,He,o,e)}let Ne="div",Ue=_utils_render_js__WEBPACK_IMPORTED_MODULE_18__.Features.RenderStrategy|_utils_render_js__WEBPACK_IMPORTED_MODULE_18__.Features.Static;function We(o,e){let r=(0,_hooks_use_id_js__WEBPACK_IMPORTED_MODULE_6__.useId)(),{id:i=`headlessui-dialog-${r}`,open:n,onClose:l,initialFocus:s,role:a="dialog",__demoMode:T=!1,...m}=o,[M,f]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),U=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(!1);a=function(){return a==="dialog"||a==="alertdialog"?a:(U.current||(U.current=!0,console.warn(`Invalid role [${a}] passed to <Dialog />. Only \`dialog\` and and \`alertdialog\` are supported. Using \`dialog\` instead.`)),"dialog")}();let E=(0,_internal_open_closed_js__WEBPACK_IMPORTED_MODULE_13__.useOpenClosed)();n===void 0&&E!==null&&(n=(E&_internal_open_closed_js__WEBPACK_IMPORTED_MODULE_13__.State.Open)===_internal_open_closed_js__WEBPACK_IMPORTED_MODULE_13__.State.Open);let D=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),ee=(0,_hooks_use_sync_refs_js__WEBPACK_IMPORTED_MODULE_12__.useSyncRefs)(D,e),g=(0,_hooks_use_owner_js__WEBPACK_IMPORTED_MODULE_9__.useOwnerDocument)(D),W=o.hasOwnProperty("open")||E!==null,$=o.hasOwnProperty("onClose");if(!W&&!$)throw new Error("You have to provide an `open` and an `onClose` prop to the `Dialog` component.");if(!W)throw new Error("You provided an `onClose` prop to the `Dialog`, but forgot an `open` prop.");if(!$)throw new Error("You provided an `open` prop to the `Dialog`, but forgot an `onClose` prop.");if(typeof n!="boolean")throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${n}`);if(typeof l!="function")throw new Error(`You provided an \`onClose\` prop to the \`Dialog\`, but the value is not a function. Received: ${l}`);let p=n?0:1,[h,te]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useReducer)(Ge,{titleId:null,descriptionId:null,panelRef:(0,react__WEBPACK_IMPORTED_MODULE_0__.createRef)()}),P=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_4__.useEvent)(()=>l(!1)),Y=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_4__.useEvent)(t=>te({type:0,id:t})),S=(0,_hooks_use_server_handoff_complete_js__WEBPACK_IMPORTED_MODULE_11__.useServerHandoffComplete)()?T?!1:p===0:!1,x=M>1,j=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(I)!==null,[oe,re]=(0,_components_portal_portal_js__WEBPACK_IMPORTED_MODULE_2__.useNestedPortals)(),ne={get current(){var t;return(t=h.panelRef.current)!=null?t:D.current}},{resolveContainers:w,mainTreeNodeRef:L,MainTreeNode:le}=(0,_hooks_use_root_containers_js__WEBPACK_IMPORTED_MODULE_10__.useRootContainers)({portals:oe,defaultContainers:[ne]}),ae=x?"parent":"leaf",J=E!==null?(E&_internal_open_closed_js__WEBPACK_IMPORTED_MODULE_13__.State.Closing)===_internal_open_closed_js__WEBPACK_IMPORTED_MODULE_13__.State.Closing:!1,ie=(()=>j||J?!1:S)(),se=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(()=>{var t,c;return(c=Array.from((t=g==null?void 0:g.querySelectorAll("body > *"))!=null?t:[]).find(d=>d.id==="headlessui-portal-root"?!1:d.contains(L.current)&&d instanceof HTMLElement))!=null?c:null},[L]);(0,_hooks_use_inert_js__WEBPACK_IMPORTED_MODULE_7__.useInert)(se,ie);let pe=(()=>x?!0:S)(),de=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(()=>{var t,c;return(c=Array.from((t=g==null?void 0:g.querySelectorAll("[data-headlessui-portal]"))!=null?t:[]).find(d=>d.contains(L.current)&&d instanceof HTMLElement))!=null?c:null},[L]);(0,_hooks_use_inert_js__WEBPACK_IMPORTED_MODULE_7__.useInert)(de,pe);let ue=(()=>!(!S||x))();(0,_hooks_use_outside_click_js__WEBPACK_IMPORTED_MODULE_8__.useOutsideClick)(w,t=>{t.preventDefault(),P()},ue);let fe=(()=>!(x||p!==0))();(0,_hooks_use_event_listener_js__WEBPACK_IMPORTED_MODULE_5__.useEventListener)(g==null?void 0:g.defaultView,"keydown",t=>{fe&&(t.defaultPrevented||t.key===_keyboard_js__WEBPACK_IMPORTED_MODULE_20__.Keys.Escape&&(t.preventDefault(),t.stopPropagation(),P()))});let ge=(()=>!(J||p!==0||j))();Be(g,ge,w),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{if(p!==0||!D.current)return;let t=new ResizeObserver(c=>{for(let d of c){let F=d.target.getBoundingClientRect();F.x===0&&F.y===0&&F.width===0&&F.height===0&&P()}});return t.observe(D.current),()=>t.disconnect()},[p,D,P]);let[Te,ce]=(0,_description_description_js__WEBPACK_IMPORTED_MODULE_19__.useDescriptions)(),De=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>[{dialogState:p,close:P,setTitleId:Y},h],[p,h,P,Y]),X=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>({open:p===0}),[p]),me={ref:ee,id:i,role:a,"aria-modal":p===0?!0:void 0,"aria-labelledby":h.titleId,"aria-describedby":Te};return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_internal_stack_context_js__WEBPACK_IMPORTED_MODULE_15__.StackProvider,{type:"Dialog",enabled:p===0,element:D,onUpdate:(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_4__.useEvent)((t,c)=>{c==="Dialog"&&(0,_utils_match_js__WEBPACK_IMPORTED_MODULE_17__.match)(t,{[_internal_stack_context_js__WEBPACK_IMPORTED_MODULE_15__.StackMessage.Add]:()=>f(d=>d+1),[_internal_stack_context_js__WEBPACK_IMPORTED_MODULE_15__.StackMessage.Remove]:()=>f(d=>d-1)})})},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_internal_portal_force_root_js__WEBPACK_IMPORTED_MODULE_14__.ForcePortalRoot,{force:!0},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_portal_portal_js__WEBPACK_IMPORTED_MODULE_2__.Portal,null,react__WEBPACK_IMPORTED_MODULE_0__.createElement(I.Provider,{value:De},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_portal_portal_js__WEBPACK_IMPORTED_MODULE_2__.Portal.Group,{target:D},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_internal_portal_force_root_js__WEBPACK_IMPORTED_MODULE_14__.ForcePortalRoot,{force:!1},react__WEBPACK_IMPORTED_MODULE_0__.createElement(ce,{slot:X,name:"Dialog.Description"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_focus_trap_focus_trap_js__WEBPACK_IMPORTED_MODULE_1__.FocusTrap,{initialFocus:s,containers:w,features:S?(0,_utils_match_js__WEBPACK_IMPORTED_MODULE_17__.match)(ae,{parent:_components_focus_trap_focus_trap_js__WEBPACK_IMPORTED_MODULE_1__.FocusTrap.features.RestoreFocus,leaf:_components_focus_trap_focus_trap_js__WEBPACK_IMPORTED_MODULE_1__.FocusTrap.features.All&~_components_focus_trap_focus_trap_js__WEBPACK_IMPORTED_MODULE_1__.FocusTrap.features.FocusLock}):_components_focus_trap_focus_trap_js__WEBPACK_IMPORTED_MODULE_1__.FocusTrap.features.None},react__WEBPACK_IMPORTED_MODULE_0__.createElement(re,null,(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_18__.render)({ourProps:me,theirProps:m,slot:X,defaultTag:Ne,features:Ue,visible:p===0,name:"Dialog"}))))))))),react__WEBPACK_IMPORTED_MODULE_0__.createElement(le,null))}let $e="div";function Ye(o,e){let r=(0,_hooks_use_id_js__WEBPACK_IMPORTED_MODULE_6__.useId)(),{id:i=`headlessui-dialog-overlay-${r}`,...n}=o,[{dialogState:l,close:s}]=b("Dialog.Overlay"),a=(0,_hooks_use_sync_refs_js__WEBPACK_IMPORTED_MODULE_12__.useSyncRefs)(e),T=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_4__.useEvent)(f=>{if(f.target===f.currentTarget){if((0,_utils_bugs_js__WEBPACK_IMPORTED_MODULE_16__.isDisabledReactIssue7711)(f.currentTarget))return f.preventDefault();f.preventDefault(),f.stopPropagation(),s()}}),m=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>({open:l===0}),[l]);return (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_18__.render)({ourProps:{ref:a,id:i,"aria-hidden":!0,onClick:T},theirProps:n,slot:m,defaultTag:$e,name:"Dialog.Overlay"})}let je="div";function Je(o,e){let r=(0,_hooks_use_id_js__WEBPACK_IMPORTED_MODULE_6__.useId)(),{id:i=`headlessui-dialog-backdrop-${r}`,...n}=o,[{dialogState:l},s]=b("Dialog.Backdrop"),a=(0,_hooks_use_sync_refs_js__WEBPACK_IMPORTED_MODULE_12__.useSyncRefs)(e);(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{if(s.panelRef.current===null)throw new Error("A <Dialog.Backdrop /> component is being used, but a <Dialog.Panel /> component is missing.")},[s.panelRef]);let T=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>({open:l===0}),[l]);return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_internal_portal_force_root_js__WEBPACK_IMPORTED_MODULE_14__.ForcePortalRoot,{force:!0},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_portal_portal_js__WEBPACK_IMPORTED_MODULE_2__.Portal,null,(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_18__.render)({ourProps:{ref:a,id:i,"aria-hidden":!0},theirProps:n,slot:T,defaultTag:je,name:"Dialog.Backdrop"})))}let Xe="div";function Ke(o,e){let r=(0,_hooks_use_id_js__WEBPACK_IMPORTED_MODULE_6__.useId)(),{id:i=`headlessui-dialog-panel-${r}`,...n}=o,[{dialogState:l},s]=b("Dialog.Panel"),a=(0,_hooks_use_sync_refs_js__WEBPACK_IMPORTED_MODULE_12__.useSyncRefs)(e,s.panelRef),T=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>({open:l===0}),[l]),m=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_4__.useEvent)(f=>{f.stopPropagation()});return (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_18__.render)({ourProps:{ref:a,id:i,onClick:m},theirProps:n,slot:T,defaultTag:Xe,name:"Dialog.Panel"})}let Ve="h2";function qe(o,e){let r=(0,_hooks_use_id_js__WEBPACK_IMPORTED_MODULE_6__.useId)(),{id:i=`headlessui-dialog-title-${r}`,...n}=o,[{dialogState:l,setTitleId:s}]=b("Dialog.Title"),a=(0,_hooks_use_sync_refs_js__WEBPACK_IMPORTED_MODULE_12__.useSyncRefs)(e);(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>(s(i),()=>s(null)),[i,s]);let T=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>({open:l===0}),[l]);return (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_18__.render)({ourProps:{ref:a,id:i},theirProps:n,slot:T,defaultTag:Ve,name:"Dialog.Title"})}let ze=(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_18__.forwardRefWithAs)(We),Qe=(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_18__.forwardRefWithAs)(Je),Ze=(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_18__.forwardRefWithAs)(Ke),et=(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_18__.forwardRefWithAs)(Ye),tt=(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_18__.forwardRefWithAs)(qe),_t=Object.assign(ze,{Backdrop:Qe,Panel:Ze,Overlay:et,Title:tt,Description:_description_description_js__WEBPACK_IMPORTED_MODULE_19__.Description});


/***/ }),

/***/ "./node_modules/@headlessui/react/dist/components/focus-trap/focus-trap.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@headlessui/react/dist/components/focus-trap/focus-trap.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FocusTrap: () => (/* binding */ de)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _hooks_use_disposables_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../hooks/use-disposables.js */ "./node_modules/@headlessui/react/dist/hooks/use-disposables.js");
/* harmony import */ var _hooks_use_event_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../hooks/use-event.js */ "./node_modules/@headlessui/react/dist/hooks/use-event.js");
/* harmony import */ var _hooks_use_event_listener_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../hooks/use-event-listener.js */ "./node_modules/@headlessui/react/dist/hooks/use-event-listener.js");
/* harmony import */ var _hooks_use_is_mounted_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../hooks/use-is-mounted.js */ "./node_modules/@headlessui/react/dist/hooks/use-is-mounted.js");
/* harmony import */ var _hooks_use_on_unmount_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../hooks/use-on-unmount.js */ "./node_modules/@headlessui/react/dist/hooks/use-on-unmount.js");
/* harmony import */ var _hooks_use_owner_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../hooks/use-owner.js */ "./node_modules/@headlessui/react/dist/hooks/use-owner.js");
/* harmony import */ var _hooks_use_server_handoff_complete_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../hooks/use-server-handoff-complete.js */ "./node_modules/@headlessui/react/dist/hooks/use-server-handoff-complete.js");
/* harmony import */ var _hooks_use_sync_refs_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../hooks/use-sync-refs.js */ "./node_modules/@headlessui/react/dist/hooks/use-sync-refs.js");
/* harmony import */ var _hooks_use_tab_direction_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../hooks/use-tab-direction.js */ "./node_modules/@headlessui/react/dist/hooks/use-tab-direction.js");
/* harmony import */ var _hooks_use_watch_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../hooks/use-watch.js */ "./node_modules/@headlessui/react/dist/hooks/use-watch.js");
/* harmony import */ var _internal_hidden_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../internal/hidden.js */ "./node_modules/@headlessui/react/dist/internal/hidden.js");
/* harmony import */ var _utils_active_element_history_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../utils/active-element-history.js */ "./node_modules/@headlessui/react/dist/utils/active-element-history.js");
/* harmony import */ var _utils_focus_management_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../utils/focus-management.js */ "./node_modules/@headlessui/react/dist/utils/focus-management.js");
/* harmony import */ var _utils_match_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../utils/match.js */ "./node_modules/@headlessui/react/dist/utils/match.js");
/* harmony import */ var _utils_micro_task_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../utils/micro-task.js */ "./node_modules/@headlessui/react/dist/utils/micro-task.js");
/* harmony import */ var _utils_render_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../utils/render.js */ "./node_modules/@headlessui/react/dist/utils/render.js");
function P(t){if(!t)return new Set;if(typeof t=="function")return new Set(t());let n=new Set;for(let e of t.current)e.current instanceof HTMLElement&&n.add(e.current);return n}let X="div";var _=(r=>(r[r.None=1]="None",r[r.InitialFocus=2]="InitialFocus",r[r.TabLock=4]="TabLock",r[r.FocusLock=8]="FocusLock",r[r.RestoreFocus=16]="RestoreFocus",r[r.All=30]="All",r))(_||{});function z(t,n){let e=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),o=(0,_hooks_use_sync_refs_js__WEBPACK_IMPORTED_MODULE_8__.useSyncRefs)(e,n),{initialFocus:l,containers:c,features:r=30,...s}=t;(0,_hooks_use_server_handoff_complete_js__WEBPACK_IMPORTED_MODULE_7__.useServerHandoffComplete)()||(r=1);let i=(0,_hooks_use_owner_js__WEBPACK_IMPORTED_MODULE_6__.useOwnerDocument)(e);Y({ownerDocument:i},Boolean(r&16));let u=Z({ownerDocument:i,container:e,initialFocus:l},Boolean(r&2));$({ownerDocument:i,container:e,containers:c,previousActiveElement:u},Boolean(r&8));let y=(0,_hooks_use_tab_direction_js__WEBPACK_IMPORTED_MODULE_9__.useTabDirection)(),R=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_2__.useEvent)(a=>{let m=e.current;if(!m)return;(B=>B())(()=>{(0,_utils_match_js__WEBPACK_IMPORTED_MODULE_14__.match)(y.current,{[_hooks_use_tab_direction_js__WEBPACK_IMPORTED_MODULE_9__.Direction.Forwards]:()=>{(0,_utils_focus_management_js__WEBPACK_IMPORTED_MODULE_13__.focusIn)(m,_utils_focus_management_js__WEBPACK_IMPORTED_MODULE_13__.Focus.First,{skipElements:[a.relatedTarget]})},[_hooks_use_tab_direction_js__WEBPACK_IMPORTED_MODULE_9__.Direction.Backwards]:()=>{(0,_utils_focus_management_js__WEBPACK_IMPORTED_MODULE_13__.focusIn)(m,_utils_focus_management_js__WEBPACK_IMPORTED_MODULE_13__.Focus.Last,{skipElements:[a.relatedTarget]})}})})}),h=(0,_hooks_use_disposables_js__WEBPACK_IMPORTED_MODULE_1__.useDisposables)(),H=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(!1),j={ref:o,onKeyDown(a){a.key=="Tab"&&(H.current=!0,h.requestAnimationFrame(()=>{H.current=!1}))},onBlur(a){let m=P(c);e.current instanceof HTMLElement&&m.add(e.current);let T=a.relatedTarget;T instanceof HTMLElement&&T.dataset.headlessuiFocusGuard!=="true"&&(S(m,T)||(H.current?(0,_utils_focus_management_js__WEBPACK_IMPORTED_MODULE_13__.focusIn)(e.current,(0,_utils_match_js__WEBPACK_IMPORTED_MODULE_14__.match)(y.current,{[_hooks_use_tab_direction_js__WEBPACK_IMPORTED_MODULE_9__.Direction.Forwards]:()=>_utils_focus_management_js__WEBPACK_IMPORTED_MODULE_13__.Focus.Next,[_hooks_use_tab_direction_js__WEBPACK_IMPORTED_MODULE_9__.Direction.Backwards]:()=>_utils_focus_management_js__WEBPACK_IMPORTED_MODULE_13__.Focus.Previous})|_utils_focus_management_js__WEBPACK_IMPORTED_MODULE_13__.Focus.WrapAround,{relativeTo:a.target}):a.target instanceof HTMLElement&&(0,_utils_focus_management_js__WEBPACK_IMPORTED_MODULE_13__.focusElement)(a.target)))}};return react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,Boolean(r&4)&&react__WEBPACK_IMPORTED_MODULE_0__.createElement(_internal_hidden_js__WEBPACK_IMPORTED_MODULE_11__.Hidden,{as:"button",type:"button","data-headlessui-focus-guard":!0,onFocus:R,features:_internal_hidden_js__WEBPACK_IMPORTED_MODULE_11__.Features.Focusable}),(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_16__.render)({ourProps:j,theirProps:s,defaultTag:X,name:"FocusTrap"}),Boolean(r&4)&&react__WEBPACK_IMPORTED_MODULE_0__.createElement(_internal_hidden_js__WEBPACK_IMPORTED_MODULE_11__.Hidden,{as:"button",type:"button","data-headlessui-focus-guard":!0,onFocus:R,features:_internal_hidden_js__WEBPACK_IMPORTED_MODULE_11__.Features.Focusable}))}let D=(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_16__.forwardRefWithAs)(z),de=Object.assign(D,{features:_});function Q(t=!0){let n=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(_utils_active_element_history_js__WEBPACK_IMPORTED_MODULE_12__.history.slice());return (0,_hooks_use_watch_js__WEBPACK_IMPORTED_MODULE_10__.useWatch)(([e],[o])=>{o===!0&&e===!1&&(0,_utils_micro_task_js__WEBPACK_IMPORTED_MODULE_15__.microTask)(()=>{n.current.splice(0)}),o===!1&&e===!0&&(n.current=_utils_active_element_history_js__WEBPACK_IMPORTED_MODULE_12__.history.slice())},[t,_utils_active_element_history_js__WEBPACK_IMPORTED_MODULE_12__.history,n]),(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_2__.useEvent)(()=>{var e;return(e=n.current.find(o=>o!=null&&o.isConnected))!=null?e:null})}function Y({ownerDocument:t},n){let e=Q(n);(0,_hooks_use_watch_js__WEBPACK_IMPORTED_MODULE_10__.useWatch)(()=>{n||(t==null?void 0:t.activeElement)===(t==null?void 0:t.body)&&(0,_utils_focus_management_js__WEBPACK_IMPORTED_MODULE_13__.focusElement)(e())},[n]),(0,_hooks_use_on_unmount_js__WEBPACK_IMPORTED_MODULE_5__.useOnUnmount)(()=>{n&&(0,_utils_focus_management_js__WEBPACK_IMPORTED_MODULE_13__.focusElement)(e())})}function Z({ownerDocument:t,container:n,initialFocus:e},o){let l=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),c=(0,_hooks_use_is_mounted_js__WEBPACK_IMPORTED_MODULE_4__.useIsMounted)();return (0,_hooks_use_watch_js__WEBPACK_IMPORTED_MODULE_10__.useWatch)(()=>{if(!o)return;let r=n.current;r&&(0,_utils_micro_task_js__WEBPACK_IMPORTED_MODULE_15__.microTask)(()=>{if(!c.current)return;let s=t==null?void 0:t.activeElement;if(e!=null&&e.current){if((e==null?void 0:e.current)===s){l.current=s;return}}else if(r.contains(s)){l.current=s;return}e!=null&&e.current?(0,_utils_focus_management_js__WEBPACK_IMPORTED_MODULE_13__.focusElement)(e.current):(0,_utils_focus_management_js__WEBPACK_IMPORTED_MODULE_13__.focusIn)(r,_utils_focus_management_js__WEBPACK_IMPORTED_MODULE_13__.Focus.First)===_utils_focus_management_js__WEBPACK_IMPORTED_MODULE_13__.FocusResult.Error&&console.warn("There are no focusable elements inside the <FocusTrap />"),l.current=t==null?void 0:t.activeElement})},[o]),l}function $({ownerDocument:t,container:n,containers:e,previousActiveElement:o},l){let c=(0,_hooks_use_is_mounted_js__WEBPACK_IMPORTED_MODULE_4__.useIsMounted)();(0,_hooks_use_event_listener_js__WEBPACK_IMPORTED_MODULE_3__.useEventListener)(t==null?void 0:t.defaultView,"focus",r=>{if(!l||!c.current)return;let s=P(e);n.current instanceof HTMLElement&&s.add(n.current);let i=o.current;if(!i)return;let u=r.target;u&&u instanceof HTMLElement?S(s,u)?(o.current=u,(0,_utils_focus_management_js__WEBPACK_IMPORTED_MODULE_13__.focusElement)(u)):(r.preventDefault(),r.stopPropagation(),(0,_utils_focus_management_js__WEBPACK_IMPORTED_MODULE_13__.focusElement)(i)):(0,_utils_focus_management_js__WEBPACK_IMPORTED_MODULE_13__.focusElement)(o.current)},!0)}function S(t,n){for(let e of t)if(e.contains(n))return!0;return!1}


/***/ }),

/***/ "./node_modules/@headlessui/react/dist/components/keyboard.js":
/*!********************************************************************!*\
  !*** ./node_modules/@headlessui/react/dist/components/keyboard.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Keys: () => (/* binding */ o)
/* harmony export */ });
var o=(r=>(r.Space=" ",r.Enter="Enter",r.Escape="Escape",r.Backspace="Backspace",r.Delete="Delete",r.ArrowLeft="ArrowLeft",r.ArrowUp="ArrowUp",r.ArrowRight="ArrowRight",r.ArrowDown="ArrowDown",r.Home="Home",r.End="End",r.PageUp="PageUp",r.PageDown="PageDown",r.Tab="Tab",r))(o||{});


/***/ }),

/***/ "./node_modules/@headlessui/react/dist/components/portal/portal.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@headlessui/react/dist/components/portal/portal.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Portal: () => (/* binding */ te),
/* harmony export */   useNestedPortals: () => (/* binding */ ee)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var _hooks_use_event_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../hooks/use-event.js */ "./node_modules/@headlessui/react/dist/hooks/use-event.js");
/* harmony import */ var _hooks_use_iso_morphic_effect_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../hooks/use-iso-morphic-effect.js */ "./node_modules/@headlessui/react/dist/hooks/use-iso-morphic-effect.js");
/* harmony import */ var _hooks_use_on_unmount_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../hooks/use-on-unmount.js */ "./node_modules/@headlessui/react/dist/hooks/use-on-unmount.js");
/* harmony import */ var _hooks_use_owner_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../hooks/use-owner.js */ "./node_modules/@headlessui/react/dist/hooks/use-owner.js");
/* harmony import */ var _hooks_use_server_handoff_complete_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../hooks/use-server-handoff-complete.js */ "./node_modules/@headlessui/react/dist/hooks/use-server-handoff-complete.js");
/* harmony import */ var _hooks_use_sync_refs_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../hooks/use-sync-refs.js */ "./node_modules/@headlessui/react/dist/hooks/use-sync-refs.js");
/* harmony import */ var _internal_portal_force_root_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../internal/portal-force-root.js */ "./node_modules/@headlessui/react/dist/internal/portal-force-root.js");
/* harmony import */ var _utils_env_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../utils/env.js */ "./node_modules/@headlessui/react/dist/utils/env.js");
/* harmony import */ var _utils_render_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../utils/render.js */ "./node_modules/@headlessui/react/dist/utils/render.js");
function F(p){let n=(0,_internal_portal_force_root_js__WEBPACK_IMPORTED_MODULE_8__.usePortalRoot)(),l=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_),e=(0,_hooks_use_owner_js__WEBPACK_IMPORTED_MODULE_5__.useOwnerDocument)(p),[a,o]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(()=>{if(!n&&l!==null||_utils_env_js__WEBPACK_IMPORTED_MODULE_9__.env.isServer)return null;let t=e==null?void 0:e.getElementById("headlessui-portal-root");if(t)return t;if(e===null)return null;let r=e.createElement("div");return r.setAttribute("id","headlessui-portal-root"),e.body.appendChild(r)});return (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{a!==null&&(e!=null&&e.body.contains(a)||e==null||e.body.appendChild(a))},[a,e]),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{n||l!==null&&o(l.current)},[l,o,n]),a}let U=react__WEBPACK_IMPORTED_MODULE_0__.Fragment;function N(p,n){let l=p,e=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),a=(0,_hooks_use_sync_refs_js__WEBPACK_IMPORTED_MODULE_7__.useSyncRefs)((0,_hooks_use_sync_refs_js__WEBPACK_IMPORTED_MODULE_7__.optionalRef)(u=>{e.current=u}),n),o=(0,_hooks_use_owner_js__WEBPACK_IMPORTED_MODULE_5__.useOwnerDocument)(e),t=F(e),[r]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(()=>{var u;return _utils_env_js__WEBPACK_IMPORTED_MODULE_9__.env.isServer?null:(u=o==null?void 0:o.createElement("div"))!=null?u:null}),i=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(f),v=(0,_hooks_use_server_handoff_complete_js__WEBPACK_IMPORTED_MODULE_6__.useServerHandoffComplete)();return (0,_hooks_use_iso_morphic_effect_js__WEBPACK_IMPORTED_MODULE_3__.useIsoMorphicEffect)(()=>{!t||!r||t.contains(r)||(r.setAttribute("data-headlessui-portal",""),t.appendChild(r))},[t,r]),(0,_hooks_use_iso_morphic_effect_js__WEBPACK_IMPORTED_MODULE_3__.useIsoMorphicEffect)(()=>{if(r&&i)return i.register(r)},[i,r]),(0,_hooks_use_on_unmount_js__WEBPACK_IMPORTED_MODULE_4__.useOnUnmount)(()=>{var u;!t||!r||(r instanceof Node&&t.contains(r)&&t.removeChild(r),t.childNodes.length<=0&&((u=t.parentElement)==null||u.removeChild(t)))}),v?!t||!r?null:(0,react_dom__WEBPACK_IMPORTED_MODULE_1__.createPortal)((0,_utils_render_js__WEBPACK_IMPORTED_MODULE_10__.render)({ourProps:{ref:a},theirProps:l,defaultTag:U,name:"Portal"}),r):null}let S=react__WEBPACK_IMPORTED_MODULE_0__.Fragment,_=(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null);function j(p,n){let{target:l,...e}=p,o={ref:(0,_hooks_use_sync_refs_js__WEBPACK_IMPORTED_MODULE_7__.useSyncRefs)(n)};return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_.Provider,{value:l},(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_10__.render)({ourProps:o,theirProps:e,defaultTag:S,name:"Popover.Group"}))}let f=(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null);function ee(){let p=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(f),n=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)([]),l=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_2__.useEvent)(o=>(n.current.push(o),p&&p.register(o),()=>e(o))),e=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_2__.useEvent)(o=>{let t=n.current.indexOf(o);t!==-1&&n.current.splice(t,1),p&&p.unregister(o)}),a=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>({register:l,unregister:e,portals:n}),[l,e,n]);return[n,(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>function({children:t}){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(f.Provider,{value:a},t)},[a])]}let D=(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_10__.forwardRefWithAs)(N),I=(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_10__.forwardRefWithAs)(j),te=Object.assign(D,{Group:I});


/***/ }),

/***/ "./node_modules/@headlessui/react/dist/components/transitions/transition.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@headlessui/react/dist/components/transitions/transition.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Transition: () => (/* binding */ qe)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _hooks_use_disposables_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../hooks/use-disposables.js */ "./node_modules/@headlessui/react/dist/hooks/use-disposables.js");
/* harmony import */ var _hooks_use_event_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../hooks/use-event.js */ "./node_modules/@headlessui/react/dist/hooks/use-event.js");
/* harmony import */ var _hooks_use_flags_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../hooks/use-flags.js */ "./node_modules/@headlessui/react/dist/hooks/use-flags.js");
/* harmony import */ var _hooks_use_is_mounted_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../hooks/use-is-mounted.js */ "./node_modules/@headlessui/react/dist/hooks/use-is-mounted.js");
/* harmony import */ var _hooks_use_iso_morphic_effect_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../hooks/use-iso-morphic-effect.js */ "./node_modules/@headlessui/react/dist/hooks/use-iso-morphic-effect.js");
/* harmony import */ var _hooks_use_latest_value_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../hooks/use-latest-value.js */ "./node_modules/@headlessui/react/dist/hooks/use-latest-value.js");
/* harmony import */ var _hooks_use_server_handoff_complete_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../hooks/use-server-handoff-complete.js */ "./node_modules/@headlessui/react/dist/hooks/use-server-handoff-complete.js");
/* harmony import */ var _hooks_use_sync_refs_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../hooks/use-sync-refs.js */ "./node_modules/@headlessui/react/dist/hooks/use-sync-refs.js");
/* harmony import */ var _hooks_use_transition_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../hooks/use-transition.js */ "./node_modules/@headlessui/react/dist/hooks/use-transition.js");
/* harmony import */ var _internal_open_closed_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../internal/open-closed.js */ "./node_modules/@headlessui/react/dist/internal/open-closed.js");
/* harmony import */ var _utils_class_names_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../utils/class-names.js */ "./node_modules/@headlessui/react/dist/utils/class-names.js");
/* harmony import */ var _utils_match_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../utils/match.js */ "./node_modules/@headlessui/react/dist/utils/match.js");
/* harmony import */ var _utils_render_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../utils/render.js */ "./node_modules/@headlessui/react/dist/utils/render.js");
function S(t=""){return t.split(/\s+/).filter(n=>n.length>1)}let I=(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null);I.displayName="TransitionContext";var Se=(r=>(r.Visible="visible",r.Hidden="hidden",r))(Se||{});function ye(){let t=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(I);if(t===null)throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");return t}function xe(){let t=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(M);if(t===null)throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");return t}let M=(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null);M.displayName="NestingContext";function U(t){return"children"in t?U(t.children):t.current.filter(({el:n})=>n.current!==null).filter(({state:n})=>n==="visible").length>0}function se(t,n){let r=(0,_hooks_use_latest_value_js__WEBPACK_IMPORTED_MODULE_6__.useLatestValue)(t),s=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)([]),R=(0,_hooks_use_is_mounted_js__WEBPACK_IMPORTED_MODULE_4__.useIsMounted)(),D=(0,_hooks_use_disposables_js__WEBPACK_IMPORTED_MODULE_1__.useDisposables)(),p=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_2__.useEvent)((i,e=_utils_render_js__WEBPACK_IMPORTED_MODULE_13__.RenderStrategy.Hidden)=>{let a=s.current.findIndex(({el:o})=>o===i);a!==-1&&((0,_utils_match_js__WEBPACK_IMPORTED_MODULE_12__.match)(e,{[_utils_render_js__WEBPACK_IMPORTED_MODULE_13__.RenderStrategy.Unmount](){s.current.splice(a,1)},[_utils_render_js__WEBPACK_IMPORTED_MODULE_13__.RenderStrategy.Hidden](){s.current[a].state="hidden"}}),D.microTask(()=>{var o;!U(s)&&R.current&&((o=r.current)==null||o.call(r))}))}),x=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_2__.useEvent)(i=>{let e=s.current.find(({el:a})=>a===i);return e?e.state!=="visible"&&(e.state="visible"):s.current.push({el:i,state:"visible"}),()=>p(i,_utils_render_js__WEBPACK_IMPORTED_MODULE_13__.RenderStrategy.Unmount)}),h=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)([]),v=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(Promise.resolve()),u=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({enter:[],leave:[],idle:[]}),g=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_2__.useEvent)((i,e,a)=>{h.current.splice(0),n&&(n.chains.current[e]=n.chains.current[e].filter(([o])=>o!==i)),n==null||n.chains.current[e].push([i,new Promise(o=>{h.current.push(o)})]),n==null||n.chains.current[e].push([i,new Promise(o=>{Promise.all(u.current[e].map(([f,N])=>N)).then(()=>o())})]),e==="enter"?v.current=v.current.then(()=>n==null?void 0:n.wait.current).then(()=>a(e)):a(e)}),d=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_2__.useEvent)((i,e,a)=>{Promise.all(u.current[e].splice(0).map(([o,f])=>f)).then(()=>{var o;(o=h.current.shift())==null||o()}).then(()=>a(e))});return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>({children:s,register:x,unregister:p,onStart:g,onStop:d,wait:v,chains:u}),[x,p,s,g,d,u,v])}function Ne(){}let Pe=["beforeEnter","afterEnter","beforeLeave","afterLeave"];function ae(t){var r;let n={};for(let s of Pe)n[s]=(r=t[s])!=null?r:Ne;return n}function Re(t){let n=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(ae(t));return (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{n.current=ae(t)},[t]),n}let De="div",le=_utils_render_js__WEBPACK_IMPORTED_MODULE_13__.Features.RenderStrategy;function He(t,n){var Q,Y;let{beforeEnter:r,afterEnter:s,beforeLeave:R,afterLeave:D,enter:p,enterFrom:x,enterTo:h,entered:v,leave:u,leaveFrom:g,leaveTo:d,...i}=t,e=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),a=(0,_hooks_use_sync_refs_js__WEBPACK_IMPORTED_MODULE_8__.useSyncRefs)(e,n),o=(Q=i.unmount)==null||Q?_utils_render_js__WEBPACK_IMPORTED_MODULE_13__.RenderStrategy.Unmount:_utils_render_js__WEBPACK_IMPORTED_MODULE_13__.RenderStrategy.Hidden,{show:f,appear:N,initial:T}=ye(),[l,j]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(f?"visible":"hidden"),z=xe(),{register:L,unregister:O}=z;(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>L(e),[L,e]),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{if(o===_utils_render_js__WEBPACK_IMPORTED_MODULE_13__.RenderStrategy.Hidden&&e.current){if(f&&l!=="visible"){j("visible");return}return (0,_utils_match_js__WEBPACK_IMPORTED_MODULE_12__.match)(l,{["hidden"]:()=>O(e),["visible"]:()=>L(e)})}},[l,e,L,O,f,o]);let k=(0,_hooks_use_latest_value_js__WEBPACK_IMPORTED_MODULE_6__.useLatestValue)({base:S(i.className),enter:S(p),enterFrom:S(x),enterTo:S(h),entered:S(v),leave:S(u),leaveFrom:S(g),leaveTo:S(d)}),V=Re({beforeEnter:r,afterEnter:s,beforeLeave:R,afterLeave:D}),G=(0,_hooks_use_server_handoff_complete_js__WEBPACK_IMPORTED_MODULE_7__.useServerHandoffComplete)();(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{if(G&&l==="visible"&&e.current===null)throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?")},[e,l,G]);let Te=T&&!N,K=N&&f&&T,de=(()=>!G||Te?"idle":f?"enter":"leave")(),H=(0,_hooks_use_flags_js__WEBPACK_IMPORTED_MODULE_3__.useFlags)(0),fe=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_2__.useEvent)(C=>(0,_utils_match_js__WEBPACK_IMPORTED_MODULE_12__.match)(C,{enter:()=>{H.addFlag(_internal_open_closed_js__WEBPACK_IMPORTED_MODULE_10__.State.Opening),V.current.beforeEnter()},leave:()=>{H.addFlag(_internal_open_closed_js__WEBPACK_IMPORTED_MODULE_10__.State.Closing),V.current.beforeLeave()},idle:()=>{}})),me=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_2__.useEvent)(C=>(0,_utils_match_js__WEBPACK_IMPORTED_MODULE_12__.match)(C,{enter:()=>{H.removeFlag(_internal_open_closed_js__WEBPACK_IMPORTED_MODULE_10__.State.Opening),V.current.afterEnter()},leave:()=>{H.removeFlag(_internal_open_closed_js__WEBPACK_IMPORTED_MODULE_10__.State.Closing),V.current.afterLeave()},idle:()=>{}})),w=se(()=>{j("hidden"),O(e)},z),B=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(!1);(0,_hooks_use_transition_js__WEBPACK_IMPORTED_MODULE_9__.useTransition)({immediate:K,container:e,classes:k,direction:de,onStart:(0,_hooks_use_latest_value_js__WEBPACK_IMPORTED_MODULE_6__.useLatestValue)(C=>{B.current=!0,w.onStart(e,C,fe)}),onStop:(0,_hooks_use_latest_value_js__WEBPACK_IMPORTED_MODULE_6__.useLatestValue)(C=>{B.current=!1,w.onStop(e,C,me),C==="leave"&&!U(w)&&(j("hidden"),O(e))})});let P=i,ce={ref:a};return K?P={...P,className:(0,_utils_class_names_js__WEBPACK_IMPORTED_MODULE_11__.classNames)(i.className,...k.current.enter,...k.current.enterFrom)}:B.current&&(P.className=(0,_utils_class_names_js__WEBPACK_IMPORTED_MODULE_11__.classNames)(i.className,(Y=e.current)==null?void 0:Y.className),P.className===""&&delete P.className),react__WEBPACK_IMPORTED_MODULE_0__.createElement(M.Provider,{value:w},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_internal_open_closed_js__WEBPACK_IMPORTED_MODULE_10__.OpenClosedProvider,{value:(0,_utils_match_js__WEBPACK_IMPORTED_MODULE_12__.match)(l,{["visible"]:_internal_open_closed_js__WEBPACK_IMPORTED_MODULE_10__.State.Open,["hidden"]:_internal_open_closed_js__WEBPACK_IMPORTED_MODULE_10__.State.Closed})|H.flags},(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_13__.render)({ourProps:ce,theirProps:P,defaultTag:De,features:le,visible:l==="visible",name:"Transition.Child"})))}function Fe(t,n){let{show:r,appear:s=!1,unmount:R=!0,...D}=t,p=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),x=(0,_hooks_use_sync_refs_js__WEBPACK_IMPORTED_MODULE_8__.useSyncRefs)(p,n);(0,_hooks_use_server_handoff_complete_js__WEBPACK_IMPORTED_MODULE_7__.useServerHandoffComplete)();let h=(0,_internal_open_closed_js__WEBPACK_IMPORTED_MODULE_10__.useOpenClosed)();if(r===void 0&&h!==null&&(r=(h&_internal_open_closed_js__WEBPACK_IMPORTED_MODULE_10__.State.Open)===_internal_open_closed_js__WEBPACK_IMPORTED_MODULE_10__.State.Open),![!0,!1].includes(r))throw new Error("A <Transition /> is used but it is missing a `show={true | false}` prop.");let[v,u]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(r?"visible":"hidden"),g=se(()=>{u("hidden")}),[d,i]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!0),e=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)([r]);(0,_hooks_use_iso_morphic_effect_js__WEBPACK_IMPORTED_MODULE_5__.useIsoMorphicEffect)(()=>{d!==!1&&e.current[e.current.length-1]!==r&&(e.current.push(r),i(!1))},[e,r]);let a=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>({show:r,appear:s,initial:d}),[r,s,d]);(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{if(r)u("visible");else if(!U(g))u("hidden");else{let T=p.current;if(!T)return;let l=T.getBoundingClientRect();l.x===0&&l.y===0&&l.width===0&&l.height===0&&u("hidden")}},[r,g]);let o={unmount:R},f=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_2__.useEvent)(()=>{var T;d&&i(!1),(T=t.beforeEnter)==null||T.call(t)}),N=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_2__.useEvent)(()=>{var T;d&&i(!1),(T=t.beforeLeave)==null||T.call(t)});return react__WEBPACK_IMPORTED_MODULE_0__.createElement(M.Provider,{value:g},react__WEBPACK_IMPORTED_MODULE_0__.createElement(I.Provider,{value:a},(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_13__.render)({ourProps:{...o,as:react__WEBPACK_IMPORTED_MODULE_0__.Fragment,children:react__WEBPACK_IMPORTED_MODULE_0__.createElement(ue,{ref:x,...o,...D,beforeEnter:f,beforeLeave:N})},theirProps:{},defaultTag:react__WEBPACK_IMPORTED_MODULE_0__.Fragment,features:le,visible:v==="visible",name:"Transition"})))}function _e(t,n){let r=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(I)!==null,s=(0,_internal_open_closed_js__WEBPACK_IMPORTED_MODULE_10__.useOpenClosed)()!==null;return react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,!r&&s?react__WEBPACK_IMPORTED_MODULE_0__.createElement(q,{ref:n,...t}):react__WEBPACK_IMPORTED_MODULE_0__.createElement(ue,{ref:n,...t}))}let q=(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_13__.forwardRefWithAs)(Fe),ue=(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_13__.forwardRefWithAs)(He),Le=(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_13__.forwardRefWithAs)(_e),qe=Object.assign(q,{Child:Le,Root:q});


/***/ }),

/***/ "./node_modules/@headlessui/react/dist/components/transitions/utils/transition.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/@headlessui/react/dist/components/transitions/utils/transition.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   transition: () => (/* binding */ M)
/* harmony export */ });
/* harmony import */ var _utils_disposables_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../utils/disposables.js */ "./node_modules/@headlessui/react/dist/utils/disposables.js");
/* harmony import */ var _utils_match_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/match.js */ "./node_modules/@headlessui/react/dist/utils/match.js");
/* harmony import */ var _utils_once_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/once.js */ "./node_modules/@headlessui/react/dist/utils/once.js");
function g(t,...e){t&&e.length>0&&t.classList.add(...e)}function v(t,...e){t&&e.length>0&&t.classList.remove(...e)}function b(t,e){let n=(0,_utils_disposables_js__WEBPACK_IMPORTED_MODULE_0__.disposables)();if(!t)return n.dispose;let{transitionDuration:m,transitionDelay:a}=getComputedStyle(t),[u,p]=[m,a].map(l=>{let[r=0]=l.split(",").filter(Boolean).map(i=>i.includes("ms")?parseFloat(i):parseFloat(i)*1e3).sort((i,T)=>T-i);return r}),o=u+p;if(o!==0){n.group(r=>{r.setTimeout(()=>{e(),r.dispose()},o),r.addEventListener(t,"transitionrun",i=>{i.target===i.currentTarget&&r.dispose()})});let l=n.addEventListener(t,"transitionend",r=>{r.target===r.currentTarget&&(e(),l())})}else e();return n.add(()=>e()),n.dispose}function M(t,e,n,m){let a=n?"enter":"leave",u=(0,_utils_disposables_js__WEBPACK_IMPORTED_MODULE_0__.disposables)(),p=m!==void 0?(0,_utils_once_js__WEBPACK_IMPORTED_MODULE_2__.once)(m):()=>{};a==="enter"&&(t.removeAttribute("hidden"),t.style.display="");let o=(0,_utils_match_js__WEBPACK_IMPORTED_MODULE_1__.match)(a,{enter:()=>e.enter,leave:()=>e.leave}),l=(0,_utils_match_js__WEBPACK_IMPORTED_MODULE_1__.match)(a,{enter:()=>e.enterTo,leave:()=>e.leaveTo}),r=(0,_utils_match_js__WEBPACK_IMPORTED_MODULE_1__.match)(a,{enter:()=>e.enterFrom,leave:()=>e.leaveFrom});return v(t,...e.base,...e.enter,...e.enterTo,...e.enterFrom,...e.leave,...e.leaveFrom,...e.leaveTo,...e.entered),g(t,...e.base,...o,...r),u.nextFrame(()=>{v(t,...e.base,...o,...r),g(t,...e.base,...o,...l),b(t,()=>(v(t,...e.base,...o),g(t,...e.base,...e.entered),p()))}),u.dispose}


/***/ }),

/***/ "./node_modules/@headlessui/react/dist/hooks/document-overflow/adjust-scrollbar-padding.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/@headlessui/react/dist/hooks/document-overflow/adjust-scrollbar-padding.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   adjustScrollbarPadding: () => (/* binding */ c)
/* harmony export */ });
function c(){let o;return{before({doc:e}){var l;let n=e.documentElement;o=((l=e.defaultView)!=null?l:window).innerWidth-n.clientWidth},after({doc:e,d:n}){let t=e.documentElement,l=t.clientWidth-t.offsetWidth,r=o-l;n.style(t,"paddingRight",`${r}px`)}}}


/***/ }),

/***/ "./node_modules/@headlessui/react/dist/hooks/document-overflow/handle-ios-locking.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@headlessui/react/dist/hooks/document-overflow/handle-ios-locking.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   handleIOSLocking: () => (/* binding */ d)
/* harmony export */ });
/* harmony import */ var _utils_disposables_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/disposables.js */ "./node_modules/@headlessui/react/dist/utils/disposables.js");
/* harmony import */ var _utils_platform_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/platform.js */ "./node_modules/@headlessui/react/dist/utils/platform.js");
function d(){return (0,_utils_platform_js__WEBPACK_IMPORTED_MODULE_1__.isIOS)()?{before({doc:r,d:l,meta:c}){function o(a){return c.containers.flatMap(n=>n()).some(n=>n.contains(a))}l.microTask(()=>{var s;if(window.getComputedStyle(r.documentElement).scrollBehavior!=="auto"){let t=(0,_utils_disposables_js__WEBPACK_IMPORTED_MODULE_0__.disposables)();t.style(r.documentElement,"scrollBehavior","auto"),l.add(()=>l.microTask(()=>t.dispose()))}let a=(s=window.scrollY)!=null?s:window.pageYOffset,n=null;l.addEventListener(r,"click",t=>{if(t.target instanceof HTMLElement)try{let e=t.target.closest("a");if(!e)return;let{hash:f}=new URL(e.href),i=r.querySelector(f);i&&!o(i)&&(n=i)}catch{}},!0),l.addEventListener(r,"touchstart",t=>{if(t.target instanceof HTMLElement)if(o(t.target)){let e=t.target;for(;e.parentElement&&o(e.parentElement);)e=e.parentElement;l.style(e,"overscrollBehavior","contain")}else l.style(t.target,"touchAction","none")}),l.addEventListener(r,"touchmove",t=>{if(t.target instanceof HTMLElement)if(o(t.target)){let e=t.target;for(;e.parentElement&&e.dataset.headlessuiPortal!==""&&!(e.scrollHeight>e.clientHeight||e.scrollWidth>e.clientWidth);)e=e.parentElement;e.dataset.headlessuiPortal===""&&t.preventDefault()}else t.preventDefault()},{passive:!1}),l.add(()=>{var e;let t=(e=window.scrollY)!=null?e:window.pageYOffset;a!==t&&window.scrollTo(0,a),n&&n.isConnected&&(n.scrollIntoView({block:"nearest"}),n=null)})})}}:{}}


/***/ }),

/***/ "./node_modules/@headlessui/react/dist/hooks/document-overflow/overflow-store.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/@headlessui/react/dist/hooks/document-overflow/overflow-store.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   overflows: () => (/* binding */ a)
/* harmony export */ });
/* harmony import */ var _utils_disposables_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/disposables.js */ "./node_modules/@headlessui/react/dist/utils/disposables.js");
/* harmony import */ var _utils_store_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/store.js */ "./node_modules/@headlessui/react/dist/utils/store.js");
/* harmony import */ var _adjust_scrollbar_padding_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./adjust-scrollbar-padding.js */ "./node_modules/@headlessui/react/dist/hooks/document-overflow/adjust-scrollbar-padding.js");
/* harmony import */ var _handle_ios_locking_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./handle-ios-locking.js */ "./node_modules/@headlessui/react/dist/hooks/document-overflow/handle-ios-locking.js");
/* harmony import */ var _prevent_scroll_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./prevent-scroll.js */ "./node_modules/@headlessui/react/dist/hooks/document-overflow/prevent-scroll.js");
function m(e){let n={};for(let t of e)Object.assign(n,t(n));return n}let a=(0,_utils_store_js__WEBPACK_IMPORTED_MODULE_1__.createStore)(()=>new Map,{PUSH(e,n){var o;let t=(o=this.get(e))!=null?o:{doc:e,count:0,d:(0,_utils_disposables_js__WEBPACK_IMPORTED_MODULE_0__.disposables)(),meta:new Set};return t.count++,t.meta.add(n),this.set(e,t),this},POP(e,n){let t=this.get(e);return t&&(t.count--,t.meta.delete(n)),this},SCROLL_PREVENT({doc:e,d:n,meta:t}){let o={doc:e,d:n,meta:m(t)},c=[(0,_handle_ios_locking_js__WEBPACK_IMPORTED_MODULE_3__.handleIOSLocking)(),(0,_adjust_scrollbar_padding_js__WEBPACK_IMPORTED_MODULE_2__.adjustScrollbarPadding)(),(0,_prevent_scroll_js__WEBPACK_IMPORTED_MODULE_4__.preventScroll)()];c.forEach(({before:r})=>r==null?void 0:r(o)),c.forEach(({after:r})=>r==null?void 0:r(o))},SCROLL_ALLOW({d:e}){e.dispose()},TEARDOWN({doc:e}){this.delete(e)}});a.subscribe(()=>{let e=a.getSnapshot(),n=new Map;for(let[t]of e)n.set(t,t.documentElement.style.overflow);for(let t of e.values()){let o=n.get(t.doc)==="hidden",c=t.count!==0;(c&&!o||!c&&o)&&a.dispatch(t.count>0?"SCROLL_PREVENT":"SCROLL_ALLOW",t),t.count===0&&a.dispatch("TEARDOWN",t)}});


/***/ }),

/***/ "./node_modules/@headlessui/react/dist/hooks/document-overflow/prevent-scroll.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/@headlessui/react/dist/hooks/document-overflow/prevent-scroll.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   preventScroll: () => (/* binding */ l)
/* harmony export */ });
function l(){return{before({doc:e,d:o}){o.style(e.documentElement,"overflow","hidden")}}}


/***/ }),

/***/ "./node_modules/@headlessui/react/dist/hooks/document-overflow/use-document-overflow.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/@headlessui/react/dist/hooks/document-overflow/use-document-overflow.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useDocumentOverflowLockedEffect: () => (/* binding */ p)
/* harmony export */ });
/* harmony import */ var _hooks_use_store_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../hooks/use-store.js */ "./node_modules/@headlessui/react/dist/hooks/use-store.js");
/* harmony import */ var _use_iso_morphic_effect_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../use-iso-morphic-effect.js */ "./node_modules/@headlessui/react/dist/hooks/use-iso-morphic-effect.js");
/* harmony import */ var _overflow_store_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./overflow-store.js */ "./node_modules/@headlessui/react/dist/hooks/document-overflow/overflow-store.js");
function p(e,r,n){let f=(0,_hooks_use_store_js__WEBPACK_IMPORTED_MODULE_0__.useStore)(_overflow_store_js__WEBPACK_IMPORTED_MODULE_2__.overflows),o=e?f.get(e):void 0,i=o?o.count>0:!1;return (0,_use_iso_morphic_effect_js__WEBPACK_IMPORTED_MODULE_1__.useIsoMorphicEffect)(()=>{if(!(!e||!r))return _overflow_store_js__WEBPACK_IMPORTED_MODULE_2__.overflows.dispatch("PUSH",e,n),()=>_overflow_store_js__WEBPACK_IMPORTED_MODULE_2__.overflows.dispatch("POP",e,n)},[r,e]),i}


/***/ }),

/***/ "./node_modules/@headlessui/react/dist/hooks/use-disposables.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@headlessui/react/dist/hooks/use-disposables.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useDisposables: () => (/* binding */ p)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _utils_disposables_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/disposables.js */ "./node_modules/@headlessui/react/dist/utils/disposables.js");
function p(){let[e]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(_utils_disposables_js__WEBPACK_IMPORTED_MODULE_1__.disposables);return (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>()=>e.dispose(),[e]),e}


/***/ }),

/***/ "./node_modules/@headlessui/react/dist/hooks/use-document-event.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@headlessui/react/dist/hooks/use-document-event.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useDocumentEvent: () => (/* binding */ d)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _use_latest_value_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./use-latest-value.js */ "./node_modules/@headlessui/react/dist/hooks/use-latest-value.js");
function d(e,r,n){let o=(0,_use_latest_value_js__WEBPACK_IMPORTED_MODULE_1__.useLatestValue)(r);(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{function t(u){o.current(u)}return document.addEventListener(e,t,n),()=>document.removeEventListener(e,t,n)},[e,n])}


/***/ }),

/***/ "./node_modules/@headlessui/react/dist/hooks/use-event-listener.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@headlessui/react/dist/hooks/use-event-listener.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useEventListener: () => (/* binding */ E)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _use_latest_value_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./use-latest-value.js */ "./node_modules/@headlessui/react/dist/hooks/use-latest-value.js");
function E(n,e,a,t){let i=(0,_use_latest_value_js__WEBPACK_IMPORTED_MODULE_1__.useLatestValue)(a);(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{n=n!=null?n:window;function r(o){i.current(o)}return n.addEventListener(e,r,t),()=>n.removeEventListener(e,r,t)},[n,e,t])}


/***/ }),

/***/ "./node_modules/@headlessui/react/dist/hooks/use-event.js":
/*!****************************************************************!*\
  !*** ./node_modules/@headlessui/react/dist/hooks/use-event.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useEvent: () => (/* binding */ o)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _use_latest_value_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./use-latest-value.js */ "./node_modules/@headlessui/react/dist/hooks/use-latest-value.js");
let o=function(t){let e=(0,_use_latest_value_js__WEBPACK_IMPORTED_MODULE_1__.useLatestValue)(t);return react__WEBPACK_IMPORTED_MODULE_0__.useCallback((...r)=>e.current(...r),[e])};


/***/ }),

/***/ "./node_modules/@headlessui/react/dist/hooks/use-flags.js":
/*!****************************************************************!*\
  !*** ./node_modules/@headlessui/react/dist/hooks/use-flags.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useFlags: () => (/* binding */ c)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _use_is_mounted_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./use-is-mounted.js */ "./node_modules/@headlessui/react/dist/hooks/use-is-mounted.js");
function c(a=0){let[l,r]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(a),t=(0,_use_is_mounted_js__WEBPACK_IMPORTED_MODULE_1__.useIsMounted)(),o=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(e=>{t.current&&r(u=>u|e)},[l,t]),m=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(e=>Boolean(l&e),[l]),s=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(e=>{t.current&&r(u=>u&~e)},[r,t]),g=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(e=>{t.current&&r(u=>u^e)},[r]);return{flags:l,addFlag:o,hasFlag:m,removeFlag:s,toggleFlag:g}}


/***/ }),

/***/ "./node_modules/@headlessui/react/dist/hooks/use-id.js":
/*!*************************************************************!*\
  !*** ./node_modules/@headlessui/react/dist/hooks/use-id.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useId: () => (/* binding */ I)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _utils_env_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/env.js */ "./node_modules/@headlessui/react/dist/utils/env.js");
/* harmony import */ var _use_iso_morphic_effect_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./use-iso-morphic-effect.js */ "./node_modules/@headlessui/react/dist/hooks/use-iso-morphic-effect.js");
/* harmony import */ var _use_server_handoff_complete_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./use-server-handoff-complete.js */ "./node_modules/@headlessui/react/dist/hooks/use-server-handoff-complete.js");
var o;let I=(o=react__WEBPACK_IMPORTED_MODULE_0__.useId)!=null?o:function(){let n=(0,_use_server_handoff_complete_js__WEBPACK_IMPORTED_MODULE_3__.useServerHandoffComplete)(),[e,u]=react__WEBPACK_IMPORTED_MODULE_0__.useState(n?()=>_utils_env_js__WEBPACK_IMPORTED_MODULE_1__.env.nextId():null);return (0,_use_iso_morphic_effect_js__WEBPACK_IMPORTED_MODULE_2__.useIsoMorphicEffect)(()=>{e===null&&u(_utils_env_js__WEBPACK_IMPORTED_MODULE_1__.env.nextId())},[e]),e!=null?""+e:void 0};


/***/ }),

/***/ "./node_modules/@headlessui/react/dist/hooks/use-inert.js":
/*!****************************************************************!*\
  !*** ./node_modules/@headlessui/react/dist/hooks/use-inert.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useInert: () => (/* binding */ b)
/* harmony export */ });
/* harmony import */ var _use_iso_morphic_effect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./use-iso-morphic-effect.js */ "./node_modules/@headlessui/react/dist/hooks/use-iso-morphic-effect.js");
let u=new Map,t=new Map;function b(r,l=!0){(0,_use_iso_morphic_effect_js__WEBPACK_IMPORTED_MODULE_0__.useIsoMorphicEffect)(()=>{var o;if(!l)return;let e=typeof r=="function"?r():r.current;if(!e)return;function a(){var d;if(!e)return;let i=(d=t.get(e))!=null?d:1;if(i===1?t.delete(e):t.set(e,i-1),i!==1)return;let n=u.get(e);n&&(n["aria-hidden"]===null?e.removeAttribute("aria-hidden"):e.setAttribute("aria-hidden",n["aria-hidden"]),e.inert=n.inert,u.delete(e))}let f=(o=t.get(e))!=null?o:0;return t.set(e,f+1),f!==0||(u.set(e,{"aria-hidden":e.getAttribute("aria-hidden"),inert:e.inert}),e.setAttribute("aria-hidden","true"),e.inert=!0),a},[r,l])}


/***/ }),

/***/ "./node_modules/@headlessui/react/dist/hooks/use-is-mounted.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@headlessui/react/dist/hooks/use-is-mounted.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useIsMounted: () => (/* binding */ f)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _use_iso_morphic_effect_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./use-iso-morphic-effect.js */ "./node_modules/@headlessui/react/dist/hooks/use-iso-morphic-effect.js");
function f(){let e=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(!1);return (0,_use_iso_morphic_effect_js__WEBPACK_IMPORTED_MODULE_1__.useIsoMorphicEffect)(()=>(e.current=!0,()=>{e.current=!1}),[]),e}


/***/ }),

/***/ "./node_modules/@headlessui/react/dist/hooks/use-iso-morphic-effect.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@headlessui/react/dist/hooks/use-iso-morphic-effect.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useIsoMorphicEffect: () => (/* binding */ l)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _utils_env_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/env.js */ "./node_modules/@headlessui/react/dist/utils/env.js");
let l=(e,f)=>{_utils_env_js__WEBPACK_IMPORTED_MODULE_1__.env.isServer?(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(e,f):(0,react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)(e,f)};


/***/ }),

/***/ "./node_modules/@headlessui/react/dist/hooks/use-latest-value.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@headlessui/react/dist/hooks/use-latest-value.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useLatestValue: () => (/* binding */ s)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _use_iso_morphic_effect_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./use-iso-morphic-effect.js */ "./node_modules/@headlessui/react/dist/hooks/use-iso-morphic-effect.js");
function s(e){let r=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(e);return (0,_use_iso_morphic_effect_js__WEBPACK_IMPORTED_MODULE_1__.useIsoMorphicEffect)(()=>{r.current=e},[e]),r}


/***/ }),

/***/ "./node_modules/@headlessui/react/dist/hooks/use-on-unmount.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@headlessui/react/dist/hooks/use-on-unmount.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useOnUnmount: () => (/* binding */ c)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _utils_micro_task_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/micro-task.js */ "./node_modules/@headlessui/react/dist/utils/micro-task.js");
/* harmony import */ var _use_event_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./use-event.js */ "./node_modules/@headlessui/react/dist/hooks/use-event.js");
function c(t){let r=(0,_use_event_js__WEBPACK_IMPORTED_MODULE_2__.useEvent)(t),e=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(!1);(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>(e.current=!1,()=>{e.current=!0,(0,_utils_micro_task_js__WEBPACK_IMPORTED_MODULE_1__.microTask)(()=>{e.current&&r()})}),[r])}


/***/ }),

/***/ "./node_modules/@headlessui/react/dist/hooks/use-outside-click.js":
/*!************************************************************************!*\
  !*** ./node_modules/@headlessui/react/dist/hooks/use-outside-click.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useOutsideClick: () => (/* binding */ y)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _utils_focus_management_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/focus-management.js */ "./node_modules/@headlessui/react/dist/utils/focus-management.js");
/* harmony import */ var _utils_platform_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/platform.js */ "./node_modules/@headlessui/react/dist/utils/platform.js");
/* harmony import */ var _use_document_event_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./use-document-event.js */ "./node_modules/@headlessui/react/dist/hooks/use-document-event.js");
/* harmony import */ var _use_window_event_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./use-window-event.js */ "./node_modules/@headlessui/react/dist/hooks/use-window-event.js");
function y(s,m,a=!0){let i=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(!1);(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{requestAnimationFrame(()=>{i.current=a})},[a]);function c(e,r){if(!i.current||e.defaultPrevented)return;let t=r(e);if(t===null||!t.getRootNode().contains(t)||!t.isConnected)return;let E=function u(n){return typeof n=="function"?u(n()):Array.isArray(n)||n instanceof Set?n:[n]}(s);for(let u of E){if(u===null)continue;let n=u instanceof HTMLElement?u:u.current;if(n!=null&&n.contains(t)||e.composed&&e.composedPath().includes(n))return}return!(0,_utils_focus_management_js__WEBPACK_IMPORTED_MODULE_1__.isFocusableElement)(t,_utils_focus_management_js__WEBPACK_IMPORTED_MODULE_1__.FocusableMode.Loose)&&t.tabIndex!==-1&&e.preventDefault(),m(e,t)}let o=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);(0,_use_document_event_js__WEBPACK_IMPORTED_MODULE_3__.useDocumentEvent)("pointerdown",e=>{var r,t;i.current&&(o.current=((t=(r=e.composedPath)==null?void 0:r.call(e))==null?void 0:t[0])||e.target)},!0),(0,_use_document_event_js__WEBPACK_IMPORTED_MODULE_3__.useDocumentEvent)("mousedown",e=>{var r,t;i.current&&(o.current=((t=(r=e.composedPath)==null?void 0:r.call(e))==null?void 0:t[0])||e.target)},!0),(0,_use_document_event_js__WEBPACK_IMPORTED_MODULE_3__.useDocumentEvent)("click",e=>{(0,_utils_platform_js__WEBPACK_IMPORTED_MODULE_2__.isMobile)()||o.current&&(c(e,()=>o.current),o.current=null)},!0),(0,_use_document_event_js__WEBPACK_IMPORTED_MODULE_3__.useDocumentEvent)("touchend",e=>c(e,()=>e.target instanceof HTMLElement?e.target:null),!0),(0,_use_window_event_js__WEBPACK_IMPORTED_MODULE_4__.useWindowEvent)("blur",e=>c(e,()=>window.document.activeElement instanceof HTMLIFrameElement?window.document.activeElement:null),!0)}


/***/ }),

/***/ "./node_modules/@headlessui/react/dist/hooks/use-owner.js":
/*!****************************************************************!*\
  !*** ./node_modules/@headlessui/react/dist/hooks/use-owner.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useOwnerDocument: () => (/* binding */ n)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _utils_owner_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/owner.js */ "./node_modules/@headlessui/react/dist/utils/owner.js");
function n(...e){return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>(0,_utils_owner_js__WEBPACK_IMPORTED_MODULE_1__.getOwnerDocument)(...e),[...e])}


/***/ }),

/***/ "./node_modules/@headlessui/react/dist/hooks/use-root-containers.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@headlessui/react/dist/hooks/use-root-containers.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useMainTreeNode: () => (/* binding */ y),
/* harmony export */   useRootContainers: () => (/* binding */ N)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _internal_hidden_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../internal/hidden.js */ "./node_modules/@headlessui/react/dist/internal/hidden.js");
/* harmony import */ var _use_event_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./use-event.js */ "./node_modules/@headlessui/react/dist/hooks/use-event.js");
/* harmony import */ var _use_owner_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./use-owner.js */ "./node_modules/@headlessui/react/dist/hooks/use-owner.js");
function N({defaultContainers:o=[],portals:r,mainTreeNodeRef:u}={}){var f;let t=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)((f=u==null?void 0:u.current)!=null?f:null),l=(0,_use_owner_js__WEBPACK_IMPORTED_MODULE_3__.useOwnerDocument)(t),c=(0,_use_event_js__WEBPACK_IMPORTED_MODULE_2__.useEvent)(()=>{var i,s,a;let n=[];for(let e of o)e!==null&&(e instanceof HTMLElement?n.push(e):"current"in e&&e.current instanceof HTMLElement&&n.push(e.current));if(r!=null&&r.current)for(let e of r.current)n.push(e);for(let e of(i=l==null?void 0:l.querySelectorAll("html > *, body > *"))!=null?i:[])e!==document.body&&e!==document.head&&e instanceof HTMLElement&&e.id!=="headlessui-portal-root"&&(e.contains(t.current)||e.contains((a=(s=t.current)==null?void 0:s.getRootNode())==null?void 0:a.host)||n.some(L=>e.contains(L))||n.push(e));return n});return{resolveContainers:c,contains:(0,_use_event_js__WEBPACK_IMPORTED_MODULE_2__.useEvent)(n=>c().some(i=>i.contains(n))),mainTreeNodeRef:t,MainTreeNode:(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>function(){return u!=null?null:react__WEBPACK_IMPORTED_MODULE_0__.createElement(_internal_hidden_js__WEBPACK_IMPORTED_MODULE_1__.Hidden,{features:_internal_hidden_js__WEBPACK_IMPORTED_MODULE_1__.Features.Hidden,ref:t})},[t,u])}}function y(){let o=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);return{mainTreeNodeRef:o,MainTreeNode:(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>function(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_internal_hidden_js__WEBPACK_IMPORTED_MODULE_1__.Hidden,{features:_internal_hidden_js__WEBPACK_IMPORTED_MODULE_1__.Features.Hidden,ref:o})},[o])}}


/***/ }),

/***/ "./node_modules/@headlessui/react/dist/hooks/use-server-handoff-complete.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@headlessui/react/dist/hooks/use-server-handoff-complete.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
var react__WEBPACK_IMPORTED_MODULE_0___namespace_cache;
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useServerHandoffComplete: () => (/* binding */ l)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _utils_env_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/env.js */ "./node_modules/@headlessui/react/dist/utils/env.js");
function s(){let r=typeof document=="undefined";return"useSyncExternalStore" in /*#__PURE__*/ (react__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (react__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(react__WEBPACK_IMPORTED_MODULE_0__, 2)))?(o=>o.useSyncExternalStore)(/*#__PURE__*/ (react__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (react__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(react__WEBPACK_IMPORTED_MODULE_0__, 2))))(()=>()=>{},()=>!1,()=>!r):!1}function l(){let r=s(),[e,n]=react__WEBPACK_IMPORTED_MODULE_0__.useState(_utils_env_js__WEBPACK_IMPORTED_MODULE_1__.env.isHandoffComplete);return e&&_utils_env_js__WEBPACK_IMPORTED_MODULE_1__.env.isHandoffComplete===!1&&n(!1),react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{e!==!0&&n(!0)},[e]),react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>_utils_env_js__WEBPACK_IMPORTED_MODULE_1__.env.handoff(),[]),r?!1:e}


/***/ }),

/***/ "./node_modules/@headlessui/react/dist/hooks/use-store.js":
/*!****************************************************************!*\
  !*** ./node_modules/@headlessui/react/dist/hooks/use-store.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useStore: () => (/* binding */ S)
/* harmony export */ });
/* harmony import */ var _use_sync_external_store_shim_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../use-sync-external-store-shim/index.js */ "./node_modules/@headlessui/react/dist/use-sync-external-store-shim/index.js");
function S(t){return (0,_use_sync_external_store_shim_index_js__WEBPACK_IMPORTED_MODULE_0__.useSyncExternalStore)(t.subscribe,t.getSnapshot,t.getSnapshot)}


/***/ }),

/***/ "./node_modules/@headlessui/react/dist/hooks/use-sync-refs.js":
/*!********************************************************************!*\
  !*** ./node_modules/@headlessui/react/dist/hooks/use-sync-refs.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   optionalRef: () => (/* binding */ T),
/* harmony export */   useSyncRefs: () => (/* binding */ y)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _use_event_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./use-event.js */ "./node_modules/@headlessui/react/dist/hooks/use-event.js");
let u=Symbol();function T(t,n=!0){return Object.assign(t,{[u]:n})}function y(...t){let n=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(t);(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{n.current=t},[t]);let c=(0,_use_event_js__WEBPACK_IMPORTED_MODULE_1__.useEvent)(e=>{for(let o of n.current)o!=null&&(typeof o=="function"?o(e):o.current=e)});return t.every(e=>e==null||(e==null?void 0:e[u]))?void 0:c}


/***/ }),

/***/ "./node_modules/@headlessui/react/dist/hooks/use-tab-direction.js":
/*!************************************************************************!*\
  !*** ./node_modules/@headlessui/react/dist/hooks/use-tab-direction.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Direction: () => (/* binding */ s),
/* harmony export */   useTabDirection: () => (/* binding */ n)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _use_window_event_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./use-window-event.js */ "./node_modules/@headlessui/react/dist/hooks/use-window-event.js");
var s=(r=>(r[r.Forwards=0]="Forwards",r[r.Backwards=1]="Backwards",r))(s||{});function n(){let e=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(0);return (0,_use_window_event_js__WEBPACK_IMPORTED_MODULE_1__.useWindowEvent)("keydown",o=>{o.key==="Tab"&&(e.current=o.shiftKey?1:0)},!0),e}


/***/ }),

/***/ "./node_modules/@headlessui/react/dist/hooks/use-transition.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@headlessui/react/dist/hooks/use-transition.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useTransition: () => (/* binding */ D)
/* harmony export */ });
/* harmony import */ var _components_transitions_utils_transition_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/transitions/utils/transition.js */ "./node_modules/@headlessui/react/dist/components/transitions/utils/transition.js");
/* harmony import */ var _utils_disposables_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/disposables.js */ "./node_modules/@headlessui/react/dist/utils/disposables.js");
/* harmony import */ var _use_disposables_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./use-disposables.js */ "./node_modules/@headlessui/react/dist/hooks/use-disposables.js");
/* harmony import */ var _use_is_mounted_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./use-is-mounted.js */ "./node_modules/@headlessui/react/dist/hooks/use-is-mounted.js");
/* harmony import */ var _use_iso_morphic_effect_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./use-iso-morphic-effect.js */ "./node_modules/@headlessui/react/dist/hooks/use-iso-morphic-effect.js");
/* harmony import */ var _use_latest_value_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./use-latest-value.js */ "./node_modules/@headlessui/react/dist/hooks/use-latest-value.js");
function D({immediate:t,container:s,direction:n,classes:u,onStart:a,onStop:c}){let l=(0,_use_is_mounted_js__WEBPACK_IMPORTED_MODULE_3__.useIsMounted)(),d=(0,_use_disposables_js__WEBPACK_IMPORTED_MODULE_2__.useDisposables)(),e=(0,_use_latest_value_js__WEBPACK_IMPORTED_MODULE_5__.useLatestValue)(n);(0,_use_iso_morphic_effect_js__WEBPACK_IMPORTED_MODULE_4__.useIsoMorphicEffect)(()=>{t&&(e.current="enter")},[t]),(0,_use_iso_morphic_effect_js__WEBPACK_IMPORTED_MODULE_4__.useIsoMorphicEffect)(()=>{let r=(0,_utils_disposables_js__WEBPACK_IMPORTED_MODULE_1__.disposables)();d.add(r.dispose);let i=s.current;if(i&&e.current!=="idle"&&l.current)return r.dispose(),a.current(e.current),r.add((0,_components_transitions_utils_transition_js__WEBPACK_IMPORTED_MODULE_0__.transition)(i,u.current,e.current==="enter",()=>{r.dispose(),c.current(e.current)})),r.dispose},[n])}


/***/ }),

/***/ "./node_modules/@headlessui/react/dist/hooks/use-watch.js":
/*!****************************************************************!*\
  !*** ./node_modules/@headlessui/react/dist/hooks/use-watch.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useWatch: () => (/* binding */ m)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _use_event_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./use-event.js */ "./node_modules/@headlessui/react/dist/hooks/use-event.js");
function m(u,t){let e=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)([]),r=(0,_use_event_js__WEBPACK_IMPORTED_MODULE_1__.useEvent)(u);(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{let o=[...e.current];for(let[n,a]of t.entries())if(e.current[n]!==a){let l=r(t,o);return e.current=t,l}},[r,...t])}


/***/ }),

/***/ "./node_modules/@headlessui/react/dist/hooks/use-window-event.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@headlessui/react/dist/hooks/use-window-event.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useWindowEvent: () => (/* binding */ s)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _use_latest_value_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./use-latest-value.js */ "./node_modules/@headlessui/react/dist/hooks/use-latest-value.js");
function s(e,r,n){let o=(0,_use_latest_value_js__WEBPACK_IMPORTED_MODULE_1__.useLatestValue)(r);(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{function t(i){o.current(i)}return window.addEventListener(e,t,n),()=>window.removeEventListener(e,t,n)},[e,n])}


/***/ }),

/***/ "./node_modules/@headlessui/react/dist/internal/hidden.js":
/*!****************************************************************!*\
  !*** ./node_modules/@headlessui/react/dist/internal/hidden.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Features: () => (/* binding */ s),
/* harmony export */   Hidden: () => (/* binding */ u)
/* harmony export */ });
/* harmony import */ var _utils_render_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/render.js */ "./node_modules/@headlessui/react/dist/utils/render.js");
let p="div";var s=(e=>(e[e.None=1]="None",e[e.Focusable=2]="Focusable",e[e.Hidden=4]="Hidden",e))(s||{});function l(d,o){var n;let{features:t=1,...e}=d,r={ref:o,"aria-hidden":(t&2)===2?!0:(n=e["aria-hidden"])!=null?n:void 0,hidden:(t&4)===4?!0:void 0,style:{position:"fixed",top:1,left:1,width:1,height:0,padding:0,margin:-1,overflow:"hidden",clip:"rect(0, 0, 0, 0)",whiteSpace:"nowrap",borderWidth:"0",...(t&4)===4&&(t&2)!==2&&{display:"none"}}};return (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_0__.render)({ourProps:r,theirProps:e,slot:{},defaultTag:p,name:"Hidden"})}let u=(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_0__.forwardRefWithAs)(l);


/***/ }),

/***/ "./node_modules/@headlessui/react/dist/internal/open-closed.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@headlessui/react/dist/internal/open-closed.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OpenClosedProvider: () => (/* binding */ s),
/* harmony export */   State: () => (/* binding */ d),
/* harmony export */   useOpenClosed: () => (/* binding */ u)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
let n=(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null);n.displayName="OpenClosedContext";var d=(e=>(e[e.Open=1]="Open",e[e.Closed=2]="Closed",e[e.Closing=4]="Closing",e[e.Opening=8]="Opening",e))(d||{});function u(){return (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(n)}function s({value:o,children:r}){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(n.Provider,{value:o},r)}


/***/ }),

/***/ "./node_modules/@headlessui/react/dist/internal/portal-force-root.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@headlessui/react/dist/internal/portal-force-root.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ForcePortalRoot: () => (/* binding */ l),
/* harmony export */   usePortalRoot: () => (/* binding */ a)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
let e=(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(!1);function a(){return (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(e)}function l(o){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(e.Provider,{value:o.force},o.children)}


/***/ }),

/***/ "./node_modules/@headlessui/react/dist/internal/stack-context.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@headlessui/react/dist/internal/stack-context.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StackMessage: () => (/* binding */ s),
/* harmony export */   StackProvider: () => (/* binding */ b),
/* harmony export */   useStackContext: () => (/* binding */ x)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _hooks_use_event_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../hooks/use-event.js */ "./node_modules/@headlessui/react/dist/hooks/use-event.js");
/* harmony import */ var _hooks_use_iso_morphic_effect_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../hooks/use-iso-morphic-effect.js */ "./node_modules/@headlessui/react/dist/hooks/use-iso-morphic-effect.js");
let a=(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(()=>{});a.displayName="StackContext";var s=(e=>(e[e.Add=0]="Add",e[e.Remove=1]="Remove",e))(s||{});function x(){return (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(a)}function b({children:i,onUpdate:r,type:e,element:n,enabled:u}){let l=x(),o=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_1__.useEvent)((...t)=>{r==null||r(...t),l(...t)});return (0,_hooks_use_iso_morphic_effect_js__WEBPACK_IMPORTED_MODULE_2__.useIsoMorphicEffect)(()=>{let t=u===void 0||u===!0;return t&&o(0,e,n),()=>{t&&o(1,e,n)}},[o,e,n,u]),react__WEBPACK_IMPORTED_MODULE_0__.createElement(a.Provider,{value:o},i)}


/***/ }),

/***/ "./node_modules/@headlessui/react/dist/use-sync-external-store-shim/index.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@headlessui/react/dist/use-sync-external-store-shim/index.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
var react__WEBPACK_IMPORTED_MODULE_0___namespace_cache;
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useSyncExternalStore: () => (/* binding */ a)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _useSyncExternalStoreShimClient_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./useSyncExternalStoreShimClient.js */ "./node_modules/@headlessui/react/dist/use-sync-external-store-shim/useSyncExternalStoreShimClient.js");
/* harmony import */ var _useSyncExternalStoreShimServer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./useSyncExternalStoreShimServer.js */ "./node_modules/@headlessui/react/dist/use-sync-external-store-shim/useSyncExternalStoreShimServer.js");
const r=typeof window!="undefined"&&typeof window.document!="undefined"&&typeof window.document.createElement!="undefined",s=!r,c=s?_useSyncExternalStoreShimServer_js__WEBPACK_IMPORTED_MODULE_2__.useSyncExternalStore:_useSyncExternalStoreShimClient_js__WEBPACK_IMPORTED_MODULE_1__.useSyncExternalStore,a="useSyncExternalStore" in /*#__PURE__*/ (react__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (react__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(react__WEBPACK_IMPORTED_MODULE_0__, 2)))?(n=>n.useSyncExternalStore)(/*#__PURE__*/ (react__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (react__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(react__WEBPACK_IMPORTED_MODULE_0__, 2)))):c;


/***/ }),

/***/ "./node_modules/@headlessui/react/dist/use-sync-external-store-shim/useSyncExternalStoreShimClient.js":
/*!************************************************************************************************************!*\
  !*** ./node_modules/@headlessui/react/dist/use-sync-external-store-shim/useSyncExternalStoreShimClient.js ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
var react__WEBPACK_IMPORTED_MODULE_0___namespace_cache;
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useSyncExternalStore: () => (/* binding */ y)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
function i(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}const d=typeof Object.is=="function"?Object.is:i,{useState:u,useEffect:h,useLayoutEffect:f,useDebugValue:p}=/*#__PURE__*/ (react__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (react__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(react__WEBPACK_IMPORTED_MODULE_0__, 2)));let S=!1,_=!1;function y(e,t,c){const a=t(),[{inst:n},o]=u({inst:{value:a,getSnapshot:t}});return f(()=>{n.value=a,n.getSnapshot=t,r(n)&&o({inst:n})},[e,a,t]),h(()=>(r(n)&&o({inst:n}),e(()=>{r(n)&&o({inst:n})})),[e]),p(a),a}function r(e){const t=e.getSnapshot,c=e.value;try{const a=t();return!d(c,a)}catch{return!0}}


/***/ }),

/***/ "./node_modules/@headlessui/react/dist/use-sync-external-store-shim/useSyncExternalStoreShimServer.js":
/*!************************************************************************************************************!*\
  !*** ./node_modules/@headlessui/react/dist/use-sync-external-store-shim/useSyncExternalStoreShimServer.js ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useSyncExternalStore: () => (/* binding */ t)
/* harmony export */ });
function t(r,e,n){return e()}


/***/ }),

/***/ "./node_modules/@headlessui/react/dist/utils/active-element-history.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@headlessui/react/dist/utils/active-element-history.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   history: () => (/* binding */ t)
/* harmony export */ });
/* harmony import */ var _document_ready_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./document-ready.js */ "./node_modules/@headlessui/react/dist/utils/document-ready.js");
let t=[];(0,_document_ready_js__WEBPACK_IMPORTED_MODULE_0__.onDocumentReady)(()=>{function e(n){n.target instanceof HTMLElement&&n.target!==document.body&&t[0]!==n.target&&(t.unshift(n.target),t=t.filter(r=>r!=null&&r.isConnected),t.splice(10))}window.addEventListener("click",e,{capture:!0}),window.addEventListener("mousedown",e,{capture:!0}),window.addEventListener("focus",e,{capture:!0}),document.body.addEventListener("click",e,{capture:!0}),document.body.addEventListener("mousedown",e,{capture:!0}),document.body.addEventListener("focus",e,{capture:!0})});


/***/ }),

/***/ "./node_modules/@headlessui/react/dist/utils/bugs.js":
/*!***********************************************************!*\
  !*** ./node_modules/@headlessui/react/dist/utils/bugs.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isDisabledReactIssue7711: () => (/* binding */ r)
/* harmony export */ });
function r(n){let e=n.parentElement,l=null;for(;e&&!(e instanceof HTMLFieldSetElement);)e instanceof HTMLLegendElement&&(l=e),e=e.parentElement;let t=(e==null?void 0:e.getAttribute("disabled"))==="";return t&&i(l)?!1:t}function i(n){if(!n)return!1;let e=n.previousElementSibling;for(;e!==null;){if(e instanceof HTMLLegendElement)return!1;e=e.previousElementSibling}return!0}


/***/ }),

/***/ "./node_modules/@headlessui/react/dist/utils/class-names.js":
/*!******************************************************************!*\
  !*** ./node_modules/@headlessui/react/dist/utils/class-names.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   classNames: () => (/* binding */ t)
/* harmony export */ });
function t(...r){return Array.from(new Set(r.flatMap(n=>typeof n=="string"?n.split(" "):[]))).filter(Boolean).join(" ")}


/***/ }),

/***/ "./node_modules/@headlessui/react/dist/utils/disposables.js":
/*!******************************************************************!*\
  !*** ./node_modules/@headlessui/react/dist/utils/disposables.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   disposables: () => (/* binding */ o)
/* harmony export */ });
/* harmony import */ var _micro_task_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./micro-task.js */ "./node_modules/@headlessui/react/dist/utils/micro-task.js");
function o(){let n=[],r={addEventListener(e,t,s,a){return e.addEventListener(t,s,a),r.add(()=>e.removeEventListener(t,s,a))},requestAnimationFrame(...e){let t=requestAnimationFrame(...e);return r.add(()=>cancelAnimationFrame(t))},nextFrame(...e){return r.requestAnimationFrame(()=>r.requestAnimationFrame(...e))},setTimeout(...e){let t=setTimeout(...e);return r.add(()=>clearTimeout(t))},microTask(...e){let t={current:!0};return (0,_micro_task_js__WEBPACK_IMPORTED_MODULE_0__.microTask)(()=>{t.current&&e[0]()}),r.add(()=>{t.current=!1})},style(e,t,s){let a=e.style.getPropertyValue(t);return Object.assign(e.style,{[t]:s}),this.add(()=>{Object.assign(e.style,{[t]:a})})},group(e){let t=o();return e(t),this.add(()=>t.dispose())},add(e){return n.push(e),()=>{let t=n.indexOf(e);if(t>=0)for(let s of n.splice(t,1))s()}},dispose(){for(let e of n.splice(0))e()}};return r}


/***/ }),

/***/ "./node_modules/@headlessui/react/dist/utils/document-ready.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@headlessui/react/dist/utils/document-ready.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   onDocumentReady: () => (/* binding */ t)
/* harmony export */ });
function t(n){function e(){document.readyState!=="loading"&&(n(),document.removeEventListener("DOMContentLoaded",e))}typeof window!="undefined"&&typeof document!="undefined"&&(document.addEventListener("DOMContentLoaded",e),e())}


/***/ }),

/***/ "./node_modules/@headlessui/react/dist/utils/env.js":
/*!**********************************************************!*\
  !*** ./node_modules/@headlessui/react/dist/utils/env.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   env: () => (/* binding */ s)
/* harmony export */ });
var i=Object.defineProperty;var d=(t,e,n)=>e in t?i(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var r=(t,e,n)=>(d(t,typeof e!="symbol"?e+"":e,n),n);class o{constructor(){r(this,"current",this.detect());r(this,"handoffState","pending");r(this,"currentId",0)}set(e){this.current!==e&&(this.handoffState="pending",this.currentId=0,this.current=e)}reset(){this.set(this.detect())}nextId(){return++this.currentId}get isServer(){return this.current==="server"}get isClient(){return this.current==="client"}detect(){return typeof window=="undefined"||typeof document=="undefined"?"server":"client"}handoff(){this.handoffState==="pending"&&(this.handoffState="complete")}get isHandoffComplete(){return this.handoffState==="complete"}}let s=new o;


/***/ }),

/***/ "./node_modules/@headlessui/react/dist/utils/focus-management.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@headlessui/react/dist/utils/focus-management.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Focus: () => (/* binding */ M),
/* harmony export */   FocusResult: () => (/* binding */ N),
/* harmony export */   FocusableMode: () => (/* binding */ T),
/* harmony export */   focusElement: () => (/* binding */ y),
/* harmony export */   focusFrom: () => (/* binding */ _),
/* harmony export */   focusIn: () => (/* binding */ O),
/* harmony export */   getFocusableElements: () => (/* binding */ f),
/* harmony export */   isFocusableElement: () => (/* binding */ h),
/* harmony export */   restoreFocusIfNecessary: () => (/* binding */ D),
/* harmony export */   sortByDomNode: () => (/* binding */ I)
/* harmony export */ });
/* harmony import */ var _disposables_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./disposables.js */ "./node_modules/@headlessui/react/dist/utils/disposables.js");
/* harmony import */ var _match_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./match.js */ "./node_modules/@headlessui/react/dist/utils/match.js");
/* harmony import */ var _owner_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./owner.js */ "./node_modules/@headlessui/react/dist/utils/owner.js");
let c=["[contentEditable=true]","[tabindex]","a[href]","area[href]","button:not([disabled])","iframe","input:not([disabled])","select:not([disabled])","textarea:not([disabled])"].map(e=>`${e}:not([tabindex='-1'])`).join(",");var M=(n=>(n[n.First=1]="First",n[n.Previous=2]="Previous",n[n.Next=4]="Next",n[n.Last=8]="Last",n[n.WrapAround=16]="WrapAround",n[n.NoScroll=32]="NoScroll",n))(M||{}),N=(o=>(o[o.Error=0]="Error",o[o.Overflow=1]="Overflow",o[o.Success=2]="Success",o[o.Underflow=3]="Underflow",o))(N||{}),F=(t=>(t[t.Previous=-1]="Previous",t[t.Next=1]="Next",t))(F||{});function f(e=document.body){return e==null?[]:Array.from(e.querySelectorAll(c)).sort((r,t)=>Math.sign((r.tabIndex||Number.MAX_SAFE_INTEGER)-(t.tabIndex||Number.MAX_SAFE_INTEGER)))}var T=(t=>(t[t.Strict=0]="Strict",t[t.Loose=1]="Loose",t))(T||{});function h(e,r=0){var t;return e===((t=(0,_owner_js__WEBPACK_IMPORTED_MODULE_2__.getOwnerDocument)(e))==null?void 0:t.body)?!1:(0,_match_js__WEBPACK_IMPORTED_MODULE_1__.match)(r,{[0](){return e.matches(c)},[1](){let l=e;for(;l!==null;){if(l.matches(c))return!0;l=l.parentElement}return!1}})}function D(e){let r=(0,_owner_js__WEBPACK_IMPORTED_MODULE_2__.getOwnerDocument)(e);(0,_disposables_js__WEBPACK_IMPORTED_MODULE_0__.disposables)().nextFrame(()=>{r&&!h(r.activeElement,0)&&y(e)})}var w=(t=>(t[t.Keyboard=0]="Keyboard",t[t.Mouse=1]="Mouse",t))(w||{});typeof window!="undefined"&&typeof document!="undefined"&&(document.addEventListener("keydown",e=>{e.metaKey||e.altKey||e.ctrlKey||(document.documentElement.dataset.headlessuiFocusVisible="")},!0),document.addEventListener("click",e=>{e.detail===1?delete document.documentElement.dataset.headlessuiFocusVisible:e.detail===0&&(document.documentElement.dataset.headlessuiFocusVisible="")},!0));function y(e){e==null||e.focus({preventScroll:!0})}let S=["textarea","input"].join(",");function H(e){var r,t;return(t=(r=e==null?void 0:e.matches)==null?void 0:r.call(e,S))!=null?t:!1}function I(e,r=t=>t){return e.slice().sort((t,l)=>{let o=r(t),i=r(l);if(o===null||i===null)return 0;let n=o.compareDocumentPosition(i);return n&Node.DOCUMENT_POSITION_FOLLOWING?-1:n&Node.DOCUMENT_POSITION_PRECEDING?1:0})}function _(e,r){return O(f(),r,{relativeTo:e})}function O(e,r,{sorted:t=!0,relativeTo:l=null,skipElements:o=[]}={}){let i=Array.isArray(e)?e.length>0?e[0].ownerDocument:document:e.ownerDocument,n=Array.isArray(e)?t?I(e):e:f(e);o.length>0&&n.length>1&&(n=n.filter(s=>!o.includes(s))),l=l!=null?l:i.activeElement;let E=(()=>{if(r&5)return 1;if(r&10)return-1;throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last")})(),x=(()=>{if(r&1)return 0;if(r&2)return Math.max(0,n.indexOf(l))-1;if(r&4)return Math.max(0,n.indexOf(l))+1;if(r&8)return n.length-1;throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last")})(),p=r&32?{preventScroll:!0}:{},d=0,a=n.length,u;do{if(d>=a||d+a<=0)return 0;let s=x+d;if(r&16)s=(s+a)%a;else{if(s<0)return 3;if(s>=a)return 1}u=n[s],u==null||u.focus(p),d+=E}while(u!==i.activeElement);return r&6&&H(u)&&u.select(),2}


/***/ }),

/***/ "./node_modules/@headlessui/react/dist/utils/match.js":
/*!************************************************************!*\
  !*** ./node_modules/@headlessui/react/dist/utils/match.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   match: () => (/* binding */ u)
/* harmony export */ });
function u(r,n,...a){if(r in n){let e=n[r];return typeof e=="function"?e(...a):e}let t=new Error(`Tried to handle "${r}" but there is no handler defined. Only defined handlers are: ${Object.keys(n).map(e=>`"${e}"`).join(", ")}.`);throw Error.captureStackTrace&&Error.captureStackTrace(t,u),t}


/***/ }),

/***/ "./node_modules/@headlessui/react/dist/utils/micro-task.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@headlessui/react/dist/utils/micro-task.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   microTask: () => (/* binding */ t)
/* harmony export */ });
function t(e){typeof queueMicrotask=="function"?queueMicrotask(e):Promise.resolve().then(e).catch(o=>setTimeout(()=>{throw o}))}


/***/ }),

/***/ "./node_modules/@headlessui/react/dist/utils/once.js":
/*!***********************************************************!*\
  !*** ./node_modules/@headlessui/react/dist/utils/once.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   once: () => (/* binding */ l)
/* harmony export */ });
function l(r){let e={called:!1};return(...t)=>{if(!e.called)return e.called=!0,r(...t)}}


/***/ }),

/***/ "./node_modules/@headlessui/react/dist/utils/owner.js":
/*!************************************************************!*\
  !*** ./node_modules/@headlessui/react/dist/utils/owner.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getOwnerDocument: () => (/* binding */ o)
/* harmony export */ });
/* harmony import */ var _env_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./env.js */ "./node_modules/@headlessui/react/dist/utils/env.js");
function o(r){return _env_js__WEBPACK_IMPORTED_MODULE_0__.env.isServer?null:r instanceof Node?r.ownerDocument:r!=null&&r.hasOwnProperty("current")&&r.current instanceof Node?r.current.ownerDocument:document}


/***/ }),

/***/ "./node_modules/@headlessui/react/dist/utils/platform.js":
/*!***************************************************************!*\
  !*** ./node_modules/@headlessui/react/dist/utils/platform.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isAndroid: () => (/* binding */ i),
/* harmony export */   isIOS: () => (/* binding */ t),
/* harmony export */   isMobile: () => (/* binding */ n)
/* harmony export */ });
function t(){return/iPhone/gi.test(window.navigator.platform)||/Mac/gi.test(window.navigator.platform)&&window.navigator.maxTouchPoints>0}function i(){return/Android/gi.test(window.navigator.userAgent)}function n(){return t()||i()}


/***/ }),

/***/ "./node_modules/@headlessui/react/dist/utils/render.js":
/*!*************************************************************!*\
  !*** ./node_modules/@headlessui/react/dist/utils/render.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Features: () => (/* binding */ O),
/* harmony export */   RenderStrategy: () => (/* binding */ v),
/* harmony export */   compact: () => (/* binding */ x),
/* harmony export */   forwardRefWithAs: () => (/* binding */ U),
/* harmony export */   render: () => (/* binding */ C),
/* harmony export */   useMergeRefsFn: () => (/* binding */ I)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _class_names_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./class-names.js */ "./node_modules/@headlessui/react/dist/utils/class-names.js");
/* harmony import */ var _match_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./match.js */ "./node_modules/@headlessui/react/dist/utils/match.js");
var O=(n=>(n[n.None=0]="None",n[n.RenderStrategy=1]="RenderStrategy",n[n.Static=2]="Static",n))(O||{}),v=(e=>(e[e.Unmount=0]="Unmount",e[e.Hidden=1]="Hidden",e))(v||{});function C({ourProps:r,theirProps:t,slot:e,defaultTag:n,features:o,visible:a=!0,name:f,mergeRefs:l}){l=l!=null?l:k;let s=R(t,r);if(a)return m(s,e,n,f,l);let y=o!=null?o:0;if(y&2){let{static:u=!1,...d}=s;if(u)return m(d,e,n,f,l)}if(y&1){let{unmount:u=!0,...d}=s;return (0,_match_js__WEBPACK_IMPORTED_MODULE_2__.match)(u?0:1,{[0](){return null},[1](){return m({...d,hidden:!0,style:{display:"none"}},e,n,f,l)}})}return m(s,e,n,f,l)}function m(r,t={},e,n,o){let{as:a=e,children:f,refName:l="ref",...s}=F(r,["unmount","static"]),y=r.ref!==void 0?{[l]:r.ref}:{},u=typeof f=="function"?f(t):f;"className"in s&&s.className&&typeof s.className=="function"&&(s.className=s.className(t));let d={};if(t){let i=!1,c=[];for(let[T,p]of Object.entries(t))typeof p=="boolean"&&(i=!0),p===!0&&c.push(T);i&&(d["data-headlessui-state"]=c.join(" "))}if(a===react__WEBPACK_IMPORTED_MODULE_0__.Fragment&&Object.keys(x(s)).length>0){if(!(0,react__WEBPACK_IMPORTED_MODULE_0__.isValidElement)(u)||Array.isArray(u)&&u.length>1)throw new Error(['Passing props on "Fragment"!',"",`The current component <${n} /> is rendering a "Fragment".`,"However we need to passthrough the following props:",Object.keys(s).map(p=>`  - ${p}`).join(`
`),"","You can apply a few solutions:",['Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".',"Render a single element as the child so that we can forward the props onto that element."].map(p=>`  - ${p}`).join(`
`)].join(`
`));let i=u.props,c=typeof(i==null?void 0:i.className)=="function"?(...p)=>(0,_class_names_js__WEBPACK_IMPORTED_MODULE_1__.classNames)(i==null?void 0:i.className(...p),s.className):(0,_class_names_js__WEBPACK_IMPORTED_MODULE_1__.classNames)(i==null?void 0:i.className,s.className),T=c?{className:c}:{};return (0,react__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(u,Object.assign({},R(u.props,x(F(s,["ref"]))),d,y,{ref:o(u.ref,y.ref)},T))}return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(a,Object.assign({},F(s,["ref"]),a!==react__WEBPACK_IMPORTED_MODULE_0__.Fragment&&y,a!==react__WEBPACK_IMPORTED_MODULE_0__.Fragment&&d),u)}function I(){let r=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)([]),t=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(e=>{for(let n of r.current)n!=null&&(typeof n=="function"?n(e):n.current=e)},[]);return(...e)=>{if(!e.every(n=>n==null))return r.current=e,t}}function k(...r){return r.every(t=>t==null)?void 0:t=>{for(let e of r)e!=null&&(typeof e=="function"?e(t):e.current=t)}}function R(...r){var n;if(r.length===0)return{};if(r.length===1)return r[0];let t={},e={};for(let o of r)for(let a in o)a.startsWith("on")&&typeof o[a]=="function"?((n=e[a])!=null||(e[a]=[]),e[a].push(o[a])):t[a]=o[a];if(t.disabled||t["aria-disabled"])return Object.assign(t,Object.fromEntries(Object.keys(e).map(o=>[o,void 0])));for(let o in e)Object.assign(t,{[o](a,...f){let l=e[o];for(let s of l){if((a instanceof Event||(a==null?void 0:a.nativeEvent)instanceof Event)&&a.defaultPrevented)return;s(a,...f)}}});return t}function U(r){var t;return Object.assign((0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(r),{displayName:(t=r.displayName)!=null?t:r.name})}function x(r){let t=Object.assign({},r);for(let e in t)t[e]===void 0&&delete t[e];return t}function F(r,t=[]){let e=Object.assign({},r);for(let n of t)n in e&&delete e[n];return e}


/***/ }),

/***/ "./node_modules/@headlessui/react/dist/utils/store.js":
/*!************************************************************!*\
  !*** ./node_modules/@headlessui/react/dist/utils/store.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createStore: () => (/* binding */ a)
/* harmony export */ });
function a(o,r){let t=o(),n=new Set;return{getSnapshot(){return t},subscribe(e){return n.add(e),()=>n.delete(e)},dispatch(e,...s){let i=r[e].call(t,...s);i&&(t=i,n.forEach(c=>c()))}}}


/***/ }),

/***/ "./node_modules/@newfold/ui-component-library/components/modal/hooks.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@newfold/ui-component-library/components/modal/hooks.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ModalContext: () => (/* binding */ ModalContext),
/* harmony export */   useModalContext: () => (/* binding */ useModalContext)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);


const ModalContext = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createContext)({
  isOpen: false,
  onClose: lodash__WEBPACK_IMPORTED_MODULE_1__.noop
});

/**
 * @returns {Object} The modal context.
 */
const useModalContext = () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useContext)(ModalContext);

/***/ }),

/***/ "./node_modules/@newfold/ui-component-library/components/modal/index.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@newfold/ui-component-library/components/modal/index.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   classNameMap: () => (/* binding */ classNameMap),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _headlessui_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @headlessui/react */ "./node_modules/@headlessui/react/dist/components/dialog/dialog.js");
/* harmony import */ var _headlessui_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @headlessui/react */ "./node_modules/@headlessui/react/dist/components/transitions/transition.js");
/* harmony import */ var _heroicons_react_outline__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @heroicons/react/outline */ "./node_modules/@newfold/ui-component-library/node_modules/@heroicons/react/outline/esm/XIcon.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _hooks__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../hooks */ "./node_modules/@newfold/ui-component-library/hooks/use-svg-aria.js");
/* harmony import */ var _hooks__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./hooks */ "./node_modules/@newfold/ui-component-library/components/modal/hooks.js");
/* harmony import */ var _elements_title__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../elements/title */ "./node_modules/@newfold/ui-component-library/elements/title/index.js");










/**
 * @param {JSX.node} children Title text.
 * @param {string} [className] Additional class names.
 * @param {string|JSX.Element} [as="h1"] Base component.
 * @param {string} [size] Size of title.
 * @param {Object} [props] Additional props.
 * @returns {JSX.Element} The title.
 */
const Title = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(({
  children,
  size,
  className,
  as,
  ...props
}, ref) => {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_headlessui_react__WEBPACK_IMPORTED_MODULE_1__.Dialog.Title, {
    as: as,
    ref: ref,
    className: classnames__WEBPACK_IMPORTED_MODULE_4___default()("nfd-title", size ? _elements_title__WEBPACK_IMPORTED_MODULE_8__.classNameMap.size[size] : "", className),
    ...props
  }, children);
});
Title.defaultProps = {
  className: "",
  as: "h1"
};
Title.propTypes = {
  size: prop_types__WEBPACK_IMPORTED_MODULE_5___default().oneOf(Object.keys(_elements_title__WEBPACK_IMPORTED_MODULE_8__.classNameMap.size)),
  className: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().string),
  children: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().node).isRequired,
  as: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().elementType)
};

/**
 * @param {JSX.node} children Contents of the modal.
 * @param {string} [className] Additional class names.
 * @param {boolean} [hasCloseButton] Whether the modal has a close button.
 * @param {string} [closeButtonScreenReaderText] The screen reader text of the close button. Used when hasCloseButton is true.
 * @param {Object} [props] Additional props.
 * @returns {JSX.Element} The panel.
 */
const Panel = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(({
  children,
  className = "",
  hasCloseButton = true,
  closeButtonScreenReaderText = "Close",
  ...props
}, ref) => {
  const {
    onClose
  } = (0,_hooks__WEBPACK_IMPORTED_MODULE_7__.useModalContext)();
  const svgAriaProps = (0,_hooks__WEBPACK_IMPORTED_MODULE_6__["default"])();
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_headlessui_react__WEBPACK_IMPORTED_MODULE_1__.Dialog.Panel, {
    ref: ref,
    className: classnames__WEBPACK_IMPORTED_MODULE_4___default()("nfd-modal__panel", className),
    ...props
  }, hasCloseButton && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-modal__close"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    onClick: onClose,
    className: "nfd-modal__close-button"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "nfd-sr-only"
  }, closeButtonScreenReaderText), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_heroicons_react_outline__WEBPACK_IMPORTED_MODULE_3__["default"], {
    className: "nfd-h-6 nfd-w-6",
    ...svgAriaProps
  }))), children);
});
Panel.propTypes = {
  children: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().node).isRequired,
  className: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().string),
  hasCloseButton: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().bool),
  closeButtonScreenReaderText: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().string)
};
const classNameMap = {
  position: {
    center: "nfd-modal--center",
    "top-center": "nfd-modal--top-center"
  }
};

/**
 * @param {boolean} isOpen Whether the modal is open.
 * @param {function} onClose Function that is called when the user wants to close the modal.
 * @param {JSX.node} children Contents of the modal.
 * @param {string} [className] Additional class names.
 * @param {string} [position] Modal screen position. See `classNameMap.position` for the options.
 * @param {Object} [props] Additional Dialog props.
 * @returns {JSX.Element} The modal.
 */
const Modal = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(({
  isOpen,
  onClose,
  children,
  className = "",
  position = "center",
  ...props
}, ref) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_hooks__WEBPACK_IMPORTED_MODULE_7__.ModalContext.Provider, {
  value: {
    isOpen,
    onClose
  }
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_headlessui_react__WEBPACK_IMPORTED_MODULE_2__.Transition.Root, {
  show: isOpen,
  as: _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_headlessui_react__WEBPACK_IMPORTED_MODULE_1__.Dialog, {
  as: "div",
  ref: ref,
  className: "nfd-root",
  open: isOpen,
  onClose: onClose,
  ...props
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
  className: classnames__WEBPACK_IMPORTED_MODULE_4___default()("nfd-modal", classNameMap.position[position], className)
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_headlessui_react__WEBPACK_IMPORTED_MODULE_2__.Transition.Child, {
  as: _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment,
  enter: "nfd-ease-out nfd-duration-300",
  enterFrom: "nfd-opacity-0",
  enterTo: "nfd-opacity-100",
  leave: "nfd-ease-in nfd-duration-200",
  leaveFrom: "nfd-opacity-100",
  leaveTo: "nfd-opacity-0"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
  className: "nfd-modal__overlay"
})), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
  className: "nfd-modal__layout"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_headlessui_react__WEBPACK_IMPORTED_MODULE_2__.Transition.Child, {
  as: _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment,
  enter: "nfd-ease-out nfd-duration-300",
  enterFrom: "nfd-opacity-0 nfd-translate-y-4 sm:nfd-translate-y-0 sm:nfd-scale-95",
  enterTo: "nfd-opacity-100 nfd-translate-y-0 sm:nfd-scale-100",
  leave: "nfd-ease-in nfd-duration-200",
  leaveFrom: "nfd-opacity-100 nfd-translate-y-0 sm:nfd-scale-100",
  leaveTo: "nfd-opacity-0 nfd-translate-y-4 sm:nfd-translate-y-0 sm:nfd-scale-95"
}, children)))))));
Modal.propTypes = {
  isOpen: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().bool).isRequired,
  onClose: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().func).isRequired,
  children: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().node).isRequired,
  className: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().string),
  position: prop_types__WEBPACK_IMPORTED_MODULE_5___default().oneOf(Object.keys(classNameMap.position))
};
Modal.displayName = "Modal";
Modal.Panel = Panel;
Modal.Panel.displayName = "Modal.Panel";
Modal.Title = Title;
Modal.Title.displayName = "Modal.Title";
Modal.Description = _headlessui_react__WEBPACK_IMPORTED_MODULE_1__.Dialog.Description;
Modal.Description.displayName = "Modal.Description";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Modal);

/***/ }),

/***/ "./node_modules/@newfold/ui-component-library/components/root/index.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@newfold/ui-component-library/components/root/index.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RootContext: () => (/* binding */ RootContext),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);



const defaultRootContext = {
  isRtl: false
};
const RootContext = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createContext)(defaultRootContext);

/**
 * @param {JSX.node} children The React children.
 * @param {{ isRtl: boolean }} context The root context value.
 * @returns {JSX.Element} The Root component.
 */
const Root = ({
  children,
  context = {},
  ...props
}) => {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(RootContext.Provider, {
    value: {
      ...defaultRootContext,
      ...context
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-root",
    ...props
  }, children));
};
Root.propTypes = {
  children: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().node).isRequired,
  context: prop_types__WEBPACK_IMPORTED_MODULE_1___default().shape({
    isRtl: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().bool)
  })
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Root);

/***/ }),

/***/ "./node_modules/@newfold/ui-component-library/components/text-field/index.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@newfold/ui-component-library/components/text-field/index.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StoryComponent: () => (/* binding */ StoryComponent),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _elements_label__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../elements/label */ "./node_modules/@newfold/ui-component-library/elements/label/index.js");
/* harmony import */ var _elements_text_input__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../elements/text-input */ "./node_modules/@newfold/ui-component-library/elements/text-input/index.js");
/* harmony import */ var _elements_validation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../elements/validation */ "./node_modules/@newfold/ui-component-library/elements/validation/validation-input.js");
/* harmony import */ var _elements_validation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../elements/validation */ "./node_modules/@newfold/ui-component-library/elements/validation/validation-message.js");
/* harmony import */ var _hooks__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../hooks */ "./node_modules/@newfold/ui-component-library/hooks/use-described-by.js");









/**
 * @param {string} id The ID of the input.
 * @param {function} onChange The input change handler.
 * @param {string} label The label.
 * @param {JSX.node} [labelSuffix] Extra elements after the label.
 * @param {string} [className] The HTML class.
 * @param {JSX.node} [description] A description.
 * @param {boolean} [disabled] The disabled state.
 * @param {boolean} [readOnly] The read-only state.
 * @param {boolean} [required] The required state.
 * @param {JSX.Element} [icon] The field icon.
 * @param {Object} [validation] The validation state.
 * @param {Object} [props] Any extra properties for the TextInput.
 * @returns {JSX.Element} The input field.
 */
const TextField = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(({
  id,
  onChange,
  label,
  labelSuffix,
  labelRequiredIndicator,
  disabled,
  readOnly,
  required,
  icon,
  className,
  description,
  validation,
  ...props
}, ref) => {
  const {
    ids,
    describedBy
  } = (0,_hooks__WEBPACK_IMPORTED_MODULE_7__["default"])(id, {
    validation: validation === null || validation === void 0 ? void 0 : validation.message,
    description
  });
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()("nfd-text-field", disabled && "nfd-text-field--disabled", readOnly && "nfd-text-field--read-only", icon && "nfd-text-field--with-icon", className)
  }, !!label && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-flex nfd-items-center nfd-mb-2"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_elements_label__WEBPACK_IMPORTED_MODULE_3__["default"], {
    requiredIndicator: required && labelRequiredIndicator,
    className: "nfd-text-field__label",
    htmlFor: id
  }, label), labelSuffix), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_elements_validation__WEBPACK_IMPORTED_MODULE_5__["default"], {
    as: _elements_text_input__WEBPACK_IMPORTED_MODULE_4__["default"],
    ref: ref,
    id: id,
    icon: icon,
    onChange: onChange,
    disabled: disabled,
    readOnly: readOnly,
    required: required,
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('nfd-text-field__input', {
      'nfd-text-field--input-with-icon': icon
    }),
    "aria-describedby": describedBy,
    validation: validation,
    ...props
  }), (validation === null || validation === void 0 ? void 0 : validation.message) && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_elements_validation__WEBPACK_IMPORTED_MODULE_6__["default"], {
    variant: validation === null || validation === void 0 ? void 0 : validation.variant,
    id: ids.validation,
    className: "nfd-text-field__validation"
  }, validation.message), description && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    id: ids.description,
    className: "nfd-text-field__description"
  }, description));
});
const propTypes = {
  id: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string).isRequired,
  onChange: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func).isRequired,
  label: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string).isRequired,
  labelSuffix: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().node),
  disabled: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool),
  readOnly: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool),
  required: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool),
  className: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
  description: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().node),
  icon: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().elementType),
  validation: prop_types__WEBPACK_IMPORTED_MODULE_2___default().shape({
    variant: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
    message: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().node)
  })
};
TextField.propTypes = propTypes;
TextField.defaultProps = {
  labelSuffix: null,
  disabled: false,
  readOnly: false,
  required: false,
  className: "",
  description: null,
  icon: null,
  validation: {}
};

// eslint-disable-next-line require-jsdoc
const StoryComponent = props => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextField, {
  ...props
});
StoryComponent.propTypes = propTypes;
StoryComponent.defaultProps = TextField.defaultProps;
StoryComponent.displayName = "TextField";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TextField);

/***/ }),

/***/ "./node_modules/@newfold/ui-component-library/components/textarea-field/index.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/@newfold/ui-component-library/components/textarea-field/index.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StoryComponent: () => (/* binding */ StoryComponent),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _elements_label__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../elements/label */ "./node_modules/@newfold/ui-component-library/elements/label/index.js");
/* harmony import */ var _elements_textarea__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../elements/textarea */ "./node_modules/@newfold/ui-component-library/elements/textarea/index.js");
/* harmony import */ var _elements_validation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../elements/validation */ "./node_modules/@newfold/ui-component-library/elements/validation/validation-input.js");
/* harmony import */ var _elements_validation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../elements/validation */ "./node_modules/@newfold/ui-component-library/elements/validation/validation-message.js");
/* harmony import */ var _hooks__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../hooks */ "./node_modules/@newfold/ui-component-library/hooks/use-described-by.js");









/**
 * @param {string} id The ID of the input.
 * @param {function} onChange The input change handler.
 * @param {string} label The label.
 * @param {string} [className] The HTML class.
 * @param {JSX.node} [description] A description.
 * @param {Object} [error] The validation state.
 * @param {Object} [props] Any extra properties for the Textarea.
 * @returns {JSX.Element} The textarea field.
 */
const TextareaField = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(({
  id,
  label,
  className = "",
  description = "",
  validation = {},
  ...props
}, ref) => {
  const {
    ids,
    describedBy
  } = (0,_hooks__WEBPACK_IMPORTED_MODULE_7__["default"])(id, {
    validation: validation === null || validation === void 0 ? void 0 : validation.message,
    description
  });
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()("nfd-textarea-field", className)
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-flex nfd-items-center nfd-mb-2"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_elements_label__WEBPACK_IMPORTED_MODULE_3__["default"], {
    className: "nfd-textarea-field__label",
    htmlFor: id
  }, label)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_elements_validation__WEBPACK_IMPORTED_MODULE_5__["default"], {
    as: _elements_textarea__WEBPACK_IMPORTED_MODULE_4__["default"],
    ref: ref,
    id: id,
    className: "nfd-textarea-field__input",
    "aria-describedby": describedBy,
    validation: validation,
    ...props
  }), (validation === null || validation === void 0 ? void 0 : validation.message) && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_elements_validation__WEBPACK_IMPORTED_MODULE_6__["default"], {
    variant: validation === null || validation === void 0 ? void 0 : validation.variant,
    id: ids.validation,
    className: "nfd-textarea-field__validation"
  }, validation.message), description && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    id: ids.description,
    className: "nfd-textarea-field__description"
  }, description));
});
const propTypes = {
  id: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string).isRequired,
  label: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string).isRequired,
  className: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
  description: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().node),
  validation: prop_types__WEBPACK_IMPORTED_MODULE_2___default().shape({
    variant: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
    message: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().node)
  })
};
TextareaField.propTypes = propTypes;
TextareaField.defaultProps = {
  className: "",
  description: null,
  validation: {}
};

// eslint-disable-next-line require-jsdoc
const StoryComponent = props => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextareaField, {
  ...props
});
StoryComponent.propTypes = propTypes;
StoryComponent.defaultProps = TextareaField.defaultProps;
StoryComponent.displayName = "TextareaField";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TextareaField);

/***/ }),

/***/ "./node_modules/@newfold/ui-component-library/elements/button/index.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@newfold/ui-component-library/elements/button/index.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StoryComponent: () => (/* binding */ StoryComponent),
/* harmony export */   classNameMap: () => (/* binding */ classNameMap),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _spinner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../spinner */ "./node_modules/@newfold/ui-component-library/elements/spinner/index.js");






const classNameMap = {
  variant: {
    primary: "nfd-button--primary",
    secondary: "nfd-button--secondary",
    error: "nfd-button--error",
    upsell: "nfd-button--upsell"
  },
  size: {
    "default": "",
    small: "nfd-button--small",
    large: "nfd-button--large"
  }
};

/**
 * @param {JSX.node} children Content of the button.
 * @param {string|JSX.Element} [as="button"] Base component.
 * @param {string} [type] Type attribute. Used when `as` is a `button`.
 * @param {string} [variant="primary"] Button variant. See `classNameMap` for the options.
 * @param {string} [size="default"] Button size. See `classNameMap` for the options.
 * @param {boolean} [isLoading=false] Whether to show a spinner.
 * @param {boolean} [disabled=false] Whether the button is disabled.
 * @param {string} [className] CSS class.
 * @returns {JSX.Element} Button component.
 */
const Button = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(({
  children,
  as: Component,
  type,
  variant,
  size,
  isLoading,
  disabled,
  className,
  ...props
}, ref) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Component
// eslint-disable-next-line no-undefined
, {
  type: type || Component === "button" && "button" || undefined,
  disabled: disabled,
  ref: ref,
  className: classnames__WEBPACK_IMPORTED_MODULE_1___default()("nfd-button", classNameMap.variant[variant], classNameMap.size[size], isLoading && "nfd-cursor-wait", disabled && "nfd-button--disabled", className),
  ...props
}, isLoading && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_spinner__WEBPACK_IMPORTED_MODULE_4__["default"], {
  size: size === "small" ? "3" : "4",
  className: "nfd-mr-2"
}), children));
const propTypes = {
  children: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().node).isRequired,
  as: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().elementType),
  type: prop_types__WEBPACK_IMPORTED_MODULE_3___default().oneOf(["button", "submit", "reset"]),
  variant: prop_types__WEBPACK_IMPORTED_MODULE_3___default().oneOf((0,lodash__WEBPACK_IMPORTED_MODULE_2__.keys)(classNameMap.variant)),
  size: prop_types__WEBPACK_IMPORTED_MODULE_3___default().oneOf((0,lodash__WEBPACK_IMPORTED_MODULE_2__.keys)(classNameMap.size)),
  isLoading: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool),
  disabled: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool),
  className: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().string)
};
Button.propTypes = propTypes;
Button.defaultProps = {
  as: "button",
  // eslint-disable-next-line no-undefined
  type: undefined,
  variant: "primary",
  size: "default",
  isLoading: false,
  disabled: false,
  className: ""
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Button);

// eslint-disable-next-line require-jsdoc
const StoryComponent = props => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
  ...props
});
StoryComponent.propTypes = propTypes;
StoryComponent.defaultProps = Button.defaultProps;
StoryComponent.displayName = "Button";

/***/ }),

/***/ "./node_modules/@newfold/ui-component-library/elements/label/index.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@newfold/ui-component-library/elements/label/index.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StoryComponent: () => (/* binding */ StoryComponent),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);





/**
 * @param {string} label Content of the Label. Note that this is a string ONLY for a11y reasons.
 * @param {string} children Alternative to the label. See label.
 * @param {string|JSX.node} [as] Base component.
 * @param {string} [className] CSS class.
 * @param {boolean} [requiredIndicator] Whether the label is required.
 * @returns {JSX.Element} Label component.
 */
const Label = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(({
  as: Component,
  className,
  label,
  requiredIndicator,
  children,
  ...props
}, ref) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Component, {
  ref: ref,
  className: classnames__WEBPACK_IMPORTED_MODULE_1___default()("nfd-label", className),
  ...props
}, label || children || null, requiredIndicator && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
  className: "nfd-label__required"
}, "*")));
const propTypes = {
  label: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
  children: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
  as: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().elementType),
  className: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
  required: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool)
};
Label.propTypes = propTypes;
Label.defaultProps = {
  label: "",
  children: "",
  as: "label",
  className: "",
  requiredIndicator: false
};

// eslint-disable-next-line require-jsdoc
const StoryComponent = props => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Label, {
  ...props
});
StoryComponent.propTypes = propTypes;
StoryComponent.defaultProps = Label.defaultProps;
StoryComponent.displayName = "Label";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Label);

/***/ }),

/***/ "./node_modules/@newfold/ui-component-library/elements/spinner/index.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@newfold/ui-component-library/elements/spinner/index.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StoryComponent: () => (/* binding */ StoryComponent),
/* harmony export */   classNameMap: () => (/* binding */ classNameMap),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _hooks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../hooks */ "./node_modules/@newfold/ui-component-library/hooks/use-svg-aria.js");






const classNameMap = {
  variant: {
    // Default is currentColor.
    "default": "",
    primary: "nfd-text-primary-500",
    white: "nfd-text-white"
  },
  size: {
    3: "nfd-w-3 nfd-h-3",
    4: "nfd-w-4 nfd-h-4",
    8: "nfd-w-8 nfd-h-8"
  }
};

/**
 * @param {string} [variant=default] The variant.
 * @param {string} [size] The size.
 * @param {string} [className] The HTML class.
 * @returns {JSX.Element} The spinner.
 */
const Spinner = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(({
  variant,
  size,
  className
}, ref) => {
  const svgAriaProps = (0,_hooks__WEBPACK_IMPORTED_MODULE_4__["default"])();
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    ref: ref,
    xmlns: "http://www.w3.org/2000/svg/",
    fill: "none",
    viewBox: "0 0 24 24",
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()("nfd-animate-spin", classNameMap.variant[variant], classNameMap.size[size], className),
    ...svgAriaProps
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", {
    className: "nfd-opacity-25",
    cx: "12",
    cy: "12",
    r: "10",
    stroke: "currentColor",
    strokeWidth: "4"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    className: "nfd-opacity-75",
    fill: "currentColor",
    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
  }));
});
const propTypes = {
  variant: prop_types__WEBPACK_IMPORTED_MODULE_3___default().oneOf((0,lodash__WEBPACK_IMPORTED_MODULE_2__.keys)(classNameMap.variant)),
  size: prop_types__WEBPACK_IMPORTED_MODULE_3___default().oneOf((0,lodash__WEBPACK_IMPORTED_MODULE_2__.keys)(classNameMap.size)),
  className: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().string)
};
Spinner.propTypes = propTypes;
Spinner.defaultProps = {
  variant: "default",
  size: "4",
  className: ""
};

// eslint-disable-next-line require-jsdoc
const StoryComponent = props => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Spinner, {
  ...props
});
StoryComponent.propTypes = propTypes;
StoryComponent.defaultProps = Spinner.defaultProps;
StoryComponent.displayName = "Spinner";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Spinner);

/***/ }),

/***/ "./node_modules/@newfold/ui-component-library/elements/text-input/index.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@newfold/ui-component-library/elements/text-input/index.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StoryComponent: () => (/* binding */ StoryComponent),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);





/**
 * @param {string} [type="text"] The type of input.
 * @param {string} [className=""] CSS class.
 * @param {boolean} [disabled=false] Whether the input is disabled.
 * @param {boolean} [readOnly=false] Whether the input is read-only.
 * @param {boolean} [required=false] Whether the input is required.
 * @param {object} [props] Optional extra properties.
 * @returns {JSX.Element} TextInput component.
 */
const TextInput = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(({
  type,
  className,
  disabled,
  readOnly,
  required,
  ...props
}, ref) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
  ref: ref,
  type: type,
  className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('nfd-text-input', disabled && 'nfd-text-input--disabled', readOnly && 'nfd-text-input--read-only', className),
  disabled: disabled,
  readOnly: readOnly,
  required: required,
  ...props
}));
const propTypes = {
  type: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
  className: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
  disabled: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool),
  readOnly: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool),
  required: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool)
};
TextInput.propTypes = propTypes;
TextInput.defaultProps = {
  type: "text",
  className: "",
  disabled: false,
  readOnly: false,
  required: false
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TextInput);

// eslint-disable-next-line require-jsdoc
const StoryComponent = props => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextInput, {
  ...props
});
StoryComponent.propTypes = propTypes;
StoryComponent.defaultProps = TextInput.defaultProps;
StoryComponent.displayName = "TextInput";

/***/ }),

/***/ "./node_modules/@newfold/ui-component-library/elements/textarea/index.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@newfold/ui-component-library/elements/textarea/index.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StoryComponent: () => (/* binding */ StoryComponent),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);





/**
 * @param {boolean} [disabled=false] Whether the input is disabled.
 * @param {string} [rows] Textarea rows (height).
 * @param {string} [className=""] CSS class.
 * @returns {JSX.Element} Textarea component.
 */
const Textarea = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(({
  disabled,
  rows,
  className,
  ...props
}, ref) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("textarea", {
  ref: ref,
  disabled: disabled,
  rows: rows,
  className: classnames__WEBPACK_IMPORTED_MODULE_1___default()("nfd-textarea", disabled && "nfd-textarea--disabled", className),
  ...props
}));
const propTypes = {
  className: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
  disabled: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool),
  cols: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().number),
  rows: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().number)
};
Textarea.propTypes = propTypes;
Textarea.defaultProps = {
  className: "",
  disabled: false,
  cols: 20,
  rows: 2
};

// eslint-disable-next-line require-jsdoc
const StoryComponent = props => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Textarea, {
  ...props
});
StoryComponent.propTypes = propTypes;
StoryComponent.defaultProps = Textarea.defaultProps;
StoryComponent.displayName = "Textarea";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Textarea);

/***/ }),

/***/ "./node_modules/@newfold/ui-component-library/elements/title/index.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@newfold/ui-component-library/elements/title/index.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StoryComponent: () => (/* binding */ StoryComponent),
/* harmony export */   classNameMap: () => (/* binding */ classNameMap),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);

/* eslint-disable no-undefined */



const classNameMap = {
  size: {
    1: "nfd-title--1",
    2: "nfd-title--2",
    3: "nfd-title--3",
    4: "nfd-title--4",
    5: "nfd-title--5"
  }
};

/**
 * @param {Object} props Props object.
 * @returns {JSX.Element} Title component.
 */
const Title = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(({
  children,
  as: Component,
  size,
  className,
  ...props
}, ref) => {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Component, {
    ref: ref,
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()("nfd-title", classNameMap.size[size || Component[1]], className),
    ...props
  }, children);
});
const propTypes = {
  children: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().node).isRequired,
  as: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().elementType),
  size: prop_types__WEBPACK_IMPORTED_MODULE_1___default().oneOf(Object.keys(classNameMap.size)),
  className: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string)
};
Title.propTypes = propTypes;
Title.defaultProps = {
  as: "h1",
  size: undefined,
  className: ""
};

// eslint-disable-next-line require-jsdoc
const StoryComponent = props => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Title, {
  ...props
});
StoryComponent.propTypes = propTypes;
StoryComponent.defaultProps = Title.defaultProps;
StoryComponent.displayName = "Title";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Title);

/***/ }),

/***/ "./node_modules/@newfold/ui-component-library/elements/validation/constants.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/@newfold/ui-component-library/elements/validation/constants.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VALIDATION_ICON_MAP: () => (/* binding */ VALIDATION_ICON_MAP),
/* harmony export */   VALIDATION_VARIANTS: () => (/* binding */ VALIDATION_VARIANTS)
/* harmony export */ });
/* harmony import */ var _heroicons_react_solid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @heroicons/react/solid */ "./node_modules/@newfold/ui-component-library/node_modules/@heroicons/react/solid/esm/CheckCircleIcon.js");
/* harmony import */ var _heroicons_react_solid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @heroicons/react/solid */ "./node_modules/@newfold/ui-component-library/node_modules/@heroicons/react/solid/esm/ExclamationCircleIcon.js");
/* harmony import */ var _heroicons_react_solid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @heroicons/react/solid */ "./node_modules/@newfold/ui-component-library/node_modules/@heroicons/react/solid/esm/ExclamationIcon.js");
/* harmony import */ var _heroicons_react_solid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @heroicons/react/solid */ "./node_modules/@newfold/ui-component-library/node_modules/@heroicons/react/solid/esm/InformationCircleIcon.js");

const VALIDATION_VARIANTS = {
  success: "success",
  warning: "warning",
  info: "info",
  error: "error"
};
const VALIDATION_ICON_MAP = {
  success: _heroicons_react_solid__WEBPACK_IMPORTED_MODULE_0__["default"],
  warning: _heroicons_react_solid__WEBPACK_IMPORTED_MODULE_2__["default"],
  info: _heroicons_react_solid__WEBPACK_IMPORTED_MODULE_3__["default"],
  error: _heroicons_react_solid__WEBPACK_IMPORTED_MODULE_1__["default"]
};

/***/ }),

/***/ "./node_modules/@newfold/ui-component-library/elements/validation/validation-icon.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@newfold/ui-component-library/elements/validation/validation-icon.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _hooks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../hooks */ "./node_modules/@newfold/ui-component-library/hooks/use-svg-aria.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./constants */ "./node_modules/@newfold/ui-component-library/elements/validation/constants.js");







const CLASSNAME_MAP = {
  variant: {
    success: "nfd-validation-icon--success",
    warning: "nfd-validation-icon--warning",
    info: "nfd-validation-icon--info",
    error: "nfd-validation-icon--error"
  }
};

/**
 * @param {string} variant The variant to render.
 * @param {string} className The classname.
 * @param {Object} [props] Any extra props.
 * @returns {JSX.Element} The ValidationIcon component.
 */
const ValidationIcon = ({
  variant = "info",
  className = "",
  ...props
}) => {
  const Component = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => _constants__WEBPACK_IMPORTED_MODULE_5__.VALIDATION_ICON_MAP[variant], [variant]);
  const svgAriaProps = (0,_hooks__WEBPACK_IMPORTED_MODULE_4__["default"])();
  return Component ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Component, {
    ...svgAriaProps,
    ...props,
    className: classnames__WEBPACK_IMPORTED_MODULE_3___default()("nfd-validation-icon", CLASSNAME_MAP.variant[variant], className)
  }) : null;
};
ValidationIcon.propTypes = {
  variant: prop_types__WEBPACK_IMPORTED_MODULE_1___default().oneOf((0,lodash__WEBPACK_IMPORTED_MODULE_2__.values)(_constants__WEBPACK_IMPORTED_MODULE_5__.VALIDATION_VARIANTS)),
  className: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ValidationIcon);

/***/ }),

/***/ "./node_modules/@newfold/ui-component-library/elements/validation/validation-input.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/@newfold/ui-component-library/elements/validation/validation-input.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _validation_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./validation-icon */ "./node_modules/@newfold/ui-component-library/elements/validation/validation-icon.js");





const CLASSNAME_MAP = {
  variant: {
    success: 'nfd-validation-input--success',
    warning: 'nfd-validation-input--warning',
    info: 'nfd-validation-input--info',
    error: 'nfd-validation-input--error'
  }
};

/**
 * @param {JSX.Element} as The component to render.
 * @param {Object} [validation] The validation state.
 * @param {string} [className] The classname.
 * @param {JSX.Element} [icon] The classname.
 * @returns {JSX.Element} The ValidationInput component.
 */
const ValidationInput = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(({
  as: Component,
  icon: Icon,
  validation = {},
  className = '',
  ...props
}, ref) => {
  const FieldComponent = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Component, {
    ref: ref,
    ...props,
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('nfd-validation-input__input', className)
  });
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('nfd-validation-input', (validation === null || validation === void 0 ? void 0 : validation.message) && CLASSNAME_MAP.variant[validation === null || validation === void 0 ? void 0 : validation.variant])
  }, Icon ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "nfd-group nfd-relative"
  }, !(validation !== null && validation !== void 0 && validation.message && Object.keys(CLASSNAME_MAP.variant).includes(validation === null || validation === void 0 ? void 0 : validation.variant)) && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Icon, {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('nfd-text-input__icon', 'nfd-absolute nfd-w-[24px] nfd-h-[24px] nfd-right-3 nfd-top-1/2 nfd--translate-y-1/2 nfd-pointer-events-none nfd-duration-200')
  }), FieldComponent) : FieldComponent, (validation === null || validation === void 0 ? void 0 : validation.message) && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_validation_icon__WEBPACK_IMPORTED_MODULE_3__["default"], {
    variant: validation === null || validation === void 0 ? void 0 : validation.variant,
    className: "nfd-validation-input__icon"
  }));
});
ValidationInput.propTypes = {
  as: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().elementType).isRequired,
  icon: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().elementType),
  validation: prop_types__WEBPACK_IMPORTED_MODULE_1___default().shape({
    variant: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string),
    message: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().node)
  }),
  className: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ValidationInput);

/***/ }),

/***/ "./node_modules/@newfold/ui-component-library/elements/validation/validation-message.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/@newfold/ui-component-library/elements/validation/validation-message.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);




const CLASSNAME_MAP = {
  variant: {
    success: "nfd-validation-message--success",
    warning: "nfd-validation-message--warning",
    info: "nfd-validation-message--info",
    error: "nfd-validation-message--error"
  }
};

/**
 * @param {string|function} [as="p"] The component to render as.
 * @param {string} [variant="info"] The variant.
 * @param {JSX.node} [children=""] The validation message.
 * @param {string} [className=""] The class name.
 * @returns {JSX.Element} The ValidationMessage component.
 */
const ValidationMessage = ({
  as: Component = "p",
  variant = "info",
  children,
  className = "",
  ...props
}) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Component, {
  ...props,
  className: classnames__WEBPACK_IMPORTED_MODULE_3___default()("nfd-validation-message", CLASSNAME_MAP.variant[variant], className)
}, children);
ValidationMessage.propTypes = {
  as: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().elementType),
  variant: prop_types__WEBPACK_IMPORTED_MODULE_1___default().oneOf((0,lodash__WEBPACK_IMPORTED_MODULE_2__.keys)(CLASSNAME_MAP.variant)),
  message: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().node),
  className: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string),
  children: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().node).isRequired
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ValidationMessage);

/***/ }),

/***/ "./node_modules/@newfold/ui-component-library/hooks/use-described-by.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@newfold/ui-component-library/hooks/use-described-by.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);



/**
 * Creates ids and describedBy based on an ID and the given list of "props".
 *
 * This is a helper hook to create IDs and the `aria-describedby` for our form field components.
 *
 * @param {string} id The base ID.
 * @param {Object} list What IDs to create.
 * @returns {{ids: *, describedBy: *}} Object with `ids` and `describedBy`.
 */
const useDescribedBy = (id, list) => {
  const ids = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => (0,lodash__WEBPACK_IMPORTED_MODULE_1__.reduce)(list, (result, value, key) => {
    // Don't include an entry for falsy values.
    if (!value) {
      return result;
    }
    result[key] = `${id}__${key}`;
    return result;
  }, {}), [id, list]);
  // Comma separated list, or null to not render the attribute.
  const describedBy = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => (0,lodash__WEBPACK_IMPORTED_MODULE_1__.values)(ids).join(" ") || null, [ids]);
  return {
    ids,
    describedBy
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useDescribedBy);

/***/ }),

/***/ "./node_modules/@newfold/ui-component-library/hooks/use-svg-aria.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@newfold/ui-component-library/hooks/use-svg-aria.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);


/**
 * Creates aria attributes for an SVG.
 * @param {boolean|null} [isFocusable] Boolean value to indicate if it should be focusable.
 * @returns {Object} Object with `role` and `aria-hidden` and optionally `focusable`.
 */
const useSvgAria = (isFocusable = null) => {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    const aria = {
      role: "img",
      "aria-hidden": "true"
    };
    if (isFocusable !== null) {
      aria.focusable = isFocusable ? "true" : "false";
    }
    return aria;
  }, [isFocusable]);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useSvgAria);

/***/ }),

/***/ "./node_modules/@newfold/ui-component-library/node_modules/@heroicons/react/outline/esm/XIcon.js":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/@newfold/ui-component-library/node_modules/@heroicons/react/outline/esm/XIcon.js ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");


function XIcon(props, svgRef) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 2,
    stroke: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M6 18L18 6M6 6l12 12"
  }));
}

const ForwardRef = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(XIcon);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ForwardRef);

/***/ }),

/***/ "./node_modules/@newfold/ui-component-library/node_modules/@heroicons/react/solid/esm/CheckCircleIcon.js":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/@newfold/ui-component-library/node_modules/@heroicons/react/solid/esm/CheckCircleIcon.js ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");


function CheckCircleIcon(props, svgRef) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fillRule: "evenodd",
    d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(CheckCircleIcon);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ForwardRef);

/***/ }),

/***/ "./node_modules/@newfold/ui-component-library/node_modules/@heroicons/react/solid/esm/ExclamationCircleIcon.js":
/*!*********************************************************************************************************************!*\
  !*** ./node_modules/@newfold/ui-component-library/node_modules/@heroicons/react/solid/esm/ExclamationCircleIcon.js ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");


function ExclamationCircleIcon(props, svgRef) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fillRule: "evenodd",
    d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(ExclamationCircleIcon);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ForwardRef);

/***/ }),

/***/ "./node_modules/@newfold/ui-component-library/node_modules/@heroicons/react/solid/esm/ExclamationIcon.js":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/@newfold/ui-component-library/node_modules/@heroicons/react/solid/esm/ExclamationIcon.js ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");


function ExclamationIcon(props, svgRef) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fillRule: "evenodd",
    d: "M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(ExclamationIcon);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ForwardRef);

/***/ }),

/***/ "./node_modules/@newfold/ui-component-library/node_modules/@heroicons/react/solid/esm/InformationCircleIcon.js":
/*!*********************************************************************************************************************!*\
  !*** ./node_modules/@newfold/ui-component-library/node_modules/@heroicons/react/solid/esm/InformationCircleIcon.js ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");


function InformationCircleIcon(props, svgRef) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fillRule: "evenodd",
    d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(InformationCircleIcon);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ForwardRef);

/***/ }),

/***/ "./node_modules/classnames/index.js":
/*!******************************************!*\
  !*** ./node_modules/classnames/index.js ***!
  \******************************************/
/***/ ((module, exports) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = '';

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (arg) {
				classes = appendClass(classes, parseValue(arg));
			}
		}

		return classes;
	}

	function parseValue (arg) {
		if (typeof arg === 'string' || typeof arg === 'number') {
			return arg;
		}

		if (typeof arg !== 'object') {
			return '';
		}

		if (Array.isArray(arg)) {
			return classNames.apply(null, arg);
		}

		if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
			return arg.toString();
		}

		var classes = '';

		for (var key in arg) {
			if (hasOwn.call(arg, key) && arg[key]) {
				classes = appendClass(classes, key);
			}
		}

		return classes;
	}

	function appendClass (value, newClass) {
		if (!newClass) {
			return value;
		}
	
		if (value) {
			return value + ' ' + newClass;
		}
	
		return value + newClass;
	}

	if ( true && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else // removed by dead control flow
{}
}());


/***/ }),

/***/ "./node_modules/object-assign/index.js":
/*!*********************************************!*\
  !*** ./node_modules/object-assign/index.js ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ "./node_modules/prop-types/checkPropTypes.js":
/*!***************************************************!*\
  !*** ./node_modules/prop-types/checkPropTypes.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var printWarning = function() {};

if (true) {
  var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");
  var loggedTypeFailures = {};
  var has = __webpack_require__(/*! ./lib/has */ "./node_modules/prop-types/lib/has.js");

  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) { /**/ }
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (true) {
    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' +
              'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning(
            (componentName || 'React class') + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          );
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

/**
 * Resets warning cache when testing.
 *
 * @private
 */
checkPropTypes.resetWarningCache = function() {
  if (true) {
    loggedTypeFailures = {};
  }
}

module.exports = checkPropTypes;


/***/ }),

/***/ "./node_modules/prop-types/factoryWithTypeCheckers.js":
/*!************************************************************!*\
  !*** ./node_modules/prop-types/factoryWithTypeCheckers.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/react-is/index.js");
var assign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");

var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");
var has = __webpack_require__(/*! ./lib/has */ "./node_modules/prop-types/lib/has.js");
var checkPropTypes = __webpack_require__(/*! ./checkPropTypes */ "./node_modules/prop-types/checkPropTypes.js");

var printWarning = function() {};

if (true) {
  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bigint: createPrimitiveTypeChecker('bigint'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message, data) {
    this.message = message;
    this.data = data && typeof data === 'object' ? data: {};
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (true) {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
          err.name = 'Invariant Violation';
          throw err;
        } else if ( true && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            printWarning(
              'You are manually calling a React.PropTypes validation ' +
              'function for the `' + propFullName + '` prop on `' + componentName + '`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError(
          'Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'),
          {expectedType: expectedType}
        );
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!ReactIs.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      if (true) {
        if (arguments.length > 1) {
          printWarning(
            'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
            'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
          );
        } else {
          printWarning('Invalid argument supplied to oneOf, expected an array.');
        }
      }
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value);
        if (type === 'symbol') {
          return String(value);
        }
        return value;
      });
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (has(propValue, key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
       true ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : 0;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning(
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
        );
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      var expectedTypes = [];
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        var checkerResult = checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret);
        if (checkerResult == null) {
          return null;
        }
        if (checkerResult.data && has(checkerResult.data, 'expectedType')) {
          expectedTypes.push(checkerResult.data.expectedType);
        }
      }
      var expectedTypesMessage = (expectedTypes.length > 0) ? ', expected one of type [' + expectedTypes.join(', ') + ']': '';
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`' + expectedTypesMessage + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function invalidValidatorError(componentName, location, propFullName, key, type) {
    return new PropTypeError(
      (componentName || 'React class') + ': ' + location + ' type `' + propFullName + '.' + key + '` is invalid; ' +
      'it must be a function, usually from the `prop-types` package, but received `' + type + '`.'
    );
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (typeof checker !== 'function') {
          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (has(shapeTypes, key) && typeof checker !== 'function') {
          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
        }
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // falsy value can't be a Symbol
    if (!propValue) {
      return false;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),

/***/ "./node_modules/prop-types/index.js":
/*!******************************************!*\
  !*** ./node_modules/prop-types/index.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (true) {
  var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/react-is/index.js");

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(/*! ./factoryWithTypeCheckers */ "./node_modules/prop-types/factoryWithTypeCheckers.js")(ReactIs.isElement, throwOnDirectAccess);
} else // removed by dead control flow
{}


/***/ }),

/***/ "./node_modules/prop-types/lib/ReactPropTypesSecret.js":
/*!*************************************************************!*\
  !*** ./node_modules/prop-types/lib/ReactPropTypesSecret.js ***!
  \*************************************************************/
/***/ ((module) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),

/***/ "./node_modules/prop-types/lib/has.js":
/*!********************************************!*\
  !*** ./node_modules/prop-types/lib/has.js ***!
  \********************************************/
/***/ ((module) => {

module.exports = Function.call.bind(Object.prototype.hasOwnProperty);


/***/ }),

/***/ "./node_modules/react-is/cjs/react-is.development.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-is/cjs/react-is.development.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (true) {
  (function() {
'use strict';

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
// (unstable) APIs that have been removed. Can we remove the symbols?

var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
}

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;

    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_ASYNC_MODE_TYPE:
          case REACT_CONCURRENT_MODE_TYPE:
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
            return type;

          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;

              default:
                return $$typeof;
            }

        }

      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
} // AsyncMode is deprecated along with isAsyncMode

var AsyncMode = REACT_ASYNC_MODE_TYPE;
var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Lazy = REACT_LAZY_TYPE;
var Memo = REACT_MEMO_TYPE;
var Portal = REACT_PORTAL_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;
var Suspense = REACT_SUSPENSE_TYPE;
var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
    }
  }

  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
}
function isConcurrentMode(object) {
  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isLazy(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}
function isSuspense(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
}

exports.AsyncMode = AsyncMode;
exports.ConcurrentMode = ConcurrentMode;
exports.ContextConsumer = ContextConsumer;
exports.ContextProvider = ContextProvider;
exports.Element = Element;
exports.ForwardRef = ForwardRef;
exports.Fragment = Fragment;
exports.Lazy = Lazy;
exports.Memo = Memo;
exports.Portal = Portal;
exports.Profiler = Profiler;
exports.StrictMode = StrictMode;
exports.Suspense = Suspense;
exports.isAsyncMode = isAsyncMode;
exports.isConcurrentMode = isConcurrentMode;
exports.isContextConsumer = isContextConsumer;
exports.isContextProvider = isContextProvider;
exports.isElement = isElement;
exports.isForwardRef = isForwardRef;
exports.isFragment = isFragment;
exports.isLazy = isLazy;
exports.isMemo = isMemo;
exports.isPortal = isPortal;
exports.isProfiler = isProfiler;
exports.isStrictMode = isStrictMode;
exports.isSuspense = isSuspense;
exports.isValidElementType = isValidElementType;
exports.typeOf = typeOf;
  })();
}


/***/ }),

/***/ "./node_modules/react-is/index.js":
/*!****************************************!*\
  !*** ./node_modules/react-is/index.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (false) // removed by dead control flow
{} else {
  module.exports = __webpack_require__(/*! ./cjs/react-is.development.js */ "./node_modules/react-is/cjs/react-is.development.js");
}


/***/ }),

/***/ "./src/quick-add-product/ModalForm.js":
/*!********************************************!*\
  !*** ./src/quick-add-product/ModalForm.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ModalForm: () => (/* binding */ ModalForm)
/* harmony export */ });
/* harmony import */ var _newfold_ui_component_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @newfold/ui-component-library */ "./node_modules/@newfold/ui-component-library/elements/button/index.js");
/* harmony import */ var _newfold_ui_component_library__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @newfold/ui-component-library */ "./node_modules/@newfold/ui-component-library/components/root/index.js");
/* harmony import */ var _components_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/form */ "./src/quick-add-product/components/form/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _QuickAddProductModal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./QuickAddProductModal */ "./src/quick-add-product/QuickAddProductModal.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);





const ModalForm = () => {
  const [isOpen, setIsOpen] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_newfold_ui_component_library__WEBPACK_IMPORTED_MODULE_1__["default"], {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_newfold_ui_component_library__WEBPACK_IMPORTED_MODULE_0__["default"], {
      size: "small",
      onClick: () => setIsOpen(true),
      children: _x('Quick add product', 'Modal button label.', 'wp-module-ecommerce')
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_QuickAddProductModal__WEBPACK_IMPORTED_MODULE_4__.QuickAddProductModal, {
      isOpen: isOpen,
      onClose: () => setIsOpen(false)
    })]
  });
};

/***/ }),

/***/ "./src/quick-add-product/QuickAddProductModal.js":
/*!*******************************************************!*\
  !*** ./src/quick-add-product/QuickAddProductModal.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QuickAddProductModal: () => (/* binding */ QuickAddProductModal)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _newfold_ui_component_library__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @newfold/ui-component-library */ "./node_modules/@newfold/ui-component-library/components/modal/index.js");
/* harmony import */ var _components_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/form */ "./src/quick-add-product/components/form/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);





const QuickAddProductModal = ({
  isOpen: isOpenProp,
  onClose: onCloseProp,
  openAtRender = false,
  className
}) => {
  const isControlled = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => typeof isOpenProp === 'boolean', [isOpenProp]);
  const [internalOpen, setInternalOpen] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(openAtRender);
  const isOpen = isControlled ? isOpenProp : internalOpen;
  const setIsOpen = isControlled ? isOpening => isOpening ? null : onCloseProp?.() : setInternalOpen;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const handleOpenModal = () => setIsOpen(true);
    window.addEventListener('nfd-open-quick-add-product-modal', handleOpenModal);
    return () => window.removeEventListener('nfd-open-quick-add-product-modal', handleOpenModal);
  }, [setIsOpen]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_newfold_ui_component_library__WEBPACK_IMPORTED_MODULE_1__["default"], {
    isOpen: isOpen,
    onClose: () => setIsOpen(false),
    className: classnames__WEBPACK_IMPORTED_MODULE_3___default()('nfd-quick-add-product-modal', className),
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_newfold_ui_component_library__WEBPACK_IMPORTED_MODULE_1__["default"].Panel, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components_form__WEBPACK_IMPORTED_MODULE_2__.Form, {
        hasPreview: true,
        showTitle: true
      })
    })
  });
};

/***/ }),

/***/ "./src/quick-add-product/WidgetForm.js":
/*!*********************************************!*\
  !*** ./src/quick-add-product/WidgetForm.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WidgetForm: () => (/* binding */ WidgetForm)
/* harmony export */ });
/* harmony import */ var _newfold_ui_component_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @newfold/ui-component-library */ "./node_modules/@newfold/ui-component-library/components/root/index.js");
/* harmony import */ var _components_form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/form */ "./src/quick-add-product/components/form/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);



const WidgetForm = () => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_newfold_ui_component_library__WEBPACK_IMPORTED_MODULE_0__["default"], {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_components_form__WEBPACK_IMPORTED_MODULE_1__.Form, {})
  });
};

/***/ }),

/***/ "./src/quick-add-product/components/categories-field/CategoriesField.js":
/*!******************************************************************************!*\
  !*** ./src/quick-add-product/components/categories-field/CategoriesField.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _newfold_ui_component_library__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @newfold/ui-component-library */ "./node_modules/@newfold/ui-component-library/elements/label/index.js");
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../functions */ "./src/quick-add-product/functions.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);





const CategoriesField = ({
  id,
  label,
  onChange,
  name = ''
}) => {
  const [suggestions, setSuggestions] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [categories, setCategories] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [inputValue, setInputValue] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');

  // Load suggestions categories.
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    (async () => {
      const response = await (0,_functions__WEBPACK_IMPORTED_MODULE_3__.fetchCategories)();
      setSuggestions(response);
    })();
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (typeof onChange === "function") {
      onChange(categories);
    }
  }, [categories]);

  // Filter suggestions based on selected categories.
  const filteredSuggestions = suggestions.filter(s => s.name.toLowerCase().includes(inputValue.toLowerCase()) && !categories.includes(s));

  // Add category.
  const addCategory = category => {
    if (!categories.filter(cat => cat.id === category.id && cat.name === category.name).length) {
      setCategories([...categories, category]);
    }
    // Reset input value.
    setInputValue('');
  };

  // Remove category.
  const removeCategory = categoryToRemove => {
    setCategories(categories.filter(category => category !== categoryToRemove));
  };
  const handleKeyDown = event => {
    let value = inputValue.trim();
    if ('Enter' === event.key) {
      event.preventDefault();
      if (value) {
        addCategory((0,_functions__WEBPACK_IMPORTED_MODULE_3__.prepareCategoryObject)({
          name: value
        }));
      }
    } else if ('Backspace' === event.key && !value && categories) {
      removeCategory(categories.at(-1));
    }
  };
  const handleBlur = event => {
    let value = inputValue.trim();
    if ('nfd-tag-input-suggestion' === event.relatedTarget?.className || !value) {
      return false;
    }
    addCategory((0,_functions__WEBPACK_IMPORTED_MODULE_3__.prepareCategoryObject)({
      name: value
    }));
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
    className: "nfd-quick-add-product__categories-field",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      className: "nfd-flex nfd-items-center nfd-mb-2",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_newfold_ui_component_library__WEBPACK_IMPORTED_MODULE_2__["default"], {
        htmlFor: id,
        label: label
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
      className: "nfd-tag-input nfd-tag-field__input",
      children: [categories.map(category => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("span", {
        className: "nfd-badge nfd-badge--plain nfd-tag-input__tag",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
          className: "nfd-mb-px",
          children: category.name
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("button", {
          className: "nfd-tag-input__remove-tag",
          onClick: () => removeCategory(category),
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 20 20",
            fill: "currentColor",
            "aria-hidden": "true",
            className: "nfd-h-3 nfd-w-3",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("path", {
              fillRule: "evenodd",
              d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
              clipRule: "evenodd"
            })
          })
        })]
      }, category.name)), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("input", {
        type: "text",
        className: "nfd-tag-input__input",
        id: "tag-field-label",
        value: inputValue,
        onChange: e => setInputValue(e.target.value),
        onKeyDown: handleKeyDown,
        onBlur: handleBlur
      })]
    }), inputValue && filteredSuggestions.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("ul", {
      className: "nfd-tag-input-suggestions",
      children: filteredSuggestions.map(sugg => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("li", {
        className: "nfd-tag-input-suggestion",
        tabIndex: 0,
        onClick: () => addCategory(sugg),
        children: sugg.name
      }, sugg.name))
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("input", {
      type: "hidden",
      id: id,
      name: name || id,
      value: JSON.stringify(categories)
    })]
  });
};
CategoriesField.propTypes = {
  id: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string).isRequired,
  label: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string).isRequired,
  name: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string),
  onChange: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CategoriesField);

/***/ }),

/***/ "./src/quick-add-product/components/categories-field/index.js":
/*!********************************************************************!*\
  !*** ./src/quick-add-product/components/categories-field/index.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CategoriesField: () => (/* reexport safe */ _CategoriesField__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _CategoriesField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CategoriesField */ "./src/quick-add-product/components/categories-field/CategoriesField.js");



/***/ }),

/***/ "./src/quick-add-product/components/form/Form.js":
/*!*******************************************************!*\
  !*** ./src/quick-add-product/components/form/Form.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Form: () => (/* binding */ Form)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _newfold_ui_component_library__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @newfold/ui-component-library */ "./node_modules/@newfold/ui-component-library/elements/button/index.js");
/* harmony import */ var _newfold_ui_component_library__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @newfold/ui-component-library */ "./node_modules/@newfold/ui-component-library/elements/title/index.js");
/* harmony import */ var _newfold_ui_component_library__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @newfold/ui-component-library */ "./node_modules/@newfold/ui-component-library/components/text-field/index.js");
/* harmony import */ var _newfold_ui_component_library__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @newfold/ui-component-library */ "./node_modules/@newfold/ui-component-library/components/textarea-field/index.js");
/* harmony import */ var _price_field__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../price-field */ "./src/quick-add-product/components/price-field/index.js");
/* harmony import */ var _categories_field__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../categories-field */ "./src/quick-add-product/components/categories-field/index.js");
/* harmony import */ var _image_field__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../image-field */ "./src/quick-add-product/components/image-field/index.js");
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../functions */ "./src/quick-add-product/functions.js");
/* harmony import */ var _FormResponse__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./FormResponse */ "./src/quick-add-product/components/form/FormResponse.js");
/* harmony import */ var _FormPreview__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./FormPreview */ "./src/quick-add-product/components/form/FormPreview.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__);










const Form = ({
  hasPreview = false,
  showTitle = false,
  title = ''
}) => {
  const [formData, setFormData] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({});
  const [submitResponse, setSubmitResponse] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const formSubmit = async ev => {
    ev.preventDefault();
    setLoading(true);
    try {
      const product = await (0,_functions__WEBPACK_IMPORTED_MODULE_9__.createProduct)(formData);
      setSubmitResponse(product);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };
  const updateFormData = (key, value) => {
    setFormData(oldData => ({
      ...oldData,
      [key]: value
    }));
  };
  const resetForm = () => {
    setFormData({});
    setSubmitResponse(null);
  };
  if (submitResponse) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_FormResponse__WEBPACK_IMPORTED_MODULE_10__.FormResponse, {
      product: submitResponse,
      resetFormCallback: resetForm
    });
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("div", {
      id: "nfd-quick-add-product__form-wrapper",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("div", {
        className: "nfd-quick-add-product__form",
        children: [showTitle && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_newfold_ui_component_library__WEBPACK_IMPORTED_MODULE_3__["default"], {
          as: "h2",
          size: "2",
          children: title || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__._x)('Quick Add Product', 'Quick add product modal title', 'wp-module-ecommerce')
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("form", {
          method: "POST",
          onSubmit: formSubmit,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("div", {
            className: "nfd-quick-add-product__form-field",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_newfold_ui_component_library__WEBPACK_IMPORTED_MODULE_4__["default"], {
              id: "product-name",
              name: "name",
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__._x)('Product Name', 'Quick Add Product form field label.', 'wp-module-ecommerce'),
              required: true,
              labelRequiredIndicator: true,
              onChange: e => updateFormData('name', e.target.value)
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("div", {
            className: "nfd-quick-add-product__form-field",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_price_field__WEBPACK_IMPORTED_MODULE_6__.PriceField, {
              id: "product-price",
              name: "regular_price",
              label: (0,_functions__WEBPACK_IMPORTED_MODULE_9__.decodeEntities)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__._x)('Price (%s)', 'Quick Add Product form field label. %s is the currency symbol.', 'wp-module-ecommerce'), quickAddProduct.money.currencySymbol)),
              required: true,
              onChange: price => updateFormData('regular_price', price)
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("div", {
            className: "nfd-quick-add-product__form-field",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_newfold_ui_component_library__WEBPACK_IMPORTED_MODULE_5__["default"], {
              id: "product-description",
              name: "short_description",
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__._x)('Description', 'Quick Add Product form field label.', 'wp-module-ecommerce'),
              rows: 4,
              onChange: e => updateFormData('short_description', e.target.value)
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("div", {
            className: "nfd-quick-add-product__form-field",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_categories_field__WEBPACK_IMPORTED_MODULE_7__.CategoriesField, {
              id: "product-categories",
              name: "categories",
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__._x)('Categories', 'Quick Add Product form field label.', 'wp-module-ecommerce'),
              onChange: categories => updateFormData('categories', categories)
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("div", {
            className: "nfd-quick-add-product__form-field",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_image_field__WEBPACK_IMPORTED_MODULE_8__.ImageField, {
              id: "product-image",
              name: "images",
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__._x)('Image', 'Quick Add Product form field label.', 'wp-module-ecommerce'),
              onChange: images => updateFormData('images', images)
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("div", {
            className: "nfd-quick-add-product__form-submit",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_newfold_ui_component_library__WEBPACK_IMPORTED_MODULE_2__["default"], {
              type: "submit",
              disabled: loading || !(formData?.name && formData?.regular_price),
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__._x)('Add product', 'Quick Add Product form submit button label', 'wp-module-ecommerce')
            })
          })]
        })]
      }), hasPreview && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_FormPreview__WEBPACK_IMPORTED_MODULE_11__.FormPreview, {
        data: formData
      })]
    })
  });
};

/***/ }),

/***/ "./src/quick-add-product/components/form/FormPreview.js":
/*!**************************************************************!*\
  !*** ./src/quick-add-product/components/form/FormPreview.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FormPreview: () => (/* binding */ FormPreview)
/* harmony export */ });
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../functions */ "./src/quick-add-product/functions.js");
/* harmony import */ var _newfold_ui_component_library__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @newfold/ui-component-library */ "./node_modules/@newfold/ui-component-library/elements/button/index.js");
/* harmony import */ var _images_placeholder_jpg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../images/placeholder.jpg */ "./src/quick-add-product/images/placeholder.jpg");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);




const FormPreview = ({
  data
}) => {
  const image = data?.images?.[0]?.url || _images_placeholder_jpg__WEBPACK_IMPORTED_MODULE_2__;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
      className: "nfd-quick-add-product__form-preview",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
        className: "nfd-quick-add-product__form-preview-product",
        children: [image && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
          className: "nfd-quick-add-product__form-preview-product-image",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("img", {
            src: image,
            alt: ""
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
          className: "nfd-quick-add-product__form-preview-product-summary",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
            className: "nfd-quick-add-product__form-preview-product-title",
            children: data?.name ? (0,_functions__WEBPACK_IMPORTED_MODULE_0__.decodeEntities)(data.name) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
              className: "nfd-quick-add-product__form-preview-placeholder"
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
            className: "nfd-quick-add-product__form-preview-product-price",
            children: data?.regular_price ? (0,_functions__WEBPACK_IMPORTED_MODULE_0__.formatPrice)(data.regular_price) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
              className: "nfd-quick-add-product__form-preview-placeholder"
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
            className: "nfd-quick-add-product__form-preview-product-description",
            children: data?.short_description ? (0,_functions__WEBPACK_IMPORTED_MODULE_0__.decodeEntities)(data.short_description.slice(0, 150)) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
                className: "nfd-quick-add-product__form-preview-placeholder"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
                className: "nfd-quick-add-product__form-preview-placeholder"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
                className: "nfd-quick-add-product__form-preview-placeholder"
              })]
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
            className: "nfd-quick-add-product__form-preview-product-add-to-cart",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_newfold_ui_component_library__WEBPACK_IMPORTED_MODULE_1__["default"], {
              size: "small",
              children: "Add to cart"
            })
          })]
        })]
      })
    })
  });
};

/***/ }),

/***/ "./src/quick-add-product/components/form/FormResponse.js":
/*!***************************************************************!*\
  !*** ./src/quick-add-product/components/form/FormResponse.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FormResponse: () => (/* binding */ FormResponse)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _newfold_ui_component_library__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @newfold/ui-component-library */ "./node_modules/@newfold/ui-component-library/elements/button/index.js");
/* harmony import */ var _images_placeholder_jpg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../images/placeholder.jpg */ "./src/quick-add-product/images/placeholder.jpg");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);




const FormResponse = ({
  product,
  resetFormCallback
}) => {
  // Get featured image from product.
  const image = product?.images?.shift()?.src || _images_placeholder_jpg__WEBPACK_IMPORTED_MODULE_2__;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      id: "nfd-quick-add-product__response",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
        className: "nfd-quick-add-product__response-data",
        children: [image && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
          className: "nfd-quick-add-product__response-image",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("img", {
            src: image,
            alt: ""
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("svg", {
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("path", {
                d: "M12.1953 4.19526C12.4556 3.93491 12.8777 3.93491 13.1381 4.19526C13.3784 4.43558 13.3969 4.81374 13.1935 5.07527L13.1381 5.13807L6.47139 11.8047C6.23107 12.0451 5.85292 12.0635 5.59139 11.8602L5.52859 11.8047L2.86192 9.13807C2.60157 8.87772 2.60157 8.45561 2.86192 8.19526C3.10224 7.95494 3.4804 7.93645 3.74192 8.1398L3.80473 8.19526L5.99999 10.39L12.1953 4.19526Z",
                fill: "#ffffff"
              })
            })
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
          className: "nfd-quick-add-product__response-details",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
            className: "nfd-quick-add-product__response-product-name",
            children: product.name
          }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('added to your product catalog.', 'wp-module-ecommerce'), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("a", {
            href: product.permalink,
            title: product.name,
            target: "_blank",
            className: "nfd-quick-add-product__response-product-permalink",
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('View product', 'wp-module-ecommerce')
          })]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_newfold_ui_component_library__WEBPACK_IMPORTED_MODULE_1__["default"], {
        as: "a",
        variant: "secondary",
        href: product.edit_url,
        target: "_blank",
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Edit product details', 'wp-module-ecommerce')
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_newfold_ui_component_library__WEBPACK_IMPORTED_MODULE_1__["default"], {
        onClick: resetFormCallback,
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Add another product', 'wp-module-ecommerce')
      })]
    })
  });
};

/***/ }),

/***/ "./src/quick-add-product/components/form/index.js":
/*!********************************************************!*\
  !*** ./src/quick-add-product/components/form/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Form: () => (/* reexport safe */ _Form__WEBPACK_IMPORTED_MODULE_0__.Form)
/* harmony export */ });
/* harmony import */ var _Form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Form */ "./src/quick-add-product/components/form/Form.js");



/***/ }),

/***/ "./src/quick-add-product/components/image-field/ImageField.js":
/*!********************************************************************!*\
  !*** ./src/quick-add-product/components/image-field/ImageField.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _newfold_ui_component_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @newfold/ui-component-library */ "./node_modules/@newfold/ui-component-library/elements/label/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);





const ImageField = ({
  id,
  label,
  onChange,
  name = ''
}) => {
  const [images, setImages] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (typeof onChange === "function") {
      onChange(images);
    }
  }, [images]);

  // Init frame.
  const mediaFrame = wp?.media({
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Set product image', 'wp-module-ecommerce'),
    button: {
      text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Use as product image', 'wp-module-ecommerce')
    },
    multiple: false // Set to true to allow multiple files to be selected
  });

  // Listen frame image selection.
  mediaFrame?.on('select', () => setImages([...images, mediaFrame.state().get('selection').first().toJSON()]));

  // Open frame.
  const openMediaFrame = event => {
    event.preventDefault();
    mediaFrame?.open();
  };

  // Remove image.
  const removeImage = image_id => {
    setImages(images.filter(image => image.id !== image_id));
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
      className: "nfd-quick-add-product__image-field",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
        className: "nfd-flex nfd-items-center nfd-mb-2",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_newfold_ui_component_library__WEBPACK_IMPORTED_MODULE_0__["default"], {
          htmlFor: id,
          label: label
        })
      }), images.length ? images.map(image => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
        className: "nfd-quick-add-product__image-preview",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("img", {
          src: image.url,
          alt: image.alt
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("button", {
          className: "nfd-quick-add-product__image-remove",
          onClick: () => removeImage(image.id),
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 20 20",
            fill: "currentColor",
            "aria-hidden": "true",
            className: "nfd-h-3 nfd-w-3",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("path", {
              fillRule: "evenodd",
              d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
              clipRule: "evenodd"
            })
          })
        })]
      }, image.id)) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
        className: "nfd-quick-add-product__image-uploader",
        onClick: openMediaFrame,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("svg", {
          version: "1.1",
          viewBox: "0 0 64 64",
          xmlns: "http://www.w3.org/2000/svg",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("g", {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("g", {
              transform: "translate(278.000000, 232.000000)",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("path", {
                d: "M-226.2-181.6h-39.5c-2.3,0-4.2-1.9-4.2-4.2v-28.2c0-2.3,1.9-4.2,4.2-4.2h39.5c2.3,0,4.2,1.9,4.2,4.2v28.2C-222-183.5-223.9-181.6-226.2-181.6L-226.2-181.6z M-265.8-215.5c-0.8,0-1.4,0.6-1.4,1.4v28.2c0,0.8,0.6,1.4,1.4,1.4h39.5c0.8,0,1.4-0.6,1.4-1.4v-28.2c0-0.8-0.6-1.4-1.4-1.4H-265.8L-265.8-215.5z"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("path", {
                d: "M-238.9-201.5c-3.1,0-5.5-2.5-5.5-5.5s2.5-5.5,5.5-5.5s5.5,2.5,5.5,5.5S-235.9-201.5-238.9-201.5L-238.9-201.5z M-238.9-210c-1.6,0-2.9,1.3-2.9,2.9c0,1.6,1.3,2.9,2.9,2.9c1.6,0,2.9-1.3,2.9-2.9C-236-208.7-237.3-210-238.9-210L-238.9-210z"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("polyline", {
                points: "-231.4,-182.1 -254.5,-203.8 -267.7,-191.6 -269.5,-193.5 -254.5,-207.4 -229.6,-184 -231.4,-182.1"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("polyline", {
                points: "-224.2,-189.3 -231.9,-195.5 -238.3,-190.2 -240,-192.3 -231.9,-198.9 -222.6,-191.3 -224.2,-189.3"
              })]
            })
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Set product image', 'wp-module-ecommerce')
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("input", {
        type: "hidden",
        id: id,
        name: name || id,
        value: JSON.stringify(images)
      })]
    })
  });
};
ImageField.propTypes = {
  id: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string).isRequired,
  label: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string).isRequired,
  name: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
  onChange: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ImageField);

/***/ }),

/***/ "./src/quick-add-product/components/image-field/index.js":
/*!***************************************************************!*\
  !*** ./src/quick-add-product/components/image-field/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ImageField: () => (/* reexport safe */ _ImageField__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _ImageField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ImageField */ "./src/quick-add-product/components/image-field/ImageField.js");



/***/ }),

/***/ "./src/quick-add-product/components/price-field/PriceField.js":
/*!********************************************************************!*\
  !*** ./src/quick-add-product/components/price-field/PriceField.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _newfold_ui_component_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @newfold/ui-component-library */ "./node_modules/@newfold/ui-component-library/components/text-field/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../functions */ "./src/quick-add-product/functions.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);





const PriceField = ({
  id,
  label,
  onChange,
  name = '',
  required = false
}) => {
  const [price, setPrice] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (typeof onChange === "function") {
      onChange(price);
    }
  }, [price]);
  const validatePrice = event => {
    setPrice((0,_functions__WEBPACK_IMPORTED_MODULE_3__.formatNumber)(event.target.value));
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_newfold_ui_component_library__WEBPACK_IMPORTED_MODULE_0__["default"], {
    id: id,
    name: name || id,
    label: label,
    required: required,
    labelRequiredIndicator: required,
    onChange: validatePrice,
    value: price
  });
};
PriceField.propTypes = {
  id: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string).isRequired,
  label: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string).isRequired,
  onChange: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func),
  name: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
  required: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PriceField);

/***/ }),

/***/ "./src/quick-add-product/components/price-field/index.js":
/*!***************************************************************!*\
  !*** ./src/quick-add-product/components/price-field/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PriceField: () => (/* reexport safe */ _PriceField__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _PriceField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PriceField */ "./src/quick-add-product/components/price-field/PriceField.js");



/***/ }),

/***/ "./src/quick-add-product/functions.js":
/*!********************************************!*\
  !*** ./src/quick-add-product/functions.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createProduct: () => (/* binding */ createProduct),
/* harmony export */   decodeEntities: () => (/* binding */ decodeEntities),
/* harmony export */   fetchCategories: () => (/* binding */ fetchCategories),
/* harmony export */   formatNumber: () => (/* binding */ formatNumber),
/* harmony export */   formatPrice: () => (/* binding */ formatPrice),
/* harmony export */   prepareCategoryObject: () => (/* binding */ prepareCategoryObject)
/* harmony export */ });
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__);

const createProduct = async data => {
  return await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: '/newfold-ecommerce/v1/product',
    method: 'POST',
    data: data
  });
};
const fetchCategories = async () => {
  let categories = [];
  try {
    categories = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
      path: '/wc/v3/products/categories',
      method: 'GET'
    });
    categories = categories?.map(prepareCategoryObject);
  } catch (error) {
    console.error(error);
  }
  return categories;
};
const prepareCategoryObject = category => {
  return {
    id: category?.id || 0,
    slug: category?.slug || '',
    name: category.name
  };
};
const formatNumber = number => {
  let formattedNumber = number.replace(new RegExp('[^0-9\\' + quickAddProduct.money.decimalSeparator + ']+', 'gi'), '');

  // Keep only the first decimal separator.
  let dotIndex = formattedNumber.indexOf('.');
  if (-1 !== dotIndex) {
    // Decimal separator could not be the first char.
    if (0 === dotIndex) {
      formattedNumber = formattedNumber.replace(new RegExp('[\\' + quickAddProduct.money.decimalSeparator + ']+', 'gi'), '');
    } else {
      // Include first decimal separator.
      ++dotIndex;
      formattedNumber = formattedNumber.slice(0, dotIndex) + formattedNumber.slice(dotIndex, dotIndex + quickAddProduct.money.decimals).replace(new RegExp('[\\' + quickAddProduct.money.decimalSeparator + ']+', 'gi'), '');
    }
  }
  return formattedNumber;
};
const formatPrice = price => {
  return decodeEntities(accounting.formatMoney(price, {
    symbol: quickAddProduct.money.currencySymbol,
    decimal: quickAddProduct.money.decimalSeparator,
    thousand: quickAddProduct.money.thousandSeparator,
    precision: quickAddProduct.money.decimals
  }));
};
const decodeEntities = encodedString => {
  const tmp = document.createElement('DIV');
  tmp.innerHTML = encodedString;
  return tmp.textContent || tmp.innerText || '';
};

/***/ }),

/***/ "./src/quick-add-product/images/placeholder.jpg":
/*!******************************************************!*\
  !*** ./src/quick-add-product/images/placeholder.jpg ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "images/placeholder.a866b7a2.jpg";

/***/ }),

/***/ "./src/quick-add-product/tailwind.pcss":
/*!*********************************************!*\
  !*** ./src/quick-add-product/tailwind.pcss ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["apiFetch"];

/***/ }),

/***/ "@wordpress/dom-ready":
/*!**********************************!*\
  !*** external ["wp","domReady"] ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["domReady"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = window["lodash"];

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = window["React"];

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = window["ReactDOM"];

/***/ }),

/***/ "react/jsx-runtime":
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = window["ReactJSXRuntime"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; (typeof current == 'object' || typeof current == 'function') && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/^blob:/, "").replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl + "../";
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!****************************************!*\
  !*** ./src/quick-add-product/index.js ***!
  \****************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tailwind_pcss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tailwind.pcss */ "./src/quick-add-product/tailwind.pcss");
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/dom-ready */ "@wordpress/dom-ready");
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _QuickAddProductModal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./QuickAddProductModal */ "./src/quick-add-product/QuickAddProductModal.js");
/* harmony import */ var _ModalForm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ModalForm */ "./src/quick-add-product/ModalForm.js");
/* harmony import */ var _WidgetForm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./WidgetForm */ "./src/quick-add-product/WidgetForm.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__);







const ROOT_MODAL_FORM_ID = 'nfd-quick-add-product-modal';
const ROOT_WIDGET_FORM_ID = 'nfd-quick-add-product-widget';
const ROOT_QUICK_ADD_PRODUCT_MODAL_ID = 'nfd-quick-add-product-modal-only';
const initQuickAddProductModal = () => {
  const quickAddProductModalRoot = document.getElementById(ROOT_QUICK_ADD_PRODUCT_MODAL_ID);
  const renderedClass = `${ROOT_QUICK_ADD_PRODUCT_MODAL_ID}--rendered`;
  if (!quickAddProductModalRoot || quickAddProductModalRoot.classList.contains(renderedClass)) {
    return;
  }
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createRoot)(quickAddProductModalRoot).render(/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_QuickAddProductModal__WEBPACK_IMPORTED_MODULE_3__.QuickAddProductModal, {
    openAtRender: true
  }));
  quickAddProductModalRoot.classList.add(renderedClass);
};
_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1___default()(() => {
  // RENDER WIDGET
  const widgetRoot = document.getElementById(ROOT_WIDGET_FORM_ID);
  if (null !== widgetRoot) {
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createRoot)(widgetRoot).render(/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_WidgetForm__WEBPACK_IMPORTED_MODULE_5__.WidgetForm, {}));
  }

  // RENDER MODAL
  // Add root elem for modal button.
  const modalRootElem = document.createElement('div');
  modalRootElem.setAttribute('id', ROOT_MODAL_FORM_ID);
  // Look for product actions and append root.
  const productActions = document.querySelectorAll('.edit-php.post-type-product .page-title-action');
  if (productActions) {
    const lastProductAction = productActions[productActions.length - 1];
    lastProductAction?.after(modalRootElem);
  }

  // Look for root elem.
  const modalRoot = document.getElementById(ROOT_MODAL_FORM_ID);
  if (null !== modalRoot) {
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createRoot)(modalRoot).render(/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_ModalForm__WEBPACK_IMPORTED_MODULE_4__.ModalForm, {}));
  }
  window.addEventListener('nfd-open-quick-add-product-modal', initQuickAddProductModal);
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map