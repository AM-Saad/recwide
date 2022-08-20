<template>
  <div>
    <div v-if="!fetching">
      <div class="wrapper">
        <DashboardNav />
        <main class="">
          <div class="dashborad-header">
            <a>My Account.</a>
            <h2>Settings</h2>
          </div>
          <UpdateInfo />
          <ChangePassword />
        </main>
      </div>
    </div>
    <div v-if="fetching">Loading...</div>
  </div>
</template>

<script>
import DashboardNav from "@/components/user/common/DashboardNav.vue";
import "@/assets/css/main_dashboard.css";
import "@/assets/css/dashboardnav.css";
import UpdateInfo from "@/components/user/settings/UpdateInfo.vue";
import ChangePassword from "@/components/user/settings/ChangePassword.vue";
import { mapState } from "vuex";

export default {
  components: {
    DashboardNav,
    UpdateInfo,
    ChangePassword,
  },
  computed: {
    ...mapState("user", ["fetching"]),
  },
  async created() {
    this.$store.commit("user/fetching", true);
    await this.getUser();
  },
  methods: {
    async getUser() {
      await this.$store.dispatch({ type: "user/getUser" });
      this.$store.commit("user/fetching", false);
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

<style scoped>
form {
  margin: 20px 0;
  background: #fff;
  padding: var(--m-padding);
  border-radius: 12px;
  box-shadow: 0 0 6px 0px #e0e0e0;
}
</style>
