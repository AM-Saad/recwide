<template>
  <form
    method="post"
    action="/form"
    autocomplete="off"
    ref="signup"
    @submit.prevent="signup()"
  >
    <div class="">
      <h3>Sign up</h3>
      <p class="hint">
        By register you will be able to save your projects and retrive them
        anytime you need it.
      </p>
      <p v-if="error" class="signup-error" style="color: red; margin-top: 10px">
        {{ error }}
      </p>

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
      <button type="button" class="toggle-forms" v-if="!loading" @click="$emit('toggleForms', 'Login')">
        Already have an account
        <b>Login</b>
      </button>
      <input
        v-if="!loading"
        type="submit"
        value="Sign up"
        class="btn btn-gradient"
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
  name: "Signup",
  data() {
    return {
      loading: false,
      name: "",
      email: "",
      password: "",
      error: null,
    };
  },
  methods: {
    async signup() {
      if (!this.name || !this.email || !this.password) {
        this.error = "Please add your informations";
        return;
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
      this.loading = false;

      if (!res.state) {
        this.error = res.msg;
        return;
      }

      this.$emit("toggleForms", "login");
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
  margin-bottom: var(--l-margin);
}
form a b {
  cursor: pointer;
}
</style>
