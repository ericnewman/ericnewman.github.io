webpackJsonp([0],{KKVh:function(t){t.exports={snooze:"snooze__yeB_I",cardHeader:"cardHeader__OaLth",cardBody:"cardBody__OZo26",newpage:"newpage__1E3Zp",mylabel:"mylabel__1nFBC",header:"header__2c0_5"}},UlEV:function(){},ZAL5:function(t){t.exports={home:"home__MseGd",cardHeader:"cardHeader__2Vd1U",cardBody:"cardBody__fYYFu"}},aqQ4:function(){},bRUt:function(t){t.exports={snooze:"snooze__2K4i_",cardHeader:"cardHeader__3oXI7",cardBody:"cardBody__1dfhX",newpage:"newpage__2eMh4",mylabel:"mylabel__u3Kju",header:"header__3WnVj"}},"iOg+":function(t,e,n){"use strict";function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function r(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function c(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function u(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function l(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function d(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function f(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function p(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var h=n("KM04"),y=n("sJaT"),b=n.n(y),m=(n("UlEV"),n("aqQ4"),n("KKVh")),_=n.n(m),v=n("7/cg"),O=n.n(v),j={state:{version:"Micro Bridge 1.0"},addScheduledContent:function(t,e,n,o){var r=new Date(n),a=r.getHours()+":"+r.getMinutes()+":"+r.getSeconds();window.MP&&window.MP.addScheduledLocalNotification&&window.MP.addScheduledLocalNotification(t,e,a,o)},versionInfo:function(){return this.state.version}},w=j,C=Object(h.h)("div",{class:"mdc-typography--caption"},"Snooze the content to re-show after the following interval:"),g=Object(h.h)("p",null),A=Object(h.h)("p",null),B=function(t){function e(){for(var e,n,r,a=arguments.length,c=Array(a),i=0;i<a;i++)c[i]=arguments[i];return e=n=o(this,t.call.apply(t,[this].concat(c))),n.state={time:Date.now(),interval:0},n.updateTime=function(){n.setState({time:Date.now()})},n.do_snooze=function(t){n.interval=t,alert(n.interval),console.log(t)},r=e,o(n,r)}return r(e,t),e.prototype.componentDidMount=function(){console.log(w.versionInfo())},e.prototype.componentWillUnmount=function(){},e.prototype.render=function(){var t=this;return Object(h.h)("div",{class:_.a.newpage},Object(h.h)(b.a,null,Object(h.h)("div",{class:_.a.cardBody},Object(h.h)("div",{class:_.a.mylabel},"Snooze:"),C,Object(h.h)("p",null,Object(h.h)(O.a,{raised:!0,ripple:!0,onClick:function(){return t.do_snooze(10)}},"10 Min"),Object(h.h)(O.a,{raised:!0,ripple:!0,onClick:function(){return t.do_snooze(30)}},"30 Min"),Object(h.h)(O.a,{raised:!0,ripple:!0,onClick:function(){return t.do_snooze(60)}},"1 Hr"),g,Object(h.h)(O.a,{raised:!0,ripple:!0,onClick:function(){return t.do_snooze(120)}},"2 Hrs"),Object(h.h)(O.a,{raised:!0,ripple:!0,onClick:function(){return t.do_snooze(480)}},"4 Hrs"),Object(h.h)(O.a,{raised:!0,ripple:!0,onClick:function(){return t.do_snooze(3600)}},"1 Day"),A))))},e}(h.Component),M=n("ubDm"),P=n.n(M),D=Object(h.h)("div",{class:"mdc-typography--caption"},"The follow list of achievements were found for this user:"),N=Object(h.h)("p",null,Object(h.h)("p",null)),k=function(t){function e(){var n,o,r;a(this,e);for(var i=arguments.length,u=Array(i),l=0;l<i;l++)u[l]=arguments[l];return n=o=c(this,t.call.apply(t,[this].concat(u))),o.state={},r=n,c(o,r)}return i(e,t),e.prototype.componentDidMount=function(){},e.prototype.componentWillUnmount=function(){},e.prototype.render=function(){return Object(h.h)("div",{class:P.a.newpage},Object(h.h)(b.a,null,Object(h.h)("div",{class:P.a.cardBody},Object(h.h)("div",{class:P.a.mylabel},"Achievements:"),D,N)))},e}(h.Component),S=n("bRUt"),z=n.n(S),E=Object(h.h)("div",{class:"mdc-typography--caption"},"The current top rankings are as follows:"),H=Object(h.h)("p",null,Object(h.h)("p",null)),T=function(t){function e(){var n,o,r;u(this,e);for(var a=arguments.length,c=Array(a),i=0;i<a;i++)c[i]=arguments[i];return n=o=l(this,t.call.apply(t,[this].concat(c))),o.state={},r=n,l(o,r)}return d(e,t),e.prototype.componentDidMount=function(){},e.prototype.componentWillUnmount=function(){},e.prototype.render=function(){return Object(h.h)("div",{class:z.a.newpage},Object(h.h)(b.a,null,Object(h.h)("div",{class:z.a.cardBody},Object(h.h)("div",{class:z.a.mylabel},"Leaderboard:"),E,H)))},e}(h.Component),I=n("ZAL5"),x=n.n(I);n.d(e,"default",function(){return F});var U=Object(h.h)("h2",{class:" mdc-typography--title"},"Game FSD Demo"),K=Object(h.h)("div",{class:"mdc-typography--caption"},"Concepts for FSD Integration:"),J=Object(h.h)(b.a.Actions,null,Object(h.h)(b.a.ActionButton,null,"OKAY")),L=Object(h.h)(B,null),R=Object(h.h)(k,null),V=Object(h.h)(T,null),F=function(t){function e(){return s(this,e),f(this,t.apply(this,arguments))}return p(e,t),e.prototype.render=function(){return Object(h.h)("div",{class:x.a.home+" page"},U,Object(h.h)(b.a,null,Object(h.h)("div",{class:x.a.cardHeader},K),Object(h.h)("div",{class:x.a.cardBody},"Below expect to find various functions to test Games, Scoreboards, Leaderboards, and other calls to action that might be present on a Games-centric FSD."),J),L,R,V)},e}(h.Component)},sJaT:function(t,e,n){"use strict";var o=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t},r=n("SpGf");Object.defineProperty(e,"__esModule",{value:!0}),e.default=e.Card=e.CardMediaContent=e.CardActionIcon=e.CardActionButtons=e.CardActionIcons=e.CardActionButton=e.CardMedia=e.CardActions=void 0;var a=r(n("J5U+")),c=r(n("0fcM")),i=r(n("P8NW")),u=r(n("0421")),l=r(n("UJE0")),d=r(n("d4H2")),s=n("KM04"),f=r(n("uc5p")),p=r(n("7/cg")),h=r(n("MeGi")),y=function(t){function e(){var t;return(0,c.default)(this,e),t=(0,u.default)(this,(0,l.default)(e).apply(this,arguments)),t.componentName="card__actions",t.mdcProps=["full-bleed"],t}return(0,d.default)(e,t),(0,i.default)(e,[{key:"materialDom",value:function(t){return(0,s.h)("div",o({},t),this.props.children)}}]),e}(f.default);e.CardActions=y;var b=function(t){function e(){var t;return(0,c.default)(this,e),t=(0,u.default)(this,(0,l.default)(e).apply(this,arguments)),t.componentName="card__media",t.mdcProps=["square","16-9"],t}return(0,d.default)(e,t),(0,i.default)(e,[{key:"materialDom",value:function(t){return t.sixteenByNine&&(t.className="mdc-card__media--16-9"),(0,s.h)("div",o({},t),this.props.children)}}]),e}(f.default);e.CardMedia=b;var m=function(t){function e(){var t;return(0,c.default)(this,e),t=(0,u.default)(this,(0,l.default)(e).apply(this,arguments)),t.componentName="card__action",t.mdcProps=[],t}return(0,d.default)(e,t),(0,i.default)(e,[{key:"materialDom",value:function(t){return(0,s.h)("button",o({className:"mdc-button mdc-card__action--button"},t,{ref:this.setControlRef}),t.children)}}]),e}(p.default);e.CardActionButton=m;var _=function(t){function e(){var t;return(0,c.default)(this,e),t=(0,u.default)(this,(0,l.default)(e).apply(this,arguments)),t.componentName="card__action-icons",t.mdcProps=[],t}return(0,d.default)(e,t),(0,i.default)(e,[{key:"materialDom",value:function(t){return(0,s.h)("div",o({},t),this.props.children)}}]),e}(f.default);e.CardActionIcons=_;var v=function(t){function e(){var t;return(0,c.default)(this,e),t=(0,u.default)(this,(0,l.default)(e).apply(this,arguments)),t.componentName="card__action-buttons",t}return(0,d.default)(e,t),e}(_);e.CardActionButtons=v;var O=function(t){function e(){var t;return(0,c.default)(this,e),t=(0,u.default)(this,(0,l.default)(e).apply(this,arguments)),t.componentName="card__action",t.mdcProps=[],t}return(0,d.default)(e,t),(0,i.default)(e,[{key:"materialDom",value:function(t){return t.className?t.className+=" mdc-card__action--icon":t.className="mdc-card__action--icon",(0,a.default)((0,l.default)(e.prototype),"materialDom",this).call(this,t)}}]),e}(h.default);e.CardActionIcon=O;var j=function(t){function e(){var t;return(0,c.default)(this,e),t=(0,u.default)(this,(0,l.default)(e).apply(this,arguments)),t.componentName="card__media-content",t.mdcProps=[],t}return(0,d.default)(e,t),(0,i.default)(e,[{key:"materialDom",value:function(t){return(0,s.h)("div",o({},t),this.props.children)}}]),e}(f.default);e.CardMediaContent=j;var w=function(t){function e(){var t;return(0,c.default)(this,e),t=(0,u.default)(this,(0,l.default)(e).apply(this,arguments)),t.componentName="card",t.mdcProps=["outlined"],t}return(0,d.default)(e,t),(0,i.default)(e,[{key:"materialDom",value:function(t){return(0,s.h)("div",o({},t),this.props.children)}}]),e}(f.default);e.Card=w;var C=function(t){function e(){return(0,c.default)(this,e),(0,u.default)(this,(0,l.default)(e).apply(this,arguments))}return(0,d.default)(e,t),e}(w);e.default=C,C.Actions=y,C.ActionButtons=v,C.ActionButton=m,C.ActionIcons=_,C.ActionIcon=O,C.Media=b,C.CardMediaContent=j},ubDm:function(t){t.exports={snooze:"snooze__3JTiC",cardHeader:"cardHeader__30ACX",cardBody:"cardBody__Vkigf",newpage:"newpage__5cJ9y",mylabel:"mylabel__21mPF",header:"header__3aojy"}}});
//# sourceMappingURL=route-home.chunk.dcc96.js.map