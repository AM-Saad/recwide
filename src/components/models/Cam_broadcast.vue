<template>
  <div id="cam-broadcast_wrapper">
    <video id="cam-broadcast" :class="{ none: !ready }" muted autoplay>
      Your browser doesn't support the video tag
    </video>
    <div class="loading-cam grid" v-if="!ready">
      <img src="@/assets/images/cam_loading.gif" alt="" srcset="">
     <p> Cam Preview is loading...</p></div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      ready: false,
      camMediaSource: null,
      finished: false,
      recordedCamBlobs: [],
    };
  },
  props: ["recording"],
  computed: {
    ...mapState(["mode", "recordingSettings", "camerror", "camGranted"]),
  },
  created() {
    if (this.camGranted) {
      this.startCambroadcast();
    }
  },
  destroyed() {
    if (this.camGranted) {
      try {
        console.log("broadcast destroyed");
        this.ready = false;

        window.boradcast.getTracks().forEach((track) => {
          track.stop();
        });
      } catch (error) {
        console.log("____");
      }
    }
  },
  methods: {
    startCambroadcast() {
      navigator.mediaDevices
        .getUserMedia({
          video: true,
        })
        .then((stream) => {
          this.ready = true;
          var gumVideo = document.querySelector("#cam-broadcast");
          window.boradcast = stream;
          gumVideo.srcObject = stream;
        })
        .catch((error) => {
          console.log("navigator.getUserMedia error: ", error);
          if (error.name === "NotAllowedError") {
            this.ready = false;

            this.$emit("accessField");
          }
        });
    },
  },
};
</script>

<style scoped>
#cam-broadcast_wrapper {
  box-shadow: var(--shadow);
  border-radius: var(--m-radius);
  width: 100%;
  height: 100%;
  position: relative;
}
#cam-broadcast_wrapper video {
  width: 100%;
  height: 100%;
  border-radius: var(--m-radius);

}
#cam-broadcast_wrapper .loading-cam {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    height: 100%;
    width: 100%;
    justify-content: center;
    justify-items: center;
    align-items: center;
}
#cam-broadcast_wrapper .loading-cam p{
  align-self: flex-start;
}
</style>