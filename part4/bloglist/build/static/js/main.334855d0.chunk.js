(this["webpackJsonpbloglist-frontend"]=this["webpackJsonpbloglist-frontend"]||[]).push([[0],{41:function(e,t,n){"use strict";n.r(t);var r=n(1),a=n(16),c=n.n(a),u=n(3),s=n.n(u),o=n(5),i=n(4),l=n(0),j=function(e){var t=e.blog;return Object(l.jsxs)("div",{children:['"',t.title,'": by ',t.author]})},b=n(6),d=n.n(b),f="/api/blogs",v=null,p={getAll:function(){return d.a.get(f).then((function(e){return e.data}))},create:function(){var e=Object(o.a)(s.a.mark((function e(t){var n,r;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={headers:{Authorization:v}},e.next=3,d.a.post(f,t,n);case 3:return r=e.sent,e.abrupt("return",r.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),update:function(e,t){return d.a.put("".concat(f,"/").concat(e),t).then((function(e){return e.data}))},setToken:function(e){v="bearer ".concat(e)}},O={login:function(){var e=Object(o.a)(s.a.mark((function e(t){var n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.a.post("/api/login",t);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},h=function(){var e=Object(r.useState)([]),t=Object(i.a)(e,2),n=t[0],a=t[1],c=Object(r.useState)(""),u=Object(i.a)(c,2),b=u[0],d=u[1],f=Object(r.useState)(""),v=Object(i.a)(f,2),h=v[0],g=v[1],x=Object(r.useState)(""),m=Object(i.a)(x,2),w=m[0],S=m[1],k=Object(r.useState)(null),y=Object(i.a)(k,2),C=(y[0],y[1]),I=Object(r.useState)(""),T=Object(i.a)(I,2),U=T[0],A=T[1],J=Object(r.useState)(""),E=Object(i.a)(J,2),B=E[0],D=E[1],N=Object(r.useState)(null),P=Object(i.a)(N,2),z=P[0],L=P[1];Object(r.useEffect)((function(){p.getAll().then((function(e){return a(e)}))}),[]),Object(r.useEffect)((function(){var e=window.localStorage.getItem("loggedInUser");if(e){var t=JSON.parse(e);L(t),p.setToken(t.token)}}),[]);var W=function(){var e=Object(o.a)(s.a.mark((function e(t){var n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),console.log("logging in with ",U,B),e.prev=2,e.next=5,O.login({username:U,password:B});case 5:n=e.sent,p.setToken(n.token),window.localStorage.setItem("loggedInUser",JSON.stringify(n)),L(n),A(""),D(""),e.next=17;break;case 13:e.prev=13,e.t0=e.catch(2),C("Wrong credentials"),setTimeout((function(){C(null)}),5e3);case 17:case"end":return e.stop()}}),e,null,[[2,13]])})));return function(t){return e.apply(this,arguments)}}(),q=function(e){e.preventDefault();var t={title:b,author:h,url:w};p.create(t),d(""),g(""),S("")};return Object(l.jsxs)("div",{children:[Object(l.jsx)("h2",{children:"Blogs"}),null===z?Object(l.jsxs)("form",{onSubmit:W,children:[Object(l.jsxs)("div",{children:["Username:"," ",Object(l.jsx)("input",{type:"text",value:U,name:"Username",onChange:function(e){var t=e.target;return A(t.value)}})]}),Object(l.jsxs)("div",{children:["Password:"," ",Object(l.jsx)("input",{type:"password",value:B,name:"Password",onChange:function(e){var t=e.target;return D(t.value)}})]}),Object(l.jsx)("div",{children:Object(l.jsx)("button",{type:"submit",children:"Login"})})]}):Object(l.jsxs)("form",{onSubmit:q,children:[Object(l.jsxs)("div",{children:["Title:"," ",Object(l.jsx)("input",{value:b,onChange:function(e){var t=e.target;return d(t.value)}})]}),Object(l.jsxs)("div",{children:["Author:"," ",Object(l.jsx)("input",{value:h,onChange:function(e){var t=e.target;return g(t.value)}})]}),Object(l.jsxs)("div",{children:["Url:"," ",Object(l.jsx)("input",{value:w,onChange:function(e){var t=e.target;return S(t.value)}})]}),Object(l.jsx)("div",{children:Object(l.jsx)("button",{type:"submit",children:"Save"})}),Object(l.jsx)("div",{children:n.map((function(e){if(e.user===z.id)return console.log(e.user),console.log(z.id),Object(l.jsx)(j,{blog:e},e.id)}))})]})]})};c.a.render(Object(l.jsx)(h,{}),document.getElementById("root"))}},[[41,1,2]]]);
//# sourceMappingURL=main.334855d0.chunk.js.map