(this["webpackJsonpclient-ui"]=this["webpackJsonpclient-ui"]||[]).push([[0],{102:function(e,a,t){e.exports=t(113)},107:function(e,a,t){},113:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),l=t(10),c=t.n(l),i=(t(107),t(178)),o=t(40),m=t(8),s=t(67),u=t(83),d=t(168),E=t(5),p=t(173),g=t(46),h=t(164),b=t(2),v=t(3),f=t(159),x=t(175),y=t(155),w=t(156),j=t(157),N=t(158),O=t(75),C=t.n(O),k=t(57),T=t.n(k),I=t(58),D=t.n(I),P=t(68),S=t.n(P),B=t(69),W=t.n(B),M=t(70),A=t.n(M),F=t(71),R=t.n(F),z=t(73),H=t.n(z),L=t(72),U=t.n(L),G=t(74),Y=t.n(G),J=t(45),K=[{id:"Develop",children:[{id:"Projects",icon:r.a.createElement(T.a,null),to:"/",active:!0},{id:"New Project",icon:r.a.createElement(D.a,null),to:"/new-project"},{id:"Calendar",icon:r.a.createElement(S.a,null),to:"/calendar"},{id:"Project Status",icon:r.a.createElement(W.a,null),to:"/project-statuses"},{id:"Issues",icon:r.a.createElement(A.a,null),to:"/issues"},{id:"ML Kit",icon:r.a.createElement(R.a,null),to:"/test"}]},{id:"Administrator",children:[{id:"Users",icon:r.a.createElement(T.a,null),to:"/users",active:!0},{id:"Groups",icon:r.a.createElement(D.a,null),to:"/groups"}]},{id:"Quality",children:[{id:"Analytics",icon:r.a.createElement(U.a,null),to:"/analytics"},{id:"Performance",icon:r.a.createElement(H.a,null),to:"/performance"},{id:"Test Lab",icon:r.a.createElement(Y.a,null),to:"/test-lab"}]}];var Q=Object(E.a)((function(e){return{categoryHeader:{paddingTop:e.spacing(2),paddingBottom:e.spacing(2)},categoryHeaderPrimary:{color:e.palette.common.white},item:{paddingTop:1,paddingBottom:1,color:"rgba(255, 255, 255, 0.7)","&:hover,&:focus":{backgroundColor:"rgba(255, 255, 255, 0.08)"}},itemCategory:{backgroundColor:"#232f3e",boxShadow:"0 -1px 0 #404854 inset",paddingTop:e.spacing(2),paddingBottom:e.spacing(2)},firebase:{fontSize:24,color:e.palette.common.white},itemActiveItem:{color:"#4fc3f7"},itemPrimary:{fontSize:"inherit"},itemIcon:{minWidth:"auto",marginRight:e.spacing(2)},divider:{marginTop:e.spacing(2)}}}))((function(e){var a=e.classes,t=Object(b.a)(e,["classes"]);return r.a.createElement(n.Fragment,null,r.a.createElement(x.a,Object.assign({variant:"permanent"},t),r.a.createElement(y.a,{disablePadding:!0},r.a.createElement(w.a,{className:Object(v.a)(a.firebase,a.item,a.itemCategory)},"ONClick"),r.a.createElement(w.a,{className:Object(v.a)(a.item,a.itemCategory)},r.a.createElement(j.a,{className:a.itemIcon},r.a.createElement(C.a,null)),r.a.createElement(N.a,{classes:{primary:a.itemPrimary}},"Home")),K.map((function(e){var t=e.id,n=e.children;return r.a.createElement(r.a.Fragment,{key:t},r.a.createElement(w.a,{className:a.categoryHeader},r.a.createElement(N.a,{classes:{primary:a.categoryHeaderPrimary}},t)),n.map((function(e){var t=e.id,n=e.icon,l=e.active,c=e.to;return r.a.createElement(w.a,{key:t,button:!0,className:Object(v.a)(a.item,l&&a.itemActiveItem),component:J.b,to:c},r.a.createElement(j.a,{className:a.itemIcon},n),r.a.createElement(N.a,{classes:{primary:a.itemPrimary}},t))})),r.a.createElement(f.a,{className:a.divider}))})))))})),$=t(160),q=t(161),V=t(114),X=t(162),Z=t(166),_=t(169),ee=t(176),ae=t(163),te=t(81),ne=t.n(te),re=t(82),le=t.n(re),ce=t(177),ie=t(80),oe=t.n(ie),me=t(77),se=t.n(me),ue=t(79),de=t.n(ue);var Ee=Object(E.a)((function(e){return{secondaryBar:{zIndex:0},menuButton:{marginLeft:-e.spacing(1)},iconButtonAvatar:{padding:4},link:{textDecoration:"none",color:"rgba(255, 255, 255, 0.7)","&:hover":{color:e.palette.common.white}},button:{borderColor:"rgba(255, 255, 255, 0.7)"}}}))((function(e){var a=e.classes,t=e.onDrawerToggle;return r.a.createElement(r.a.Fragment,null,r.a.createElement($.a,{color:"primary",position:"sticky",elevation:0},r.a.createElement(q.a,null,r.a.createElement(X.a,{container:!0,spacing:1,alignItems:"center"},r.a.createElement(p.a,{smUp:!0},r.a.createElement(X.a,{item:!0},r.a.createElement(ae.a,{color:"inherit","aria-label":"open drawer",onClick:t,className:a.menuButton},r.a.createElement(se.a,null)))),r.a.createElement(X.a,{item:!0,xs:!0}),r.a.createElement(X.a,{item:!0},r.a.createElement(h.a,{className:a.link,href:"#",variant:"body2"},"Go to docs")),r.a.createElement(X.a,{item:!0},r.a.createElement(ee.a,{title:"Alerts \u2022 No alerts"},r.a.createElement(ae.a,{color:"inherit"},r.a.createElement(de.a,null)))),r.a.createElement(X.a,{item:!0},r.a.createElement(ae.a,{color:"inherit",className:a.iconButtonAvatar},r.a.createElement(ce.a,{src:"/static/images/avatar/1.jpg",alt:"My Avatar"})))))),r.a.createElement($.a,{component:"div",className:a.secondaryBar,color:"primary",position:"static",elevation:0},r.a.createElement(q.a,null,r.a.createElement(X.a,{container:!0,alignItems:"center",spacing:1},r.a.createElement(X.a,{item:!0,xs:!0},r.a.createElement(g.a,{color:"inherit",variant:"h5",component:"h1"},e.text)),r.a.createElement(X.a,{item:!0},r.a.createElement(Z.a,{className:a.button,variant:"outlined",color:"inherit",size:"small"},"Web setup")),r.a.createElement(X.a,{item:!0},r.a.createElement(ee.a,{title:"Help"},r.a.createElement(ae.a,{color:"inherit"},r.a.createElement(oe.a,null))))))),r.a.createElement($.a,{component:"div",className:a.secondaryBar,color:"primary",position:"static",elevation:0},e.children))}));var pe=Object(E.a)((function(e){return{paper:{maxWidth:936,margin:"auto",overflow:"hidden"},searchBar:{borderBottom:"1px solid rgba(0, 0, 0, 0.12)"},searchInput:{fontSize:e.typography.fontSize},block:{display:"block"},addUser:{marginRight:e.spacing(1)},contentWrapper:{margin:"40px 16px"}}}))((function(e){var a=e.classes,t=e.onDrawerToggle;return r.a.createElement(n.Fragment,null,r.a.createElement(Ee,{onDrawerToggle:t,text:"Your Projects"}),r.a.createElement("main",{className:a.main},r.a.createElement(V.a,{className:a.paper},r.a.createElement($.a,{className:a.searchBar,position:"static",color:"default",elevation:0},r.a.createElement(q.a,null,r.a.createElement(X.a,{container:!0,spacing:2,alignItems:"center"},r.a.createElement(X.a,{item:!0},r.a.createElement(ne.a,{className:a.block,color:"inherit"})),r.a.createElement(X.a,{item:!0,xs:!0},r.a.createElement(_.a,{fullWidth:!0,placeholder:"Search by email address, phone number, or user UID",InputProps:{disableUnderline:!0,className:a.searchInput}})),r.a.createElement(X.a,{item:!0},r.a.createElement(Z.a,{variant:"contained",color:"primary",className:a.addUser},"Add user"),r.a.createElement(ee.a,{title:"Reload"},r.a.createElement(ae.a,null,r.a.createElement(le.a,{className:a.block,color:"inherit"}))))))),r.a.createElement("div",{className:a.contentWrapper},r.a.createElement(g.a,{color:"textSecondary",align:"center"},"No users for this project yet")))))})),ge=t(35);function he(e){var a=e.classes,t=e.onDrawerToggle;return r.a.createElement(n.Fragment,null,r.a.createElement(Ee,{onDrawerToggle:t,text:"Your Projects"}),r.a.createElement("main",{className:a.main},r.a.createElement("h1",null,"Projects")))}var be=t(171),ve=t(167),fe=t(172);function xe(){return r.a.createElement("div",null,"Project Overview")}function ye(){return r.a.createElement("div",null,"Activity")}function we(){return r.a.createElement("div",null,"Issues")}function je(){return r.a.createElement("div",null,"New Issue")}function Ne(){return r.a.createElement("div",null,"Gantt")}function Oe(){return r.a.createElement("div",null,"Calendar")}function Ce(){return r.a.createElement("div",null,"News")}function ke(){return r.a.createElement("div",null,"Documents")}function Te(){return r.a.createElement("div",null,"Wiki")}function Ie(){return r.a.createElement("div",null,"Files")}function De(){return r.a.createElement("div",null,"Settings")}function Pe(e){var a=e.children,t=e.value,n=e.index,l=Object(b.a)(e,["children","value","index"]);return r.a.createElement(g.a,Object.assign({component:"div",role:"tabpanel",hidden:t!==n,id:"simple-tabpanel-".concat(n),"aria-labelledby":"simple-tab-".concat(n)},l),t===n&&r.a.createElement(be.a,{p:3},a))}function Se(e){return{id:"simple-tab-".concat(e),"aria-controls":"simple-tabpanel-".concat(e)}}function Be(e){var a=e.classes,t=e.onDrawerToggle,l=r.a.useState(0),c=Object(o.a)(l,2),i=c[0],m=c[1];return r.a.createElement(n.Fragment,null,r.a.createElement(Ee,{onDrawerToggle:t,text:"Project title here"},r.a.createElement(fe.a,{value:i,onChange:function(e,a){m(a)},textColor:"inherit"},r.a.createElement(ve.a,Object.assign({textColor:"inherit"},Se(0),{label:"Overview"})),r.a.createElement(ve.a,Object.assign({textColor:"inherit"},Se(1),{label:"Activity"})),r.a.createElement(ve.a,Object.assign({textColor:"inherit"},Se(2),{label:"Issues"})),r.a.createElement(ve.a,Object.assign({textColor:"inherit"},Se(3),{label:"New Issue"})),r.a.createElement(ve.a,Object.assign({textColor:"inherit"},Se(4),{label:"Gantt"})),r.a.createElement(ve.a,Object.assign({textColor:"inherit"},Se(5),{label:"Calendar"})),r.a.createElement(ve.a,Object.assign({textColor:"inherit"},Se(6),{label:"News"})),r.a.createElement(ve.a,Object.assign({textColor:"inherit"},Se(7),{label:"Documents"})),r.a.createElement(ve.a,Object.assign({textColor:"inherit"},Se(8),{label:"Wiki"})),r.a.createElement(ve.a,Object.assign({textColor:"inherit"},Se(9),{label:"Files"})),r.a.createElement(ve.a,Object.assign({textColor:"inherit"},Se(10),{label:"Settings"})))),r.a.createElement("main",{className:a.main},r.a.createElement(Pe,{value:i,index:0},r.a.createElement(xe,null)),r.a.createElement(Pe,{value:i,index:1},r.a.createElement(ye,null)),r.a.createElement(Pe,{value:i,index:2},r.a.createElement(we,null)),r.a.createElement(Pe,{value:i,index:3},r.a.createElement(je,null)),r.a.createElement(Pe,{value:i,index:4},r.a.createElement(Ne,null)),r.a.createElement(Pe,{value:i,index:5},r.a.createElement(Oe,null)),r.a.createElement(Pe,{value:i,index:6},r.a.createElement(Ce,null)),r.a.createElement(Pe,{value:i,index:7},r.a.createElement(ke,null)),r.a.createElement(Pe,{value:i,index:8},r.a.createElement(Te,null)),r.a.createElement(Pe,{value:i,index:9},r.a.createElement(Ie,null)),r.a.createElement(Pe,{value:i,index:10},r.a.createElement(De,null))))}function We(e){var a=e.classes,t=e.onDrawerToggle;return r.a.createElement(ge.c,null,r.a.createElement(ge.a,{exact:!0,path:"/"},r.a.createElement(he,{classes:a,onDrawerToggle:t})),r.a.createElement(ge.a,{exact:!0,path:"/project"},r.a.createElement(Be,{classes:a,onDrawerToggle:t})),r.a.createElement(ge.a,{path:"/users"},r.a.createElement(pe,{classes:a,onDrawerToggle:t})))}function Me(){return r.a.createElement(g.a,{variant:"body2",color:"textSecondary",align:"center"},"Copyright \xa9 ",r.a.createElement(h.a,{color:"inherit",href:"https://material-ui.com/"},"ONClick")," ",(new Date).getFullYear(),".")}var Ae=Object(u.a)({palette:{primary:{light:"#63ccff",main:"#009be5",dark:"#006db3"}},typography:{h5:{fontWeight:500,fontSize:26,letterSpacing:.5}},shape:{borderRadius:8},props:{MuiTab:{disableRipple:!0}},mixins:{toolbar:{minHeight:48}}});Ae=Object(s.a)({},Ae,{overrides:{MuiDrawer:{paper:{backgroundColor:"#18202c"}},MuiButton:{label:{textTransform:"none"},contained:{boxShadow:"none","&:active":{boxShadow:"none"}}},MuiTabs:{root:{marginLeft:Ae.spacing(1)},indicator:{height:3,borderTopLeftRadius:3,borderTopRightRadius:3,backgroundColor:Ae.palette.common.white}},MuiTab:{root:Object(m.a)({textTransform:"none",margin:"0 16px",minWidth:0,padding:0},Ae.breakpoints.up("md"),{padding:0,minWidth:0})},MuiIconButton:{root:{padding:Ae.spacing(1)}},MuiTooltip:{tooltip:{borderRadius:4}},MuiDivider:{root:{backgroundColor:"#404854"}},MuiListItemText:{primary:{fontWeight:Ae.typography.fontWeightMedium}},MuiListItemIcon:{root:{color:"inherit",marginRight:0,"& svg":{fontSize:20}}},MuiAvatar:{root:{width:32,height:32}}}});var Fe={root:{display:"flex",minHeight:"100vh"},drawer:Object(m.a)({},Ae.breakpoints.up("sm"),{width:256,flexShrink:0}),app:{flex:1,display:"flex",flexDirection:"column"},main:{flex:1,padding:Ae.spacing(6,4),background:"#eaeff1"},footer:{padding:Ae.spacing(2),background:"#eaeff1"}};var Re=Object(E.a)(Fe)((function(e){var a=e.classes,t=r.a.useState(!1),n=Object(o.a)(t,2),l=n[0],c=n[1],m=function(){c(!l)};return r.a.createElement(d.a,{theme:Ae},r.a.createElement("div",{className:a.root},r.a.createElement(i.a,null),r.a.createElement("nav",{className:a.drawer},r.a.createElement(p.a,{smUp:!0,implementation:"js"},r.a.createElement(Q,{PaperProps:{style:{width:256}},variant:"temporary",open:l,onClose:m})),r.a.createElement(p.a,{xsDown:!0,implementation:"css"},r.a.createElement(Q,{PaperProps:{style:{width:256}}}))),r.a.createElement("div",{className:a.app},r.a.createElement(We,{classes:a,onDrawerToggle:m}),r.a.createElement("footer",{className:a.footer},r.a.createElement(Me,null)))))}));var ze=function(){return r.a.createElement(n.Fragment,null,r.a.createElement(i.a,null),r.a.createElement(Re,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(J.a,null,r.a.createElement(ze,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[102,1,2]]]);
//# sourceMappingURL=main.4b580081.chunk.js.map