<template>
  <div class="backdrop">
    <div class="inner">
              <div class="title" >
        You need to register first to be able to save your project
      </div>
        <div :class="{ loader: loading }">
    <form
      method="post"
      action="/form"
      class="formSignup none"
      autocomplete="off"
      ref="signup"
      @submit.prevent="signup()"
    >
      <div class="">
        <h3>Sign up</h3>
        <p class="signup-error" style="color: red; margin-top: 10px"></p>

        <div class="form-group">
          <input
            type="text"
            id="name-client"
            name="name"
            class="form-control"
            placeholder="Add Your Name..."
            autocomplete="off"
            v-model="name"
          />
        </div>
        <div class="form-group">
          <input
            type="email"
            id="email-client"
            name="email"
            class="form-control"
            placeholder="Add Your Email address..."
            autocomplete="false | unknown-autocomplete-value"
            v-model="email"
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            id="password-client"
            name="password"
            class="form-control"
            placeholder="Write Your Password..."
            v-model="password"
            autocomplete="false | unknown-autocomplete-value"
          />
        </div>
        <a v-if="!loading" @click="toggleForms('login', 'signup')">
          Already have and account
          <b>Login</b>
        </a>
              <div class="f-center flex m-large mt-large ">
        <button class="btn" @click="cancel">Cancel</button>

        <input v-if="!loading" type="submit" value="Signup" class="btn btn-gradient" />
        <button disabled="disabled" class="btn btn-gradient" v-if="loading">
          <div class="spinner">
            <div class="double-bounce1"></div>
            <div class="double-bounce2"></div>
          </div>
        </button>

        </div>
      </div>
    </form>
    <form
      method="post"
      action="/form"
      class="formLogin none"
      autocomplete="off"
      ref="login"
      @submit.prevent="login()"
    >
      <div class="">
        <h3>Login</h3>
        <p class="login-error" style="color: red; margin-top: 10px"></p>
        <p class="login-success" style="color: green; margin-top: 10px"></p>

        <div class="form-group">
          <input
            type="email"
            id="login-email-client"
            name="email"
            class="form-control"
            placeholder="Add Your Email Address..."
            autocomplete="false | unknown-autocomplete-value"
            v-model="email"
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            id="login-password-client"
            name="password"
            class="form-control"
            placeholder="Write Your Password..."
            v-model="password"
            autocomplete="false | unknown-autocomplete-value"
          />
        </div>
        <a v-if="!loading" @click="toggleForms('signup', 'login')">
          You don't have an account
          <b>Sign up</b>
        </a>
        <div class="f-center flex m-large mt-large ">

        <button class="btn " @click="cancel">Cancel</button>

        <input v-if="!loading" type="submit" value="Login" class="btn btn-gradient" />
        <button disabled="disabled" class="btn btn-gradient" v-if="loading">
          <div class="spinner">
            <div class="double-bounce1"></div>
            <div class="double-bounce2"></div>
          </div>
        </button>
        </div>
      </div>
    </form>
  </div>
   
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Permissions",
  data() {
    return {
      dontShow: false,
      name: "",
      email: "",
      password: "",
      loading: false
    };
  },
  computed: {
    ...mapState(["micGranted", "camGranted"]),
    ...mapState("user", ["isAuth", "user"])
  },
  mounted() {
    let authtype = this.$route.params.type || "login";
    this.$refs[authtype].classList.add("block");
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },

    async signup() {
      this.resetFeedbackMsgs();

      if (!this.name || !this.email || !this.password) {
        return (document.querySelector(".signup-error").innerHTML =
          "Please add your informations ");
      }
      this.loading = true;
      const res = await this.$store.dispatch({
        type: "user/signup",
        data: {
          name: this.name,
          email: this.email,
          password: this.password
        }
      });
      if (!res.state) {
        this.loading = false;
        return (document.querySelector(".signup-error").innerHTML = res.msg);
      }
      this.loading = false;

      this.$refs.login.classList.add("block");
      this.$refs.signup.classList.remove("block");
      this.toggleForms("login", "signup");
      document.querySelector(".login-success").innerHTML =
        "Thank you, please login now";
    },
    async login() {
      this.resetFeedbackMsgs();
      if (!this.email || !this.password) {
        return (document.querySelector(".login-error").innerHTML =
          "Please add your informations ");
      }
      this.loading = true;
      const res = await this.$store.dispatch({
        type: "user/login",
        data: {
          email: this.email,
          password: this.password
        }
      });
      if (!res.state) {
        this.loading = false;
        return (document.querySelector(".login-error").innerHTML = res.msg);
      }
      localStorage.setItem("uid", res.json._id);
      this.cancel();
    },
    toggleForms(visible, hide) {
      this.resetFeedbackMsgs();

      this.$refs[visible].classList.add("block");
      this.$refs[hide].classList.remove("block");

      window.history.pushState({ pageTitle: "Login" }, "", `/auth/${visible}`);
    },
    resetFeedbackMsgs() {
      document.querySelector(".login-success").innerHTML = "";
      document.querySelector(".login-error").innerHTML = "";
      document.querySelector(".signup-error").innerHTML = "";
    }
  },
  watch: {}
};
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.782);
  z-index: 999999999;
}
.inner {
  background-color: #fff;
  border-radius: var(--l-radius);
  border: 1px solid #ccc;
  padding: var(--l-padding);
  position: absolute;
  width: 40%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.inner .title {
  margin: var(--m-margin) 0;
  font-size: 18px;
  color: #444;
  text-transform: uppercase;
  line-height: 1.5;
}
.inner .desc {
  margin: var(--m-margin) 0;
}
.inner video {
  margin: auto;
  display: block;
  max-width: 90%;
}
form a b{
  cursor: pointer;
}
form a b:hover{
  color: #888
}
.form-group {
  margin: var(--m-margin) 0;
  margin-bottom: 20px;
}
.form-group label {
  font-size: 20px;
}

.form-control {
  width: 100%;
  height: 50px;
  padding: var(--m-padding);
  border: 0;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  font-size: 22px;
  color: #222;
  background: #e8f0fe;
  border-radius: var(--l-radius);
}
@media only screen and (max-width: 1025px) and (min-width: 320px) {
  .inner {
    width: 90%;
  }
}
</style>