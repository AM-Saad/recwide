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
    ...mapState(["mode", "recordingSettings", "micGranted", "camGranted"]),
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
      console.log("___");
    }
  },
  methods: {
    async startCambroadcast() {
      let ready;
      let constraints;
      if (this.recordingSettings == "No audio") {
        constraints = {
          video: true,
        };
      } else {
        if (this.micGranted) {
          constraints = {
            audio: true,
            video: true,
          };
        } else {
          constraints = {
            video: true,
          };
        }
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
        console.log("___");
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