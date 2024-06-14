"use strict";(self.webpackChunksofie_documentation=self.webpackChunksofie_documentation||[]).push([[7736],{5318:(e,t,a)=>{a.d(t,{Zo:()=>d,kt:()=>m});var n=a(7378);function o(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){o(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,n,o=function(e,t){if(null==e)return{};var a,n,o={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(o[a]=e[a]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(o[a]=e[a])}return o}var l=n.createContext({}),p=function(e){var t=n.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},d=function(e){var t=p(e.components);return n.createElement(l.Provider,{value:t},e.children)},u="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},h=n.forwardRef((function(e,t){var a=e.components,o=e.mdxType,r=e.originalType,l=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),u=p(a),h=o,m=u["".concat(l,".").concat(h)]||u[h]||c[h]||r;return a?n.createElement(m,i(i({ref:t},d),{},{components:a})):n.createElement(m,i({ref:t},d))}));function m(e,t){var a=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=a.length,i=new Array(r);i[0]=h;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[u]="string"==typeof e?e:o,i[1]=s;for(var p=2;p<r;p++)i[p]=a[p];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}h.displayName="MDXCreateElement"},1410:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>c,frontMatter:()=>r,metadata:()=>s,toc:()=>p});var n=a(5773),o=(a(7378),a(5318));const r={},i="Google Spreadsheet Gateway",s={unversionedId:"user-guide/installation/installing-a-gateway/rundown-or-newsroom-system-connection/installing-sofie-with-google-spreadsheet-support",id:"version-1.38.0/user-guide/installation/installing-a-gateway/rundown-or-newsroom-system-connection/installing-sofie-with-google-spreadsheet-support",title:"Google Spreadsheet Gateway",description:"The Spreadsheet Gateway is an application for piping data between Sofie&nbsp;Core and Spreadsheets on Google Drive.",source:"@site/versioned_docs/version-1.38.0/user-guide/installation/installing-a-gateway/rundown-or-newsroom-system-connection/installing-sofie-with-google-spreadsheet-support.md",sourceDirName:"user-guide/installation/installing-a-gateway/rundown-or-newsroom-system-connection",slug:"/user-guide/installation/installing-a-gateway/rundown-or-newsroom-system-connection/installing-sofie-with-google-spreadsheet-support",permalink:"/sofie-core/docs/1.38.0/user-guide/installation/installing-a-gateway/rundown-or-newsroom-system-connection/installing-sofie-with-google-spreadsheet-support",draft:!1,editUrl:"https://github.com/nrkno/sofie-core/edit/master/packages/documentation/versioned_docs/version-1.38.0/user-guide/installation/installing-a-gateway/rundown-or-newsroom-system-connection/installing-sofie-with-google-spreadsheet-support.md",tags:[],version:"1.38.0",frontMatter:{},sidebar:"version-1.38.0/userGuide",previous:{title:"iNEWS Gateway",permalink:"/sofie-core/docs/1.38.0/user-guide/installation/installing-a-gateway/rundown-or-newsroom-system-connection/inews-gateway"},next:{title:"Rundown & Newsroom Systems",permalink:"/sofie-core/docs/1.38.0/user-guide/installation/installing-a-gateway/rundown-or-newsroom-system-connection/intro"}},l={},p=[{value:"Example Blueprints for Spreadsheet Gateway",id:"example-blueprints-for-spreadsheet-gateway",level:3},{value:"Spreadsheet Gateway Configuration",id:"spreadsheet-gateway-configuration",level:3},{value:"Further Reading",id:"further-reading",level:3}],d={toc:p},u="wrapper";function c(e){let{components:t,...r}=e;return(0,o.kt)(u,(0,n.Z)({},d,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"google-spreadsheet-gateway"},"Google Spreadsheet Gateway"),(0,o.kt)("p",null,"The Spreadsheet Gateway is an application for piping data between Sofie","\xa0","Core and Spreadsheets on Google Drive."),(0,o.kt)("h3",{id:"example-blueprints-for-spreadsheet-gateway"},"Example Blueprints for Spreadsheet Gateway"),(0,o.kt)("p",null,"To begin with, you will need to install a set of Blueprints that can handle the data being sent from the ",(0,o.kt)("em",{parentName:"p"},"Gateway")," to ",(0,o.kt)("em",{parentName:"p"},"Sofie","\xa0","Core"),". Download the ",(0,o.kt)("inlineCode",{parentName:"p"},"demo-blueprints-r*.zip")," file containing the blueprints you need from the ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/SuperFlyTV/sofie-demo-blueprints/releases"},"Demo Blueprints GitHub Repository"),". It is recommended to choose the newest release but, an older ",(0,o.kt)("em",{parentName:"p"},"Sofie","\xa0","Core")," version may require a different Blueprint version. The ",(0,o.kt)("em",{parentName:"p"},"Rundown page")," will warn you about any issue and display the desired versions."),(0,o.kt)("p",null,"Instructions on how to install any Blueprint can be found in the ",(0,o.kt)("a",{parentName:"p",href:"../../installing-blueprints"},"Installing Blueprints")," section from earlier."),(0,o.kt)("h3",{id:"spreadsheet-gateway-configuration"},"Spreadsheet Gateway Configuration"),(0,o.kt)("p",null,"If you are using the Docker version of Sofie, then the Spreadsheet Gateway will come preinstalled. For those who are not, please follow the ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/SuperFlyTV/spreadsheet-gateway"},"instructions listed on the GitHub page")," labeled ",(0,o.kt)("em",{parentName:"p"},"Installation ","(","for developers",")",".")),(0,o.kt)("p",null,"Once the Gateway has been installed, you can navigate to the ",(0,o.kt)("em",{parentName:"p"},"Settings page")," and check the newly added Gateway is listed as ",(0,o.kt)("em",{parentName:"p"},"Spreadsheet Gateway")," under the ",(0,o.kt)("em",{parentName:"p"},"Devices section"),"."),(0,o.kt)("p",null,"Before you select the Device, you want to add it to the current ",(0,o.kt)("em",{parentName:"p"},"Studio")," you are using. Select your current Studio from the menu and navigate to the ",(0,o.kt)("em",{parentName:"p"},"Attached Devices")," option. Click the ",(0,o.kt)("em",{parentName:"p"},"+")," icon and select the Spreadsheet Gateway."),(0,o.kt)("p",null,"Now you can select the ",(0,o.kt)("em",{parentName:"p"},"Device")," from the ",(0,o.kt)("em",{parentName:"p"},"Devices menu")," and click the link provided to enable your Google Drive API to send files to the ",(0,o.kt)("em",{parentName:"p"},"Sofie","\xa0","Core"),". The page that opens will look similar to the image below."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Nodejs Quickstart page",src:a(5295).Z,width:"1541",height:"851"}),"\nxx\nMake sure to follow the steps in ",(0,o.kt)("strong",{parentName:"p"},"Create a project and enable the API")," and enable the ",(0,o.kt)("strong",{parentName:"p"},"Google Drive API")," as well as the ",(0,o.kt)("strong",{parentName:"p"},"Google Sheets API"),'. Your "APIs and services" Dashboard should now look as follows:'),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"APIs and Services Dashboard",src:a(7750).Z,width:"1541",height:"851"})),(0,o.kt)("p",null,"Now follow the steps in ",(0,o.kt)("strong",{parentName:"p"},"Create credentials")," and make sure to create an ",(0,o.kt)("strong",{parentName:"p"},"OAuth Client ID")," for a ",(0,o.kt)("strong",{parentName:"p"},"Desktop App")," and download the credentials file."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Create Credentials page",src:a(4601).Z,width:"1541",height:"851"})),(0,o.kt)("p",null,"Use the button to download the configuration to a file and navigate back to ",(0,o.kt)("em",{parentName:"p"},"Sofie","\xa0","Core's Settings page"),". Select the Spreadsheet Gateway, then click the ",(0,o.kt)("em",{parentName:"p"},"Browse")," button and upload the configuration file you just downloaded. A new link will appear to confirm access to your google drive account. Select the link and in the new window, select the Google account you would like to use. Currently, the Sofie","\xa0","Core Application is not verified with Google so you will need to acknowledge this and proceed passed the unverified page. Click the ",(0,o.kt)("em",{parentName:"p"},"Advanced")," button and then click ",(0,o.kt)("em",{parentName:"p"},"Go to QuickStart ","("," Unsafe ",")"),"."),(0,o.kt)("p",null,"After navigating through the prompts you are presented with your verification code. Copy this code into the input field on the ",(0,o.kt)("em",{parentName:"p"},"Settings page")," and the field should be removed. A message confirming the access token was saved will appear."),(0,o.kt)("p",null,"You can now navigate to your Google Drive account and create a new folder for your rundowns. It is important that this folder has a unique name. Next, navigate back to ",(0,o.kt)("em",{parentName:"p"},"Sofie","\xa0","Core's Settings page")," and add the folder name to the appropriate input."),(0,o.kt)("p",null,"The indicator should now read ",(0,o.kt)("em",{parentName:"p"},"Good, Watching folder 'Folder Name Here'"),". Now you just need an example rundown.",(0,o.kt)("a",{parentName:"p",href:"https://docs.google.com/spreadsheets/d/1iyegRv5MxYYtlVu8uEEMkBYXsLL-71PAMrNW0ZfWRUw/edit?usp=sharing"}," Navigate to this Google Sheets file")," and select the ",(0,o.kt)("em",{parentName:"p"},"File")," menu and then select ",(0,o.kt)("em",{parentName:"p"},"Make a copy"),". In the popup window, select ",(0,o.kt)("em",{parentName:"p"},"My Drive")," and then navigate to and select the rundowns folder you created earlier."),(0,o.kt)("p",null,"At this point, one of two things will happen. If you have the Google Sheets API enabled, this is different from the Google Drive API you enabled earlier, then the Rundown you just copied will appear in the Rundown page and is accessible. The other outcome is the Spreadsheet Gateway status reads ",(0,o.kt)("em",{parentName:"p"},"Unknown, Initializing...")," which most likely means you need to enable the Google Sheets API. Navigate to the",(0,o.kt)("a",{parentName:"p",href:"https://console.developers.google.com/apis/library/sheets.googleapis.com?"}," Google Sheets API Dashboard with this link")," and click the ",(0,o.kt)("em",{parentName:"p"},"Enable")," button. Navigate back to ",(0,o.kt)("em",{parentName:"p"},"Sofie's Settings page")," and restart the Spreadsheet Gateway. The status should now read, ",(0,o.kt)("em",{parentName:"p"},"Good, Watching folder 'Folder Name Here'")," and the rundown will appear in the ",(0,o.kt)("em",{parentName:"p"},"Rundown page"),"."),(0,o.kt)("h3",{id:"further-reading"},"Further Reading"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://github.com/SuperFlyTV/sofie-demo-blueprints/"},"Demo Blueprints")," GitHub Page for Developers"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://docs.google.com/spreadsheets/d/1iyegRv5MxYYtlVu8uEEMkBYXsLL-71PAMrNW0ZfWRUw/edit?usp=sharing"},"Example Rundown")," provided by Sofie."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://console.developers.google.com/apis/library/sheets.googleapis.com?"},"Google Sheets API")," on the Google Developer website."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://github.com/SuperFlyTV/spreadsheet-gateway"},"Spreadsheet Gateway")," GitHub Page for Developers")))}c.isMDXComponent=!0},7750:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/apis-and-services-dashboard-848db40581ffffcda429b3b3db805c70.png"},4601:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/create-credentials-a4f8a433801082fc586b9b55b38d59de.png"},5295:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/nodejs-quickstart-79400c9b984220155fe8e610761f2d45.png"}}]);