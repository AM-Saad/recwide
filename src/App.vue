<template>
  <div id="app">
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
      integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
      crossorigin="anonymous"
    />
    <div class="container">
      <div id="nav" class="flex f-space-between">
        <div class="flex">
          <router-link to="/"
            ><img
              style="width: 130px"
              src="@/assets/images/full_logo.png"
              alt=""
          /></router-link>
        </div>
        <!-- <div v-if="!isAuth" class="flex">
          <router-link class="btn btn-small btn-light" to="/auth/login"
            >Login</router-link
          >
          <router-link class="btn btn-small" to="/auth/signup"
            >Signup</router-link
          >
        </div> -->
        <div v-if="isAuth">
          <router-link to="/account" class="flex">
            <img
              style="height: 40px"
              src="@/assets/images/logo-geek.png"
              alt=""
            />
          </router-link>
        </div>
      </div>
      <div class="ad-container">
        <Adsense
          data-ad-client="ca-pub-9947392255163870"
          data-ad-slot="1234567890"
          data-ad-format="auto"
          :data-full-width-responsive="'true'"
        >
        </Adsense>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "App",
  data() {
    return {};
  },
  computed: {
    ...mapState("user", ["isAuth", "user"]),
  },
  components: {},
  created() {
    let auth = this.$store.getters["user/checkauthintecated"];
    auth && this.$store.commit("user/loginToStore");
  },
  methods: {
    logout() {
      localStorage.removeItem("uid");
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#nav {
  padding: 30px;
  background-color: #fff;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  margin: 0 var(--m-margin);
}

#nav a.router-link-exact-active {
  color: var(--main-color);
}
</style>
