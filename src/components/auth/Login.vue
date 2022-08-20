<template v-slot="{ toggleForms }">
  <form
    method="post"
    action="/form"
    class="formLogin"
    autocomplete="off"
    ref="login"
    @submit.prevent="login()"
  >
    <div class="">
      <h3>Login</h3>
      <p class="hint">Enter your account the see your projects</p>
      <p v-if="error" class="login-error" style="color: red; margin-top: 10px">
        {{ error }}
      </p>

      <div class="form-group">
        <input
          type="email"
          id="login-email-client"
          name="email"
          class="form-control"
          placeholder="Add Your Email Address..."
          autocomplete="false | unknown-autocomplete-value"
          v-model="email"
          tabindex="1"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
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
          tabindex="2"
        />
      </div>
      <div class="form-group">
        <label for="login-rememberMe-client">Remember Me</label>
        <input
          type="checkbox"
          id="login-rememberMe-client"
          name="rememberMe"
          v-model="rememberMe"
          tabindex="3"
        />
      </div>
      <button class="toggle-forms" type="button" tabindex="4" v-if="!loading" @click="$emit('toggleForms', 'Signup')">
        You don't have an account
        <b>Sign up</b>
      </button>
      <input
        v-if="!loading"
        type="submit"
        value="Login"
        class="btn btn-gradient"
        tabindex="4"
      />
      <button disabled="disabled" class="btn btn-gradient" v-if="loading">
        <div class="spinner">
          <div class="double-bounce1"></div>
          <div class="double-bounce2"></div>
        </div>
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loading: false,
      email: "",
      password: "",
      rememberMe: false,
      error: null,
    };
  },
  methods: {
    async login() {
      this.error = null;
      if (!this.email || !this.password) {
        this.error = "Please add your informations";
        return;
      }
      this.loading = true;
      const res = await this.$store.dispatch({
        type: "user/login",
        data: {
          email: this.email,
          password: this.password,
          rememberMe: this.rememberMe,
        },
      });
      if (!res.state) {
        this.loading = false;
        this.error = res.msg;
        return;
      }
      localStorage.setItem("uid", res.json._id);
      return this.$router.push("/projects");
    },
  },
};
</script>

<style scoped>
h3 {
  font-size: 40px;
  font-weight: bolder;
  color: #444;
  margin-bottom: var(--m-margin);
}
.hint {
  color: #999;
  font-size: 16px;
}
form a b {
  cursor: pointer;
}
input:invalid {
  border: rgb(255, 110, 110) solid;
}
</style>
