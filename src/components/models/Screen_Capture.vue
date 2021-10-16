<template>
  <div>
    <div id="error">{{ screenError }}</div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Options",
  data() {
    return {
      screenError: null,
      blobs: [],
      individualAudioStreams: [],
      stream: null,
      rec: null,
    };
  },
  components: {},
  props: ["recording", "start", ""],
  computed: {
    ...mapState([
      "mode",
      "audioSettings",
      "finished",
      "camerror",
      "micGranted",
      "camGranted",
      "resolution",
      "resolutions",
    ]),
  },
  async created() {
    const options = this.getOptions();
    const ready = await this.shareScreen(options);
    if (ready) {
      this.$emit("ready");
    }
  },
  destroyed() {
    if (this.camerror) {
      setTimeout(() => {
        this.stopRecording();
      }, 1000);
    }
  },
  methods: {
    getOptions() {

      let options = {};

      if (this.audioSettings === "Microphone + System audio") {
        options = {
          video: { video: this.resolution, audio: true },
          audio: { audio: true },
        };
      } else if (this.audioSettings === "Microphone") {
        options = {
          video: { video: this.resolution },
          audio: { audio: true },
        };
      } else if (this.audioSettings === "System audio") {
        options = {
          video: { video: this.resolution, audio: true },
          audio: { audio: false },
        };
      } else {
        options = {
          video: { video: this.resolution },
          audio: { audio: false },
        };
      }
      return options;
    },
    mergeAudioStreams(desktopStream, voiceStream) {
      const context = new AudioContext();
      const destination = context.createMediaStreamDestination();
      let hasDesktop = false;
      let hasVoice = false;
      if (desktopStream && desktopStream.getAudioTracks().length > 0) {
        // If you don't want to share Audio from the desktop it should still work with just the voice.
        const source1 = context.createMediaStreamSource(desktopStream);
        const desktopGain = context.createGain();
        desktopGain.gain.value = 0.7;
        source1.connect(desktopGain).connect(destination);
        hasDesktop = true;
        this.individualAudioStreams.push(desktopStream);
      }

      if (voiceStream && voiceStream.getAudioTracks().length > 0) {
        const source2 = context.createMediaStreamSource(voiceStream);
        const voiceGain = context.createGain();
        voiceGain.gain.value = 0.7;
        source2.connect(voiceGain).connect(destination);
        hasVoice = true;
        this.individualAudioStreams.push(voiceStream);
      }
      window.audioCtx = context;

      return hasDesktop || hasVoice ? destination.stream.getAudioTracks() : [];
    },
    async shareScreen(options) {
      const audio = options.video.audio || false;
      const mic = options.audio.audio || false;
      let desktopStream;
      let voiceStream;
      let canceled = false;
      try {
        desktopStream = await navigator.mediaDevices.getDisplayMedia({
          video: options.video.video,
          audio: audio,
        });
      } catch (error) {
        canceled = true;
        this.$emit(
          "canceled",
          "You need to share your screen to start recording"
        );
      }
      try {
        if (mic === true && this.micGranted) {
          voiceStream = await navigator.mediaDevices.getUserMedia({
            video: false,
            audio: mic,
          });
        }
      } catch (error) {
        canceled = true;

        this.$emit(
          "canceled",
          "allow access to the microphone to start recording"
        );
      }
      if (!canceled) {
        const tracks = [
          ...desktopStream.getVideoTracks(),
          ...this.mergeAudioStreams(desktopStream, voiceStream),
        ];
        this.stream = new MediaStream(tracks);
        window.screenStream = this.stream;
        return true;
      }
    },

    startRecording() {
      let _component = this;
      this.blobs = [];

      this.rec = new MediaRecorder(window.screenStream);
      this.rec.ondataavailable = function (e) {
        _component.blobs.push(e.data);
      };

      try {
        window.screenStream
          .getVideoTracks()[0]
          .addEventListener("ended", () => _component.$emit("forceStopCam"));
        if (this.audioSettings !== "No audio") {
          window.screenStream.getVideoTracks()[0].onended = function () {
            _component.stopRecording();
          };
        } else {
          this.rec.onstop = function () {
            _component.stopRecording();
          };
        }
      } catch (error) {
        return
      }

      this.rec.start(1000);
    },
    async stopRecording() {
      try {
        this.individualAudioStreams.forEach((s) =>
          s.getTracks().forEach((t) => t.stop())
        );
        this.individualAudioStreams = [];
        window.screenStream.getTracks().forEach((s) => s.stop());
        window.screenStream.getVideoTracks().forEach((s) => s.stop());
        this.rec.stop();

        this.$emit("downloadlink", this.blobs);

        await window.audioCtx.close();
      } catch (error) {
        return
      }
    },
  },
  watch: {
    start(val) {
      if (val == true) {
        this.startRecording();
      }
    },
    recording(val) {
      if (val === false) {
        this.stopRecording();
      }
    },
  },
};
</script>

<style scoped>
video {
  width: 70%;
  max-height: 70vh;
  margin: var(--m-margin) auto;
  display: block;
  box-shadow: var(--shadow3);
  border: 1px solid #ccc;
}
</style>