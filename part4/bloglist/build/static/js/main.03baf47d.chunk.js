(this["webpackJsonpbloglist-frontend"]=this["webpackJsonpbloglist-frontend"]||[]).push([[0],{41:function(t,e,n){"use strict";n.r(e);var r=n(1),a=n(16),c=n.n(a),u=n(4),s=n.n(u),o=n(5),i=n(3),b=n(0),j=function(t){var e=t.blog;return Object(b.jsxs)("div",{children:[e.title," ",e.author]})},l=n(6),O=n.n(l),p=function(){return O.a.get("/api/blogs").then((function(t){return t.data}))},d={login:function(){var t=Object(o.a)(s.a.mark((function t(e){var n;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,O.a.post("/api/login",e);case 2:return n=t.sent,t.abrupt("return",n.data);case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},f=function(){var t=Object(r.useState)([]),e=Object(i.a)(t,2),n=e[0],a=e[1],c=Object(r.useState)(""),u=Object(i.a)(c,2),l=(u[0],u[1],Object(r.useState)("")),O=Object(i.a)(l,2),f=(O[0],O[1],Object(r.useState)("")),v=Object(i.a)(f,2),h=(v[0],v[1],Object(r.useState)(null)),g=Object(i.a)(h,2),x=(g[0],g[1]),m=Object(r.useState)(""),w=Object(i.a)(m,2),S=w[0],y=w[1],k=Object(r.useState)(""),B=Object(i.a)(k,2),C=B[0],E=B[1],J=Object(r.useState)(null),P=Object(i.a)(J,2),U=P[0],D=P[1];Object(r.useEffect)((function(){p().then((function(t){return a(t)}))}),[]);var F=function(){var t=Object(o.a)(s.a.mark((function t(e){var n;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.preventDefault(),console.log("logging in with ",S,C),t.prev=2,t.next=5,d.login({username:S,password:C});case 5:n=t.sent,D(n),y(""),E(""),t.next=15;break;case 11:t.prev=11,t.t0=t.catch(2),x("Wrong credentials"),setTimeout((function(){x(null)}),5e3);case 15:case"end":return t.stop()}}),t,null,[[2,11]])})));return function(e){return t.apply(this,arguments)}}();return Object(b.jsxs)("div",{children:[Object(b.jsx)("h2",{children:"Blogs"}),null===U?Object(b.jsxs)("form",{onSubmit:F,children:[Object(b.jsxs)("div",{children:["Username:"," ",Object(b.jsx)("input",{type:"text",value:S,name:"Username",onChange:function(t){var e=t.target;return y(e.value)}})]}),Object(b.jsxs)("div",{children:["Password:"," ",Object(b.jsx)("input",{type:"password",value:C,name:"Password",onChange:function(t){var e=t.target;return E(e.value)}})]}),Object(b.jsx)("div",{children:Object(b.jsx)("button",{type:"submit",children:"Login"})})]}):{blogForm:function(){n.map((function(t){return Object(b.jsx)(j,{blog:t},t.id)}))}}]})};c.a.render(Object(b.jsx)(f,{}),document.getElementById("root"))}},[[41,1,2]]]);
//# sourceMappingURL=main.03baf47d.chunk.js.map