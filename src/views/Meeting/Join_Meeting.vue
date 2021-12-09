<template>
 <div id="cam-broadcast_wrapper">
    <video id="user-broadcast" muted autoplay :class="{none: !camReady}">
      Your browser doesn't support the video tag
    </video>
    <video id="other-broadcast" ref="screenRecording" muted autoplay :class="{none: !camReady}">
      Your browser doesn't support the video tag
    </video>
    <div class="loading-cam grid" >
      <img v-if="camGranted && !camReady" src="@/assets/images/cam_loading.gif" alt="" srcset="" />
      <p v-if="camGranted && !camReady">Cam Preview is loading...</p>
      <div v-if="!camGranted" >
        <p class="c-r f-center">Cannot access to camera</p>
        <div>
          <button class="btn btn-small font-s" @click="openAllowAccess('Webcam')">
            Allow access to Camera
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import io from "socket.io-client";

export default {
  data() {
    return {
      camMediaSource: null,
      mediaCamRecorder: null,
      recordedCamBlobs: [],
      camReady: false,
      socket: null
    };
  },
  props: ["recording", "start", "stopCam", "ready"],
  computed: {
    ...mapState("user", ["userId", "userName"]),
    ...mapState("meetings", ["meetings", "fetching", "currentMeeting"]),
    ...mapState([
      "mode",
      "audioSettings",
      "micGranted",
      "camGranted",
      "resolution",
      "url",
      "jwt"
    ])
  },
  async created() {
    // if (this.micGranted) {
    this.socket = io(`${this.url}/meeting/join`);

    await this.startCambroadcast();
    const id = this.$route.params.id;

    this.socket.emit("join", {
      roomId: id,
      token: this.jwt
    });

    this.socket.on("stream", function(data) {
        let obj = data.blobs;
        let blob = new Blob(obj.chunks, { type: `video/mp4` });
        let url = window.URL.createObjectURL(blob);
        // this.allVideos.push({ url: url, name: obj.name });
          this.$refs.screenRecording.src =url;

    });
    await this.startBoradcasting();
    // }
  },
  destroyed() {
    try {
      window.camstream.stop();
      window.camstream.getTracks().forEach(track => {
        track.stop();
      });
      window.mediaCamRecorder.stop();
      this.mediaCamRecorder.stop();
    } catch (error) {
      return;
    }
  },
  methods: {
    openAllowAccess() {
      this.$emit("AllowAccess");
    },
    async startCambroadcast() {
      let constraints;
      if (this.audioSettings == "No audio") {
        constraints = {
          video: this.resolution
        };
      } else {
        if (this.micGranted) {
          constraints = {
            audio: true,
            video: this.resolution
          };
        } else {
          constraints = {
            video: this.resolution
          };
        }
      }
      try {
        this.camReady = true;
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        window.camstream = stream;
        var gumVideo = document.querySelector("#user-broadcast");
        gumVideo.srcObject = stream;
      } catch (error) {
        if (error.name === "NotAllowedError") {
          // this.$emit("accessField");
        }
      }
    },
    startBoradcasting() {
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
      this.mediaCamRecorder.onended = this.leaveMeeting;
    },

    handleDataAvailable(event) {
      if (event.data && event.data.size > 0) {
        this.recordedCamBlobs.push(event.data);
      }
    },

    leaveMeeting() {
      try {
        window.camstream.getTracks().forEach(track => {
          track.stop();
        });
        this.mediaCamRecorder.stop();
      } catch (error) {
        return;
      }
      this.$emit("downloadlink", this.recordedCamBlobs);
    },
      async createChunkUrls(chunks, mimeType, name) {
      let blob = new Blob(chunks, { type: `video/${mimeType}` });
      let url = window.URL.createObjectURL(blob);
      return { blob, url, name };
    },
  },
  watch: {
    start(val) {
      if (val === true) {
        // this.startBoradcasting();
        // this.socket = io(`${this.url}/meeting/join`);
        // this.socket.emit("join", {
        //   roomId: this.currentMeeting._id,
        //   token: this.jwt
        // });
        // this.socket.on('stream', function(){
        // console.log('strem')
        // })
      }
    },
    ready(val) {
      console.log(val);
      if (val === true) {
        this.startCambroadcast();
      }
    },
    recording(val) {
      if (val === false) {
        this.leaveMeeting();
      }
    },
    stopCam(val) {
      if (val === true) {
        this.leaveMeeting();
      }
    }
  }
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
.loading-cam {
  justify-content: center;
  justify-items: center;
  grid-gap: 27px;
}
</style>