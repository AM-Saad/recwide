<template>
  <div>
    <h1>Your Projects</h1>

    <div v-if="videos.length > 0">
      <Project v-for="video in videos" :video="video" :key="video._id" />
    </div>
    <div v-if="videos.length == 0">
        You dont have videos yet..
        <a>Create new Now</a>
    </div>
  </div>
</template>

<script>
import Project from "@/components/User/Projects/Project.vue";

export default {
  name: "List",
  data() {
    return {};
  },
  props: ["videos"],
  components: {
    Project,
  },
  methods: {},
};
</script>

<style>
</style>