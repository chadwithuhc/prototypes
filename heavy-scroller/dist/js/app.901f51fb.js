(function(t){function e(e){for(var r,a,u=e[0],s=e[1],c=e[2],f=0,p=[];f<u.length;f++)a=u[f],o[a]&&p.push(o[a][0]),o[a]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(t[r]=s[r]);l&&l(e);while(p.length)p.shift()();return i.push.apply(i,c||[]),n()}function n(){for(var t,e=0;e<i.length;e++){for(var n=i[e],r=!0,u=1;u<n.length;u++){var s=n[u];0!==o[s]&&(r=!1)}r&&(i.splice(e--,1),t=a(a.s=n[0]))}return t}var r={},o={1:0},i=[];function a(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=t,a.c=r,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)a.d(n,r,function(e){return t[e]}.bind(null,r));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="/prototypes/heavy-scroller/dist/";var u=window["webpackJsonp"]=window["webpackJsonp"]||[],s=u.push.bind(u);u.push=e,u=u.slice();for(var c=0;c<u.length;c++)e(u[c]);var l=s;i.push([2,0]),n()})({2:function(t,e,n){t.exports=n("Vtdi")},Vtdi:function(t,e,n){"use strict";n.r(e);n("VRzm");var r=n("Kw5r"),o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("aside",{on:{"!mousemove":function(e){return t.bubble(e)}}},[n("ul",t._l(t.items,function(e,r){return n("li",{key:r,style:t.genFontSize(r)},[n("a",{attrs:{href:"#","data-index":r}},[t._v(t._s(e))])])}))])},i=[],a={name:"bubble-hover",data:function(){return{target:6,percent:0,items:["React","Vue.js","jQuery","Node.js","Express","Angular","Backbone"],settings:{fontSizeMax:2,fontSizeBase:.7,opacityMax:1,opacityBase:0,multiplier:1.5}}},mounted:function(){},methods:{genFontSize:function(t){var e=this.settings,n=e.fontSizeMax,r=e.fontSizeBase,o=e.opacityMax,i=e.opacityBase,a=e.multiplier,u=1/this.items.length,s=100*(u*t-Math.floor(u/2)),c=Math.round(1/this.items.length*t*100),l=Math.round(c+1/this.items.length*100);this.percent>=c&&this.percent<=l&&(this.target=t);var f=Math.abs(this.percent-s),p=(n*(f*a)/100).toFixed(2),d=(o*(f*a)/100).toFixed(2),h=n-p,b=o-d;return{fontSize:"".concat(h<r?r:h,"em"),opacity:"".concat(b<i?i:b)}},bubble:function(t){var e=t.target,n=t.pageY-this.$el.offsetTop,r=this.$el.offsetHeight,o=Math.round(n/r*100);this.percent=o,"A"===e.nodeName&&(this.target=+e.dataset.index)}}},u=a,s=(n("nNx0"),n("KHd+")),c=Object(s["a"])(u,o,i,!1,null,null,null),l=c.exports;r["a"].config.productionTip=!1,new r["a"]({render:function(t){return t(l)}}).$mount("#app")},nNx0:function(t,e,n){"use strict";var r=n("uWEC"),o=n.n(r);o.a},uWEC:function(t,e,n){}});
//# sourceMappingURL=app.901f51fb.js.map