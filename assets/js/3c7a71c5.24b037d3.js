"use strict";(self.webpackChunksofie_documentation=self.webpackChunksofie_documentation||[]).push([[6107],{5318:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return p}});var a=n(7378);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var u=a.createContext({}),l=function(e){var t=a.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=l(e.components);return a.createElement(u.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,u=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),m=l(n),p=r,f=m["".concat(u,".").concat(p)]||m[p]||d[p]||i;return n?a.createElement(f,o(o({ref:t},c),{},{components:n})):a.createElement(f,o({ref:t},c))}));function p(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=m;var s={};for(var u in t)hasOwnProperty.call(t,u)&&(s[u]=t[u]);s.originalType=e,s.mdxType="string"==typeof e?e:r,o[1]=s;for(var l=2;l<i;l++)o[l]=n[l];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},2440:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return s},contentTitle:function(){return u},metadata:function(){return l},toc:function(){return c},default:function(){return m}});var a=n(5773),r=n(808),i=(n(7378),n(5318)),o=["components"],s={},u="Status views",l={unversionedId:"main/features-and-configuration/status-views",id:"version-1.32.0/main/features-and-configuration/status-views",isDocsHomePage:!1,title:"Status views",description:"System Status",source:"@site/versioned_docs/version-1.32.0/main/features-and-configuration/status-views.md",sourceDirName:"main/features-and-configuration",slug:"/main/features-and-configuration/status-views",permalink:"/tv-automation-server-core/docs/1.32.0/main/features-and-configuration/status-views",editUrl:"https://github.com/nrkno/tv-automation-server-core/edit/master/packages/documentation/versioned_docs/version-1.32.0/main/features-and-configuration/status-views.md",tags:[],version:"1.32.0",frontMatter:{},sidebar:"version-1.32.0/main",previous:{title:"Additional Sofie views",permalink:"/tv-automation-server-core/docs/1.32.0/main/features-and-configuration/sofie-pages"},next:{title:"Sofie Documentation",permalink:"/tv-automation-server-core/docs/1.32.0/main/intro"}},c=[{value:"System Status",id:"system-status",children:[]},{value:"Media Status",id:"media-status",children:[]},{value:"Message queue",id:"message-queue",children:[]},{value:"User Log",id:"user-log",children:[{value:"Columns, explained",id:"columns-explained",children:[]}]},{value:"Evaluations",id:"evaluations",children:[]}],d={toc:c};function m(e){var t=e.components,n=(0,r.Z)(e,o);return(0,i.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"status-views"},"Status views"),(0,i.kt)("h2",{id:"system-status"},"System Status"),(0,i.kt)("p",null,'{% hint style="warning" %}\nDocumentation for this feature is yet to be written.\n{% endhint %}'),(0,i.kt)("p",null,"System and devices statuses are displayed here."),(0,i.kt)("p",null,'{% hint style="info" %}\nAn API endpoint for the system status is also available under the URL ',(0,i.kt)("inlineCode",{parentName:"p"},"/health"),"\n{% endhint %}"),(0,i.kt)("h2",{id:"media-status"},"Media Status"),(0,i.kt)("p",null,'{% hint style="warning" %}\nDocumentation for this feature is yet to be written.\n{% endhint %}'),(0,i.kt)("p",null,"This page displays media transfer statuses."),(0,i.kt)("h2",{id:"message-queue"},"Message queue"),(0,i.kt)("p",null,'{% hint style="warning" %}\nDocumentation for this feature is yet to be written.\n{% endhint %}'),(0,i.kt)("p",null,"Sofie Core can send messages to external systems ","(","such as metadata, as-run-logs",")"," while on air."),(0,i.kt)("p",null,"These messages are retained for a period of time, and can be reviewed in this list."),(0,i.kt)("p",null,"Messages that was not successfully sent can be inspected and re-sent here."),(0,i.kt)("h2",{id:"user-log"},"User Log"),(0,i.kt)("p",null,"The user activity log contains a list of the user-actions that users have previously done. This is used in troubleshooting issues on-air."),(0,i.kt)("p",null,"![](/gitbook/assets/image (15).png)"),(0,i.kt)("h3",{id:"columns-explained"},"Columns, explained"),(0,i.kt)("h4",{id:"execution-time"},"Execution time"),(0,i.kt)("p",null,"The execution time column displays ",(0,i.kt)("strong",{parentName:"p"},"coreDuration")," + ",(0,i.kt)("strong",{parentName:"p"},"gatewayDuration")," ","(",(0,i.kt)("strong",{parentName:"p"},"timelineResolveDuration"),")",'":'),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"coreDuration")," : The time it took for Core to execute the command ","(","ie start-of-command \ud83e\udc3a stored-result-into-database",")"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"gatewayDuration")," : The time it took for Playout Gateway to execute the timeline ","(","ie stored-result-into-database \ud83e\udc3a timeline-resolved \ud83e\udc3a callback-to-core",")"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"timelineResolveDuration"),": The duration it took in TSR ","(","in Playout Gateway",")"," to resolve the timeline")),(0,i.kt)("p",null,"Important to note is that ",(0,i.kt)("strong",{parentName:"p"},"gatewayDuration")," begins at the exact moment ",(0,i.kt)("strong",{parentName:"p"},"coreDuration")," ends.",(0,i.kt)("br",{parentName:"p"}),"\n","So ",(0,i.kt)("strong",{parentName:"p"},"coreDuration + gatewayDuration")," is the full time it took from beginning-of-user-action to the timeline-resolved ","(","plus a little extra for the final callback for reporting the measurement",")","."),(0,i.kt)("h4",{id:"action"},"Action"),(0,i.kt)("p",null,"Describes what action the user did; e g pressed a key, clicked a button, or selected a meny item."),(0,i.kt)("h4",{id:"method"},"Method"),(0,i.kt)("p",null,"The internal name in core of what function was called"),(0,i.kt)("h4",{id:"status"},"Status"),(0,i.kt)("p",null,'The result of the operation. "Success" or an error message.'),(0,i.kt)("h2",{id:"evaluations"},"Evaluations"),(0,i.kt)("p",null,'{% hint style="warning" %}\nDocumentation for this feature is yet to be written.\n{% endhint %}'),(0,i.kt)("p",null,"When a broadcast is done, users can input feedback about how the show went in an evaluation form."),(0,i.kt)("p",null,"The evaluations are listed here."),(0,i.kt)("p",null,'{% hint style="info" %}\nEvaluations can be configured to be sent to Slack, by setting the "Slack webhook URL" under Settings/Studio\n{% endhint %}'))}m.isMDXComponent=!0}}]);