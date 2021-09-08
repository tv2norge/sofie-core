"use strict";(self.webpackChunksofie_documentation=self.webpackChunksofie_documentation||[]).push([[5198],{5318:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return d}});var o=n(7378);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var c=o.createContext({}),l=function(e){var t=o.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=l(e.components);return o.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},m=o.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,c=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),m=l(n),d=r,g=m["".concat(c,".").concat(d)]||m[d]||p[d]||a;return n?o.createElement(g,i(i({ref:t},u),{},{components:n})):o.createElement(g,i({ref:t},u))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,i=new Array(a);i[0]=m;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:r,i[1]=s;for(var l=2;l<a;l++)i[l]=n[l];return o.createElement.apply(null,i)}return o.createElement.apply(null,n)}m.displayName="MDXCreateElement"},9423:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return s},contentTitle:function(){return c},metadata:function(){return l},toc:function(){return u},default:function(){return m}});var o=n(5773),r=n(808),a=(n(7378),n(5318)),i=["components"],s={},c="MOS Gateway",l={unversionedId:"getting-started/installation/installing-a-gateway/rundown-or-newsroom-system-connection/enps-connection",id:"version-1.32.0/getting-started/installation/installing-a-gateway/rundown-or-newsroom-system-connection/enps-connection",isDocsHomePage:!1,title:"MOS Gateway",description:"The MOS Gateway communicates with a device that supports the MOS protocol to ingest and remain in sync with a rundown. It can connect to any editorial system \\(NCS\\) that uses version 2.8.4 of the MOS protocol, such as ENPS, and sync their rundowns with the Sofie Core. The rundowns are kept updated in real time and any changes made will be seen in the Sofie GUI.",source:"@site/versioned_docs/version-1.32.0/getting-started/installation/installing-a-gateway/rundown-or-newsroom-system-connection/enps-connection.md",sourceDirName:"getting-started/installation/installing-a-gateway/rundown-or-newsroom-system-connection",slug:"/getting-started/installation/installing-a-gateway/rundown-or-newsroom-system-connection/enps-connection",permalink:"/tv-automation-server-core/docs/1.32.0/getting-started/installation/installing-a-gateway/rundown-or-newsroom-system-connection/enps-connection",editUrl:"https://github.com/nrkno/tv-automation-server-core/edit/master/packages/documentation/versioned_docs/version-1.32.0/getting-started/installation/installing-a-gateway/rundown-or-newsroom-system-connection/enps-connection.md",tags:[],version:"1.32.0",frontMatter:{},sidebar:"version-1.32.0/gettingStarted",previous:{title:"Rundown & Newsroom Systems",permalink:"/tv-automation-server-core/docs/1.32.0/getting-started/installation/installing-a-gateway/rundown-or-newsroom-system-connection/README"},next:{title:"iNews Gateway",permalink:"/tv-automation-server-core/docs/1.32.0/getting-started/installation/installing-a-gateway/rundown-or-newsroom-system-connection/inews-connection"}},u=[{value:"Further Reading",id:"further-reading",children:[]}],p={toc:u};function m(e){var t=e.components,n=(0,r.Z)(e,i);return(0,a.kt)("wrapper",(0,o.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"mos-gateway"},"MOS Gateway"),(0,a.kt)("p",null,"The MOS Gateway communicates with a device that supports the ",(0,a.kt)("a",{parentName:"p",href:"http://mosprotocol.com/wp-content/MOS-Protocol-Documents/MOS-Protocol-2.8.4-Current.htm"},"MOS protoco"),"l to ingest and remain in sync with a rundown. It can connect to any editorial system ","(","NCS",")"," that uses version 2.8.4 of the MOS protocol, such as ENPS, and sync their rundowns with the ",(0,a.kt)("em",{parentName:"p"},"Sofie Core"),". The rundowns are kept updated in real time and any changes made will be seen in the Sofie GUI."),(0,a.kt)("p",null,"The setup for the MOS Gateway is handled in the Docker Compose in the ",(0,a.kt)("a",{parentName:"p",href:"/tv-automation-server-core/docs/1.32.0/getting-started/installation/installing-sofie-server-core"},"Quick Install")," page."),(0,a.kt)("p",null,"One thing to note if managing the mos-gateway manually: It needs a few ports open ","(","10540, 10541",")"," for MOS-messages to be pushed to it from the NCS."),(0,a.kt)("h3",{id:"further-reading"},"Further Reading"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://github.com/nrkno/tv-automation-mos-gateway"},"MOS Gateway")," GitHub Page for Developers")))}m.isMDXComponent=!0}}]);