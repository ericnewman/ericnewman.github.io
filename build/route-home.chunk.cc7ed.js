webpackJsonp([0],{"4XbH":function(e){e.exports={snooze:"snooze__7LZ6r",cardHeader:"cardHeader__259pY",cardBody:"cardBody__2D_tE",newpage:"newpage__1ConQ",bgroup:"bgroup__1iQlq"}},"7TsS":function(e){e.exports={home:"home__1QuLy",cardHeader:"cardHeader__bi3c-",cardBody:"cardBody__2DTyL"}},"8KG1":function(e){e.exports={cardHeader:"cardHeader__1Xu-q",newpage:"newpage__1fJJr",ranks:"ranks__m83nj",header:"header__33SK-",game:"game__hPgdX",player:"player__2MPuw",email:"email__2rsiw",tplay:"tplay__2iTCp"}},FfuV:function(e){e.exports={newpage:"newpage__1Egs_","mdc-theme--dark":"mdc-theme--dark__3DaM3","mdc-card":"mdc-card__Ztvrn",warn:"warn__wK0ve",colorz:"colorz__EqmyL",loader:"loader__1Nzeo"}},"G6a+":function(e,t,n){"use strict";function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}n.d(t,"a",function(){return h});var a=n("KM04"),s=(n.n(a),n("UlEV")),c=(n.n(s),n("aqQ4")),i=(n.n(c),n("n5+B")),l=n("IxGd"),p=n.n(l),u=function(e){var t="";switch(e.metal){case"brass":t=p.a.brass;break;case"silver":t=p.a.silver;break;case"gold":t=p.a.gold}return e.earned||(t+=" "+p.a.unearned),Object(a.h)("div",{class:p.a.coin+" "+t},Object(a.h)("div",{class:p.a.num},e.progress))},h=function(e){function t(t){var n=r(this,e.call(this,t));return n.onChange=function(){},n.onComplete=function(){},n.onChange.bind(n),n.onComplete.bind(n),n}return o(t,e),t.prototype.recalcColors=function(){var e=this.props.progress;e>80?(this.props.color="#0F0",this.props.earnedBrass=!0,this.props.earnedSilver=!0,this.props.earnedGold=!0):e>40?(this.props.color="#FC0",this.props.earnedBrass=!0,this.props.earnedSilver=!0,this.props.earnedGold=!1):e>30?(this.props.color="#F00",this.props.earnedBrass=!0,this.props.earnedSilver=!1,this.props.earnedGold=!1):e>0&&(this.props.color="#800",this.props.earnedBrass=!1,this.props.earnedSilver=!1,this.props.earnedGold=!1)},t.prototype.randomize=function(){var e=Math.floor(Math.random()*Math.floor(100));this.props.progress=e,this.props.brassPts=e%30,this.props.silverPts=e%60,this.props.goldPts=e%90,this.recalcColors(),this.setState(this.props)},t.prototype.componentWillMount=function(){var e=this;this.props.color="#FF3",this.props.title="Level",this.timer=setInterval(function(){e.randomize()},800)},t.prototype.componentDidMount=function(){},t.prototype.componentWillUnmount=function(){clearInterval(this.timer)},t.prototype.render=function(e,t){return Object(a.h)("div",{class:p.a.bar},Object(a.h)(i.a,{className:p.a.loader,value:t.progress,height:"32px",color:e.color,onChange:this.onChange,onComplete:this.onComplete}),Object(a.h)("div",{className:p.a.title},e.title),Object(a.h)(u,{metal:"brass",earned:e.earnedBrass,progress:e.brassPts}),Object(a.h)(u,{metal:"silver",earned:e.earnedSilver,progress:e.silverPts}),Object(a.h)(u,{metal:"gold",earned:e.earnedGold,progress:e.goldPts}))},t}(a.Component)},IxGd:function(e){e.exports={newpage:"newpage__2oQUZ","mdc-theme--dark":"mdc-theme--dark__1sgQx","mdc-card":"mdc-card__2PIR1",title:"title__3RUai",loader:"loader__1gtit",bar:"bar__T_hhJ",coin:"coin__3178z",brass:"brass__1ZXFW",silver:"silver__2g-T0",gold:"gold__1uL8b",unearned:"unearned__1ay8v",num:"num__1lK41"}},JI0y:function(e,t,n){"use strict";function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}n.d(t,"a",function(){return f});var a=n("KM04"),s=(n.n(a),n("lT++")),c=n("sJaT"),i=n.n(c),l=n("UlEV"),p=(n.n(l),n("aqQ4")),u=(n.n(p),n("i/bD")),h=n.n(u),d=Object(a.h)("div",{className:"caption"},"Top Players:"),f=function(e){function t(){var t=r(this,e.call(this));return t.state={games:{},people:[]},t.tempG={},t.tempP=[],t}return o(t,e),t.prototype.componentDidMount=function(){var e=this;s.b.ref("games").orderByChild("times_played").limitToLast(5).on("value",function(t){e.tempG={},t.forEach(function(t){var n=t.key,r=t.val();e.tempG[n]=r}),e.setState({games:e.tempG,people:e.tempP})}),s.b.ref("users").orderByChild("total_achievements").limitToLast(5).on("value",function(t){e.tempP=[],t.forEach(function(t){var n=t.val();e.tempP.push(n),e.tempP.sort(function(e,t){return t.total_achievements-e.total_achievements})}),e.setState({games:e.tempG,people:e.tempP})})},t.prototype.render=function(){var e=this.state.people;return Object(a.h)("div",{class:h.a.newpage},Object(a.h)(i.a,null,d,Object(a.h)("div",{class:h.a.cardBody},Object(a.h)("div",{className:"grid"},Object(a.h)("div",{className:h.a.ranks},"The current top players are as follows:"),Object(a.h)("div",null,e.map(function(e){return""!==e.email&&Object(a.h)("div",null,Object(a.h)("span",{className:h.a.player},e.username),Object(a.h)("span",{className:h.a.ach+" "+h.a.green},e.achievements&&e.achievements.green>0&&Object(a.h)("span",null,e.achievements.green)),Object(a.h)("span",{className:h.a.ach+" "+h.a.red},e.achievements&&e.achievements.red>0&&Object(a.h)("span",null,e.achievements.red)),Object(a.h)("span",{className:h.a.ach+" "+h.a.blue},e.achievements&&e.achievements.blue>0&&Object(a.h)("span",null,e.achievements.blue)),Object(a.h)("span",{className:h.a.ach+" "+h.a.silver},e.achievements&&e.achievements.silver>0&&Object(a.h)("span",null,e.achievements.silver)),Object(a.h)("span",{className:h.a.ach+" "+h.a.gold},e.achievements&&e.achievements.gold>0&&Object(a.h)("span",null,e.achievements.gold)),Object(a.h)("span",{className:h.a.ach+" "+h.a.magic},e.achievements&&e.achievements.magic>0&&Object(a.h)("span",null,e.achievements.magic)))}))))))},t}(a.Component)},Lglr:function(e){e.exports={home:"home__1CGvB",cardHeader:"cardHeader__1EmLI",cardBody:"cardBody__2tPnl",currentUser:"currentUser__Qiq0O",ldr_grn:"ldr_grn__11TX_",ldr_yellow:"ldr_yellow__ub5Ba",ldr_red:"ldr_red__1mql3"}},NZXD:function(e,t,n){"use strict";function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}n.d(t,"a",function(){return f});var a=n("KM04"),s=(n.n(a),n("lT++")),c=n("sJaT"),i=n.n(c),l=n("UlEV"),p=(n.n(l),n("aqQ4")),u=(n.n(p),n("8KG1")),h=n.n(u),d=Object(a.h)("div",{class:"caption"},"Leaderboard:"),f=function(e){function t(){var t=r(this,e.call(this));return t.state={games:{},people:[]},t.tempG={},t.tempP=[],t}return o(t,e),t.prototype.componentDidMount=function(){var e=this;s.b.ref("games").orderByChild("times_played").limitToLast(5).on("value",function(t){e.tempG={},t.forEach(function(t){var n=t.key,r=t.val();e.tempG[n]=r}),e.setState({games:e.tempG,people:e.tempP})}),s.b.ref("users").orderByChild("total_achievements").limitToLast(5).on("value",function(t){e.tempP=[],t.forEach(function(t){var n=t.val();e.tempP.push(n),e.tempP.sort(function(e,t){return t.total_achievements-e.total_achievements})}),e.setState({games:e.tempG,people:e.tempP})})},t.prototype.render=function(){var e=Object.entries(this.state.games);return Object(a.h)("div",{class:h.a.newpage},Object(a.h)(i.a,null,d,Object(a.h)("div",{className:"grid"},Object(a.h)("div",{className:h.a.ranks},"The current top 5 played games:"),e.reverse().map(function(e){return e[1].times_played>0&&Object(a.h)("div",null,Object(a.h)("span",{class:h.a.game},e[1].name),Object(a.h)("span",{className:"scoreBox"},e[1].times_played))}))))},t}(a.Component)},WMZS:function(e,t,n){"use strict";function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}n.d(t,"a",function(){return u});var a=n("KM04"),s=(n.n(a),n("UlEV")),c=(n.n(s),n("aqQ4")),i=(n.n(c),n("n5+B")),l=n("FfuV"),p=n.n(l),u=function(e){function t(t){var n=r(this,e.call(this,t));return n.onChange=function(e,t){switch(t){case 100:case 99:case 0:n.props.message="Start the game before it's too late!!!",n.props.color="#0F0";break;case 95:n.props.color="#0B0";break;case 45:n.props.color="#FC0",n.props.message="Time's almost up!";break;case 20:n.props.color="#F00";break;case 1:n.props.message="Too Late, better luck next time."}},n.onComplete=function(){n.timer&&(clearInterval(n.timer),n.props.afterAction&&n.props.afterAction(),n.timer=null,console.log("complete"))},n.state={progress:1},n.onChange.bind(n),n.onComplete.bind(n),n}return o(t,e),t.prototype.componentDidMount=function(){var e=this;this.timer=setInterval(function(){e.setState({progress:(e.state.progress+1)%100})},200)},t.prototype.componentWillUnmount=function(){clearInterval(this.timer)},t.prototype.render=function(e){return Object(a.h)("div",{class:p.a.loader},Object(a.h)("div",{class:p.a.warn},e.message),Object(a.h)(i.a,{id:"loader",class:p.a.loader,value:100-this.state.progress,height:"30px",color:e.color,onChange:this.onChange,onComplete:this.onComplete}))},t}(a.Component)},XhVc:function(e){e.exports={currentUser:"currentUser__3ed5J",avatar:"avatar__2-9bK",userLabel:"userLabel__1AGtL",newpage:"newpage__1DzgS",cardBody:"cardBody__5lEys","mdc-theme--dark":"mdc-theme--dark__3_rPf","mdc-card":"mdc-card__1XLsI"}},awCh:function(e){e.exports={newpage:"newpage__j5jbu",ranks:"ranks__JI941",header:"header__18zCh",achievement:"achievement__1Hl8g",red:"red__3CLyN",green:"green__1xm6D",blue:"blue__1gAoS",silver:"silver__2u3S-",gold:"gold__2iQWx",magic:"magic__2pz34",bgroup:"bgroup__277Ad"}},"i/bD":function(e){e.exports={snooze:"snooze__343Gs",cardHeader:"cardHeader__fATB_",cardBody:"cardBody__qRuPB",newpage:"newpage__DsD0y",mylabel:"mylabel__3o1MZ",ranks:"ranks__3DBaI",header:"header__gToUj",game:"game__1E4VV",player:"player__1e8vM",email:"email__1hF39",tplay:"tplay__3yOwk",grid:"grid__2NEsu",ach:"ach__K4zwU",blue:"blue__11-tV",red:"red__2y7iR",green:"green__1llIE",silver:"silver__DYgl7",gold:"gold__1XDot",magic:"magic__DeyYe","mdc-theme--dark":"mdc-theme--dark__1evpv","mdc-card":"mdc-card__3weFy"}},"iOg+":function(e,t,n){"use strict";function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function c(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function p(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function u(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function h(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function d(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var f=n("KM04"),b=(n("kTCv"),n("/QC5")),m=n("sJaT"),_=n.n(m),v=(n("UlEV"),n("aqQ4"),n("7/cg")),y=n.n(v),g=n("V2oX"),O=n.n(g),j=n("4XbH"),w=n.n(j),C=Object(f.h)("div",{className:"caption"}," Snooze:"),k=Object(f.h)("div",{class:"mdc-typography--caption"},"Snooze the content to re-appear after the following interval:"),S=function(e){function t(){for(var t,n,o,a=arguments.length,s=Array(a),c=0;c<a;c++)s[c]=arguments[c];return t=n=r(this,e.call.apply(e,[this].concat(s))),n.state={time:Date.now(),interval:0},n.updateTime=function(){n.setState({time:Date.now()})},n.doSnooze=function(e){n.interval=e;g.notify.show("See you soon! Be back in "+n.interval+" Minutes...","custom",3e3,{background:"#58F",text:"#FFFFFF"}),setTimeout(function(){Object(b.b)("/dark/"+3600*e)},3e3)},o=t,r(n,o)}return o(t,e),t.prototype.render=function(){var e=this;return Object(f.h)("div",{class:w.a.newpage},Object(f.h)(_.a,null,C,Object(f.h)("div",{class:w.a.cardBody},Object(f.h)("div",{className:"grid"},k,Object(f.h)("div",{class:w.a.bgroup},Object(f.h)(y.a,{raised:!0,ripple:!0,dense:!0,onClick:function(){return e.doSnooze(10)}},"10 Min"),Object(f.h)(y.a,{raised:!0,ripple:!0,dense:!0,onClick:function(){return e.doSnooze(30)}},"30 Min"),Object(f.h)(y.a,{raised:!0,ripple:!0,dense:!0,onClick:function(){return e.doSnooze(60)}},"1 Hr")),Object(f.h)("div",{class:w.a.bgroup},Object(f.h)(y.a,{raised:!0,ripple:!0,dense:!0,onClick:function(){return e.doSnooze(120)}},"2 Hrs"),Object(f.h)(y.a,{raised:!0,ripple:!0,dense:!0,onClick:function(){return e.doSnooze(480)}},"4 Hrs"),Object(f.h)(y.a,{raised:!0,ripple:!0,dense:!0,onClick:function(){return e.doSnooze(3600)}},"1 Day"))))))},t}(f.Component),P=n("5wdR"),T=n("lT++"),E=n("awCh"),B=n.n(E),x=Object(f.h)("div",{className:"caption"},"Achievements:"),N=Object(f.h)("p",null),M=Object(f.h)("p",null),U=(function(e){function t(n){a(this,t);var r=s(this,e.call(this,n));return r.state={total_achievements:0,achievements:{}},r}c(t,e),t.prototype.bumpAchievement=function(e){var t=auth.currentUser.uid;T.b.ref("users/"+t+"/achievements/"+e).transaction(function(e){return(e||0)+1}),T.b.ref("users/"+t).update({total_achievements:this.state.total_achievements})},t.prototype.componentDidMount=function(){var e=this;T.b.ref("users/"+auth.currentUser.uid+"/achievements").on("value",function(t){var n={},r=0;t.forEach(function(e){var t=e.key,o=e.val();n[t]=o,r+=o}),e.setState({achievements:n,total_achievements:r})})},t.prototype.componentWillUnmount=function(){},t.prototype.render=function(){var e=this,t=this.state.achievements;return Object(f.h)("div",{class:B.a.newpage},Object(f.h)(_.a,null,x,Object(f.h)("div",{class:B.a.cardBody},Object(f.h)("div",{className:"grid"},Object(f.h)("div",{class:B.a.ranks},"You have a total of ",this.state.total_achievements," achievements."),Object(f.h)("div",{class:B.a.bgroup},Object(f.h)("span",{class:B.a.achievement+"\t"+B.a.red},t.red),Object(f.h)("span",{class:B.a.achievement+"\t"+B.a.green},t.green),Object(f.h)("span",{class:B.a.achievement+"\t"+B.a.blue},t.blue),Object(f.h)("span",{class:B.a.achievement+"\t"+B.a.silver},t.silver),Object(f.h)("span",{class:B.a.achievement+"\t"+B.a.gold},t.gold),Object(f.h)("span",{class:B.a.achievement+"\t"+B.a.magic},t.magic)),Object(f.h)("div",{className:B.a.ranks},"Add an achievement"),Object(f.h)("div",{class:B.a.bgroup},Object(f.h)(y.a,{raised:!0,ripple:!0,onClick:function(){return e.bumpAchievement("red")}},"Add Red"),Object(f.h)(y.a,{raised:!0,ripple:!0,onClick:function(){return e.bumpAchievement("green")}},"Add Green"),Object(f.h)(y.a,{raised:!0,ripple:!0,onClick:function(){return e.bumpAchievement("blue")}},"Add Blue"),N,Object(f.h)(y.a,{raised:!0,ripple:!0,onClick:function(){return e.bumpAchievement("silver")}},"Add Silver"),Object(f.h)(y.a,{raised:!0,ripple:!0,onClick:function(){return e.bumpAchievement("gold")}},"Add Gold"),Object(f.h)(y.a,{raised:!0,ripple:!0,onClick:function(){return e.bumpAchievement("magic")}},"Add Magic")),M))))}}(f.Component),n("NZXD"),n("JI0y"),n("XhVc")),G=n.n(U),D=(function(e){function t(n){i(this,t);var r=l(this,e.call(this));return r.state={currentUser:n},r}p(t,e),t.prototype.render=function(){var e=this.props.user;return Object(f.h)("div",{class:G.a.newpage},Object(f.h)(_.a,null,Object(f.h)("article",{class:G.a.currentUser},Object(f.h)("div",{class:G.a.userLabel},"Player"),Object(f.h)("img",{alt:e.displayName,class:G.a.avatar,src:e.photoURL,width:"40"}),Object(f.h)("div",{class:G.a.userLabel},e.displayName),Object(f.h)(y.a,{raised:!0,onClick:function(){return T.a.signOut()}},"Sign Out"))))}}(f.Component),n("WMZS")),L=n("G6a+"),z=n("Lglr"),A=n.n(z);n.d(t,"default",function(){return K});var F=Object(f.h)(D.a,null),I=Object(f.h)(P.a,{showHeader:!0,showFavorite:!0,clickable:!0}),H=Object(f.h)(L.a,{title:"HUSTLE",progress:50}),R=Object(f.h)(L.a,{title:"SNOOZE",progress:40}),Q=Object(f.h)(L.a,{title:"FLOW",progress:30}),V=Object(f.h)(S,null),K=function(e){function t(){u(this,t);var n=h(this,e.call(this));return n.state={currentUser:null},n}return d(t,e),t.writeUserData=function(e,t,n,r){T.b.ref("users/"+e).update({username:t,email:n,profile_picture:r})},t.prototype.componentDidMount=function(){var e=this;T.a.onAuthStateChanged(function(){e.setState({currentUser:T.a.currentUser})})},t.prototype.render=function(){return Object(f.h)("div",{class:A.a.home+" page"},F,I,H,R,Q,V,Object(f.h)(O.a,{options:{zIndex:200,top:"180px"}}))},t}(f.Component)},kTCv:function(e,t,n){"use strict";function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var a=n("KM04"),s=(n.n(a),n("sJaT")),c=n.n(s),i=n("UlEV"),l=(n.n(i),n("aqQ4")),p=(n.n(l),n("7/cg")),u=n.n(p),h=n("lT++"),d=n("7TsS"),f=n.n(d),b=Object(a.h)("div",{className:" mdc-typography--title"},"Sign In to Firebase");!function(e){function t(){return r(this,e.apply(this,arguments))}o(t,e),t.prototype.render=function(){return Object(a.h)("div",{class:f.a.home+" page"},Object(a.h)(c.a,null,b,Object(a.h)("div",{class:f.a.cardBody},Object(a.h)("div",{class:f.a.signIn},Object(a.h)(u.a,{raised:!0,ripple:!0,onClick:function(){return h.a.signInWithRedirect(h.c)}},"Sign In")))))}}(a.Component)}});
//# sourceMappingURL=route-home.chunk.cc7ed.js.map