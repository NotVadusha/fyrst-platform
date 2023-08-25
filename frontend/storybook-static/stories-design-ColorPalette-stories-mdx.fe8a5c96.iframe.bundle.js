/*! For license information please see stories-design-ColorPalette-stories-mdx.fe8a5c96.iframe.bundle.js.LICENSE.txt */
(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[438],{"./node_modules/@mdx-js/react/lib/index.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,{NF:function(){return withMDXComponents},Zo:function(){return MDXProvider},ah:function(){return useMDXComponents},pC:function(){return MDXContext}});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({});function withMDXComponents(Component){return function boundMDXComponent(props){const allComponents=useMDXComponents(props.components);return react__WEBPACK_IMPORTED_MODULE_0__.createElement(Component,{...props,allComponents:allComponents})}}function useMDXComponents(components){const contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((()=>"function"==typeof components?components(contextComponents):{...contextComponents,...components}),[contextComponents,components])}const emptyObject={};function MDXProvider({components:components,children:children,disableParentContext:disableParentContext}){let allComponents;return allComponents=disableParentContext?"function"==typeof components?components({}):components||emptyObject:useMDXComponents(components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},children)}},"./src/stories/design/ColorPalette.stories.mdx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__page:function(){return __page}});__webpack_require__("./node_modules/react/index.js");var _storybook_addon_essentials_docs_mdx_react_shim__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@mdx-js/react/lib/index.js"),_storybook_blocks__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs"),_tailwind_config_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./tailwind.config.js"),_tailwind_config_js__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(_tailwind_config_js__WEBPACK_IMPORTED_MODULE_1__),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/jsx-runtime.js");function _createMdxContent(props){const _components=Object.assign({h1:"h1",p:"p",h2:"h2"},(0,_storybook_addon_essentials_docs_mdx_react_shim__WEBPACK_IMPORTED_MODULE_3__.ah)(),props.components);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_4__.h_,{title:"Design/ColorPalette"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_components.h1,{id:"color-palette",children:"Color Palette"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_components.p,{children:"This document provides an overview of the color palette used in our design system."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_components.h2,{id:"components-colors",children:"Components Colors"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_4__.VZ,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_4__.c6,{title:"Field",subtitle:"Color of the field component",colors:{field:_tailwind_config_js__WEBPACK_IMPORTED_MODULE_1___default().theme.colors.field}}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_4__.c6,{title:"Inactive",subtitle:"Color of the inactive component",colors:{inactive:_tailwind_config_js__WEBPACK_IMPORTED_MODULE_1___default().theme.colors.inactive}}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_4__.c6,{title:"Placeholder",subtitle:"Color of the placeholder component",colors:{placeholder:_tailwind_config_js__WEBPACK_IMPORTED_MODULE_1___default().theme.colors.placeholder}}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_4__.c6,{title:"Hover",subtitle:"Color of component hovering",colors:{hover:_tailwind_config_js__WEBPACK_IMPORTED_MODULE_1___default().theme.colors.hover}})]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_components.h2,{id:"basic-colors",children:"Basic Colors"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_4__.VZ,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_4__.c6,{title:"Transparent",colors:{transparent:_tailwind_config_js__WEBPACK_IMPORTED_MODULE_1___default().theme.colors.transparent}}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_4__.c6,{title:"Grey",subtitle:"Main grey shades",colors:{grey:_tailwind_config_js__WEBPACK_IMPORTED_MODULE_1___default().theme.colors.grey,"dark-grey":_tailwind_config_js__WEBPACK_IMPORTED_MODULE_1___default().theme.colors["dark-grey"]}}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_4__.c6,{title:"Black",colors:{black:_tailwind_config_js__WEBPACK_IMPORTED_MODULE_1___default().theme.colors.black}}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_4__.c6,{title:"Background",colors:{background:_tailwind_config_js__WEBPACK_IMPORTED_MODULE_1___default().theme.colors.background}}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_4__.c6,{title:"Green",subtitle:"Main green shades",colors:{green:_tailwind_config_js__WEBPACK_IMPORTED_MODULE_1___default().theme.colors.green,"green-2":_tailwind_config_js__WEBPACK_IMPORTED_MODULE_1___default().theme.colors["green-2"]}}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_4__.c6,{title:"Blue",subtitle:"Main blue shades",colors:{blue:_tailwind_config_js__WEBPACK_IMPORTED_MODULE_1___default().theme.colors.blue,"dark-blue":_tailwind_config_js__WEBPACK_IMPORTED_MODULE_1___default().theme.colors["dark-blue"]}}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_4__.c6,{title:"Orange",colors:{orange:_tailwind_config_js__WEBPACK_IMPORTED_MODULE_1___default().theme.colors.orange}}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_4__.c6,{title:"Red",subtitle:"Main red shades",colors:{red:_tailwind_config_js__WEBPACK_IMPORTED_MODULE_1___default().theme.colors.red,"red-2":_tailwind_config_js__WEBPACK_IMPORTED_MODULE_1___default().theme.colors["red-2"]}}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_4__.c6,{title:"White",colors:{white:_tailwind_config_js__WEBPACK_IMPORTED_MODULE_1___default().theme.colors.white}})]})]})}const __page=()=>{throw new Error("Docs-only story")};__page.parameters={docsOnly:!0};const componentMeta={title:"Design/ColorPalette",tags:["stories-mdx"],includeStories:["__page"]};componentMeta.parameters=componentMeta.parameters||{},componentMeta.parameters.docs={...componentMeta.parameters.docs||{},page:function MDXContent(props={}){const{wrapper:MDXLayout}=Object.assign({},(0,_storybook_addon_essentials_docs_mdx_react_shim__WEBPACK_IMPORTED_MODULE_3__.ah)(),props.components);return MDXLayout?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(MDXLayout,{...props,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_createMdxContent,{...props})}):_createMdxContent(props)}},__webpack_exports__.default=componentMeta},"./node_modules/react/cjs/react-jsx-runtime.production.min.js":function(__unused_webpack_module,exports,__webpack_require__){"use strict";__webpack_require__("./node_modules/object-assign/index.js");var f=__webpack_require__("./node_modules/react/index.js"),g=60103;if(exports.Fragment=60107,"function"==typeof Symbol&&Symbol.for){var h=Symbol.for;g=h("react.element"),exports.Fragment=h("react.fragment")}var m=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,n=Object.prototype.hasOwnProperty,p={key:!0,ref:!0,__self:!0,__source:!0};function q(c,a,k){var b,d={},e=null,l=null;for(b in void 0!==k&&(e=""+k),void 0!==a.key&&(e=""+a.key),void 0!==a.ref&&(l=a.ref),a)n.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:g,type:c,key:e,ref:l,props:d,_owner:m.current}}exports.jsx=q,exports.jsxs=q},"./node_modules/react/jsx-runtime.js":function(module,__unused_webpack_exports,__webpack_require__){"use strict";module.exports=__webpack_require__("./node_modules/react/cjs/react-jsx-runtime.production.min.js")},"./tailwind.config.js":function(module){module.exports={content:["./src/**/*.{js,jsx,ts,tsx}","./public/index.html"],darkMode:"media",theme:{extend:{spacing:{128:"32rem"},maxWidth:{inputs:"15.625rem"},keyframes:{spinAround:{"0%":{transform:"rotate(0deg) translate(2rem)"},"100%":{transform:"rotate(360deg) translate(2rem)"}},spinAroundSm:{"0%":{transform:"rotate(0deg) translate(1.5rem)"},"100%":{transform:"rotate(360deg) translate(1.5rem)"}},spinAroundLg:{"0%":{transform:"rotate(0deg) translate(3rem)"},"100%":{transform:"rotate(360deg) translate(3rem)"}}},fontSize:{xs:"0.625rem",h1:"4rem",h2:"3rem",h3:"2.25rem",h4:"1.875rem",h5:"1.5rem",h6:"1.25rem","body-large":"1.125rem","body-default":"1rem","body-small":"0.875rem",line:"0.875rem",field:"0.8125rem",placeholder:"0.625rem"},boxShadow:{dropdown:"0px 4px 16px rgba(0, 0, 0, 0.10)",header:"9px 4px 18px rgba(0, 0, 0, 0.10);"}},colors:{transparent:"#00000000",grey:"#BCC3CE","dark-grey":"#4C5767",field:"#DBDBDB",inactive:"#DAE0E7",placeholder:"#BCC3CE",black:"#202020",background:"#FAFAFA","green-2":"#26C485",blue:"#083D77",green:"#1B9AAA",orange:"#F87060",red:"#BB1128",white:"#FFFFFF","dark-blue":"#052D58",hover:"#17569C","red-2":"#F0544F","input-disabled":"#F5F5F5"}},variants:{extend:{}},plugins:[]}}}]);