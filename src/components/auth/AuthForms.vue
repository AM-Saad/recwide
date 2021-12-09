<template>
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
        <p class="hint">By register you will be able to save your projects and retrive them anytime you need it.</p>
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
          Already have an account
          <b>Login</b>
        </a>
        <input v-if="!loading" type="submit" value="Sign up" class="btn btn-gradient" />
           <button disabled="disabled" class="btn btn-gradient" v-if="loading">
          <div class="spinner">
  <div class="double-bounce1"></div>
  <div class="double-bounce2"></div>
</div>
        </button>
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
        <p class="hint">Enter your account the see your projects</p>
        <p class="login-error" style="color: red; margin-top: 10px"></p>
        <p class="login-success" style="color: green; margin-top: 10px"></p>

        <div class="form-group">
          <label for="login-email-client">Email</label>
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
          <label for="login-password-client">Password</label>

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
      <div class="form-group">
        <label for="login-rememberMe-client">Remember Me</label>
               <input
            type="checkbox"
            id="login-rememberMe-client"
            name="rememberMe"
            v-model="rememberMe"
          />
      </div>
        <a v-if="!loading" @click="toggleForms('signup', 'login')">
          You don't have an account
          <b>Sign up</b>
        </a>
        <input v-if="!loading" type="submit" value="Login" class="btn btn-gradient" />
        <button disabled="disabled" class="btn btn-gradient" v-if="loading">
            <div class="spinner">
            <div class="double-bounce1"></div>
            <div class="double-bounce2"></div>
        </div>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "AuthForms",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      rememberMe: false,
      loading: false
    };
  },
  mounted() {
    let authtype = this.$route.params.type || "login";
    this.$refs[authtype].classList.add("block");
  },
  created() {},
  methods: {
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
          password: this.password,
          rememberMe: this.rememberMe
        }
      });
      if (!res.state) {
        this.loading = false;
        return (document.querySelector(".login-error").innerHTML = res.msg);
      }
      localStorage.setItem("uid", res.json._id);
      return this.$router.push("/projects");
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
  watch: {
    "$route.params.type": function(type) {
      if (type == "signup") {
        this.toggleForms("signup", "login");
      } else {
        this.toggleForms("login", "signup");
      }
    }
  }
};
</script>

<style scoped>
h3 {
  font-size: 53px;
  font-weight: bolder;
  color: #444;
  margin-bottom: var(--m-margin);
}
.hint {
  color: #999;
  font-size: 16px;
}
form {
  width: 80%;
  background-color: #fff;
  padding: var(--l-padding);
  box-shadow: var(--shadow3);
  text-align: left;
  margin: var(--l-margin) auto;
  border-radius: var(--m-radius);
}
form a b {
  cursor: pointer;
}
form a b:hover {
  color: #444;
}
@media screen and (min-width: 320px) and (max-width: 720px) {
  form {
    width: 95%;
    padding: var(--m-padding);
  }
}
</style>