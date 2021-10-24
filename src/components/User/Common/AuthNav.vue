<template>
    <nav>
        
        <ul id="dashboard-menu" class="menu-closed">
            <div id="dashboard-menu_header">
                <div class="logo m-l-3">
                    <a href="/admin/dashboard"><img src="@/assets/images/icon.png" alt="" srcset=""></a>
                </div>
                <span class="dashboard-menu-icon menu_icons_item"><i class=" fas fa-bars"></i></span>
            </div>
            <div class="dashboard-menu_part">
                
            <h5 class="title">MENU</h5>
            <router-link class="dashboard-menu_item"  v-for="item in navItems" :key="item.name" :to={name:item.name}>
                <img :src="getImgUrl(item.active ?  (item.image + '_active'): item.image)" :alt="item.name"><b>{{item.name}}</b>
                </router-link>  
                <a class="dashboard-menu_item" @click="logout()">
                <img src="@/assets/images/nav/logout.png" alt="logout"><b>Logout</b>
                </a>            

            </div>

        <div class="dashboard-menu_part">
                
            <h5 class="title">LATEST PROJECTS</h5>
            <router-link  v-for="project in menuProjects" :project="project" :key="project._id" :to="{name:project.name}"
                class="dashboard-menu_item"><img src="@/assets/images/nav/folder.png" alt="folder"><b>{{project.name}}</b> </router-link>
                <p v-if="projects.length == 0">No recent projects</p>
            </div>

            <div id="dashboard-menu_bottom">
                <a href="">
                </a>
            </div>
        </ul>
       <div id="snackbar">لديك رساله جديده <span></span></div>
</nav>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      navItems: [
        {
          name: "projects",
          active: true,
          image: "projects"
        },
        {
          name: "account",
          active: false,
          image: "settings"
        }
      ]
    };
  },
  created() {
    this.navItems.forEach(i => (i.active = false));
    this.navItems.find(i => i.name == this.$route.name).active = true;
  },
  computed: {
    ...mapState("user", ["projects", "fetching", "user"]),
    menuProjects() {
      return this.projects.slice(Math.max(this.projects.length - 3, 1));
    }
  },
  methods: {
    getImgUrl(image) {
      return require("@/assets/images/nav/" + image + ".png");
    },
    logout() {
      this.$store.commit("user/logout");
      this.$router.push("/");
    }
  },
  watch: {
    $router(val) {
      this.navItems.find(i => i.name == this.$route.name).active = true;
    }
  }
};
</script>

<style>
</style>
