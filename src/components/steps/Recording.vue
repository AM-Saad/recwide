<template>
  <div>
    <div class="containers">
      <Guide v-on:gotit="closeGuide" v-if="showGuide" />

      <ScreenRecording
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
      <button class="recording-btn " @click="stopRecording">
        <i class="far fa-stop-circle"></i>
      </button>
    </div>
  </div>
</template>

<script>
import Counting from "@/components/recording/Counting";
import ScreenRecording from "@/components/recording/ScreenRecording";
import CamRecording from "@/components/recording/CamRecording";
import Guide from "@/components/popups/Guide.vue";

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
      showGuide: false,
    };
  },
  components: {
    Counting,
    ScreenRecording,
    CamRecording,
    Guide,
  },
  computed: {
    ...mapState([
      "mode",
      "audioSettings",
      "blobs",
      "finished",
      "camIsReady",
      "screenIsReady",
      "resolution",
    ]),
  },

  created() {
    this.shoudDisplayGuide();
    try {
      window.boradcast.getTracks().forEach((track) => {
        track.stop();
      });
    } catch (error) {
      return;
    }
    window.onbeforeunload = function() {
      return "Are you sure you want to close the window?";
    };
  },
  destroyed() {
    window.onbeforeunload = null;
  },
  methods: {
    shoudDisplayGuide() {
      const audio = this.audioSettings;
      const guideDismissed =
        localStorage.getItem("guideDismissed") == "true" ? false : true;

      if (
        (audio === "Microphone + System audio" || audio === "System audio") &&
        guideDismissed
      ) {
       return this.showGuide = true;
      } 
      
        this.readyToStart = true;
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
      this.checkIfReadyToRecord();
      this.$emit("switch", "options", msg);
    },
    screenReady() {
      this.$store.commit("screenReady", true);
      this.checkIfReadyToRecord();
    },
    camReady() {
      this.$store.commit("camReady", true);
      this.checkIfReadyToRecord();
    },

    stopRecording() {
      this.recording = false;
      this.checkIfRecordingIsFinished();
    },
    forceStopCam() {
      this.stopCam = true;
    },
    grantAccess() {
      this.accessGranted = false;
      this.$store.commit("camerror", true);
    },
    // will be ready to record if all required sources is ready (eg. if the mode is screenAndWebcam then both the cam and screen should be ready first to start recording)
    // Whenever any source is ready will call this method to check if the other source is ready or it's the only source that is required to start recording
    checkIfReadyToRecord() {
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
    // will be finished if the blobs contain the total of required files that finished (eg. if the mode is screenAndWebcam then the blobs should have 2 files)
    // This fired when click on stop and every time any source is finished (eg. when pushCamFile excuted and pushScreenFile also)
    checkIfRecordingIsFinished() {
      switch (this.mode) {
        case "screen":
          if (this.blobs.length > 0) {
            this.$store.commit("finished", true);
          }
          break;
        case  "webcam":
          if (this.blobs.length > 0) {
            this.$store.commit("finished", true);
          }
          break;
        case "screenAndWebcam":
          if (this.blobs.length > 1) {
            this.$store.commit("finished", true);
          }
          break;

        default:
          break;
      }
    },
    // Getting recording file from the cam component and push to the blobs property that holds the recordes then checkIfRecordingIsFinished()
    pushCamFile(val) {
      const exist = this.blobs.find((b) => b.name === "camRecording");
      if (!exist) {
        this.$store.commit("newBlob", { chunks: val, name: "camRecording" });
        this.checkIfRecordingIsFinished();
      }
    },
    // Getting recording file from the screen component and push to the blobs property that holds the recordes then checkIfRecordingIsFinished()

    pushScreenFile(val) {
      const exist = this.blobs.find((b) => b.name === "screenRecording");
      if (!exist) {
        this.$store.commit("newBlob", { chunks: val, name: "screenRecording" });
        this.checkIfRecordingIsFinished();
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
.wrapper {
  width: 75% !important;
  margin: var(--m-margin) auto !important;
}
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
