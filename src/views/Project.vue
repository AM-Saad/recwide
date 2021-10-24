<template>
  <div>
    <div >
        <div class="wrapper">
        <AuthNav></AuthNav>
      <main class="">
        <h2> {{project.name}}</h2>
        
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
  </div>
</template>

<script>
import List from "@/components/User/Projects/List.vue";
import AuthNav from "@/components/User/Common/AuthNav.vue";

import { mapState } from "vuex";

export default {
  data() {
    return {
      project: null
    };
  },
  components: {
    AuthNav
  },
  computed: {
    ...mapState("user", ["projects", "fetching"]),
    ...mapState(["url"])
  },
  async created() {
    await this.getProjects();
    this.filterProject(this.$route.params.id);
  },
  methods: {
    async getProjects() {
      if (this.projects.length === 0) {
        this.$store.commit("user/fetching", true);
        await this.$store.dispatch({ type: "user/getProjects" });
        this.$store.commit("user/fetching", false);
      }
    },
    filterProject(id) {
      this.project = this.projects.find(p => p._id.toString() === id);
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
.video-wrapper{
  width: 100%
}
video{
width: 100%;
}
</style>