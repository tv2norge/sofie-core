"use strict";(self.webpackChunksofie_documentation=self.webpackChunksofie_documentation||[]).push([[513],{5318:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return f}});var i=n(7378);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,i,r=function(e,t){if(null==e)return{};var n,i,r={},l=Object.keys(e);for(i=0;i<l.length;i++)n=l[i],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(i=0;i<l.length;i++)n=l[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=i.createContext({}),u=function(e){var t=i.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},p=function(e){var t=u(e.components);return i.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},d=i.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,s=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),d=u(n),f=r,m=d["".concat(s,".").concat(f)]||d[f]||c[f]||l;return n?i.createElement(m,a(a({ref:t},p),{},{components:n})):i.createElement(m,a({ref:t},p))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,a=new Array(l);a[0]=d;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:r,a[1]=o;for(var u=2;u<l;u++)a[u]=n[u];return i.createElement.apply(null,a)}return i.createElement.apply(null,n)}d.displayName="MDXCreateElement"},560:function(e,t,n){n.r(t),n.d(t,{assets:function(){return p},contentTitle:function(){return s},default:function(){return f},frontMatter:function(){return o},metadata:function(){return u},toc:function(){return c}});var i=n(5773),r=n(808),l=(n(7378),n(5318)),a=["components"],o={sidebar_position:4},s="Installing Blueprints",u={unversionedId:"user-guide/installation/installing-blueprints",id:"version-1.38.0/user-guide/installation/installing-blueprints",title:"Installing Blueprints",description:"Prerequisites",source:"@site/versioned_docs/version-1.38.0/user-guide/installation/installing-blueprints.md",sourceDirName:"user-guide/installation",slug:"/user-guide/installation/installing-blueprints",permalink:"/sofie-core/docs/1.38.0/user-guide/installation/installing-blueprints",editUrl:"https://github.com/nrkno/sofie-core/edit/master/packages/documentation/versioned_docs/version-1.38.0/user-guide/installation/installing-blueprints.md",tags:[],version:"1.38.0",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"version-1.38.0/userGuide",previous:{title:"Initial Sofie Core Setup",permalink:"/sofie-core/docs/1.38.0/user-guide/installation/initial-sofie-core-setup"},next:{title:"Introduction",permalink:"/sofie-core/docs/1.38.0/user-guide/installation/installing-a-gateway/intro"}},p={},c=[{value:"Prerequisites",id:"prerequisites",level:4},{value:"System Blueprint",id:"system-blueprint",level:3},{value:"Studio Blueprint",id:"studio-blueprint",level:3},{value:"Show Style Blueprint",id:"show-style-blueprint",level:3},{value:"Further Reading",id:"further-reading",level:3}],d={toc:c};function f(e){var t=e.components,o=(0,r.Z)(e,a);return(0,l.kt)("wrapper",(0,i.Z)({},d,o,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"installing-blueprints"},"Installing Blueprints"),(0,l.kt)("h4",{id:"prerequisites"},"Prerequisites"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"installing-sofie-server-core"},"Installed and running Sofie","\xa0","Core")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"initial-sofie-core-setup"},"Initial Sofie","\xa0","Core Setup"))),(0,l.kt)("p",null,"Blueprints are little plug-in programs that runs inside ",(0,l.kt)("em",{parentName:"p"},"Sofie"),". They are the logic that determines how ",(0,l.kt)("em",{parentName:"p"},"Sofie")," interacts with rundowns, hardware, and media."),(0,l.kt)("p",null,"Blueprints are custom scripts that you create yourself ","(","or download an existing one",")",". There are a set of example Blueprints for the Spreadsheet Gateway available for use here: ",(0,l.kt)("a",{parentName:"p",href:"https://github.com/SuperFlyTV/sofie-demo-blueprints"},"https://github.com/SuperFlyTV/sofie-demo-blueprints"),"."),(0,l.kt)("p",null,"To begin installing any Blueprint, navigate to the ",(0,l.kt)("em",{parentName:"p"},"Settings page"),". Getting there is covered in the ",(0,l.kt)("a",{parentName:"p",href:"../features/access-levels"},"Access Levels")," page."),(0,l.kt)("p",null,(0,l.kt)("img",{loading:"lazy",alt:"The Settings Page",src:n(6956).Z,width:"879",height:"363"})),(0,l.kt)("p",null,"To upload a new blueprint, click the ",(0,l.kt)("em",{parentName:"p"},"+")," icon next to Blueprints menu option. Select the newly created Blueprint and upload the local blueprint JS file. You will get a confirmation if the installation was successful."),(0,l.kt)("p",null,"There are 3 types of blueprints: System, Studio and Show Style:"),(0,l.kt)("h3",{id:"system-blueprint"},"System Blueprint"),(0,l.kt)("p",null,(0,l.kt)("em",{parentName:"p"},"System Blueprints handles some basic functionality on how the Sofie system will operate.")),(0,l.kt)("p",null,"After you've uploaded the your system-blueprint js-file, click ",(0,l.kt)("em",{parentName:"p"},"Assign")," in the blueprint-page to assign it as system-blueprint."),(0,l.kt)("h3",{id:"studio-blueprint"},"Studio Blueprint"),(0,l.kt)("p",null,(0,l.kt)("em",{parentName:"p"},"Studio Blueprints determine how Sofie will interact with the hardware in your studio.")),(0,l.kt)("p",null,"After you've uploaded the your studio-blueprint js-file, navigate to a Studio in the settings and assign the new Blueprint to it ","(","under the label ",(0,l.kt)("em",{parentName:"p"},"Blueprint")," ",")","."),(0,l.kt)("p",null,"After having installed the Blueprint, the Studio's baseline will need to be reloaded. On the Studio page, click the button ",(0,l.kt)("em",{parentName:"p"},"Reload Baseline"),". This will also be needed whenever you have changed any settings."),(0,l.kt)("h3",{id:"show-style-blueprint"},"Show Style Blueprint"),(0,l.kt)("p",null,(0,l.kt)("em",{parentName:"p"},"Show Style Blueprints determine how your show will look / feel.")),(0,l.kt)("p",null,"After you've uploaded the your show-style-blueprint js-file, navigate to a Show Style in the settings and assign the new Blueprint to it ","(","under the label ",(0,l.kt)("em",{parentName:"p"},"Blueprint")," ",")","."),(0,l.kt)("h3",{id:"further-reading"},"Further Reading"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"https://github.com/SuperFlyTV/sofie-demo-blueprints"},"Blueprints Supporting the Spreadsheet Gateway"))))}f.isMDXComponent=!0},6956:function(e,t,n){t.Z=n.p+"assets/images/settings-page-33137c9de738f375484e364b4c0ad1af.jpg"}}]);