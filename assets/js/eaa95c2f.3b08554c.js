"use strict";(self.webpackChunksofie_documentation=self.webpackChunksofie_documentation||[]).push([[7455],{5318:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>m});var n=r(7378);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var c=n.createContext({}),u=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},p=function(e){var t=u(e.components);return n.createElement(c.Provider,{value:t},e.children)},l="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),l=u(r),f=a,m=l["".concat(c,".").concat(f)]||l[f]||d[f]||o;return r?n.createElement(m,i(i({ref:t},p),{},{components:r})):n.createElement(m,i({ref:t},p))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=f;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s[l]="string"==typeof e?e:a,i[1]=s;for(var u=2;u<o;u++)i[u]=r[u];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},6226:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>d,frontMatter:()=>o,metadata:()=>s,toc:()=>u});var n=r(5773),a=(r(7378),r(5318));const o={},i="API",s={unversionedId:"user-guide/features/api",id:"version-1.38.0/user-guide/features/api",title:"API",description:"REST API",source:"@site/versioned_docs/version-1.38.0/user-guide/features/api.md",sourceDirName:"user-guide/features",slug:"/user-guide/features/api",permalink:"/sofie-core/docs/1.38.0/user-guide/features/api",draft:!1,editUrl:"https://github.com/nrkno/sofie-core/edit/master/packages/documentation/versioned_docs/version-1.38.0/user-guide/features/api.md",tags:[],version:"1.38.0",frontMatter:{},sidebar:"version-1.38.0/userGuide",previous:{title:"Language",permalink:"/sofie-core/docs/1.38.0/user-guide/features/language"},next:{title:"Getting Started",permalink:"/sofie-core/docs/1.38.0/user-guide/installation/intro"}},c={},u=[{value:"REST API",id:"rest-api",level:2},{value:"DDP \u2013 Core Integration",id:"ddp--core-integration",level:2}],p={toc:u},l="wrapper";function d(e){let{components:t,...r}=e;return(0,a.kt)(l,(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"api"},"API"),(0,a.kt)("h2",{id:"rest-api"},"REST API"),(0,a.kt)("p",null,"There is a preliminary REST API available that can be used to fetch data and trigger actions."),(0,a.kt)("p",null,"The documentation is minimal at the moment, but the API endpoints are listed by ",(0,a.kt)("em",{parentName:"p"},"Sofie","\xa0","Core")," using the endpoint: ",(0,a.kt)("inlineCode",{parentName:"p"},"/api/0")),(0,a.kt)("h2",{id:"ddp--core-integration"},"DDP \u2013 Core Integration"),(0,a.kt)("p",null,"If you're planning to build NodeJS applications that talk to ",(0,a.kt)("em",{parentName:"p"},"Sofie","\xa0","Core"),", we recommend using the ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/nrkno/sofie-core/tree/master/packages/server-core-integration"},"core-integration")," library, which exposes a number of callable methods and allows for subscribing to data the same way the ",(0,a.kt)("a",{parentName:"p",href:"../concepts-and-architecture#gateways"},"Gateways")," do it."))}d.isMDXComponent=!0}}]);