webpackJsonp([2],{"9jkM":function(e){e.exports={main:"main__1t342",footer:"footer__1RpMG","mdc-button--raised":"mdc-button--raised__2c8io","mdc-button":"mdc-button__b9Rw4","mdc-layout-grid":"mdc-layout-grid__3_Cax",butn:"butn__3LXZJ"}},JI0y:function(e,t,a){"use strict";function n(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function c(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}a.d(t,"a",function(){return b});var r=a("KM04"),o=(a.n(r),a("lT++")),s=a("sJaT"),i=a.n(s),l=a("UlEV"),u=(a.n(l),a("aqQ4")),p=(a.n(u),a("i/bD")),h=a.n(p),m=Object(r.h)("div",{className:"caption"},"Top Players:"),b=function(e){function t(){var t=n(this,e.call(this));return t.state={games:{},people:[]},t.tempG={},t.tempP=[],t}return c(t,e),t.prototype.componentDidMount=function(){var e=this;o.b.ref("games").orderByChild("times_played").limitToLast(5).on("value",function(t){e.tempG={},t.forEach(function(t){var a=t.key,n=t.val();e.tempG[a]=n}),e.setState({games:e.tempG,people:e.tempP})}),o.b.ref("users").orderByChild("total_achievements").limitToLast(5).on("value",function(t){e.tempP=[],t.forEach(function(t){var a=t.val();e.tempP.push(a),e.tempP.sort(function(e,t){return t.total_achievements-e.total_achievements})}),e.setState({games:e.tempG,people:e.tempP})})},t.prototype.render=function(){var e=(Object.entries(this.state.games),this.state.people);return Object(r.h)("div",{class:h.a.newpage},Object(r.h)(i.a,null,m,Object(r.h)("div",{class:h.a.cardBody},Object(r.h)("div",{className:"grid"},Object(r.h)("div",{className:h.a.ranks},"The current top players are as follows:"),Object(r.h)("div",null,e.map(function(e){return""!==e.email&&Object(r.h)("div",null,Object(r.h)("span",{className:h.a.player},e.username),Object(r.h)("span",{className:h.a.ach+" "+h.a.green},e.achievements&&e.achievements.green>0&&Object(r.h)("span",null,e.achievements.green)),Object(r.h)("span",{className:h.a.ach+" "+h.a.red},e.achievements&&e.achievements.red>0&&Object(r.h)("span",null,e.achievements.red)),Object(r.h)("span",{className:h.a.ach+" "+h.a.blue},e.achievements&&e.achievements.blue>0&&Object(r.h)("span",null,e.achievements.blue)),Object(r.h)("span",{className:h.a.ach+" "+h.a.silver},e.achievements&&e.achievements.silver>0&&Object(r.h)("span",null,e.achievements.silver)),Object(r.h)("span",{className:h.a.ach+" "+h.a.gold},e.achievements&&e.achievements.gold>0&&Object(r.h)("span",null,e.achievements.gold)),Object(r.h)("span",{className:h.a.ach+" "+h.a.magic},e.achievements&&e.achievements.magic>0&&Object(r.h)("span",null,e.achievements.magic)))}))))))},t}(r.Component)},Jsoo:function(e,t,a){"use strict";function n(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function c(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),a.d(t,"default",function(){return v});var r=a("KM04"),o=(a.n(r),a("NZXD")),s=a("UlEV"),i=(a.n(s),a("9jkM")),l=a.n(i),u=a("JI0y"),p=a("7/cg"),h=a.n(p),m=a("/QC5"),b=function(){return Object(r.h)("div",{class:l.a.butn},Object(r.h)(h.a,{raised:!0,ripple:!0,onClick:function(){return Object(m.b)("/dash")}},"Play Again"))},d=Object(r.h)(o.a,null),_=Object(r.h)(u.a,null),f=Object(r.h)(b,null),v=function(e){function t(){return n(this,e.apply(this,arguments))}return c(t,e),t.prototype.render=function(){return Object(r.h)("div",{className:l.a.home+" page"},Object(r.h)("div",{className:l.a.main},d,_,Object(r.h)("div",{class:l.a.footer},f)))},t}(r.Component)},"i/bD":function(e){e.exports={snooze:"snooze__343Gs",cardHeader:"cardHeader__fATB_",cardBody:"cardBody__qRuPB",newpage:"newpage__DsD0y",mylabel:"mylabel__3o1MZ",ranks:"ranks__3DBaI",header:"header__gToUj",game:"game__1E4VV",player:"player__1e8vM",email:"email__1hF39",tplay:"tplay__3yOwk",grid:"grid__2NEsu",ach:"ach__K4zwU",blue:"blue__11-tV",red:"red__2y7iR",green:"green__1llIE",silver:"silver__DYgl7",gold:"gold__1XDot",magic:"magic__DeyYe","mdc-theme--dark":"mdc-theme--dark__1evpv","mdc-card":"mdc-card__3weFy"}}});
//# sourceMappingURL=route-boards.chunk.6048e.js.map