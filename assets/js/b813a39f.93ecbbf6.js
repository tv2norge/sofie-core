"use strict";(self.webpackChunksofie_documentation=self.webpackChunksofie_documentation||[]).push([[7787],{5318:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>m});var i=n(7378);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,i,r=function(e,t){if(null==e)return{};var n,i,r={},a=Object.keys(e);for(i=0;i<a.length;i++)n=a[i],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(i=0;i<a.length;i++)n=a[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=i.createContext({}),p=function(e){var t=i.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=p(e.components);return i.createElement(s.Provider,{value:t},e.children)},c="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},h=i.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),c=p(n),h=r,m=c["".concat(s,".").concat(h)]||c[h]||d[h]||a;return n?i.createElement(m,o(o({ref:t},u),{},{components:n})):i.createElement(m,o({ref:t},u))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,o=new Array(a);o[0]=h;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[c]="string"==typeof e?e:r,o[1]=l;for(var p=2;p<a;p++)o[p]=n[p];return i.createElement.apply(null,o)}return i.createElement.apply(null,n)}h.displayName="MDXCreateElement"},6753:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>f,contentTitle:()=>h,default:()=>y,frontMatter:()=>d,metadata:()=>m,toc:()=>v});var i=n(5773),r=n(7378),a=n(5318);const o=.1,l={width:"100%",backgroundSize:"40px 40px",backgroundImage:"linear-gradient(to right, grey 1px, transparent 1px), linear-gradient(to bottom, grey 1px, transparent 1px)",overflowX:"hidden",display:"flex",flexDirection:"column",position:"relative"};function s(){const[e,t]=(0,r.useState)(0),[n,a]=(0,r.useState)(0),[o,s]=(0,r.useState)(0),[d,h]=(0,r.useState)(0),[m,f]=(0,r.useState)(0),[v,g]=(0,r.useState)(0),[b,y]=(0,r.useState)(0),[k,w]=(0,r.useState)(0),P=2400,T=m-k,x=Math.max(o,d)-b,I=Math.max(0,T,x),D=P+I,O={time:0,duration:D+k+e},E={time:0,duration:D+k+n},N={time:0,duration:Math.max(O.duration,E.duration)},C={time:N.time+N.duration-m-Math.max(e,n),duration:m},B={time:D,duration:v},j=2600,S={time:P,duration:j+I},A={time:D+b-o,duration:j+o},Z={time:D+b-d,duration:j+d},M={time:D+b+300,duration:200};return r.createElement("div",null,r.createElement("div",{style:l},r.createElement(p,(0,i.Z)({},B,{name:"In Transition",color:"pink"})),r.createElement(p,(0,i.Z)({},C,{name:"Out Transition",color:"lightblue"})),r.createElement(p,(0,i.Z)({},N,{name:"PartGroup A",color:"green"})),r.createElement(p,(0,i.Z)({},O,{name:"Piece A1",color:"orange"})),r.createElement(p,(0,i.Z)({},E,{name:"Piece A2",color:"orange"})),r.createElement(p,(0,i.Z)({},S,{name:"PartGroup B",color:"green"})),r.createElement(p,(0,i.Z)({},A,{name:"Piece B1",color:"orange"})),r.createElement(p,(0,i.Z)({},Z,{name:"Piece B2",color:"orange"})),r.createElement(p,(0,i.Z)({},M,{name:"Super B3",color:"orange"})),r.createElement(u,{time:P,title:"Take time"}),r.createElement(u,{time:D,title:"Take Delayed"}),r.createElement(u,{time:D+b,title:"Content Base time"})),r.createElement("table",{className:"margin-top--md"},r.createElement(c,{label:"Piece B1 Preroll Duration",max:1e3,value:o,setValue:s}),r.createElement(c,{label:"Piece B2 Preroll Duration",max:1e3,value:d,setValue:h}),r.createElement(c,{label:"Piece A1 Postroll Duration",max:1e3,value:e,setValue:t}),r.createElement(c,{label:"Piece A2 Postroll Duration",max:1e3,value:n,setValue:a}),r.createElement(c,{label:"Part A Out Transition Duration",max:1e3,value:m,setValue:f}),r.createElement(c,{label:"Part B In Transition Block Duration",max:1e3,value:v,setValue:g}),r.createElement(c,{label:"Part B In Transition Contents Delay",max:1e3,value:b,setValue:y}),r.createElement(c,{label:"Part B In Transition Keepalive",max:1e3,value:k,setValue:w})))}function p(e){let{duration:t,time:n,name:i,color:a}=e;return r.createElement("div",{style:{height:"25px",marginBottom:"2px",whiteSpace:"nowrap",marginLeft:n*o+"px",width:t*o+"px",background:a}},i)}function u(e){let{time:t,title:n}=e;return r.createElement("div",{style:{borderLeft:"2px dashed red",display:"inline-block",width:"1px",float:"left",position:"absolute",top:0,height:"100%",marginLeft:t*o+"px"},title:n},"\xa0")}function c(e){let{label:t,max:n,value:i,setValue:a}=e;return r.createElement("tr",null,r.createElement("td",null,t),r.createElement("td",null,r.createElement("input",{type:"range",min:0,max:n,value:i,onChange:e=>a(parseInt(e.currentTarget.value))})))}const d={},h="Part and Piece Timings",m={unversionedId:"for-developers/for-blueprint-developers/part-and-piece-timings",id:"version-1.47.0/for-developers/for-blueprint-developers/part-and-piece-timings",title:"Part and Piece Timings",description:"Parts and pieces are the core groups that form the timeline, and define start and end caps for the other timeline objects.",source:"@site/versioned_docs/version-1.47.0/for-developers/for-blueprint-developers/part-and-piece-timings.mdx",sourceDirName:"for-developers/for-blueprint-developers",slug:"/for-developers/for-blueprint-developers/part-and-piece-timings",permalink:"/sofie-core/docs/1.47.0/for-developers/for-blueprint-developers/part-and-piece-timings",draft:!1,editUrl:"https://github.com/nrkno/sofie-core/edit/master/packages/documentation/versioned_docs/version-1.47.0/for-developers/for-blueprint-developers/part-and-piece-timings.mdx",tags:[],version:"1.47.0",frontMatter:{},sidebar:"version-1.47.0/forDevelopers",previous:{title:"Lookahead",permalink:"/sofie-core/docs/1.47.0/for-developers/for-blueprint-developers/lookahead"},next:{title:"Timeline Datastore",permalink:"/sofie-core/docs/1.47.0/for-developers/for-blueprint-developers/timeline-datastore"}},f={},v=[{value:"The properties",id:"the-properties",level:3},{value:"Concepts",id:"concepts",level:3},{value:"Piece Preroll",id:"piece-preroll",level:4},{value:"In Transition",id:"in-transition",level:4},{value:"Out Transition",id:"out-transition",level:4},{value:"Piece postroll",id:"piece-postroll",level:3},{value:"Autonext",id:"autonext",level:4},{value:"Infinites",id:"infinites",level:4},{value:"Interactive timings demo",id:"interactive-timings-demo",level:3}],g={toc:v},b="wrapper";function y(e){let{components:t,...n}=e;return(0,a.kt)(b,(0,i.Z)({},g,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"part-and-piece-timings"},"Part and Piece Timings"),(0,a.kt)("p",null,"Parts and pieces are the core groups that form the timeline, and define start and end caps for the other timeline objects."),(0,a.kt)("p",null,"When referring to the timeline in this page, we mean the built timeline objects that is sent to playout-gateway.",(0,a.kt)("br",{parentName:"p"}),"\n","It is made of the previous PartInstance, the current PartInstance and sometimes the next PartInstance."),(0,a.kt)("h3",{id:"the-properties"},"The properties"),(0,a.kt)("p",null,"These are stripped down interfaces, containing only the properties that are relevant for the timeline generation:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"export interface IBlueprintPart {\n    /** Should this item should progress to the next automatically */\n    autoNext?: boolean\n    /** How much to overlap on when doing autonext */\n    autoNextOverlap?: number\n\n    /** Timings for the inTransition, when supported and allowed */\n    inTransition?: IBlueprintPartInTransition\n\n    /** Should we block the inTransition when starting the next Part */\n    disableNextInTransition?: boolean\n\n    /** Timings for the outTransition, when supported and allowed */\n    outTransition?: IBlueprintPartOutTransition\n\n    /** Expected duration of the line, in milliseconds */\n    expectedDuration?: number\n}\n\n/** Timings for the inTransition, when supported and allowed */\nexport interface IBlueprintPartInTransition {\n    /** Duration this transition block a take for. After this time, another take is allowed which may cut this transition off early */\n    blockTakeDuration: number\n    /** Duration the previous part be kept playing once the transition is started. Typically the duration of it remaining in-vision */\n    previousPartKeepaliveDuration: number\n    /** Duration the pieces of the part should be delayed for once the transition starts. Typically the duration until the new part is in-vision */\n    partContentDelayDuration: number\n}\n\n/** Timings for the outTransition, when supported and allowed */\nexport interface IBlueprintPartOutTransition {\n    /** How long to keep this part alive after taken out  */\n    duration: number\n}\n\nexport interface IBlueprintPiece {\n    /** Timeline enabler. When the piece should be active on the timeline. */\n    enable: {\n        start: number | 'now' // 'now' is only valid from adlib-actions when inserting into the current part\n        duration?: number\n    }\n\n    /** Whether this piece is a special piece */\n    pieceType: IBlueprintPieceType\n\n    /// from IBlueprintPieceGeneric:\n\n    /** Whether and how the piece is infinite */\n    lifespan: PieceLifespan\n\n    /**\n     * How long this piece needs to prepare its content before it will have an effect on the output.\n     * This allows for flows such as starting a clip playing, then cutting to it after some ms once the player is outputting frames.\n     */\n    prerollDuration?: number\n}\n\n/** Special types of pieces. Some are not always used in all circumstances */\nexport enum IBlueprintPieceType {\n    Normal = 'normal',\n    InTransition = 'in-transition',\n    OutTransition = 'out-transition',\n}\n")),(0,a.kt)("h3",{id:"concepts"},"Concepts"),(0,a.kt)("h4",{id:"piece-preroll"},"Piece Preroll"),(0,a.kt)("p",null,"Often, a Piece will need some time to do some preparation steps on a device before it should be considered as active. A common example is playing a video, as it often takes the player a couple of frames before the first frame is output to SDI.\nThis can be done with the ",(0,a.kt)("inlineCode",{parentName:"p"},"prerollDuration")," property on the Piece. A general rule to follow is that it should not have any visible or audible effect on the output until ",(0,a.kt)("inlineCode",{parentName:"p"},"prerollDuration")," has elapsed into the piece."),(0,a.kt)("p",null,"When the timeline is built, the Pieces get their start times adjusted to allow for every Piece in the part to have its preroll time. If you look at the auto-generated pieceGroup timeline objects, their times will rarely match the times specified by the blueprints. Additionally, the previous Part will overlap into the Part long enough for the preroll to complete."),(0,a.kt)("p",null,"Try the interactive to see how the prerollDuration properties interact."),(0,a.kt)("h4",{id:"in-transition"},"In Transition"),(0,a.kt)("p",null,"The in transition is a special Piece that can be played when taking into a Part. It is represented as a Piece, partly to show the user the transition type and duration, and partly to allow for timeline changes to be applied when the timeline generation thinks appropriate."),(0,a.kt)("p",null,"When the ",(0,a.kt)("inlineCode",{parentName:"p"},"inTransition")," is set on a Part, it will be applied when taking into that Part. During this time, any Pieces with ",(0,a.kt)("inlineCode",{parentName:"p"},"pieceType: IBlueprintPieceType.InTransition")," will be added to the timeline, and the ",(0,a.kt)("inlineCode",{parentName:"p"},"IBlueprintPieceType.Normal")," Pieces in the Part will be delayed based on the numbers from ",(0,a.kt)("inlineCode",{parentName:"p"},"inTransition")),(0,a.kt)("p",null,"Try the interactive to see how the an inTransition affects the Piece and Part layout."),(0,a.kt)("h4",{id:"out-transition"},"Out Transition"),(0,a.kt)("p",null,"The out transition is a special Piece that gets played when taking out of the Part. It is intended to allow for some 'visual cleanup' before the take occurs."),(0,a.kt)("p",null,"In effect, when ",(0,a.kt)("inlineCode",{parentName:"p"},"outTransition")," is set on a Part, the take out of the Part will be delayed by the duration defined. During this time, any pieces with ",(0,a.kt)("inlineCode",{parentName:"p"},"pieceType: IBlueprintPieceType.OutTransition")," will be added to the timeline and will run until the end of the Part."),(0,a.kt)("p",null,"Try the interactive to see how this affects the Parts."),(0,a.kt)("h3",{id:"piece-postroll"},"Piece postroll"),(0,a.kt)("p",null,"Sometimes rather than extending all the pieces and playing an out transition piece on top we want all pieces to stop except for 1, this has the same goal of 'visual cleanup' as the out transition but works slightly different. The main concept is that an out transition delays the take slightly but with postroll the take executes normally however the pieces with postroll will keep playing for a bit after the take."),(0,a.kt)("p",null,"When the ",(0,a.kt)("inlineCode",{parentName:"p"},"postrollDuration")," is set on a piece the part group will be extended slightly allowing pieces to play a little longer, however any piece that do not have postroll will end at their regular time."),(0,a.kt)("h4",{id:"autonext"},"Autonext"),(0,a.kt)("p",null,"Autonext is a way for a Part to be made a fixed length. After playing for its ",(0,a.kt)("inlineCode",{parentName:"p"},"expectedDuration"),", core will automatically perform a take into the next part. This is commonly used for fullscreen videos, to exit back to a camera before the video freezes on the last frame. It is enabled by setting the ",(0,a.kt)("inlineCode",{parentName:"p"},"autoNext: true")," on a Part, and requires ",(0,a.kt)("inlineCode",{parentName:"p"},"expectedDuration")," to be set to a duration higher than ",(0,a.kt)("inlineCode",{parentName:"p"},"1000"),"."),(0,a.kt)("p",null,"In other situations, it can be desirable for a Part to overlap the next one for a few seconds. This is common for Parts such as a title sequence or bumpers, where the sequence ends with an keyer effect which should reveal the next Part.\nTo achieve this you can set ",(0,a.kt)("inlineCode",{parentName:"p"},"autoNextOverlap: 1000 // ms")," to make the parts overlap on the timeline. In doing so, the in transition for the next Part will be ignored."),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"autoNextOverlap")," property can be thought of an override for the intransition on the next part defined as:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"const inTransition = {\n    blockTakeDuration: 1000,\n    partContentDelayDuration: 0,\n    previousPartKeepaliveDuration: 1000,\n}\n")),(0,a.kt)("h4",{id:"infinites"},"Infinites"),(0,a.kt)("p",null,"Pieces with an infinite lifespan (ie, not ",(0,a.kt)("inlineCode",{parentName:"p"},"lifespan: PieceLifespan.WithinPart"),") get handled differently to other pieces."),(0,a.kt)("p",null,"Only one pieceGoup is created for an infinite Piece which is present in multiple of the current, next and previous Parts.",(0,a.kt)("br",{parentName:"p"}),"\n","The Piece calculates and tracks its own started playback times, which is preserved and reused in future takes. On the timeline it lives outside of the partGroups, but still gets the same caps applied when appropriate."),(0,a.kt)("h3",{id:"interactive-timings-demo"},"Interactive timings demo"),(0,a.kt)("p",null,"Use the sliders below to see how various Preroll and In & Out Transition timing properties interact with each other."),(0,a.kt)(s,{mdxType:"PartTimingsDemo"}))}y.isMDXComponent=!0}}]);