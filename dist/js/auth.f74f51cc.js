(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["auth"],{"4a6e":function(e,t,r){"use strict";r.r(t);var s=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("AuthForms")],1)},a=[],n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{class:{loader:e.loading}},[r("form",{ref:"signup",staticClass:"formSignup none",attrs:{method:"post",action:"/form",autocomplete:"off"},on:{submit:function(t){return t.preventDefault(),e.signup()}}},[r("div",{},[r("h3",[e._v("Sign up")]),r("p",{staticClass:"hint"},[e._v("By register you will be able to save your projects and retrive them anytime you need it.")]),r("p",{staticClass:"signup-error",staticStyle:{color:"red","margin-top":"10px"}}),r("div",{staticClass:"form-group"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.name,expression:"name"}],staticClass:"form-control",attrs:{type:"text",id:"name-client",name:"name",placeholder:"Add Your Name...",autocomplete:"off"},domProps:{value:e.name},on:{input:function(t){t.target.composing||(e.name=t.target.value)}}})]),r("div",{staticClass:"form-group"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.email,expression:"email"}],staticClass:"form-control",attrs:{type:"email",id:"email-client",name:"email",placeholder:"Add Your Email address...",autocomplete:"false | unknown-autocomplete-value"},domProps:{value:e.email},on:{input:function(t){t.target.composing||(e.email=t.target.value)}}})]),r("div",{staticClass:"form-group"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],staticClass:"form-control",attrs:{type:"password",id:"password-client",name:"password",placeholder:"Write Your Password...",autocomplete:"false | unknown-autocomplete-value"},domProps:{value:e.password},on:{input:function(t){t.target.composing||(e.password=t.target.value)}}})]),e.loading?e._e():r("a",{on:{click:function(t){return e.toggleForms("login","signup")}}},[e._v("\n          Already have an account\n          "),r("b",[e._v("Login")])]),e.loading?e._e():r("input",{staticClass:"btn btn-gradient",attrs:{type:"submit",value:"Sign up"}}),e.loading?r("button",{staticClass:"btn btn-gradient",attrs:{disabled:"disabled"}},[e._m(0)]):e._e()])]),r("form",{ref:"login",staticClass:"formLogin none",attrs:{method:"post",action:"/form",autocomplete:"off"},on:{submit:function(t){return t.preventDefault(),e.login()}}},[r("div",{},[r("h3",[e._v("Login")]),r("p",{staticClass:"hint"},[e._v("Enter your account the see your projects")]),r("p",{staticClass:"login-error",staticStyle:{color:"red","margin-top":"10px"}}),r("p",{staticClass:"login-success",staticStyle:{color:"green","margin-top":"10px"}}),r("div",{staticClass:"form-group"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.email,expression:"email"}],staticClass:"form-control",attrs:{type:"email",id:"login-email-client",name:"email",placeholder:"Add Your Email Address...",autocomplete:"false | unknown-autocomplete-value"},domProps:{value:e.email},on:{input:function(t){t.target.composing||(e.email=t.target.value)}}})]),r("div",{staticClass:"form-group"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],staticClass:"form-control",attrs:{type:"password",id:"login-password-client",name:"password",placeholder:"Write Your Password...",autocomplete:"false | unknown-autocomplete-value"},domProps:{value:e.password},on:{input:function(t){t.target.composing||(e.password=t.target.value)}}})]),r("div",{staticClass:"form-group"},[r("label",{attrs:{for:"login-rememberMe-client"}},[e._v("Remember Me")]),r("input",{directives:[{name:"model",rawName:"v-model",value:e.rememberMe,expression:"rememberMe"}],attrs:{type:"checkbox",id:"login-rememberMe-client",name:"rememberMe"},domProps:{checked:Array.isArray(e.rememberMe)?e._i(e.rememberMe,null)>-1:e.rememberMe},on:{change:function(t){var r=e.rememberMe,s=t.target,a=!!s.checked;if(Array.isArray(r)){var n=null,o=e._i(r,n);s.checked?o<0&&(e.rememberMe=r.concat([n])):o>-1&&(e.rememberMe=r.slice(0,o).concat(r.slice(o+1)))}else e.rememberMe=a}}})]),e.loading?e._e():r("a",{on:{click:function(t){return e.toggleForms("signup","login")}}},[e._v("\n          You don't have an account\n          "),r("b",[e._v("Sign up")])]),e.loading?e._e():r("input",{staticClass:"btn btn-gradient",attrs:{type:"submit",value:"Login"}}),e.loading?r("button",{staticClass:"btn btn-gradient",attrs:{disabled:"disabled"}},[e._m(1)]):e._e()])])])},o=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"spinner"},[r("div",{staticClass:"double-bounce1"}),r("div",{staticClass:"double-bounce2"})])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"spinner"},[r("div",{staticClass:"double-bounce1"}),r("div",{staticClass:"double-bounce2"})])}],i=(r("7f7f"),r("96cf"),r("3b8d")),l={name:"AuthForms",data:function(){return{name:"",email:"",password:"",rememberMe:!1,loading:!1}},mounted:function(){var e=this.$route.params.type||"login";this.$refs[e].classList.add("block")},created:function(){},methods:{signup:function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(this.resetFeedbackMsgs(),this.name&&this.email&&this.password){e.next=3;break}return e.abrupt("return",document.querySelector(".signup-error").innerHTML="Please add your informations ");case 3:return this.loading=!0,e.next=6,this.$store.dispatch({type:"user/signup",data:{name:this.name,email:this.email,password:this.password}});case 6:if(t=e.sent,t.state){e.next=10;break}return this.loading=!1,e.abrupt("return",document.querySelector(".signup-error").innerHTML=t.msg);case 10:this.loading=!1,this.$refs.login.classList.add("block"),this.$refs.signup.classList.remove("block"),this.toggleForms("login","signup"),document.querySelector(".login-success").innerHTML="Thank you, please login now";case 15:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),login:function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(this.resetFeedbackMsgs(),this.email&&this.password){e.next=3;break}return e.abrupt("return",document.querySelector(".login-error").innerHTML="Please add your informations ");case 3:return this.loading=!0,e.next=6,this.$store.dispatch({type:"user/login",data:{email:this.email,password:this.password,rememberMe:this.rememberMe}});case 6:if(t=e.sent,t.state){e.next=10;break}return this.loading=!1,e.abrupt("return",document.querySelector(".login-error").innerHTML=t.msg);case 10:return localStorage.setItem("uid",t.json._id),e.abrupt("return",this.$router.push("/projects"));case 12:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),toggleForms:function(e,t){this.resetFeedbackMsgs(),this.$refs[e].classList.add("block"),this.$refs[t].classList.remove("block"),window.history.pushState({pageTitle:"Login"},"","/auth/".concat(e))},resetFeedbackMsgs:function(){document.querySelector(".login-success").innerHTML="",document.querySelector(".login-error").innerHTML="",document.querySelector(".signup-error").innerHTML=""}},watch:{"$route.params.type":function(e){"signup"==e?this.toggleForms("signup","login"):this.toggleForms("login","signup")}}},u=l,c=(r("6012"),r("2877")),m=Object(c["a"])(u,n,o,!1,null,"314f969a",null),d=m.exports,p={name:"Auth",data:function(){return{}},components:{AuthForms:d}},g=p,f=Object(c["a"])(g,s,a,!1,null,null,null);t["default"]=f.exports},6012:function(e,t,r){"use strict";var s=r("c6cb"),a=r.n(s);a.a},c6cb:function(e,t,r){}}]);
//# sourceMappingURL=auth.f74f51cc.js.map