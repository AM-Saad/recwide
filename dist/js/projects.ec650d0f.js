(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["projects"],{"192e":function(t,e,r){t.exports=r.p+"img/cam.8d017e17.svg"},"4d47":function(t,e,r){},5169:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("div",[r("div",{staticClass:"wrapper"},[r("AuthNav"),r("main",{},[t._m(0),t.fetching?t._e():r("List",{attrs:{projects:t.projects}}),t.fetching?r("div",[t._v("Loading...")]):t._e()],1)],1)])])},c=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"dashborad-header"},[r("a",[t._v("My Account")]),r("h2",[t._v("My Projects")])])}],s=(r("8e6e"),r("ac6a"),r("456d"),r("96cf"),r("3b8d")),o=r("bd86"),a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[t.projects.length>0?r("div",{staticClass:"content grid g-three p-large"},[t._l(t.projects,function(t){return r("Project",{key:t._id,attrs:{project:t}})}),r("router-link",{staticClass:"project new-project",attrs:{to:"/recorder"}},[r("div",{staticClass:"button"},[t._v("\n      Create New Project\n      ")])])],2):t._e(),0==t.projects.length?r("div",[r("div",{staticClass:"content grid g-three p-large"},[r("router-link",{staticClass:"project new-project",attrs:{to:"/recorder"}},[r("div",{staticClass:"button"},[t._v("\n      Create New Project\n      ")])])],1)]):t._e()])},i=[],u=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("router-link",{staticClass:"project",attrs:{to:{name:"project",params:{slug:t.project.slug}}}},[n("div",{staticClass:"flex f-space-between"},[n("h3",{staticClass:"project-title"},[t._v(" "+t._s(t.project.name))]),"screenAndWebcam"===t.project.mode?n("img",{staticClass:"project-mode",attrs:{src:r("6a9d")}}):t._e(),"screen"===t.project.mode?n("img",{staticClass:"project-mode",attrs:{src:r("6e33")}}):t._e(),"webcam"===t.project.mode?n("img",{staticClass:"project-mode",attrs:{src:r("192e")}}):t._e()]),n("div",{staticClass:"flex"},[n("span",[t._v(t._s(t.project.res))])]),n("span",{staticClass:"project-date"},[t._v(t._s(t.project.date))])])},p=[],l=r("2f62");function d(t,e){var r=Object.keys(t);return Object.getOwnPropertySymbols&&r.push.apply(r,Object.getOwnPropertySymbols(t)),e&&(r=r.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r}function f(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?d(r,!0).forEach(function(e){Object(o["a"])(t,e,r[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):d(r).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))})}return t}var h={name:"Project",data:function(){return{}},props:["project"],components:{},computed:f({},Object(l["b"])("user",["projects","fetching","isAuth"]))},j=h,b=r("2877"),g=Object(b["a"])(j,u,p,!1,null,"405c0eb7",null),v=g.exports,m={name:"List",data:function(){return{}},props:["projects"],components:{Project:v},methods:{}},O=m,w=(r("dde1"),Object(b["a"])(O,a,i,!1,null,null,null)),y=w.exports,_=r("5cd0");r("bddd"),r("f303");function P(t,e){var r=Object.keys(t);return Object.getOwnPropertySymbols&&r.push.apply(r,Object.getOwnPropertySymbols(t)),e&&(r=r.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r}function C(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?P(r,!0).forEach(function(e){Object(o["a"])(t,e,r[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):P(r).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))})}return t}var x={data:function(){return{}},components:{List:y,AuthNav:_["a"]},computed:C({},Object(l["b"])("user",["projects","fetching"])),created:function(){this.getProjects()},methods:{getProjects:function(){var t=Object(s["a"])(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(0!==this.projects.length){t.next=5;break}return this.$store.commit("user/fetching",!0),t.next=4,this.$store.dispatch({type:"user/getProjects"});case 4:this.$store.commit("user/fetching",!1);case 5:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}()},watch:{isAuth:function(t){t||this.$router.push("/")}}},k=x,$=Object(b["a"])(k,n,c,!1,null,null,null);e["default"]=$.exports},"6a9d":function(t,e,r){t.exports=r.p+"img/both.e5e882ce.svg"},"6e33":function(t,e,r){t.exports=r.p+"img/screen.422f31c8.svg"},a2ae:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("div",{staticClass:"wrapper"},[r("AuthNav"),t.project?r("main",{},[r("div",{staticClass:"dashborad-header"},[r("router-link",{attrs:{to:"/projects"}},[t._v("\n        My Projects\n    ")]),r("div",{staticClass:"flex f-space-between"},[r("h2",[t._v(" "+t._s(t.project.name))]),t.deleteing?t._e():r("button",{staticClass:"btn btn-small btn-danger",on:{click:function(e){return t.deleteProject(e,t.project._id)}}},[t._v("Delete")]),t.deleteing?r("button",{staticClass:"btn btn-small btn-danger"},[t._m(0)]):t._e()])],1),t.fetching?r("div",[t._v("Loading...")]):t._e(),r("div",{staticClass:" grid g-two"},t._l(t.project.videos,function(e){return r("div",{key:e._id,staticClass:"video-wrapper"},[r("video",{attrs:{src:t.url+e.url}}),r("a",{staticClass:"btn btn-small btn-success",attrs:{download:"",href:t.url+e.url}},[t._v("Download")])])}),0)]):t._e()],1)])},c=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"spinner"},[r("div",{staticClass:"double-bounce1"}),r("div",{staticClass:"double-bounce2"})])}],s=(r("8e6e"),r("ac6a"),r("456d"),r("96cf"),r("3b8d")),o=(r("6b54"),r("7514"),r("bd86")),a=r("5cd0"),i=(r("bddd"),r("f303"),r("2f62"));function u(t,e){var r=Object.keys(t);return Object.getOwnPropertySymbols&&r.push.apply(r,Object.getOwnPropertySymbols(t)),e&&(r=r.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r}function p(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?u(r,!0).forEach(function(e){Object(o["a"])(t,e,r[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):u(r).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))})}return t}var l={data:function(){return{currentId:null,deleteing:!1}},components:{AuthNav:a["a"]},computed:p({},Object(i["b"])("user",["projects","fetching"]),{},Object(i["b"])(["url"]),{project:function(){var t=this;return this.projects.find(function(e){return e.slug.toString()===t.currentId})}}),created:function(){var t=Object(s["a"])(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.getProjects();case 2:this.currentId=this.$route.params.slug,this.$store.commit("user/fetching",!1);case 4:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),methods:{getProjects:function(){var t=Object(s["a"])(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(0!==this.projects.length){t.next=4;break}return this.$store.commit("user/fetching",!0),t.next=4,this.$store.dispatch({type:"user/getProjects"});case 4:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),deleteProject:function(){var t=Object(s["a"])(regeneratorRuntime.mark(function t(e,r){var n;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(!confirm("Do you really want to delete this project?")){t.next=13;break}return this.deleteing=!0,t.next=4,this.$store.dispatch({type:"user/deleteProject",id:r});case 4:if(n=t.sent,n.state){t.next=10;break}return this.deleteing=!1,t.abrupt("return",document.querySelector(".video-error").innerHTML=n.msg);case 10:return t.abrupt("return",this.$router.push("/projects"));case 11:t.next=14;break;case 13:e.preventDefault();case 14:case"end":return t.stop()}},t,this)}));function e(e,r){return t.apply(this,arguments)}return e}()},watch:{isAuth:function(t){t||this.$router.push("/")}}},d=l,f=(r("c92a"),r("2877")),h=Object(f["a"])(d,n,c,!1,null,null,null);e["default"]=h.exports},c92a:function(t,e,r){"use strict";var n=r("ed5a"),c=r.n(n);c.a},dde1:function(t,e,r){"use strict";var n=r("4d47"),c=r.n(n);c.a},ed5a:function(t,e,r){}}]);
//# sourceMappingURL=projects.ec650d0f.js.map