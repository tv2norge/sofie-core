"use strict";(self.webpackChunksofie_documentation=self.webpackChunksofie_documentation||[]).push([[6205],{5318:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>y});var o=n(7378);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var c=o.createContext({}),l=function(e){var t=o.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=l(e.components);return o.createElement(c.Provider,{value:t},e.children)},d="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},p=o.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,c=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),d=l(n),p=r,y=d["".concat(c,".").concat(p)]||d[p]||m[p]||a;return n?o.createElement(y,i(i({ref:t},u),{},{components:n})):o.createElement(y,i({ref:t},u))}));function y(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,i=new Array(a);i[0]=p;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s[d]="string"==typeof e?e:r,i[1]=s;for(var l=2;l<a;l++)i[l]=n[l];return o.createElement.apply(null,i)}return o.createElement.apply(null,n)}p.displayName="MDXCreateElement"},3254:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>m,frontMatter:()=>a,metadata:()=>s,toc:()=>l});var o=n(5773),r=(n(7378),n(5318));const a={},i="MOS Gateway",s={unversionedId:"user-guide/installation/installing-a-gateway/rundown-or-newsroom-system-connection/mos-gateway",id:"version-1.47.0/user-guide/installation/installing-a-gateway/rundown-or-newsroom-system-connection/mos-gateway",title:"MOS Gateway",description:"The MOS Gateway communicates with a device that supports the MOS protocol to ingest and remain in sync with a rundown. It can connect to any editorial system \\(NRCS\\) that uses version 2.8.4 of the MOS protocol, such as ENPS, and sync their rundowns with the Sofie&nbsp;Core. The rundowns are kept updated in real time and any changes made will be seen in the Sofie GUI.",source:"@site/versioned_docs/version-1.47.0/user-guide/installation/installing-a-gateway/rundown-or-newsroom-system-connection/mos-gateway.md",sourceDirName:"user-guide/installation/installing-a-gateway/rundown-or-newsroom-system-connection",slug:"/user-guide/installation/installing-a-gateway/rundown-or-newsroom-system-connection/mos-gateway",permalink:"/sofie-core/docs/1.47.0/user-guide/installation/installing-a-gateway/rundown-or-newsroom-system-connection/mos-gateway",draft:!1,editUrl:"https://github.com/nrkno/sofie-core/edit/master/packages/documentation/versioned_docs/version-1.47.0/user-guide/installation/installing-a-gateway/rundown-or-newsroom-system-connection/mos-gateway.md",tags:[],version:"1.47.0",frontMatter:{},sidebar:"version-1.47.0/userGuide",previous:{title:"Rundown & Newsroom Systems",permalink:"/sofie-core/docs/1.47.0/user-guide/installation/installing-a-gateway/rundown-or-newsroom-system-connection/intro"},next:{title:"Additional Software & Hardware",permalink:"/sofie-core/docs/1.47.0/user-guide/installation/installing-connections-and-additional-hardware/"}},c={},l=[],u={toc:l},d="wrapper";function m(e){let{components:t,...n}=e;return(0,r.kt)(d,(0,o.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"mos-gateway"},"MOS Gateway"),(0,r.kt)("p",null,"The MOS Gateway communicates with a device that supports the ",(0,r.kt)("a",{parentName:"p",href:"http://mosprotocol.com/wp-content/MOS-Protocol-Documents/MOS-Protocol-2.8.4-Current.htm"},"MOS protocol")," to ingest and remain in sync with a rundown. It can connect to any editorial system ","(","NRCS",")"," that uses version 2.8.4 of the MOS protocol, such as ENPS, and sync their rundowns with the ",(0,r.kt)("em",{parentName:"p"},"Sofie","\xa0","Core"),". The rundowns are kept updated in real time and any changes made will be seen in the Sofie GUI."),(0,r.kt)("p",null,"The setup for the MOS Gateway is handled in the Docker Compose in the ",(0,r.kt)("a",{parentName:"p",href:"/sofie-core/docs/1.47.0/user-guide/installation/installing-sofie-server-core"},"Quick Install")," page."),(0,r.kt)("p",null,"One thing to note if managing the mos-gateway manually: It needs a few ports open ","(","10540, 10541",")"," for MOS-messages to be pushed to it from the NCS."))}m.isMDXComponent=!0}}]);