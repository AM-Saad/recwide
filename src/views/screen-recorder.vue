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
    ...mapState(["mode", "recordingSettings", "finished"]),
  },
  components: {
    Scene,
    Options,
    Recording,
    Final,
  },

  methods: {
    switchComponent(comp, msg) {
      if (msg) {
        this.msg = msg;
      } else {
        this.msg = "";
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

<style>
h1 {
  text-align: center;
}
.head {
  margin: var(--s-margin);
}
.step {
  padding: var(--l-padding);
  border-radius: var(--m-radius);
  margin: var(--m-margin);
  align-items: center;
  /* box-shadow: var(--shadow3); */
}
.step .btn {
  margin: auto;
  margin-top: var(--m-margin);
}
@media only screen and (max-width: 767px) and (min-width: 320px) {
  h1 {
    font-size: 22px;
    margin: var(--m-margin) 0;
  }
  .step {
    padding: var(--s-padding);
  }
}
</style>