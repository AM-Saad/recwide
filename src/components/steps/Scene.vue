<template>
  <div class="step step-scene-select active">
    <h1>Choose Recording Scene</h1>
    <div id="modes">
      <div
        class="mode"
        :class="{ active: mode == 'screenAndWebcam' }"
        @dblclick="switchComponent('Options', 'screenAndWebcam')"
        @click="changeScene('screenAndWebcam')"
        @keydown="checkKeyPressed($event, 'screenAndWebcam')"
        tabindex="1"
      >
        <img src="@/assets/images/both.svg" alt="" />
        <h3>Screen & Webcam</h3>
      </div>
      <div
        class="mode"
        :class="{ active: mode == 'screen' }"
        @dblclick="switchComponent('Options', 'screen')"
        @click="changeScene('screen')"
        @keydown="checkKeyPressed($event, 'screen')"
        tabindex="2"
      >
        <img src="@/assets/images/screen.svg" alt="" />
        <h3>Screen Only</h3>
      </div>
      <div
        class="mode"
        :class="{ active: mode == 'webcam' }"
        @dblclick="switchComponent('Options', 'webcam')"
        @click="changeScene('webcam')"
        @keydown="checkKeyPressed($event, 'webcam')"

        tabindex="3"
      >
        <img src="@/assets/images/cam.svg" alt="" />

        <h3>Webcam Only</h3>
      </div>
    </div>
    <button
      tabindex="4"
      class="btn-gradient btn m-auto"
      @click="switchComponent('Options')"
    >
      Next Step
    </button>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      step: "First",
    };
  },
  computed: {
    ...mapState(["mode"]),
  },
  created() {
    this.$emit("reRecord");
    const browserName = this.fnBrowserDetect();
    if (browserName === "chrome") {
      navigator.permissions.query({ name: "microphone" }).then((res) => {
        if (res.state == "granted") {
          this.$store.commit("micGranted", true);
        } else {
          this.$store.commit("micGranted", false);
        }
      });
      navigator.permissions.query({ name: "camera" }).then((res) => {
        if (res.state == "granted") {
          this.$store.commit("camGranted", true);
        } else {
          this.$store.commit("camGranted", false);
        }
      });
    }

    try {
      window.camstream.getTracks().forEach((track) => {
        track.stop();
      });
      window.boradcast.getTracks().forEach((track) => {
        track.stop();
      });
    } catch (error) {
      return;
    }
  },
  methods: {
    switchComponent(comp, mode) {
      if (mode) {
        this.$store.commit("changeMode", mode);
      }
      this.$emit("switch", comp);
    },
    changeScene(mode) {
      console.log("changeScene", mode);
      this.$store.commit("changeMode", mode);
    },
    fnBrowserDetect() {
      let userAgent = navigator.userAgent;
      let browserName;

      if (userAgent.match(/chrome|chromium|crios/i)) {
        browserName = "chrome";
      } else if (userAgent.match(/firefox|fxios/i)) {
        browserName = "firefox";
      } else if (userAgent.match(/safari/i)) {
        browserName = "safari";
      } else if (userAgent.match(/opr\//i)) {
        browserName = "opera";
      } else if (userAgent.match(/edg/i)) {
        browserName = "edge";
      } else {
        browserName = "No browser detection";
      }
      return browserName;
    },

    checkKeyPressed(e, mode){
      if(e.key === "Enter"){
        this.changeScene(mode)
      }
    }
  },
};
</script>

<style scoped>
h1{
  text-align: center;
}
#modes {
  display: flex;
  padding: var(--m-padding);
  margin: var(--m-margin);
  grid-gap: var(--l-margin);
  flex-wrap: wrap;
  justify-content: center;
}
.mode {
  border-radius: var(--m-radius);
  padding: var(--m-padding);
  display: grid;
  justify-content: center;
  text-align: center;
  cursor: pointer;
}
.mode h3 {
  margin: var(--m-margin);
}
.mode:hover,
.mode.active {
  border-color: var(--main-color);
  background-image: linear-gradient(148deg, #e5e5e5, transparent);
  color: #333;
}
.mode img {
  min-width: 200px;
  max-width: 100%;
  height: 150px;
  margin: auto;
}
</style>
