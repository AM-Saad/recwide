<template>
  <div :class="{ loader: loading }">
    <component :is="currentComponent" @toggleForms="toggleForms"></component>
  </div>
</template>

<script>
import Login from "@/components/auth/Login";
import Signup from "@/components/auth/Signup";
export default {
  name: "AuthForms",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      rememberMe: false,
      loading: false,
      currentComponent: "Login",
    };
  },
  components: {
    Login,
    Signup,
  },
  mounted() {
    const authtype = this.$route.params.type || "Login";
    console.log(authtype)
    this.currentComponent = authtype;
  },
  created() {},
  methods: {
    toggleForms(visible) {
      this.currentComponent = visible;
    },
  },
  watch: {
    "$route.params.type": function(type) {
      if (type == "signup") {
        this.toggleForms("signup");
      } else {
        this.toggleForms("login");
      }
    },
  },
};
</script>

<style scoped>

form {
  width: 60%;
  background-color: #fff;
  padding: var(--l-padding);
  box-shadow: var(--shadow3);
  text-align: left;
  margin: var(--l-margin) auto;
  border-radius: var(--m-radius);
 
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
