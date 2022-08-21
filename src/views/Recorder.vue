<template>
  <div class="wrapper">
    <p class="m-medium m-padding f-center c-r">{{ msg }}</p>
    <component
      v-if="!finished"
      :is="currentComp"
      v-on:switch="switchComponent"
      v-on:reRecord="rerecorde"
    ></component>
    <Final v-if="finished" v-on:reRecord="rerecorde"></Final>

  </div>
</template>

<script>
import { mapState } from "vuex";

import Scene from "@/components/steps/Scene.vue";
import Options from "@/components/steps/Options.vue";
import Recording from "@/components/steps/Recording.vue";
import Final from "@/components/steps/Final.vue";

export default {
  name: "screen-recorder",
  data() {
    return {
      step: "First",
      currentComp: "Scene",
      msg: null,
    };
  },
  computed: {
    ...mapState(["mode", "audioSettings", "finished"]),
  },
  components: {
    Scene,
    Options,
    Recording,
    Final,
  },

  methods: {
    switchComponent(comp, msg) {
      this.msg = ''
      if (msg) {
        this.msg = msg;
      } 
      this.currentComp = comp;
    },
    rerecorde(comp) {
      this.$store.commit("reRecord");
      this.currentComp = comp || "Scene";
    },
  },
};
</script>

