webpackJsonp([1],{"/c/F":function(t,e,o){"use strict";function n(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function r(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function c(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function u(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function l(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function p(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function d(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function f(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var h=o("KM04"),b=(o("UlEV"),o("aqQ4"),o("V2oX")),y=o.n(b),m=o("d9SV"),v=o.n(m),O=o("lT++"),g=o("NgB/"),j=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var o=arguments[e];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(t[n]=o[n])}return t},_=function(t){function e(e){var o=n(this,t.call(this,e));if(o.clicked=!1,o.state.blurred=!1,o.state.hovering=!1,o.onBlur=o.onBlur.bind(o),o.onHover=o.onHover.bind(o),o.onHoverExit=o.onHoverExit.bind(o),o.onClick=o.onClick.bind(o),o.onCancel=o.onCancel.bind(o),o.games=[],"undefined"!=typeof window){var r=JSON.parse(localStorage.getItem("savedFavorite"));r&&-1!==r.favoriteGameID&&o.setState(r),g.a.map(function(t){o.games[t.id]=t})}return o}return r(e,t),e.prototype.componentDidMount=function(){var t=this;addEventListener("click",this.onClick),addEventListener("blur",this.onBlur),addEventListener("mouseover",this.onHover),addEventListener("mouseout",this.onHoverExit),addEventListener("touchend",this.onCancel),addEventListener("touchstart",this.onClick),addEventListener("touchcancel",this.onCancel);var e=JSON.parse(localStorage.getItem("savedFavorite")).favoriteGameID;if(this.props.gameID=e,O.a&&O.a.currentUser){O.b.ref("users/"+O.a.currentUser.uid+"/games_played/"+this.games[e].name+"/times_played").on("value",function(e){var o=e.val();t.setState({currentPlays:o})})}},e.prototype.componentWillUnmount=function(){this.componentDidUnmount()},e.prototype.componentDidUnmount=function(){removeEventListener("click",this.onClick),removeEventListener("blur",this.onBlur),removeEventListener("mouseover",this.onHover),removeEventListener("mouseout",this.onHoverExit),removeEventListener("touchend",this.onCancel),removeEventListener("touchstart",this.onClick),removeEventListener("touchcancel",this.onCancel)},e.prototype.onClick=function(){this.state.click=!this.state.click,this.setState(this.state),this.showToast("Click")},e.prototype.onBlur=function(t){var e=t.target.document.activeElement.id;console.log(e),"gameFrame"===e&&(this.playGame(),this.showToast("Game Start Detected")),this.setState({blurred:!this.state.blurred})},e.prototype.onHover=function(){this.showToast("Hover"),this.state.hovering=!0,this.setState(this.state)},e.prototype.onHoverExit=function(){this.showToast("HoverExit"),this.state.hovering=!1,this.setState(this.state)},e.prototype.onCancel=function(){this.showToast("onCancel")},e.prototype.showToast=function(t){b.notify.show(t,"custom",2e3,{background:"#F83",text:"#FFFFFF"})},e.prototype.playGame=function(){var t=this,e=JSON.parse(localStorage.getItem("savedFavorite")).favoriteGameID,o=this.games[e].name,n=O.b.ref("users/"+O.a.currentUser.uid+"/games_played/"+o+"/times_played");console.log(o,e,n),n.transaction(function(e){console.log(e),t.setState({currentPlays:e})})},e.prototype.render=function(t,e){return Object(h.h)("div",null,Object(h.h)("iframe",j({},this.props,{class:v.a.framey})),Object(h.h)("div",{class:v.a.plays}," You have played: ",e.currentPlays," Times"))},e}(h.Component),w=o("/QC5"),C=o("sJaT"),S=o.n(C),E=o("7/cg"),k=o.n(E),D=o("Q1yZ"),L=o.n(D),z=(o("JL9d"),o("AJmS")),F=o.n(z),H=function(t){function e(){return a(this,e),i(this,t.apply(this,arguments))}return s(e,t),e.prototype.render=function(t){return Object(h.h)(S.a,{class:F.a.footer},Object(h.h)("div",{className:F.a.cardBody},Object(h.h)("div",{className:"mdc-typography--title"},"Name: ",t.name),Object(h.h)(L.a,null,Object(h.h)(L.a.Inner,null,Object(h.h)(L.a.Cell,{cols:"1"},Object(h.h)(k.a,{raised:!0,ripple:!0,onClick:function(){return t.snoozer()}},"Snooze")),Object(h.h)(L.a.Cell,{cols:"2"},Object(h.h)(k.a,{raised:!0,ripple:!0,onClick:function(){return t.leaderboard()}},"Leaders")),Object(h.h)(L.a.Cell,{cols:"1"},Object(h.h)(k.a,{raised:!0,ripple:!0,onClick:function(){return Object(w.b)("/")}},"Home"))))))},e}(h.Component),N=o("iNBE"),x=(o("NZXD"),o("z9FV")),P=o.n(x),T=Object(h.h)(N.a,null),G=function(t){function e(o){c(this,e);var n=u(this,t.call(this,o));return n.state={snooze:!1,leaderboard:!1},n.startSnooze=n.startSnooze.bind(n),n.startLeaderboard=n.startLeaderboard.bind(n),n}return l(e,t),e.prototype.startSnooze=function(){this.state.snooze=!this.state.snooze,this.state.leaderboard=!1,this.setState(this.state)},e.prototype.startLeaderboard=function(){this.state.leaderboard=!this.state.leaderboard,this.state.snooze=!1,this.setState(this.state),Object(w.b)("boards")},e.prototype.componentDidMount=function(){var t=JSON.parse(localStorage.getItem("savedFavorite"));t&&-1!==t.favoriteGameIndex&&this.setState(t)},e.prototype.render=function(){var t=window.innerHeight-64-100-20;return Object(h.h)("div",null,this.state.snooze&&T,!this.state.snooze&&!this.state.leaderboard&&Object(h.h)(_,{src:this.state.favoriteGameURL,width:"100%",height:t,name:"gameFrame",id:"gameFrame",className:P.a.framey,display:"initial",position:"relative"}),Object(h.h)(H,{name:this.state.favoriteGameName,snoozer:this.startSnooze,leaderboard:this.startLeaderboard}),Object(h.h)(y.a,{options:{zIndex:200,top:"180px"}}))},e}(h.Component),B=o("bg4B"),I=o.n(B);o.d(e,"default",function(){return M});var J=Object(h.h)(G,null),M=function(t){function e(){return p(this,e),d(this,t.apply(this,arguments))}return f(e,t),e.prototype.render=function(){return Object(h.h)("div",{class:I.a.home+" page"},J)},e}(h.Component)},"4XbH":function(t){t.exports={snooze:"snooze__7LZ6r",cardHeader:"cardHeader__259pY",cardBody:"cardBody__2D_tE",newpage:"newpage__1ConQ",bgroup:"bgroup__1iQlq"}},AJmS:function(t){t.exports={footer:"footer__1A6Wu","mdc-button--raised":"mdc-button--raised__2_dC5","mdc-layout-grid":"mdc-layout-grid__aj1HH"}},JL9d:function(){},Q1yZ:function(t,e,o){"use strict";var n=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var o=arguments[e];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(t[n]=o[n])}return t},r=o("SpGf");Object.defineProperty(e,"__esModule",{value:!0}),e.default=e.LayoutGrid=e.LayoutGridCell=e.LayoutGridInner=void 0;var a=r(o("J5U+")),i=r(o("0fcM")),s=r(o("P8NW")),c=r(o("0421")),u=r(o("UJE0")),l=r(o("d4H2")),p=o("KM04"),d=r(o("uc5p")),f=function(t){function e(){var t;return(0,i.default)(this,e),t=(0,c.default)(this,(0,u.default)(e).apply(this,arguments)),t.componentName="layout-grid__inner",t.mdcProps=[],t}return(0,l.default)(e,t),(0,s.default)(e,[{key:"materialDom",value:function(t){return(0,p.h)("div",n({ref:this.setControlRef},t),t.children)}}]),e}(d.default);e.LayoutGridInner=f;var h=function(t){function e(){var t;return(0,i.default)(this,e),t=(0,c.default)(this,(0,u.default)(e).apply(this,arguments)),t.componentName="layout-grid__cell",t.mdcProps=[],t}return(0,l.default)(e,t),(0,s.default)(e,[{key:"render",value:function(t){var o=(0,a.default)((0,u.default)(e.prototype),"render",this).call(this,t);return Object.keys(e.propsDict).forEach(function(t){return delete o.attributes[e.propsDict[t]]}),o}},{key:"materialDom",value:function(t){return(0,p.h)("div",n({},t,{className:e.createClassName(t),ref:this.setControlRef}),t.children)}}],[{key:"createClassName",value:function(t){var o="mdc-layout-grid__cell--",n=[];return t[e.propsDict.cols]&&n.push("".concat(o,"span-").concat(t[e.propsDict.cols])),t[e.propsDict.desktop]&&n.push("".concat(o,"span-").concat(t[e.propsDict.desktop],"-desktop")),t[e.propsDict.tablet]&&n.push("".concat(o,"span-").concat(t[e.propsDict.tablet],"-tablet")),t[e.propsDict.phone]&&n.push("".concat(o,"span-").concat(t[e.propsDict.phone],"-phone")),t[e.propsDict.order]&&n.push("".concat(o,"order-").concat(t[e.propsDict.order])),t[e.propsDict.align]&&n.push("".concat(o,"align-").concat(t[e.propsDict.align])),n.join(" ")}}]),e}(d.default);e.LayoutGridCell=h,h.propsDict={align:"align",cols:"cols",desktop:"desktopCols",order:"order",phone:"phoneCols",tablet:"tabletCols"};var b=function(t){function e(){var t;return(0,i.default)(this,e),t=(0,c.default)(this,(0,u.default)(e).apply(this,arguments)),t.componentName="layout-grid",t.mdcProps=[],t}return(0,l.default)(e,t),(0,s.default)(e,[{key:"materialDom",value:function(t){return(0,p.h)("div",n({ref:this.setControlRef},t),t.children)}}]),e}(d.default);e.LayoutGrid=b;var y=function(t){function e(){return(0,i.default)(this,e),(0,c.default)(this,(0,u.default)(e).apply(this,arguments))}return(0,l.default)(e,t),e}(b);e.default=y,y.Cell=h,y.Inner=f},bg4B:function(t){t.exports={home:"home__2XFYm"}},d9SV:function(){},iNBE:function(t,e,o){"use strict";function n(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function r(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}o.d(e,"a",function(){return v});var a=o("KM04"),i=(o.n(a),o("/QC5")),s=o("sJaT"),c=o.n(s),u=o("UlEV"),l=(o.n(u),o("aqQ4")),p=(o.n(l),o("7/cg")),d=o.n(p),f=o("V2oX"),h=(o.n(f),o("4XbH")),b=o.n(h),y=Object(a.h)("div",{className:"caption"}," Snooze:"),m=Object(a.h)("div",{class:"mdc-typography--caption"},"Snooze the content to re-appear after the following interval:"),v=function(t){function e(){for(var e,o,r,a=arguments.length,s=Array(a),c=0;c<a;c++)s[c]=arguments[c];return e=o=n(this,t.call.apply(t,[this].concat(s))),o.state={time:Date.now(),interval:0},o.updateTime=function(){o.setState({time:Date.now()})},o.doSnooze=function(t){o.interval=t;f.notify.show("See you soon! Be back in "+o.interval+" Minutes...","custom",3e3,{background:"#58F",text:"#FFFFFF"}),setTimeout(function(){Object(i.b)("/dark/"+3600*t)},3e3)},r=e,n(o,r)}return r(e,t),e.prototype.componentDidMount=function(){},e.prototype.componentWillUnmount=function(){},e.prototype.render=function(){var t=this;return Object(a.h)("div",{class:b.a.newpage},Object(a.h)(c.a,null,y,Object(a.h)("div",{class:b.a.cardBody},Object(a.h)("div",{className:"grid"},m,Object(a.h)("div",{class:b.a.bgroup},Object(a.h)(d.a,{raised:!0,ripple:!0,dense:!0,onClick:function(){return t.doSnooze(10)}},"10 Min"),Object(a.h)(d.a,{raised:!0,ripple:!0,dense:!0,onClick:function(){return t.doSnooze(30)}},"30 Min"),Object(a.h)(d.a,{raised:!0,ripple:!0,dense:!0,onClick:function(){return t.doSnooze(60)}},"1 Hr")),Object(a.h)("div",{class:b.a.bgroup},Object(a.h)(d.a,{raised:!0,ripple:!0,dense:!0,onClick:function(){return t.doSnooze(120)}},"2 Hrs"),Object(a.h)(d.a,{raised:!0,ripple:!0,dense:!0,onClick:function(){return t.doSnooze(480)}},"4 Hrs"),Object(a.h)(d.a,{raised:!0,ripple:!0,dense:!0,onClick:function(){return t.doSnooze(3600)}},"1 Day"))))))},e}(a.Component)},z9FV:function(t){t.exports={home:"home__pkttK",page:"page__1eHxL"}}});
//# sourceMappingURL=route-dash.chunk.4979e.js.map