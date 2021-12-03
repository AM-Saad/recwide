<template>
  <div>
    <div >
        <div class="wrapper">
        <AuthNav></AuthNav>
      <main class="">
            <div class="dashborad-header">
              <a>My Account</a>
        <h2>My Meetings</h2>
</div>
      <List :meetings="meetings" v-if="!fetching"/>
    <div v-if="fetching">Loading...</div>

      </main>
        </div>
    </div>
  </div>
</template>

<script>
import List from "@/components/Meetings/List.vue";
import AuthNav from "@/components/Common/AuthNav.vue";
import "@/assets/css/main_dashboard.css"
import "@/assets/css/dashboardnav.css"
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  components: {
    List,
    AuthNav
  },
  computed: {
    ...mapState("meetings", ["meetings", "fetching"])
  },
  created() {
    this.getMeetings();
  },
  methods: {
    async getMeetings() {
      if (this.meetings.length === 0) {
        this.$store.commit("meetings/fetching", true);
        await this.$store.dispatch({ type: "meetings/getMeetings" });
        this.$store.commit("meetings/fetching", false);
      }
    }
  },
  watch: {
    isAuth(val) {
      if (!val) {
        this.$router.push("/");
      }
    }
  }
};
</script>

<style>
</style>