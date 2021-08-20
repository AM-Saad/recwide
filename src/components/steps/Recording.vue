<template>
  <div>
    <div class="containers">
      <div v-if="allowGuide">
        <Guide v-on:gotit="closeGuide" v-if="showGuide" />
      </div>

      <ScreenCapture
        v-if="mode != 'webcam' && readyToStart"
        v-on:ready="screenReady"
        v-on:canceled="canceled"
        :recording="recording"
        :start="start"
        :finished="finished"
        :resolution="resolution"
        v-on:downloadlink="pushScreenFile"
        v-on:forceStopCam="forceStopCam"
      />
      <CamRecording
        v-if="mode != 'screen' && readyToStart"
        v-on:canceled="canceled"
        v-on:ready="camReady"
        :recording="recording"
        :start="start"
        :finished="finished"
        :stopCam="stopCam"
        v-on:downloadlink="pushCamFile"
        v-on:accessField="grantAccess"
      />
    </div>

    <div v-if="recording" class="recording-box">
      <h3 class="f-center m-medium">Recording in Progress</h3>
      <Counting />

      <button class="recording-btn" @click="stopRecording">
        <i class="far fa-stop-circle"></i>
      </button>
    </div>
  </div>
</template>

<script>
import Counting from "@/components/models/Counting";
import ScreenCapture from "@/components/models/Screen_Capture";
import CamRecording from "@/components/models/Cam_recording";
import Guide from "@/components/Popups/Guide.vue";

import { mapState } from "vuex";

export default {
  name: "Options",
  data() {
    return {
      recording: false,
      screendownloadlink: null,
      ready: 0,
      start: false,
      stopCam: false,
      readyToStart: false,
      allowGuide: false,
      needGuide:
        localStorage.getItem("dontshowguideagain") == "true" ? false : true,
      showGuide: false,
    };
  },
  components: {
    Counting,
    ScreenCapture,
    CamRecording,
    Guide,
  },
  computed: {
    ...mapState([
      "mode",
      "recordingSettings",
      "blobs",
      "finished",
      "camIsReady",
      "screenIsReady",
      "resolution"
    ]),
  },

  created() {
    this.checkIfNeedGuide(this.recordingSettings);
    try {
      window.boradcast.getTracks().forEach((track) => {
        track.stop();
      });
    } catch (error) {
      return
    }
    window.onbeforeunload = function () {
      return "Are you sure you want to close the window?";
    };
  },
  destroyed() {
    window.onbeforeunload = null
  },
  methods: {
    checkIfNeedGuide(val) {
      if ((val === "Microphone + System audio" || val === "System audio") && this.needGuide) {
        this.showGuide = true;
        this.allowGuide = true;
      } else {
        this.readyToStart = true;
      }
    },
    closeGuide() {
      this.showGuide = false;
      this.readyToStart = true;
    },
    switchComponent(comp) {
      if (
        confirm("Your records will be lost, are you sure you want to leave?")
      ) {
        this.$emit("switch", comp);
      }
    },
    canceled(msg) {
      this.$store.commit("camReady", false);
      this.$store.commit("screenReady", false);
      this.checkReady();
      this.$emit("switch", "options", msg);
    },
    screenReady() {
      this.$store.commit("screenReady", true);
      this.checkReady();
    },
    camReady() {
      this.$store.commit("camReady", true);
      this.checkReady();
    },

    stopRecording() {
      this.recording = false;
      this.checkFinished();
    },
    forceStopCam() {
      this.stopCam = true;
    },
    grantAccess() {
      this.accessGranted = false;
      this.$store.commit("camerror", true);
    },
    checkReady() {
      switch (this.mode) {
        case "screen":
          if (this.screenIsReady) {
            this.recording = true;
          }
          break;
        case "screenAndWebcam":
          if (this.screenIsReady && this.camIsReady) {
            this.recording = true;
          }
          break;
        case "webcam":
          if (this.camIsReady) {
            this.recording = true;
          }
          break;

        default:
          break;
      }
    },
    checkFinished() {
      switch (this.mode) {
        case "screen":
          if (this.blobs.length > 0) {
            this.$store.commit("finished", true);
          }
          break;
        case "screenAndWebcam":
          if (this.blobs.length > 1) {
            this.$store.commit("finished", true);
          }
          break;
        case "webcam":
          if (this.blobs.length > 0) {
            this.$store.commit("finished", true);
          }
          break;

        default:
          break;
      }
    },

    pushCamFile(val) {
      const exist = this.blobs.find((b) => b.name === "camRecording");
      if (!exist) {
        this.$store.commit("newBlob", { chunks: val, name: "camRecording" });
        this.checkFinished();
      }
    },
    pushScreenFile(val) {
      const exist = this.blobs.find((b) => b.name === "screenRecording");
      if (!exist) {
        this.$store.commit("newBlob", { chunks: val, name: "screenRecording" });
        this.checkFinished();
      }
    },
  },
  watch: {
    recording(val) {
      if (val == true) {
        this.start = true;
      }
    },
  },
};
</script>

<style scoped>
.recording-box {
  background: #fff;
  padding: var(--l-padding);
  text-align: center;
  width: 400px;
  max-width: 100%;
  margin: auto;
  border-radius: var(--m-radius);
}
.recording-btn {
  color: red;
  font-size: 51px;
  border: 0;
  background: no-repeat;
  cursor: pointer;
  text-align: center;
}
</style>