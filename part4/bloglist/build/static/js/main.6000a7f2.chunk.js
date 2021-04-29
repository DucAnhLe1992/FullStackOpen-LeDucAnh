(this["webpackJsonpbloglist-frontend"]=this["webpackJsonpbloglist-frontend"]||[]).push([[0],{41:function(e,t,n){},42:function(e,t,n){"use strict";n.r(t);var r=n(1),a=n(16),c=n.n(a),u=n(3),s=n.n(u),o=n(5),i=n(4),l=n(0),j=function(e){var t=e.blog;return Object(l.jsxs)("div",{children:['"',t.title,'": by ',t.author]})},b=n(6),d=n.n(b),f="/api/blogs",v=null,p={getAll:function(){return d.a.get(f).then((function(e){return e.data}))},create:function(){var e=Object(o.a)(s.a.mark((function e(t){var n,r;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={headers:{Authorization:v}},e.next=3,d.a.post(f,t,n);case 3:return r=e.sent,e.abrupt("return",r.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),update:function(e,t){return d.a.put("".concat(f,"/").concat(e),t).then((function(e){return e.data}))},setToken:function(e){v="bearer ".concat(e)}},O={login:function(){var e=Object(o.a)(s.a.mark((function e(t){var n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.a.post("/api/login",t);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},h=(n(41),function(e){var t=e.notif;return null===t?null:Object(l.jsx)("div",{className:t.type,children:t.message})}),g=function(){var e=Object(r.useState)([]),t=Object(i.a)(e,2),n=t[0],a=t[1],c=Object(r.useState)(""),u=Object(i.a)(c,2),b=u[0],d=u[1],f=Object(r.useState)(""),v=Object(i.a)(f,2),g=v[0],x=v[1],m=Object(r.useState)(""),w=Object(i.a)(m,2),y=w[0],S=w[1],k=Object(r.useState)(null),C=Object(i.a)(k,2),I=C[0],A=C[1],T=Object(r.useState)(""),U=Object(i.a)(T,2),J=U[0],D=U[1],E=Object(r.useState)(""),N=Object(i.a)(E,2),B=N[0],L=N[1],P=Object(r.useState)(null),W=Object(i.a)(P,2),z=W[0],q=W[1];Object(r.useEffect)((function(){p.getAll().then((function(e){return a(e)}))}),[]),Object(r.useEffect)((function(){var e=window.localStorage.getItem("loggedInUser");if(e){var t=JSON.parse(e);q(t),p.setToken(t.token)}}),[]);var F=function(){var e=Object(o.a)(s.a.mark((function e(t){var n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),console.log("logging in with ",J,B),e.prev=2,e.next=5,O.login({username:J,password:B});case 5:n=e.sent,p.setToken(n.token),window.localStorage.setItem("loggedInUser",JSON.stringify(n)),q(n),D(""),L(""),e.next=17;break;case 13:e.prev=13,e.t0=e.catch(2),A({message:"Wrong credentials",type:"error"}),setTimeout((function(){A(null)}),5e3);case 17:case"end":return e.stop()}}),e,null,[[2,13]])})));return function(t){return e.apply(this,arguments)}}(),G=function(e){e.preventDefault(),window.localStorage.removeItem("loggedInUser"),q(null)},H=function(e){e.preventDefault();var t={title:b,author:g,url:y},n=p.create(t);d(""),x(""),S(""),p.getAll().then((function(e){return a(e)})),A({message:'A new blog with title "'.concat(n.title,'" and author "').concat(n.author,'" has been successfully added!'),type:"success"}),setTimeout((function(){A(null)}),5e3)};return Object(l.jsxs)("div",{children:[Object(l.jsx)("h2",{children:"Blogs"}),Object(l.jsx)(h,{notif:I}),null===z?Object(l.jsxs)("form",{onSubmit:F,children:[Object(l.jsxs)("div",{children:["Username:"," ",Object(l.jsx)("input",{type:"text",value:J,name:"Username",onChange:function(e){var t=e.target;return D(t.value)}})]}),Object(l.jsxs)("div",{children:["Password:"," ",Object(l.jsx)("input",{type:"password",value:B,name:"Password",onChange:function(e){var t=e.target;return L(t.value)}})]}),Object(l.jsx)("div",{children:Object(l.jsx)("button",{type:"submit",children:"Login"})})]}):Object(l.jsxs)("div",{children:[Object(l.jsxs)("div",{children:["Welcome back, ",z.username,Object(l.jsx)("button",{type:"button",onClick:G,children:"Logout"})]}),Object(l.jsxs)("form",{onSubmit:H,children:[Object(l.jsxs)("div",{children:["Title:"," ",Object(l.jsx)("input",{value:b,onChange:function(e){var t=e.target;return d(t.value)}})]}),Object(l.jsxs)("div",{children:["Author:"," ",Object(l.jsx)("input",{value:g,onChange:function(e){var t=e.target;return x(t.value)}})]}),Object(l.jsxs)("div",{children:["Url:"," ",Object(l.jsx)("input",{value:y,onChange:function(e){var t=e.target;return S(t.value)}})]}),Object(l.jsx)("div",{children:Object(l.jsx)("button",{type:"submit",children:"Create"})}),Object(l.jsx)("div",{children:n.map((function(e){if(e.user.id===z.id)return Object(l.jsx)(j,{blog:e},e.id)}))})]})]})]})};c.a.render(Object(l.jsx)(g,{}),document.getElementById("root"))}},[[42,1,2]]]);
//# sourceMappingURL=main.6000a7f2.chunk.js.map