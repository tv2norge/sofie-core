"use strict";(self.webpackChunksofie_documentation=self.webpackChunksofie_documentation||[]).push([[9372],{5318:(e,t,a)=>{a.d(t,{Zo:()=>c,kt:()=>m});var n=a(7378);function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){i(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,n,i=function(e,t){if(null==e)return{};var a,n,i={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(i[a]=e[a]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(i[a]=e[a])}return i}var l=n.createContext({}),p=function(e){var t=n.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},c=function(e){var t=p(e.components);return n.createElement(l.Provider,{value:t},e.children)},d="mdxType",h={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var a=e.components,i=e.mdxType,r=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),d=p(a),u=i,m=d["".concat(l,".").concat(u)]||d[u]||h[u]||r;return a?n.createElement(m,o(o({ref:t},c),{},{components:a})):n.createElement(m,o({ref:t},c))}));function m(e,t){var a=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=a.length,o=new Array(r);o[0]=u;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[d]="string"==typeof e?e:i,o[1]=s;for(var p=2;p<r;p++)o[p]=a[p];return n.createElement.apply(null,o)}return n.createElement.apply(null,a)}u.displayName="MDXCreateElement"},3943:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>h,frontMatter:()=>r,metadata:()=>s,toc:()=>p});var n=a(5773),i=(a(7378),a(5318));const r={sidebar_position:2},o="Settings View",s={unversionedId:"user-guide/configuration/settings-view",id:"version-1.46.0/user-guide/configuration/settings-view",title:"Settings View",description:"The settings views are only visible to users with the correct access level!",source:"@site/versioned_docs/version-1.46.0/user-guide/configuration/settings-view.md",sourceDirName:"user-guide/configuration",slug:"/user-guide/configuration/settings-view",permalink:"/sofie-core/docs/1.46.0/user-guide/configuration/settings-view",draft:!1,editUrl:"https://github.com/nrkno/sofie-core/edit/master/packages/documentation/versioned_docs/version-1.46.0/user-guide/configuration/settings-view.md",tags:[],version:"1.46.0",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"version-1.45.0/userGuide",previous:{title:"Sofie Core: System Configuration",permalink:"/sofie-core/docs/1.46.0/user-guide/configuration/sofie-core-settings"},next:{title:"FAQ",permalink:"/sofie-core/docs/1.46.0/user-guide/faq"}},l={},p=[{value:"System",id:"system",level:2},{value:"Studio",id:"studio",level:2},{value:"Attached Devices",id:"attached-devices",level:3},{value:"Blueprint Configuration",id:"blueprint-configuration",level:3},{value:"Layer Mappings",id:"layer-mappings",level:3},{value:"Route Sets",id:"route-sets",level:4},{value:"Show style",id:"show-style",level:2},{value:"Action Triggers",id:"action-triggers",level:3},{value:"Triggers",id:"triggers",level:4},{value:"Actions",id:"actions",level:4},{value:"Migrations",id:"migrations",level:2}],c={toc:p},d="wrapper";function h(e){let{components:t,...r}=e;return(0,i.kt)(d,(0,n.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"settings-view"},"Settings View"),(0,i.kt)("div",{className:"admonition admonition-caution alert alert--warning"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))),"caution")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"The settings views are only visible to users with the correct ",(0,i.kt)("a",{parentName:"p",href:"../features/access-levels"},"access level"),"!"))),(0,i.kt)("p",null,"Recommended read before diving into the settings: ",(0,i.kt)("a",{parentName:"p",href:"../concepts-and-architecture#system-organization-studio-and-show-style"},"System, ","(","Organization",")",", Studio & Show Style"),"."),(0,i.kt)("h2",{id:"system"},"System"),(0,i.kt)("p",null,"The ",(0,i.kt)("em",{parentName:"p"},"System")," settings are settings for this installation of Sofie. In here goes the settings that are applicable system-wide."),(0,i.kt)("div",{className:"admonition admonition-caution alert alert--warning"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))),"caution")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"Documentation for this section is yet to be written."))),(0,i.kt)("h2",{id:"studio"},"Studio"),(0,i.kt)("p",null,"A ",(0,i.kt)("em",{parentName:"p"},"Studio")," in Sofie-terms is a physical location, with a specific set of devices and equipment. Only one show can be on air in a studio at the same time.",(0,i.kt)("br",{parentName:"p"}),"\n","The ",(0,i.kt)("em",{parentName:"p"},"studio")," settings are settings for that specific studio, and contains settings related to hardware and playout, such as:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Attached devices")," - the Gateways related to this studio"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Blueprint configuration")," - custom config option defined by the blueprints"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Layer Mappings")," - Maps the logical ",(0,i.kt)("em",{parentName:"li"},"timeline layers")," to physical devices and outputs")),(0,i.kt)("p",null,"The Studio uses a studio-blueprint, which handles things like mapping up an incoming rundown to a Showstyle."),(0,i.kt)("h3",{id:"attached-devices"},"Attached Devices"),(0,i.kt)("p",null,"This section allows you to add and remove Gateways that are related to this ",(0,i.kt)("em",{parentName:"p"},"Studio"),". When a Gateway is attached to a Studio, it will react to the changes happening within it, as well as feed the neccessary data into it."),(0,i.kt)("h3",{id:"blueprint-configuration"},"Blueprint Configuration"),(0,i.kt)("p",null,"Sofie allows the Blueprints to expose custom configuration fields that allow the System Administrator to reconfigure how these Blueprints work through the Sofie UI. Here you can change the configuration of the ",(0,i.kt)("a",{parentName:"p",href:"../concepts-and-architecture#studio-blueprints"},"Studio Blueprint"),"."),(0,i.kt)("h3",{id:"layer-mappings"},"Layer Mappings"),(0,i.kt)("p",null,"This section allows you to add, remove and configure how logical device-control will be translated to physical automation control. ",(0,i.kt)("a",{parentName:"p",href:"../concepts-and-architecture#blueprints"},"Blueprints")," control devices through objects placed on a ",(0,i.kt)("a",{parentName:"p",href:"../concepts-and-architecture#timeline"},"Timeline")," using logical device identifiers called ",(0,i.kt)("em",{parentName:"p"},"Layers"),". A layer represents a single aspect of a device that can be controlled at a given time: a video switcher's M/E bus, an audio mixers's fader, an OSC control node, a video server's output channel. Layer Mappings translate these logical identifiers into physical device aspects, for example:"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"A sample configuration of a Layer Mapping for the M/E1 Bus of an ATEM switcher",src:a(2340).Z,width:"1245",height:"584"})),(0,i.kt)("p",null,"This ",(0,i.kt)("em",{parentName:"p"},"Layer Mapping")," configures the ",(0,i.kt)("inlineCode",{parentName:"p"},"atem_me_program")," Timeline-layer to control the ",(0,i.kt)("inlineCode",{parentName:"p"},"atem0")," device of the ",(0,i.kt)("inlineCode",{parentName:"p"},"ATEM")," type. No Lookahead will be enabled for this layer. This layer will control a ",(0,i.kt)("inlineCode",{parentName:"p"},"MixEffect")," aspect with the Index of ",(0,i.kt)("inlineCode",{parentName:"p"},"0")," ","(","so M/E 1 Bus",")","."),(0,i.kt)("p",null,"These mappings allow the System Administrator to reconfigure what devices the Blueprints will control, without the need of changing the Blueprint code."),(0,i.kt)("h4",{id:"route-sets"},"Route Sets"),(0,i.kt)("p",null,"In order to allow the Producer to reconfigure the automation from the Switchboard in the ",(0,i.kt)("a",{parentName:"p",href:"../concepts-and-architecture#rundown-view"},"Rundown View"),", as well as have some pre-set automation control available for the System Administrator, Sofie has a concept of Route Sets. Route Sets work on top of the Layer Mappings, by configuring sets of ",(0,i.kt)("a",{parentName:"p",href:"settings-view#layer-mappings"},"Layer Mappings")," that will re-route the control from one device to another, or to disable the automation altogether. These Route Sets are presented to the Producer in the ",(0,i.kt)("a",{parentName:"p",href:"../concepts-and-architecture#switchboard"},"Switchboard")," panel."),(0,i.kt)("p",null,"A Route Set is essentially a distinct set of Layer Mappings, which can modify the settings already configured by the Layer Mappings, but can be turned On and Off. Called Routes, these can change:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"the Layer ID to a new Layer ID"),(0,i.kt)("li",{parentName:"ul"},"change the Device being controlled by the Layer"),(0,i.kt)("li",{parentName:"ul"},"change the aspect of the Device that's being controlled.")),(0,i.kt)("p",null,"Route Sets can be grouped into Exclusivity Groups, in which only a single Route Set can be enabled at a time. When activating a Route Set within an Exclusivity Group, all other Route Sets in that group will be deactivated. This in turn, allows the System Administrator to create entire sections of exclusive automation control within the Studio that the Producer can then switch between. One such example could be switching between Primary and Backup playout servers, or switching between Primary and Backup talent microphone."),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"The Exclusivity Group Name will be displayed as a header in the Switchboard panel",src:a(3851).Z,width:"1240",height:"501"})),(0,i.kt)("p",null,"A Route Set has a Behavior property which will dictate what happens how the Route Set operates:"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Behavior"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"ACTIVATE_ONLY")),(0,i.kt)("td",{parentName:"tr",align:"left"},"This RouteSet cannot be deactivated, only a different RouteSet in the same Exclusivity Group can cause it to deactivate")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"TOGGLE")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The RouteSet can be activated and deactivated. As a result, it's possible for the Exclusivity Group to have no Route Set active")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"HIDDEN")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The RouteSet can be activated and deactivated, but it will not be presented to the user in the Switchboard panel")))),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"An active RouteSet with a single Layer Mapping being re-configured",src:a(3995).Z,width:"1233",height:"897"})),(0,i.kt)("p",null,"Route Sets can also be configured with a ",(0,i.kt)("em",{parentName:"p"},"Default State"),". This can be used to contrast a normal, day-to-day configuration with an exceptional one ","(","like using a backup device",")"," in the ",(0,i.kt)("a",{parentName:"p",href:"../concepts-and-architecture#switchboard"},"Switchboard")," panel."),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Default State"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Behavior"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},"Active"),(0,i.kt)("td",{parentName:"tr",align:"left"},"If the Route Set is not active, an indicator will be shown")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},"Not Active"),(0,i.kt)("td",{parentName:"tr",align:"left"},"If the Route Set is active, an indicator will be shown")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},"Not defined"),(0,i.kt)("td",{parentName:"tr",align:"left"},"No indicator will be shown, regardless of the Route Set state")))),(0,i.kt)("h2",{id:"show-style"},"Show style"),(0,i.kt)("p",null,"A ",(0,i.kt)("em",{parentName:"p"},"Showstyle")," is related to the looks and logic of a ",(0,i.kt)("em",{parentName:"p"},"show"),", which in contrast to the ",(0,i.kt)("em",{parentName:"p"},"studio")," is not directly related to the hardware.",(0,i.kt)("br",{parentName:"p"}),"\n","The Showstyle contains settings like"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Source Layers")," - Groups different types of content in the GUI"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Output Channels")," - Indicates different output targets ","(","such as the ",(0,i.kt)("em",{parentName:"li"},"Program")," or ",(0,i.kt)("em",{parentName:"li"},"back-screen in the studio"),")"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Action Triggers")," - Select how actions can be started on a per-show basis, outside of the on-screen controls"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Blueprint configuration")," - custom config option defined by the blueprints")),(0,i.kt)("div",{className:"admonition admonition-caution alert alert--warning"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))),"caution")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"Please note the difference between ",(0,i.kt)("em",{parentName:"p"},"Source Layers")," and ",(0,i.kt)("em",{parentName:"p"},"timeline-layers"),":"),(0,i.kt)("p",{parentName:"div"},(0,i.kt)("a",{parentName:"p",href:"../concepts-and-architecture#piece"},"Pieces")," are put onto ",(0,i.kt)("em",{parentName:"p"},"Source layers"),", to group different types of content ","(","such as a VT or Camera",")",", they are therefore intended only as something to indicate to the user what is going to be played, not what is actually going to happen on the technical level."),(0,i.kt)("p",{parentName:"div"},(0,i.kt)("a",{parentName:"p",href:"../concepts-and-architecture#timeline-object"},"Timeline-objects")," ","(","inside of the ",(0,i.kt)("a",{parentName:"p",href:"../concepts-and-architecture#piece"},"Pieces"),")"," are put onto timeline-layers, which are ","(","through the Mappings in the studio",")"," mapped to physical devices and outputs.",(0,i.kt)("br",{parentName:"p"}),"\n","The exact timeline-layer is never exposed to the user, but instead used on the technical level to control playout."),(0,i.kt)("p",{parentName:"div"},"An example of the difference could be when playing a VT ","(","that's a Source Layer",")",", which could involve all of the timeline-layers ",(0,i.kt)("em",{parentName:"p"},"video","_","player0"),", ",(0,i.kt)("em",{parentName:"p"},"audio","_","fader","_","video"),", ",(0,i.kt)("em",{parentName:"p"},"audio","_","fader","_","host")," and ",(0,i.kt)("em",{parentName:"p"},"mixer","_","pgm.")))),(0,i.kt)("h3",{id:"action-triggers"},"Action Triggers"),(0,i.kt)("p",null,"This is a way to set up how - outside of the Point-and-Click Graphical User Interface - actions can be performed in the User Interface. Commonly, these are the ",(0,i.kt)("em",{parentName:"p"},"hotkey combinations")," that can be used to either trigger AdLib content or other actions in the larger system. This is done by creating sets of Triggers and Actions to be triggered by them. These pairs can be set at the Show Style level or at the ",(0,i.kt)("em",{parentName:"p"},"Sofie","\xa0","Core")," (System) level, for common actions such as doing a Take or activating a Rundown, where you want a shared method of operation. ",(0,i.kt)("em",{parentName:"p"},"Sofie","\xa0","Core")," migrations will set up a base set of basic, system-wide Action Triggers for interacting with rundowns, but they can be changed by the System blueprint."),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"Action triggers define modes of interacting with a Rundown",src:a(6254).Z,width:"1752",height:"245"})),(0,i.kt)("h4",{id:"triggers"},"Triggers"),(0,i.kt)("p",null,"The triggers are designed to be either client-specific or issued by a peripheral device module."),(0,i.kt)("p",null,"Currently, the Action Triggers system only supports a single, client-specific trigger type: a Hotkey. Hotkeys can be either a single key, a combination of keys (",(0,i.kt)("em",{parentName:"p"},"combo"),") or a ",(0,i.kt)("em",{parentName:"p"},"chord")," - a sequnece of key combinations pressed in a particular order. ",(0,i.kt)("em",{parentName:"p"},"Chords")," are popular in some text editing applications and vastly expand the amount of actions that can be triggered from a keyboard, at the expense of the time needed to execute them. Currently, the Hotkey editor in Sofie does not support creating ",(0,i.kt)("em",{parentName:"p"},"Chords"),", but they can be specified by Blueprints during migrations."),(0,i.kt)("p",null,"To edit a given trigger, click on the trigger pill on the left of the Trigger-Action set. When hovering, a ",(0,i.kt)("strong",{parentName:"p"},"+")," sign will appear,\nallowing you to add a new trigger to the set."),(0,i.kt)("h4",{id:"actions"},"Actions"),(0,i.kt)("p",null,"The actions are built using a base ",(0,i.kt)("em",{parentName:"p"},"action")," (such as ",(0,i.kt)("em",{parentName:"p"},"Activate a Rundown")," or ",(0,i.kt)("em",{parentName:"p"},"AdLib"),") and a set of ",(0,i.kt)("em",{parentName:"p"},"filters"),", limiting the scope of the ",(0,i.kt)("em",{parentName:"p"},"action"),". Optionally, some of these ",(0,i.kt)("em",{parentName:"p"},"actions")," can take additional ",(0,i.kt)("em",{parentName:"p"},"parameters"),'. These filters can operate on various types of objects, depending on the action in question. All actions currently require that the chain of filters starts with scoping out the Rundown the action is supposed to affect. Currently, there is only one type of Rundown-level filter supported: "The Rundown currently in view".'),(0,i.kt)("p",null,"The Action Triggers user interface guides the user in a wizzard-like fashion through the available ",(0,i.kt)("em",{parentName:"p"},"filter")," options on a given ",(0,i.kt)("em",{parentName:"p"},"action"),"."),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"Actions can take additional parameters",src:a(6004).Z,width:"1776",height:"355"})),(0,i.kt)("p",null,"If the action provides a preview of the triggered items and there is an available matching Rundown, a preview will be displayed for the matching objects in that Rundown. The system will select the current active rundown, if it is of the currently-edited ShowStyle, and if not, it will select the first available Rundown of the currently-edited ShowStyle."),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"A preview of the action, as scoped by the filters",src:a(1529).Z,width:"1752",height:"222"})),(0,i.kt)("p",null,"Clicking on the action and filter pills allows you to edit the action parameters and filter parameters. ",(0,i.kt)("em",{parentName:"p"},"Limit")," limits the amount of objects to only the first ",(0,i.kt)("em",{parentName:"p"},"N")," objects matched - this can significantly improve performance on large data sets. ",(0,i.kt)("em",{parentName:"p"},"Pick")," and ",(0,i.kt)("em",{parentName:"p"},"Pick last")," filters end the chain of the filters by selecting a single item from the filtered set of objects (the ",(0,i.kt)("em",{parentName:"p"},"N-th")," object from the beginning or the end, respectively). ",(0,i.kt)("em",{parentName:"p"},"Pick")," implicitly contains a ",(0,i.kt)("em",{parentName:"p"},"Limit")," for the performance improvement. This is not true for ",(0,i.kt)("em",{parentName:"p"},"Pick last"),", though."),(0,i.kt)("h2",{id:"migrations"},"Migrations"),(0,i.kt)("p",null,"The migrations are automatic setup-scripts that help you during initial setup and system upgrades."),(0,i.kt)("p",null,"There are system-migrations that comes directly from the version of ",(0,i.kt)("em",{parentName:"p"},"Sofie","\xa0","Core")," you're running, and there are also migrations added by the different blueprints."),(0,i.kt)("p",null,"It is mandatory to run migrations when you've upgraded ",(0,i.kt)("em",{parentName:"p"},"Sofie","\xa0","Core")," to a new version, or upgraded your blueprints."))}h.isMDXComponent=!0},6004:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/action_triggers_2-ce81b38065f5199b8ea912e48ceda15d.png"},6254:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/action_triggers_3-b7b0703006e7d2634150f51046aeee07.png"},1529:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/action_triggers_4-5442951cfc12f86ae3dd53a44db1f4a1.png"},2340:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/atem-layer-mapping-example-27e578c1e77c25d204a4c8351dcea006.png"},3995:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/route-set-remap-41d0e4796013569f52cb8ed812a689f3.png"},3851:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/route-sets-exclusivity-groups-a8997f2de686f110cc188db78fb413f7.png"}}]);