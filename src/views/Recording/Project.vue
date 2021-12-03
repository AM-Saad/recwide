<template>
    <div>
        <div class="wrapper">
        <AuthNav></AuthNav>
          <main class="" v-if="project">
            <div class="dashborad-header" >

      <router-link to="/projects" >
          My Projects
      </router-link>
      <div class="flex f-space-between">

              <h2> {{project.name}}</h2>
              <button @click="deleteProject( $event,project._id)" v-if="!deleteing" class="btn btn-small btn-danger">Delete</button>
              <button v-if="deleteing" class="btn btn-small btn-danger">
                         <div class="spinner">
            <div class="double-bounce1"></div>
            <div class="double-bounce2"></div>
          </div>
              </button>
      </div>
            </div>
            
            <div v-if="fetching">Loading...</div>
            <div class=" grid g-two">
              <div class="video-wrapper" v-for="i in project.videos" :key="i._id">
                <video :src="url+i.url"></video>
                <a download :href="url+i.url" class="btn btn-small btn-success">Download</a>
              </div>
            </div>
          </main>
        </div>
  </div>
</template>

<script>
import AuthNav from "@/components/Common/AuthNav.vue";
import "@/assets/css/main_dashboard.css";
import "@/assets/css/dashboardnav.css";
import { mapState } from "vuex";

export default {
  data() {
    return {
      currentId: null,
      deleteing: false
    };
  },
  components: {
    AuthNav
  },
  computed: {
    ...mapState("user", ["projects", "fetching"]),
    ...mapState(["url"]),
    project() {
      return this.projects.find(p => p.slug.toString() === this.currentId);
    }
  },
  async created() {
    await this.getProjects();
    this.currentId = this.$route.params.slug;
    this.$store.commit("user/fetching", false);
  },
  methods: {
    async getProjects() {
      if (this.projects.length === 0) {
        this.$store.commit("user/fetching", true);
        await this.$store.dispatch({ type: "user/getProjects" });
      }
    },
    async deleteProject(e, id) {
      if (confirm("Do you really want to delete this project?")) {
        this.deleteing = true;
        const res = await this.$store.dispatch({
          type: "user/deleteProject",
          id: id
        });

        if (!res.state) {
          this.deleteing = false;

          return (document.querySelector(".video-error").innerHTML = res.msg);
        } else {
          return this.$router.push(`/projects`);
        }
      } else {
        e.preventDefault();
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

<style >
.video-wrapper {
  width: 94%;
  margin: var(--m-margin) 0;
  background: #fff;
  padding: var(--m-margin);
  border-radius: var(--m-radius);
  border: 1px solid #ccc;
}
video {
  width: 100%;
}
</style>