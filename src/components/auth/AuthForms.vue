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
        <p class="signup-error" style="color: red; margin-top: 10px"></p>

        <div class="form-group">
          <label for="name-client">Name</label>
          <input
            type="text"
            id="name-client"
            name="name"
            class="form-control"
            placeholder="Name"
            autocomplete="off"
            v-model="name"
          />
        </div>
        <div class="form-group">
          <label for="email-client">Email</label>
          <input
            type="email"
            id="email-client"
            name="email"
            class="form-control"
            placeholder="Email address"
            autocomplete="false | unknown-autocomplete-value"
            v-model="email"
          />
        </div>
        <div class="form-group">
          <label for="password-client">Password</label>
          <input
            type="password"
            id="password-client"
            name="password"
            class="form-control"
            placeholder="Password"
            v-model="password"
            autocomplete="false | unknown-autocomplete-value"
          />
        </div>
        <a @click="toggleForms('login', 'signup')">
          Already have account
          <b>Login</b>
        </a>
        <input type="submit" value="Sign up" class="btn" />
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
          <label for="login-email-client">Email</label>
          <input
            type="email"
            id="login-email-client"
            name="email"
            class="form-control"
            placeholder="Email address"
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
            placeholder="Password"
            v-model="password"
            autocomplete="false | unknown-autocomplete-value"
          />
        </div>
        <a @click="toggleForms('signup', 'login')">
          You dont have account
          <b>Sign up</b>
        </a>
        <input type="submit" value="Login" class="btn" />
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
      loading: false,
    };
  },
  mounted() {
    let authtype = this.$route.params.type;
    console.log(authtype);
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
          password: this.password,
        },
      });
      console.log(res);
      if (!res.state) {
        this.loading = false;
        return (document.querySelector(".signup-error").innerHTML = res.msg);
      }
      this.loading = false;

      document.querySelector(".login-success").innerHTML =
        "Thank you, please login now";
      this.$refs.login.classList.add("block");
      this.$refs.signup.classList.remove("block");
      this.toggleForms("login", "signup");
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
        },
      });
      console.log(res);
      if (!res.state) {
        this.loading = false;
        return (document.querySelector(".login-error").innerHTML = res.msg);
      }
      localStorage.setItem("uid", res.json._id);
      return this.$router.push("/");
    },
    toggleForms(visible, hide) {
      this.resetFeedbackMsgs();

      this.$refs[visible].classList.add("block");
      this.$refs[hide].classList.remove("block");
    },
    resetFeedbackMsgs() {
      document.querySelector(".login-success").innerHTML = "";
      document.querySelector(".login-error").innerHTML = "";
      document.querySelector(".signup-error").innerHTML = "";
    },
  },
  watch: {
    "$route.params.type": function (type) {
      if (type == "signup") {
        this.toggleForms("signup", "login");
      } else {
        this.toggleForms("login", "signup");
      }
    },
  },
};
</script>

<style>
form {
  background-color: #fff;
  padding: var(--m-padding);
  box-shadow: var(--shadow3);
  text-align: left;
  margin: var(--l-margin) 0;
}
</style>