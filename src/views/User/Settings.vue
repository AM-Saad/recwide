<template>
  <div>
    <div v-if="!fetching">
        <div class="wrapper">
        <AuthNav></AuthNav>
      <main class="">
            <div class="dashborad-header">
              <a>My Account.</a>
        <h2> Settings</h2>
            </div>
        <form @submit.prevent="changeInfo()">
                        <h3>Change Info</h3>
                <p class="info-error" style="color: red; margin-top: 10px"></p>
                <p class="info-success" style="color: green; margin-top: 10px"></p>
                        <div class="form-group">
                            <input class="form-control" type="text" name="email" id="email" v-model="email"
                                required>
                        </div>
                        <div class="form-group">
                            <input class="form-control" type="text" name="name" id="name" v-model="name"
                                required>
                        </div>

                        <button class="btn btn-small btn-success" v-if="!loading" type="submit">Update</button>
                          <button disabled="disabled" class="btn btn-small  btn-success" v-if="loading">
                          <div class="spinner">
                            <div class="double-bounce1"></div>
                            <div class="double-bounce2"></div>
                          </div>
                        </button>
                    </form>
                    <form @submit.prevent="changePass()">
                        <h3>Change Password</h3>
          <p class="pass-error" style="color: red; margin-top: 10px"></p>
                <p class="pass-success" style="color: green; margin-top: 10px"></p>
                        <div class="form-group">
                            <input class="form-control" placeholder="Write old password..." type="password" name="oldPassword" id="oldPassword" v-model="password" required>
                        </div>
                        <div class="form-group">
                            <input class="form-control" placeholder="Write new password..." type="password" name="newPassword" id="newPassword" v-model="newpassword" required>
                        </div>
                        <div class="form-group">
                            <input class="form-control" placeholder="Confirm password.." type="password" name="confirmPassword" id="confirmPassword" v-model="confpassword"
                                required>
                        </div>
                        <button class="btn btn-small btn-success" v-if="!loading" type="submit">Change</button>
                          <button disabled="disabled" class="btn btn-small btn-success" v-if="loading">
                          <div class="spinner">
                            <div class="double-bounce1"></div>
                            <div class="double-bounce2"></div>
                          </div>
                        </button>

                    </form>
      </main>
        </div>
    </div>
    <div v-if="fetching">Loading...</div>
  </div>
</template>

<script>
import AuthNav from "@/components/Common/AuthNav.vue";
import "@/assets/css/main_dashboard.css"
import "@/assets/css/dashboardnav.css"
import { mapState } from "vuex";

export default {
  data() {
    return {
      name: null,
      email: null,
      password: null,
      newpassword: null,
      confpassword: null,
      loading: false
    };
  },
  components: {
    AuthNav
  },
  computed: {
    ...mapState("user", ["projects", "fetching", "user"])
  },
  async created() {
    this.$store.commit("user/fetching", true);
    await this.getUser();

    this.name = this.user.name;
    this.email = this.user.email;
  },
  methods: {
    async getUser() {
      await this.$store.dispatch({ type: "user/getUser" });
      this.$store.commit("user/fetching", false);
    },
    async changeInfo() {
      this.resetFeedbackMsgs();
      if (!this.email || !this.name) {
        return (document.querySelector(".info-error").innerHTML =
          "Please add your informations ");
      }
      this.loading = true;
      const res = await this.$store.dispatch({
        type: "user/changeInfo",
        data: {
          email: this.email,
          name: this.name
        }
      });
      this.loading = false;

      if (!res.state) {
        return (document.querySelector(".info-error").innerHTML = res.msg);
      }

      document.querySelector(".info-success").innerHTML =
        "information Updated.";
    },
    async changePass() {
      this.resetFeedbackMsgs();
      if (!this.password || !this.newpassword || !this.confpassword) {
        return (document.querySelector(".pass-error").innerHTML =
          "Please add your informations ");
      }
      if (this.newpassword !== this.confpassword) {
        return (document.querySelector(".pass-error").innerHTML =
          "Password not match");
      }
      this.loading = true;
      const res = await this.$store.dispatch({
        type: "user/changePassword",
        data: {
          oldPassword: this.password,
          newPassword: this.newpassword,
          confirmPassword: this.confpassword
        }
      });
      this.loading = false;

      if (!res.state) {
        return (document.querySelector(".pass-error").innerHTML = res.msg);
      }
      this.newpassword = null;
      this.password = null;
      this.confpassword = null;

      document.querySelector(".pass-success").innerHTML = "Password changed.";
    },
    resetFeedbackMsgs() {
      document.querySelector(".info-success").innerHTML = "";
      document.querySelector(".info-error").innerHTML = "";
      document.querySelector(".pass-error").innerHTML = "";
      document.querySelector(".pass-success").innerHTML = "";
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

<style scoped>
form {
  margin: 20px 0;
  background: #fff;
  padding: var(--m-padding);
  border-radius: 12px;
}
</style>