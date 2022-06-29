"use strict";(self.webpackChunksofie_documentation=self.webpackChunksofie_documentation||[]).push([[8437],{5318:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return f}});var r=n(7378);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),s=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=s(e.components);return r.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},g=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,c=u(e,["components","mdxType","originalType","parentName"]),g=s(n),f=a,d=g["".concat(l,".").concat(f)]||g[f]||p[f]||i;return n?r.createElement(d,o(o({ref:t},c),{},{components:n})):r.createElement(d,o({ref:t},c))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=g;var u={};for(var l in t)hasOwnProperty.call(t,l)&&(u[l]=t[l]);u.originalType=e,u.mdxType="string"==typeof e?e:a,o[1]=u;for(var s=2;s<i;s++)o[s]=n[s];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}g.displayName="MDXCreateElement"},687:function(e,t,n){n.r(t),n.d(t,{assets:function(){return c},contentTitle:function(){return l},default:function(){return f},frontMatter:function(){return u},metadata:function(){return s},toc:function(){return p}});var r=n(5773),a=n(808),i=(n(7378),n(5318)),o=["components"],u={sidebar_position:7},l="Language",s={unversionedId:"user-guide/features/language",id:"user-guide/features/language",title:"Language",description:"Sofie uses the i18n internationalisation framework that allows you to present user-facing views in multiple languages.",source:"@site/docs/user-guide/features/language.md",sourceDirName:"user-guide/features",slug:"/user-guide/features/language",permalink:"/sofie-core/docs/user-guide/features/language",editUrl:"https://github.com/nrkno/sofie-core/edit/master/packages/documentation/docs/user-guide/features/language.md",tags:[],version:"current",sidebarPosition:7,frontMatter:{sidebar_position:7},sidebar:"userGuide",previous:{title:"Prompter",permalink:"/sofie-core/docs/user-guide/features/prompter"},next:{title:"API",permalink:"/sofie-core/docs/user-guide/features/api"}},c={},p=[{value:"Language selection",id:"language-selection",level:2},{value:"Further Reading",id:"further-reading",level:2}],g={toc:p};function f(e){var t=e.components,n=(0,a.Z)(e,o);return(0,i.kt)("wrapper",(0,r.Z)({},g,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"language"},"Language"),(0,i.kt)("p",null,(0,i.kt)("em",{parentName:"p"},"Sofie")," uses the ",(0,i.kt)("a",{parentName:"p",href:"https://www.i18next.com/"},"i18n internationalisation framework")," that allows you to present user-facing views in multiple languages. "),(0,i.kt)("h2",{id:"language-selection"},"Language selection"),(0,i.kt)("p",null,"The UI will automatically detect user browser's default matching and select the best match, falling back to English. You can also force the UI language to any language by navigating to a page with ",(0,i.kt)("inlineCode",{parentName:"p"},"?lng=xx")," query string, for example:"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"http://localhost:3000/?lng=en")),(0,i.kt)("p",null,"This choice is persisted in browser's local storage, and the same language will be used until a new forced language is chosen using this method."),(0,i.kt)("p",null,(0,i.kt)("em",{parentName:"p"},"Sofie")," currently supports three languages:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"English ",(0,i.kt)("em",{parentName:"li"},"(default)")," ",(0,i.kt)("inlineCode",{parentName:"li"},"en")),(0,i.kt)("li",{parentName:"ul"},"Norwegian bokm\xe5l ",(0,i.kt)("inlineCode",{parentName:"li"},"nb")),(0,i.kt)("li",{parentName:"ul"},"Norwegian nynorsk ",(0,i.kt)("inlineCode",{parentName:"li"},"nn"))),(0,i.kt)("h2",{id:"further-reading"},"Further Reading"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://en.wikipedia.org/wiki/IETF_language_tag"},"List of language tags"))))}f.isMDXComponent=!0}}]);