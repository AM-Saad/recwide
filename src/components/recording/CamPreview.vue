<template>
  <div id="cam-broadcast_wrapper">
    <video id="cam-broadcast" :class="{ none: !ready }" muted autoplay>
      Your browser doesn't support the video tag
    </video>
    <div class="loading-cam grid" v-if="!ready">
      <img src="@/assets/images/cam_loading.gif" alt="" srcset="" />
      <p v-if="camGranted">Cam Preview is loading...</p>
      <div  v-if="!camGranted" >
        <p class="c-r f-center">Cannot access to camera</p>
        <div>
          <button class="btn btn-gradient font-m" @click="openAllowAccess('Webcam')">
            Allow access to Camera
          </button>
        </div>
      </div>
    </div>
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
      recordedCamBlobs: []
    };
  },
  computed: {
    ...mapState([
      "mode",
      "audioSettings",
      "camerror",
      "camGranted",
      "resolution"
    ])
  },
  created() {
    // if (this.camGranted) {
    this.startBroadcast();
    // }
  },
  beforeDestroy() {
    this.stopBroadcast();
  },
  destroyed() {
    this.stopBroadcast();
  },
  methods: {
    openAllowAccess() {
      this.$emit("AllowAccess");
    },
    async startBroadcast() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio:true,
          video: this.resolution
        });
        this.ready = true;
        this.$emit("cameraReady");
        var gumVideo = document.querySelector("#cam-broadcast");
        window.boradcast = stream;
        gumVideo.srcObject = stream;
      } catch (error) {
        if (error.name === "NotAllowedError") {
          this.ready = false;
          this.$emit("accessField");
        }
      }
    },
    stopBroadcast() {
      if (this.camGranted) {
        try {
          this.ready = false;

          window.boradcast.getTracks().forEach(track => {
            track.stop();
          });
        } catch (error) {
          return;
        }
      }
    }
  },
  watch: {
    resolution(val) {
      if (val) {
        this.stopBroadcast();
        setTimeout(() => this.startBroadcast(), 1000);
      }
    }
  }
};
</script>

<style scoped>
#cam-broadcast_wrapper {
  border-radius: var(--m-radius);
  width: 100%;
  height: 100%;
  position: relative;
}
#cam-broadcast_wrapper video {
  width: 100%;
  border-radius: var(--m-radius);
  box-shadow: var(--shadow3);
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
#cam-broadcast_wrapper .loading-cam p {
  align-self: flex-start;
}
#cam-broadcast_wrapper .loading-cam img {
  align-self: flex-end;
  margin-bottom: var(--m-margin);
}
</style>