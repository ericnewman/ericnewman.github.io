webpackJsonp([5],{"jWq+":function(t){t.exports={account:"account__3n5sl"}},pFLQ:function(t){t.exports={account:"account__2AiNg",dates:"dates__QGcJg"}},x56q:function(t,e,n){"use strict";function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function r(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function c(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function s(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var i=n("KM04"),u=n("sJaT"),p=n.n(u),l=(n("UlEV"),n("aqQ4"),n("jWq+")),f=n.n(l),h=n("pFLQ"),b=n.n(h),d=Object(i.h)("div",null," No User Logged In "),y=function(t){function e(){return o(this,t.apply(this,arguments))}return r(e,t),e.prototype.render=function(){return this.props.user?Object(i.h)("div",{class:b.a.account},Object(i.h)("img",{src:this.props.user.photoURL}),Object(i.h)("div",null,this.props.user.displayName),Object(i.h)("div",null,this.props.user.email),Object(i.h)("div",{class:b.a.dates},"Created:",this.props.user.metadata.creationTime),Object(i.h)("div",{class:b.a.dates},"Last Log-in: ",this.props.user.metadata.lastSignInTime)):d},e}(i.Component),O=n("lT++");n.d(e,"default",function(){return v});var j=Object(i.h)("h2",{class:"mdc-typography--title"},"Account Info"),m=Object(i.h)("div",{class:"mdc-typography--caption"},"Firebase Account"),_=Object(i.h)(p.a.Actions,null,Object(i.h)(p.a.ActionButton,null,"OKAY")),v=function(t){function e(){return c(this,e),s(this,t.apply(this,arguments))}return a(e,t),e.prototype.render=function(){return Object(i.h)("div",{class:f.a.home+" page"},j,Object(i.h)(p.a,null,Object(i.h)("div",{class:f.a.cardHeader},m),Object(i.h)("div",{class:f.a.cardBody},"Below expect to find Firebase.",Object(i.h)(y,{user:O.a.currentUser})),_))},e}(i.Component)}});
//# sourceMappingURL=route-account.chunk.7cc5e.js.map