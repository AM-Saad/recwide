<template>
  <router-link :to="{name:'project', params:{id:project._id}}" class="project">

    <!-- <img class="project-icon" src="@/assets/images/nav/record_g.png" /> -->
       <div class="flex f-space-between">
   <h3 class="project-title"> {{ project.name }}</h3>
      <img class="project-mode" v-if="project.mode === 'screenAndWebcam'" src="@/assets/images/both.svg">
      <img class="project-mode" v-if="project.mode === 'screen'" src="@/assets/images/screen.svg">
      <img class="project-mode" v-if="project.mode === 'webcam'" src="@/assets/images/cam.svg">
    </div>
  <div class="flex">
    <span>{{project.res}}</span>
  </div>
    <span class="project-date">{{project.date}}</span>
  </router-link>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Project",
  data() {
    return {};
  },
  props: ["project"],
  components: {},
  computed: {
    ...mapState("user", ["projects", "fetching", "isAuth"])
  },

};
</script>

<style scoped>
</style>