<template>
  <div>
    <div>
      <div class="wrapper">
        <DashboardNav/>
        <main class="">
          <div class="dashborad-header">
            <a>My Account</a>
            <h2>My Projects</h2>
          </div>
          <List :projects="projects" v-if="!fetching" />
          <div v-if="fetching">Loading...</div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import List from "@/components/user/projects/List.vue";
import DashboardNav from "@/components/user/common/DashboardNav.vue";
import "@/assets/css/main_dashboard.css";
import "@/assets/css/dashboardnav.css";
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  components: {
    List,
    DashboardNav,
  },
  computed: {
    ...mapState("user", ["projects", "fetching"]),
  },
  created() {
    this.getProjects();
  },
  methods: {
    async getProjects() {
      if (this.projects.length === 0) {
        this.$store.commit("user/fetching", true);
        await this.$store.dispatch({ type: "user/getProjects" });
        this.$store.commit("user/fetching", false);
      }
    },
  },
  watch: {
    isAuth(val) {
      if (!val) {
        this.$router.push("/");
      }
    },
  },
};
</script>

<style></style>
