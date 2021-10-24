<template>
  <router-link :to="{name:'project', params:{id:project._id}}" class="project">
    <img src="@/assets/images/nav/record_g.png" />
   <h3> {{ project.name }}</h3>
    <span>{{project.date}}</span>
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
  methods: {}
};
</script>

<style scoped>
</style>