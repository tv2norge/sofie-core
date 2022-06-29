"use strict";(self.webpackChunksofie_documentation=self.webpackChunksofie_documentation||[]).push([[6509],{5318:function(e,a,t){t.d(a,{Zo:function(){return p},kt:function(){return g}});var n=t(7378);function i(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function r(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);a&&(n=n.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,n)}return t}function o(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?r(Object(t),!0).forEach((function(a){i(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}function l(e,a){if(null==e)return{};var t,n,i=function(e,a){if(null==e)return{};var t,n,i={},r=Object.keys(e);for(n=0;n<r.length;n++)t=r[n],a.indexOf(t)>=0||(i[t]=e[t]);return i}(e,a);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)t=r[n],a.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var s=n.createContext({}),c=function(e){var a=n.useContext(s),t=a;return e&&(t="function"==typeof e?e(a):o(o({},a),e)),t},p=function(e){var a=c(e.components);return n.createElement(s.Provider,{value:a},e.children)},u={inlineCode:"code",wrapper:function(e){var a=e.children;return n.createElement(n.Fragment,{},a)}},d=n.forwardRef((function(e,a){var t=e.components,i=e.mdxType,r=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=c(t),g=i,m=d["".concat(s,".").concat(g)]||d[g]||u[g]||r;return t?n.createElement(m,o(o({ref:a},p),{},{components:t})):n.createElement(m,o({ref:a},p))}));function g(e,a){var t=arguments,i=a&&a.mdxType;if("string"==typeof e||i){var r=t.length,o=new Array(r);o[0]=d;var l={};for(var s in a)hasOwnProperty.call(a,s)&&(l[s]=a[s]);l.originalType=e,l.mdxType="string"==typeof e?e:i,o[1]=l;for(var c=2;c<r;c++)o[c]=t[c];return n.createElement.apply(null,o)}return n.createElement.apply(null,t)}d.displayName="MDXCreateElement"},3567:function(e,a,t){t.r(a),t.d(a,{assets:function(){return p},contentTitle:function(){return s},default:function(){return g},frontMatter:function(){return l},metadata:function(){return c},toc:function(){return u}});var n=t(5773),i=t(808),r=(t(7378),t(5318)),o=["components"],l={sidebar_position:7},s="Installing Package Manager",c={unversionedId:"user-guide/installation/installing-package-manager",id:"version-1.37.0/user-guide/installation/installing-package-manager",title:"Installing Package Manager",description:"Prerequisites",source:"@site/versioned_docs/version-1.37.0/user-guide/installation/installing-package-manager.md",sourceDirName:"user-guide/installation",slug:"/user-guide/installation/installing-package-manager",permalink:"/sofie-core/docs/1.37.0/user-guide/installation/installing-package-manager",editUrl:"https://github.com/nrkno/sofie-core/edit/master/packages/documentation/versioned_docs/version-1.37.0/user-guide/installation/installing-package-manager.md",tags:[],version:"1.37.0",sidebarPosition:7,frontMatter:{sidebar_position:7},sidebar:"version-1.37.0/gettingStarted",previous:{title:"Configuring Vision Mixers",permalink:"/sofie-core/docs/1.37.0/user-guide/installation/installing-connections-and-additional-hardware/vision-mixers"},next:{title:"Media Manager",permalink:"/sofie-core/docs/1.37.0/user-guide/installation/media-manager"}},p={},u=[{value:"Prerequisites",id:"prerequisites",level:4},{value:"Installation (Quick Start)",id:"installation-quick-start",level:3},{value:"Configuration",id:"configuration",level:3},{value:"Usage",id:"usage",level:3},{value:"Further Reading",id:"further-reading",level:3}],d={toc:u};function g(e){var a=e.components,l=(0,i.Z)(e,o);return(0,r.kt)("wrapper",(0,n.Z)({},d,l,{components:a,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"installing-package-manager"},"Installing Package Manager"),(0,r.kt)("h4",{id:"prerequisites"},"Prerequisites"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"installing-sofie-server-core"},"Installed and running Sofie","\xa0","Core")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"initial-sofie-core-setup"},"Initial Sofie","\xa0","Core Setup")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://github.com/SuperFlyTV/sofie-demo-blueprints"},"Installed and configured Demo Blueprints")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"installing-connections-and-additional-hardware/casparcg-server-installation"},"Installed, configured, and running CasparCG","\xa0","Server")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"installing-connections-and-additional-hardware/ffmpeg-installation"},(0,r.kt)("inlineCode",{parentName:"a"},"FFmpeg")," and ",(0,r.kt)("inlineCode",{parentName:"a"},"FFprobe")," available in ",(0,r.kt)("inlineCode",{parentName:"a"},"PATH")))),(0,r.kt)("p",null,"Package Manager is used by Sofie to copy, analyze, and process media files. It is what powers Sofie's ability to copy media files to playout devices, to know when a media file is ready for playout, and to display details about media files in the rundown view such as scene changes, black frames, freeze frames, and more."),(0,r.kt)("p",null,"Although Package Manager can be used to copy any kind of file to/from a wide array of devices, we'll be focusing on a basic CasparCG","\xa0","Server Server setup for this guide."),(0,r.kt)("div",{className:"admonition admonition-caution alert alert--warning"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))),"caution")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"At this time, the Package Manager worker process is Windows-only. Therefore, these instructions as a whole will only work on Windows. The worker will not work on WSL2."))),(0,r.kt)("h3",{id:"installation-quick-start"},"Installation (Quick Start)"),(0,r.kt)("p",null,"Package Manager is a suite of standalone applications, separate from ",(0,r.kt)("em",{parentName:"p"},"Sofie","\xa0","Core"),". This guide assumes that Package Manager will be running on the same computer as ",(0,r.kt)("em",{parentName:"p"},"CasparCG","\xa0","Server")," and ",(0,r.kt)("em",{parentName:"p"},"Sofie","\xa0","Core"),", as that is the fastest way to set up a demo. To get all parts of ",(0,r.kt)("em",{parentName:"p"},"Package Manager")," up and running quickly, execute these commands:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},'git clone https://github.com/nrkno/sofie-package-manager.git\ncd tv-automation-package-manager\nyarn install\nyarn start:single-app -- -- --basePath "C:\\Your\\Path\\To\\CasparCG&nbsp;Server\\media-folder (i.e. sofie-demo-media)"\n')),(0,r.kt)("p",null,"On first startup, Package Manager will exit with the following message:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"Not setup yet, exiting process!\nTo setup, go into Core and add this device to a Studio\n")),(0,r.kt)("p",null,"This first run is necessary to get the Package Manager device registered with ",(0,r.kt)("em",{parentName:"p"},"Sofie","\xa0","Core"),". We'll restart Package Manager later on in the ",(0,r.kt)("a",{parentName:"p",href:"#configuration"},"Configuration")," instructions."),(0,r.kt)("h3",{id:"configuration"},"Configuration"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"Open the ",(0,r.kt)("em",{parentName:"li"},"Sofie","\xa0","Core")," Settings page (",(0,r.kt)("a",{parentName:"li",href:"http://localhost:3000/settings?admin=1"},"http://localhost:3000/settings?admin=1"),"), click on your Studio, and scroll down to the Attached Devices section."),(0,r.kt)("li",{parentName:"ol"},"Click the plus button (",(0,r.kt)("inlineCode",{parentName:"li"},"+"),") and select Package Manager to add the Package Manager device to your Studio."),(0,r.kt)("li",{parentName:"ol"},"On this same settings page, scroll down to the Package Manager section."),(0,r.kt)("li",{parentName:"ol"},"Click the plus button under the Package Containers heading, then click the edit icon (pencil) to the right of the newly-created package container."),(0,r.kt)("li",{parentName:"ol"},"Give this package container an ID of ",(0,r.kt)("inlineCode",{parentName:"li"},"casparcgContainer0")," and a label of ",(0,r.kt)("inlineCode",{parentName:"li"},"CasparCG Package Container"),"."),(0,r.kt)("li",{parentName:"ol"},'Click on the dropdown under "Playout devices which use this package container" and select ',(0,r.kt)("inlineCode",{parentName:"li"},"casparcg0"),".",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"If you don't have a ",(0,r.kt)("inlineCode",{parentName:"li"},"casparcg0")," device, add it to the Playout Gateway under the Devices heading, then restart the Playout Gateway."))),(0,r.kt)("li",{parentName:"ol"},'Click the plus button under "Accessors", then click the edit icon to the right of the newly-created accessor.'),(0,r.kt)("li",{parentName:"ol"},"Give this accessor an ID of ",(0,r.kt)("inlineCode",{parentName:"li"},"casparcgHttpProxy0"),", a Label of ",(0,r.kt)("inlineCode",{parentName:"li"},"CasparCG HTTP Proxy Accessor"),", an Accessor Type of ",(0,r.kt)("inlineCode",{parentName:"li"},"HTTP_PROXY"),", and a Base URL of ",(0,r.kt)("inlineCode",{parentName:"li"},"http://localhost:8080/package"),'. Then, ensure that both the "Allow Read access" and "Allow Write access" boxes are checked. Finally, click the done button (checkmark icon) in the bottom right.'),(0,r.kt)("li",{parentName:"ol"},'Scroll back up a bit to the "Studio Settings" subsection (still in the Package Manager section) and select "CasparCG Package Container" for both "Package Containers to use for previews" and "Package Containers to use for thumbnails".'),(0,r.kt)("li",{parentName:"ol"},"Your settings should look like this once all the above steps have been completed:\n",(0,r.kt)("img",{loading:"lazy",alt:"Package Manager demo settings",src:t(4533).Z,width:"1776",height:"1257"})),(0,r.kt)("li",{parentName:"ol"},"If Package Manager ",(0,r.kt)("inlineCode",{parentName:"li"},"start:single-app")," is running, restart it. If not, start it (see the above ",(0,r.kt)("a",{parentName:"li",href:"#installation-quick-start"},"Installation instructions")," for the relevant command line).")),(0,r.kt)("h3",{id:"usage"},"Usage"),(0,r.kt)("p",null,"In this basic configuration, Package Manager won't be copying any packages into your CasparCG","\xa0","Server media folder. Instead, it will simply check that the files in the rundown are present in your CasparCG","\xa0","Server media folder, and you'll have to manually place those files in the correct directory. However, thumbnail and preview generation will still function, as will status reporting."),(0,r.kt)("p",null,"If you're using the demo rundown provided by the ",(0,r.kt)("a",{parentName:"p",href:"rundown-editor"},"Rundown Editor"),", you should already see work statuses on the Package Status page (",(0,r.kt)("a",{parentName:"p",href:"http://localhost:3000/status/expected-packages"},"Status > Packages"),")."),(0,r.kt)("p",null,(0,r.kt)("img",{loading:"lazy",alt:"Example Package Manager status display",src:t(3945).Z,width:"776",height:"905"})),(0,r.kt)("p",null,"If all is good, head to the ",(0,r.kt)("a",{parentName:"p",href:"http://localhost:3000/rundowns"},"Rundowns page")," and open the demo rundown."),(0,r.kt)("h3",{id:"further-reading"},"Further Reading"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://github.com/nrkno/sofie-package-manager"},"Package Manager")," on GitHub.")))}g.isMDXComponent=!0},4533:function(e,a,t){a.Z=t.p+"assets/images/Package_Manager_demo_settings-cffe19817a765c5be79d21e3d6b75642.png"},3945:function(e,a,t){a.Z=t.p+"assets/images/Package_Manager_status_example-beb8bdd45d112fb9391e2f86ac6b7040.jpg"}}]);