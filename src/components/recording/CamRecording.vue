<template>
  <br />
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      camMediaSource: null,
      mediaCamRecorder: null,
      recordedCamBlobs: [],
    };
  },
  props: ["recording", "start", "stopCam"],
  computed: {
    ...mapState([
      "mode",
      "audioSettings",
      "micGranted",
      "camGranted",
      "resolution",
    ]),
  },
  async created() {
    if (this.camGranted) {
      const ready = await this.startCambroadcast();
      if (ready) {
        this.$emit("ready");
      }
    }
  },
  destroyed() {
    try {
      window.camstream.stop();
      window.camstream.getTracks().forEach((track) => {
        track.stop();
      });
      window.mediaCamRecorder.stop();
      this.mediaCamRecorder.stop();
    } catch (error) {
      return;
    }
  },
  methods: {
    async startCambroadcast() {
      let ready;
      let constraints;
      if (this.audioSettings == "No audio") {
        constraints = {
          video: this.resolution,
        };
      } else {
        console.log('heheheheh')
        constraints = {
          audio: true,
          video: this.resolution,
        };
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        window.camstream = stream;
        ready = true;
      } catch (error) {
        if (error.name === "NotAllowedError") {
          this.$emit("accessField");
          ready = false;
        }
      }
      return ready;
    },
    startRecordingCam() {
      // let options = { mimeType: "video/webm;codecs=vp9,opus" };
      var options = { mimeType: "video/webm" };
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        options = { mimeType: "video/webm" };
        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
          options = { mimeType: "video/webm" };
          if (!MediaRecorder.isTypeSupported(options.mimeType)) {
            options = { mimeType: "" };
          }
        }
      }
      try {
        this.mediaCamRecorder = new MediaRecorder(window.camstream, options);
        window.mediaCamRecorder = this.mediaCamRecorder;
      } catch (e) {
        return this.$emit(
          "canceled",
          "allow access to the microphone and camera to start recording"
        );
      }
      this.mediaCamRecorder.ondataavailable = this.handleDataAvailable;
      this.mediaCamRecorder.start(1000);
      this.mediaCamRecorder.onended = this.stopRecordingCam;
    },

    handleDataAvailable(event) {
      if (event.data && event.data.size > 0) {
        this.recordedCamBlobs.push(event.data);
      }
    },

    stopRecordingCam() {
      try {
        window.camstream.getTracks().forEach((track) => {
          track.stop();
        });
        this.mediaCamRecorder.stop();
      } catch (error) {
        return;
      }
      this.$emit("downloadlink", this.recordedCamBlobs);
    },
  },
  watch: {
    start(val) {
      if (val === true) {
        this.startRecordingCam();
      }
    },
    recording(val) {
      if (val === false) {
        this.stopRecordingCam();
      }
    },
    stopCam(val) {
      if (val === true) {
        this.stopRecordingCam();
      }
    },
  },
};
</script>

<style scoped>
#cam-broadcast {
  position: fixed;
  left: 2%;
  bottom: 2%;
  height: 230px;
  width: 300px;
  box-shadow: var(--shadow);
}
</style>
