webpackJsonp([1],{"4XbH":function(e){e.exports={snooze:"snooze__7LZ6r",cardHeader:"cardHeader__259pY",cardBody:"cardBody__2D_tE",newpage:"newpage__1ConQ",bgroup:"bgroup__1iQlq"}},"60xS":function(e,t,n){"use strict";function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function c(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var p=n("KM04"),f=(n("UlEV"),n("aqQ4"),n("V2oX")),d=n.n(f),h=n("d9SV"),m=n.n(h),b=n("lT++"),y=n("NgB/"),v=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},g=function(e){function t(t){var n=o(this,e.call(this,t));return n.state={blurred:!1,currentPlays:0,gameName:""},n.onBlur=n.onBlur.bind(n),n.onHover=n.onHover.bind(n),n.onHoverExit=n.onHoverExit.bind(n),n.onCancel=n.onCancel.bind(n),n.playGame=n.playGame.bind(n),n}return r(t,e),t.prototype.onBlur=function(){this.showToast("Game Start Detected"),this.playGame()},t.prototype.onHover=function(){},t.prototype.onHoverExit=function(){},t.prototype.onCancel=function(){},t.prototype.showToast=function(e){f.notify.show(e,"custom",2e3,{background:"#F83",text:"#FFFFFF"})},t.prototype.playGame=function(){var e=y.a[this.props.game_id].name,t="users/"+b.a.currentUser.uid+"/games_played/"+e+"/times_played",n=b.b.ref(t);n.transaction(function(e){return(e||0)+1}),n=b.b.ref("games/"+e+"/times_played"),n.transaction(function(e){return(e||0)+1}),n=b.b.ref("users/"+b.a.currentUser.uid+"/totalPlays"),n.transaction(function(e){return(e||0)+1}),this.props.doGameStarted&&this.props.doGameStarted()},t.prototype.componentDidUnmount=function(){removeEventListener("blur",this.onBlur),removeEventListener("mouseover",this.onHover),removeEventListener("mouseout",this.onHoverExit),removeEventListener("touchend",this.onCancel),removeEventListener("touchcancel",this.onCancel)},t.prototype.componentDidMount=function(){var e=this;addEventListener("blur",this.onBlur),addEventListener("mouseover",this.onHover),addEventListener("mouseout",this.onHoverExit),addEventListener("touchend",this.onCancel),addEventListener("touchstart",this.onClick),addEventListener("touchcancel",this.onCancel),b.a.signInAnonymously().catch(function(){}),b.a.onAuthStateChanged(function(t){if(t){var n=y.a[e.props.game_id].name;b.b.ref("users/"+b.a.currentUser.uid+"/games_played/"+n+"/times_played").on("value",function(t){e.setState({currentPlays:t.val(),gameName:n})})}})},t.prototype.render=function(e,t){return Object(p.h)("div",null,Object(p.h)("iframe",v({},e,{class:m.a.framey})),Object(p.h)("div",{class:m.a.plays}," You have played: ",t.gameName," ",t.currentPlays," Times"))},t}(p.Component),_=n("/QC5"),O=n("7BVi"),S=n.n(O),j=n("sJaT"),w=n.n(j),C=n("7/cg"),k=n.n(C),E=(n("JL9d"),n("AJmS")),z=n.n(E),F=function(e){function t(n){a(this,t);var o=i(this,e.call(this,n));return o.state={voted:!1},o.onStarClick=o.onStarClick.bind(o),o}return s(t,e),t.prototype.showToast=function(e){f.notify.show(e,"custom",5500,{background:"#F83",text:"#FFFFFF"})},t.prototype.waitAndGo=function(e){setTimeout(function(){Object(_.b)(e)},2500)},t.prototype.onStarClick=function(e){var t=this;if(!this.state.voted){var n=y.a[this.props.game_id].name,o=b.b.ref("games/"+n+"/review_points");o.transaction(function(t){return(t||0)+e}),o=b.b.ref("games/"+n+"/rating"),o.transaction(function(e){return e=Math.round(100*(t.state.review_points/t.state.times_played||0))/100,t.setState({rating:e,voted:!0}),e}),this.showToast("Thanks for your review - you will be rewarded!"),this.waitAndGo("/outcome")}},t.prototype.componentWillMount=function(){var e=this,t=y.a[this.props.game_id].name,n={};b.b.ref("games/"+t).once("value",function(t){n=t.val(),e.setState(n),console.log(e.state)})},t.prototype.render=function(e,t){return Object(p.h)(w.a,{class:z.a.footer},Object(p.h)("div",{className:z.a.cardBody},!e.showStars&&Object(p.h)("div",{className:z.a.cent},Object(p.h)(k.a,{raised:!0,ripple:!0,onClick:function(){return e.snoozer()}},"Snooze")),e.showStars&&Object(p.h)("div",{className:z.a.bar},Object(p.h)(S.a,{name:"rate1",starCount:5,value:e.rating,editing:!0,emptyStarColor:"#393",starColor:"#933",renderStarIcon:function(e,t){return e===t?Object(p.h)("span",{className:z.a.vote+" "+z.a.YES},e):Object(p.h)("span",{className:z.a.vote+" "+z.a.NO},e)},onStarClick:this.onStarClick.bind(this)}),Object(p.h)("div",{class:z.a.tiny},"Running at an average rating of: ",t.rating))))},t}(p.Component),H=n("WMZS"),P=n("iNBE"),L=n("bg4B"),x=n.n(L);n.d(t,"default",function(){return T});var N=Object(p.h)(P.a,null),T=function(e){function t(n){c(this,t);var o=u(this,e.call(this,n));return o.state={snooze:!1,gameStarted:!1},o.startSnooze=o.startSnooze.bind(o),o.doGameStarted=o.doGameStarted.bind(o),o.timedOut=o.timedOut.bind(o),o}return l(t,e),t.prototype.startSnooze=function(){this.setState({snooze:!0}),console.log("snooze")},t.prototype.doGameStarted=function(){this.setState({gameStarted:!0})},t.prototype.timedOut=function(){this.setState({tooLate:!0}),console.log("Too Late")},t.prototype.render=function(e,t){var n=e.selectedGame,o=window.innerHeight-56-100-22;t.gameStarted&&(o+=32);var r=y.a[n].url;return Object(p.h)("div",{className:x.a.home+" page"},!t.gameStarted&&Object(p.h)(H.a,{afterAction:this.timedOut}),Object(p.h)("div",null,!t.tooLate&&!t.snooze&&Object(p.h)(g,{src:r,width:"100%",height:o,name:"gameFrame",id:"gameFrame",className:x.a.framey,display:"initial",position:"relative",game_id:n,doGameStarted:this.doGameStarted}),t.tooLate&&Object(p.h)("div",{class:x.a.smaller},"Sorry friend, you snooze, you lose! Better luck next time...",Object(p.h)("div",{className:x.a.cent},Object(p.h)(k.a,{raised:!0,ripple:!0,dense:!0,class:x.a.green,onClick:function(){return Object(_.b)("/dash/1")}},"Try Again..."))),!t.tooLate&&t.snooze&&N,!t.tooLate&&Object(p.h)(F,{name:y.a[n].name,showStars:t.gameStarted,snoozer:this.startSnooze,game_id:n}),Object(p.h)(d.a,{options:{zIndex:200,top:"180px"}})))},t}(p.Component)},"7BVi":function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),s=n("eW0v"),c=o(s),u=n("5D9O"),l=o(u),p=n("9qb7"),f=o(p),d=function(e){function t(e){var n=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return n.state={value:e.value},n}return a(t,e),i(t,[{key:"componentWillReceiveProps",value:function(e){var t=e.value;null!=t&&t!==this.state.value&&this.setState({value:t})}},{key:"onChange",value:function(e){var t=this.props,n=t.editing,o=t.value;n&&null==o&&this.setState({value:e})}},{key:"onStarClick",value:function(e,t,n,o){o.stopPropagation();var r=this.props,a=r.onStarClick;r.editing&&a&&a(e,t,n,o)}},{key:"onStarHover",value:function(e,t,n,o){o.stopPropagation();var r=this.props,a=r.onStarHover;r.editing&&a&&a(e,t,n,o)}},{key:"onStarHoverOut",value:function(e,t,n,o){o.stopPropagation();var r=this.props,a=r.onStarHoverOut;r.editing&&a&&a(e,t,n,o)}},{key:"renderStars",value:function(){for(var e=this,t=this.props,n=t.name,o=t.starCount,r=t.starColor,a=t.emptyStarColor,i=t.editing,s=this.state.value,u=function(e,t){return{float:"right",cursor:i?"pointer":"default",color:t>=e?r:a}},l={display:"none",position:"absolute",marginLeft:-9999},p=[],f=o;f>0;f--)!function(t){var o=n+"_"+t,r=c.default.createElement("input",{key:"input_"+o,style:l,className:"dv-star-rating-input",type:"radio",name:n,id:o,value:t,checked:s===t,onChange:e.onChange.bind(e,t,n)}),a=c.default.createElement("label",{key:"label_"+o,style:u(t,s),className:"dv-star-rating-star "+(s>=t?"dv-star-rating-full-star":"dv-star-rating-empty-star"),htmlFor:o,onClick:function(o){return e.onStarClick(t,s,n,o)},onMouseOver:function(o){return e.onStarHover(t,s,n,o)},onMouseLeave:function(o){return e.onStarHoverOut(t,s,n,o)}},e.renderIcon(t,s,n,o));p.push(r),p.push(a)}(f);return p.length?p:null}},{key:"renderIcon",value:function(e,t,n,o){var r=this.props,a=r.renderStarIcon,i=r.renderStarIconHalf;return"function"==typeof i&&Math.ceil(t)===e&&t%1!=0?i(e,t,n,o):"function"==typeof a?a(e,t,n,o):c.default.createElement("i",{key:"icon_"+o,style:{fontStyle:"normal"}},"★")}},{key:"render",value:function(){var e=this.props,t=e.editing,n=e.className,o=(0,f.default)("dv-star-rating",{"dv-star-rating-non-editable":!t},n);return c.default.createElement("div",{style:{display:"inline-block",position:"relative"},className:o},this.renderStars())}}]),t}(s.Component);d.propTypes={name:l.default.string.isRequired,value:l.default.number,editing:l.default.bool,starCount:l.default.number,starColor:l.default.string,onStarClick:l.default.func,onStarHover:l.default.func,onStarHoverOut:l.default.func,renderStarIcon:l.default.func,renderStarIconHalf:l.default.func},d.defaultProps={starCount:5,editing:!0,starColor:"#ffb400",emptyStarColor:"#333"},t.default=d,e.exports=t.default},AJmS:function(e){e.exports={footer:"footer__1A6Wu","mdc-button--raised":"mdc-button--raised__2_dC5","mdc-layout-grid":"mdc-layout-grid__aj1HH",cent:"cent__3fwPW",green:"green__nPB_a",bar:"bar__2VsPI",vote:"vote__10ZLg",YES:"YES__9MDcB",NO:"NO__3-3MS",num:"num__1M10I",tiny:"tiny__2PYOr"}},FfuV:function(e){e.exports={newpage:"newpage__1Egs_","mdc-theme--dark":"mdc-theme--dark__3DaM3","mdc-card":"mdc-card__Ztvrn",warn:"warn__wK0ve",colorz:"colorz__EqmyL",loader:"loader__1Nzeo"}},JL9d:function(){},WMZS:function(e,t,n){"use strict";function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}n.d(t,"a",function(){return p});var a=n("KM04"),i=(n.n(a),n("UlEV")),s=(n.n(i),n("aqQ4")),c=(n.n(s),n("n5+B")),u=n("FfuV"),l=n.n(u),p=function(e){function t(t){var n=o(this,e.call(this,t));return n.onChange=function(e,t){switch(t){case 100:case 99:case 0:n.props.message="Start the game before it's too late!!!",n.props.color="#0F0";break;case 95:n.props.color="#0B0";break;case 45:n.props.color="#FC0",n.props.message="Time's almost up!";break;case 20:n.props.color="#F00";break;case 1:n.props.message="Too Late, better luck next time."}},n.onComplete=function(){n.timer&&(clearInterval(n.timer),n.props.afterAction&&n.props.afterAction(),n.timer=null,console.log("complete"))},n.state={progress:1},n.onChange.bind(n),n.onComplete.bind(n),n}return r(t,e),t.prototype.componentDidMount=function(){var e=this;this.timer=setInterval(function(){e.setState({progress:(e.state.progress+1)%100})},200)},t.prototype.componentWillUnmount=function(){clearInterval(this.timer)},t.prototype.render=function(e){return Object(a.h)("div",{class:l.a.loader},Object(a.h)("div",{class:l.a.warn},e.message),Object(a.h)(c.a,{id:"loader",class:l.a.loader,value:100-this.state.progress,height:"30px",color:e.color,onChange:this.onChange,onComplete:this.onComplete}))},t}(a.Component)},bg4B:function(e){e.exports={home:"home__2XFYm",smaller:"smaller___ebRL",beta:"beta__2OcNz",cent:"cent__8Geru",green:"green__1Ofz9"}},d9SV:function(){},iNBE:function(e,t,n){"use strict";function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}n.d(t,"a",function(){return v});var a=n("KM04"),i=(n.n(a),n("/QC5")),s=n("sJaT"),c=n.n(s),u=n("UlEV"),l=(n.n(u),n("aqQ4")),p=(n.n(l),n("7/cg")),f=n.n(p),d=n("V2oX"),h=(n.n(d),n("4XbH")),m=n.n(h),b=Object(a.h)("div",{className:"caption"}," Snooze:"),y=Object(a.h)("div",{class:"mdc-typography--caption"},"Snooze the content to re-appear after the following interval:"),v=function(e){function t(){for(var t,n,r,a=arguments.length,s=Array(a),c=0;c<a;c++)s[c]=arguments[c];return t=n=o(this,e.call.apply(e,[this].concat(s))),n.state={time:Date.now(),interval:0},n.updateTime=function(){n.setState({time:Date.now()})},n.doSnooze=function(e){n.interval=e;d.notify.show("See you soon! Be back in "+n.interval+" Minutes...","custom",3e3,{background:"#58F",text:"#FFFFFF"}),setTimeout(function(){Object(i.b)("/dark/"+3600*e)},3e3)},r=t,o(n,r)}return r(t,e),t.prototype.render=function(){var e=this;return Object(a.h)("div",{class:m.a.newpage},Object(a.h)(c.a,null,b,Object(a.h)("div",{class:m.a.cardBody},Object(a.h)("div",{className:"grid"},y,Object(a.h)("div",{class:m.a.bgroup},Object(a.h)(f.a,{raised:!0,ripple:!0,dense:!0,onClick:function(){return e.doSnooze(10)}},"10 Min"),Object(a.h)(f.a,{raised:!0,ripple:!0,dense:!0,onClick:function(){return e.doSnooze(30)}},"30 Min"),Object(a.h)(f.a,{raised:!0,ripple:!0,dense:!0,onClick:function(){return e.doSnooze(60)}},"1 Hr")),Object(a.h)("div",{class:m.a.bgroup},Object(a.h)(f.a,{raised:!0,ripple:!0,dense:!0,onClick:function(){return e.doSnooze(120)}},"2 Hrs"),Object(a.h)(f.a,{raised:!0,ripple:!0,dense:!0,onClick:function(){return e.doSnooze(480)}},"4 Hrs"),Object(a.h)(f.a,{raised:!0,ripple:!0,dense:!0,onClick:function(){return e.doSnooze(3600)}},"1 Day"))))))},t}(a.Component)}});
//# sourceMappingURL=route-dash.chunk.6e09d.js.map