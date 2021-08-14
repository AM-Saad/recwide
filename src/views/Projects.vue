<template>
  <div>
    <div v-if="!fetching">
      <List :videos="videos" />
    </div>
    <div v-if="fetching">Loading...</div>
  </div>
</template>

<script>
import List from "@/components/User/Projects/List.vue";
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  components: {
    List,
  },
  computed: {
    ...mapState("user", ["videos", "fetching"]),
  },
  created() {
    this.$store.commit("user/fetching", true);
    this.getVideos();
  },
  methods: {
    async getVideos() {
      await this.$store.dispatch({ type: "user/getVideos" });
      this.$store.commit("user/fetching", false);
    },
  },
};
</script>

<style>
</style>