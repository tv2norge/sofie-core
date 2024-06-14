"use strict";(self.webpackChunksofie_documentation=self.webpackChunksofie_documentation||[]).push([[4993],{5318:(e,t,a)=>{a.d(t,{Zo:()=>u,kt:()=>m});var r=a(7378);function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function n(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?n(Object(a),!0).forEach((function(t){i(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):n(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,r,i=function(e,t){if(null==e)return{};var a,r,i={},n=Object.keys(e);for(r=0;r<n.length;r++)a=n[r],t.indexOf(a)>=0||(i[a]=e[a]);return i}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(r=0;r<n.length;r++)a=n[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(i[a]=e[a])}return i}var c=r.createContext({}),p=function(e){var t=r.useContext(c),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},u=function(e){var t=p(e.components);return r.createElement(c.Provider,{value:t},e.children)},l="mdxType",f={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var a=e.components,i=e.mdxType,n=e.originalType,c=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),l=p(a),d=i,m=l["".concat(c,".").concat(d)]||l[d]||f[d]||n;return a?r.createElement(m,o(o({ref:t},u),{},{components:a})):r.createElement(m,o({ref:t},u))}));function m(e,t){var a=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var n=a.length,o=new Array(n);o[0]=d;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s[l]="string"==typeof e?e:i,o[1]=s;for(var p=2;p<n;p++)o[p]=a[p];return r.createElement.apply(null,o)}return r.createElement.apply(null,a)}d.displayName="MDXCreateElement"},7237:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>f,frontMatter:()=>n,metadata:()=>s,toc:()=>p});var r=a(5773),i=(a(7378),a(5318));const n={sidebar_position:10},o="API",s={unversionedId:"user-guide/features/api",id:"user-guide/features/api",title:"API",description:"Sofie User Actions REST API",source:"@site/docs/user-guide/features/api.md",sourceDirName:"user-guide/features",slug:"/user-guide/features/api",permalink:"/sofie-core/docs/user-guide/features/api",draft:!1,editUrl:"https://github.com/nrkno/sofie-core/edit/master/packages/documentation/docs/user-guide/features/api.md",tags:[],version:"current",sidebarPosition:10,frontMatter:{sidebar_position:10},sidebar:"userGuide",previous:{title:"Language",permalink:"/sofie-core/docs/user-guide/features/language"},next:{title:"System Health",permalink:"/sofie-core/docs/user-guide/features/system-health"}},c={},p=[{value:"Sofie User Actions REST API",id:"sofie-user-actions-rest-api",level:2},{value:"Sofie Live Status Gateway",id:"sofie-live-status-gateway",level:2},{value:"DDP \u2013 Core Integration",id:"ddp--core-integration",level:2}],u={toc:p},l="wrapper";function f(e){let{components:t,...a}=e;return(0,i.kt)(l,(0,r.Z)({},u,a,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"api"},"API"),(0,i.kt)("h2",{id:"sofie-user-actions-rest-api"},"Sofie User Actions REST API"),(0,i.kt)("p",null,"Starting with version 1.50.0, there is a semantically-versioned HTTP REST API definied using the ",(0,i.kt)("a",{parentName:"p",href:"https://spec.openapis.org/oas/v3.0.3"},"OpenAPI specification")," that exposes some of the functionality available through the GUI in a machine-readable fashion. The API specification can be found in the ",(0,i.kt)("inlineCode",{parentName:"p"},"packages/openapi")," folder. The latest version of this API is available in ",(0,i.kt)("em",{parentName:"p"},"Sofie","\xa0","Core")," using the endpoint: ",(0,i.kt)("inlineCode",{parentName:"p"},"/api/1.0"),". There should be no assumption of backwards-compatibility for this API, but this API will be semantically-versioned, with redirects set up for minor-version changes for compatibility."),(0,i.kt)("p",null,"There is a also a legacy REST API available that can be used to fetch data and trigger actions. The documentation for this API is minimal, but the API endpoints are listed by ",(0,i.kt)("em",{parentName:"p"},"Sofie","\xa0","Core")," using the endpoint: ",(0,i.kt)("inlineCode",{parentName:"p"},"/api/0")),(0,i.kt)("h2",{id:"sofie-live-status-gateway"},"Sofie Live Status Gateway"),(0,i.kt)("p",null,"Starting with version 1.50.0, there is also a separate service available, called ",(0,i.kt)("em",{parentName:"p"},"Sofie Live Status Gateway"),", running as a separate process, which will connect to the ",(0,i.kt)("em",{parentName:"p"},"Sofie Core")," as a Peripheral Device, listen to the changes of it's state and provide a PubSub service offering a machine-readable view into the system. The WebSocket API is defined using the ",(0,i.kt)("a",{parentName:"p",href:"https://v2.asyncapi.com/docs/reference/specification/v2.5.0"},"AsyncAPI specification")," and the specification can be found in the ",(0,i.kt)("inlineCode",{parentName:"p"},"packages/live-status-gateway/api")," folder."),(0,i.kt)("h2",{id:"ddp--core-integration"},"DDP \u2013 Core Integration"),(0,i.kt)("p",null,"If you're planning to build NodeJS applications that talk to ",(0,i.kt)("em",{parentName:"p"},"Sofie","\xa0","Core"),", we recommend using the ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/nrkno/sofie-core/tree/master/packages/server-core-integration.md"},"core-integration")," library, which exposes a number of callable methods and allows for subscribing to data the same way the ",(0,i.kt)("a",{parentName:"p",href:"/sofie-core/docs/user-guide/concepts-and-architecture#gateways"},"Gateways")," do it."))}f.isMDXComponent=!0}}]);