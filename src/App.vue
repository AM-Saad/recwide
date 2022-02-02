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
          <span class="dashboard-menu-icon menu_icons_item">
                <i class="fas fa-bars" @click="openMenu" v-if="showMenuBtn"></i>
          </span>
          <router-link to="/"
            ><img
              style="width: 130px"
              src="@/assets/images/full_logo.png"
              alt=""
          /></router-link>
        </div>
        <div v-if="!isAuth" class="flex">
          <router-link class="btn btn-small" to="/auth/login"
            >Login</router-link
          >
          <router-link class="btn btn-small btn-gradient" to="/auth/signup"
            >Signup</router-link
          >
        </div>
        <div v-if="isAuth">
       

          <ul id="top-menu">
 
            <div class="flex">
                  <router-link to="/projects" class="flex">
            <img
              style="height: 40px"
              src="@/assets/images/logo-geek.png"
              alt=""
            />
          </router-link>
                <i class="fas fa-download menu_icons_item none  install-btn" id="install-btn"></i>
            </div>
        </ul>
        </div>
      </div>
      <!-- <div class="ad-container">
        <Adsense
          data-ad-client="ca-pub-9947392255163870"
          data-ad-slot="1234567890"
          data-ad-format="auto"
          :data-full-width-responsive="'true'"
        >
        </Adsense>
      </div> -->
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "App",
  data() {
    return {
      showMenuBtn:false
    };
  },
  computed: {
    ...mapState("user", ["isAuth", "user"]),
 

  },
  components: {},
  mounted(){

  },
  created() {
    let auth = this.$store.getters["user/checkauthintecated"];

    auth && this.$store.commit("user/loginToStore");
  },
  methods: {
    openMenu() {
      document.querySelector("body").classList.toggle("opened-menu");
    },
    logout() {
      localStorage.removeItem("uid");
    }
  },
  watch:{
    "$route":function(val){
      if(val.name === 'account' || val.name === 'settings' || val.name === 'projects' || val.name === 'project'){
        this.showMenuBtn = true
      }else{
        this.showMenuBtn = false
      }
      
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#nav {
  padding: 3vmin 3vw;
  background-color: #fff;
}

#nav a {
  font-weight: bold;
  text-decoration: none;
}
</style>
