(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{161:function(e,t,n){"use strict";n.r(t),t.default={namespace:"global",state:{user:{}},reducers:{},effects:{},subscriptions:{}}},175:function(e,t,n){e.exports=n.p+"static/media/logo.e7b639e8.png"},180:function(e,t,n){e.exports=n(356)},224:function(e,t){},294:function(e,t,n){},345:function(e,t,n){},356:function(e,t,n){"use strict";n.r(t);n(181);var a=n(169),r=n.n(a),c=n(1),o=n.n(c),i=n(110),l=n.n(i),s=n(161),u=(n(273),n(165)),p=n.n(u),m=(n(277),n(166)),h=n.n(m),d=(n(280),n(167)),f=n.n(d),b=(n(283),n(105)),E=n.n(b),g=(n(172),n(31)),y=n.n(g),j=n(62),O=n(63),v=n(65),k=n(64),P=n(66),A=(n(291),n(46)),w=n.n(A),N=n(19),S=[{name:"\u535a\u5ba2",path:"/",component:function(){return n.e(6).then(n.bind(null,638))},models:function(){return[Promise.all([n.e(1),n.e(7)]).then(n.bind(null,639))]}},{name:"\u767b\u5f55",path:"/login",component:function(){return Promise.all([n.e(0),n.e(4),n.e(8)]).then(n.bind(null,640))},models:function(){return[Promise.all([n.e(1),n.e(9)]).then(n.bind(null,641))]}},{name:"\u6ce8\u518c",path:"/register",component:function(){return Promise.all([n.e(0),n.e(10)]).then(n.bind(null,642))},models:function(){return[Promise.resolve().then(n.bind(null,161))]}}],C=[{name:"API\u7ba1\u7406",icon:"link",path:"/apiManagement"}],R=[{name:"API\u7ba1\u7406",path:"/managementApi",component:function(){return Promise.all([n.e(0),n.e(3),n.e(4),n.e(14),n.e(11)]).then(n.bind(null,645))},models:function(){return[Promise.all([n.e(1),n.e(2)]).then(n.bind(null,643))]}},{name:"API\u7ba1\u7406\u8be6\u60c5",path:"/managementApi/details",component:function(){return Promise.all([n.e(0),n.e(3),n.e(12)]).then(n.bind(null,644))},models:function(){return[Promise.all([n.e(1),n.e(2)]).then(n.bind(null,643))]}}],x=(n(294),w.a.Header),T=w.a.Sider,I=w.a.Content,J=function(e){function t(){var e,n;Object(j.a)(this,t);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(n=Object(v.a)(this,(e=Object(k.a)(t)).call.apply(e,[this].concat(r)))).state={collapsed:!1,user:{}},n.toggle=function(){n.setState({collapsed:!n.state.collapsed})},n.signOut=function(){var e=n.props.history;fetch("/api/logout",{method:"POST",body:JSON.stringify({account:n.state.user.account}),headers:{Accept:"application/json","Content-Type":"application/json"}}).then(function(e){return e.json()}).then(function(t){t&&200===t.code&&e.push("/login")}).catch(function(e){return e})},n.isFullPath=function(){var e=n.props.history;return-1!==S.map(function(e){return e.path}).indexOf(e.location.pathname)},n}return Object(P.a)(t,e),Object(O.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=this.props.history;fetch("/api/checkUser",{method:"GET",headers:{Accept:"application/json","Content-Type":"application/json"}}).then(function(e){return e.json()}).then(function(n){n&&n.data?e.setState({user:n.data}):t.replace("/")}).catch(function(e){return e})}},{key:"render",value:function(){var e=this.props,t=e.children,a=e.location,r=o.a.createElement("ul",{className:"info"},o.a.createElement("li",null,"\u672a\u8bfb\u6d88\u606f"),o.a.createElement("li",null,"\u4e2a\u4eba\u4fe1\u606f"),o.a.createElement("li",{onClick:this.signOut},"\u9000\u51fa\u767b\u9646"));return this.isFullPath()?t:o.a.createElement(w.a,{className:"container"},o.a.createElement(T,{trigger:null,collapsible:!0,theme:"light",collapsed:this.state.collapsed},o.a.createElement("div",{className:"logo"},o.a.createElement("img",{src:n(175),alt:"\u5343\u7f9a"})),o.a.createElement(E.a,{theme:"light",mode:"inline",defaultSelectedKeys:["".concat(a.pathname)]},C.map(function(e){return o.a.createElement(E.a.Item,{key:e.path},o.a.createElement(N.Link,{to:e.path},o.a.createElement(y.a,{type:e.icon}),o.a.createElement("span",null,e.name)))}))),o.a.createElement(w.a,null,o.a.createElement(x,{className:"header"},o.a.createElement(y.a,{className:"trigger",type:this.state.collapsed?"menu-unfold":"menu-fold",onClick:this.toggle}),o.a.createElement("div",{className:"user"},o.a.createElement(p.a,{placement:"bottomRight",title:o.a.createElement("div",{className:"title"},"\u8d26\u6237\u4fe1\u606f"),content:r,trigger:"click"},o.a.createElement(h.a,{count:1},o.a.createElement(f.a,{icon:"user"}))),o.a.createElement("span",{style:{marginLeft:"20px"}},this.state.user.user_name))),o.a.createElement(I,{className:"content"},t)))}}]),t}(c.Component),M=Object(N.withRouter)(J),D=n(80),F=n(59),G=n(107),L=n.n(G),U=(n(173),n(111)),H=n.n(U),K=function(e){function t(e){var n;return Object(j.a)(this,t),(n=Object(v.a)(this,Object(k.a)(t).call(this,e))).state={isAuthenticated:!1},n}return Object(P.a)(t,e),Object(O.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=this.props.history;fetch("/api/checkUser",{method:"GET",headers:{Accept:"application/json","Content-Type":"application/json"}}).then(function(e){return e.json()}).then(function(n){n&&n.status?e.setState({isAuthenticated:n.status}):(e.setState({isAuthenticated:!0}),t.replace("/login"),H.a.error(n.message,2.5))}).catch(function(e){return e})}},{key:"render",value:function(){var e=this,t=this.props,n=t.component,a=Object(F.a)(t,["component"]);return o.a.createElement("div",null,this.state.isAuthenticated?o.a.createElement(N.Route,Object.assign({},a,{render:function(t){return o.a.createElement(n,Object.assign({app:e.props.app},t))}})):"")}}]),t}(c.Component),_=Object(N.withRouter)(K);var q=function(e){var t=e.history,n=e.app;return o.a.createElement(N.Router,{history:t},o.a.createElement(N.Switch,null,S.map(function(e,t){var a=e.path,r=Object(F.a)(e,["path"]);return o.a.createElement(N.Route,{key:t,path:a,exact:!0,component:L()(Object(D.a)({app:n},r))})}),R.map(function(e,t){var a=e.path,r=Object(F.a)(e,["path"]);return o.a.createElement(_,{key:t,path:a,exact:!0,app:n,component:L()(Object(D.a)({app:n},r))})})))},z=(n(345),n(168)),B=n.n(z),Q=n(170),V=n.n(Q),W=l()({history:B()()});W.model(s.default),W.router(function(e){return o.a.createElement(r.a,{locale:V.a},o.a.createElement(N.Router,{history:e.history},o.a.createElement(M,{history:e.history},o.a.createElement(q,e))))}),W.start("#root")}},[[180,15,13]]]);
//# sourceMappingURL=main.6a4e0ba5.chunk.js.map