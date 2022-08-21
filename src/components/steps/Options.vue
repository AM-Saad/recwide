<template>
  <div>
    <div class="head">
      <button
        tabindex="7"
        type="button"
        class="goBack"
        @click="switchComponent('Scene')"
      >
        <i class="fas fa-arrow-left icon"></i>
        <span>Back To Recording Scene</span>
      </button>
    </div>

    <HowToAllowAccess
      @close="showAllowAccess = false"
      v-if="showAllowAccess"
      :requestedGuide="requestedGuide"
    />
    <CheckPremissions
      @gotit="shouldCheckPermissions = false"
      v-show="shouldCheckPermissions"
      @continueToRec="continueToRec"
    />

    <div :class="{ flex: mode !== 'screen' }" class="step">
      <div class="step-options">
        <div>
          <AudioOptions @openAllowAccess="openAllowAccess" />

          <div class="grid">
            <h3 for="resolution">Resolution</h3>
            <select id="resolution" v-model="currentResolution" tabindex="5">
              <option
                v-for="i in resolutions"
                :key="i.height"
                :value="i.height"
              >
                {{ i.height }}
              </option>
            </select>
          </div>

          <button
            class="btn btn-gradient btn btn-gradient-big"
            v-if="shouldNotWaitThePreview"
            @click="proceed()"
            tabindex="6"
          >
            Start Recording
          </button>
          <button
            class="btn btn-gradient btn btn-gradient-big"
            style="opacity: 0.5"
            tabindex="6"
            v-if="!shouldNotWaitThePreview"
          >
            Start Recording
          </button>
        </div>
      </div>

      <div class="step-cam-preview" v-if="this.mode != 'screen'">
        <CamPreview
          v-on:cameraReady="camPrevReady()"
          v-on:AllowAccess="openAllowAccess('Webcam')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CamPreview from "@/components/recording/CamPreview.vue";
import HowToAllowAccess from "@/components/popups/HowToAllowAccess.vue";
import CheckPremissions from "@/components/popups/CheckPremissions.vue";
import AudioOptions from "@/components/AudioOptions.vue";
import { mapState } from "vuex";

export default {
  name: "Options",
  data() {
    return {
      needPermissions: false,
      shouldCheckPermissions: false,
      shouldNotWaitThePreview: false,
      showAllowAccess: false,
      requestedGuide: "",
      currentResolution: 1080,
    };
  },
  computed: {
    ...mapState([
      "audioSettings",
      "mode",
      "micGranted",
      "camGranted",
      "resolutions",
    ]),
    premissionsForModes: function() {
      return {
        screenAndWebcam:
          !this.camGranted ||
          (!this.micGranted && this.audioSettings !== "No audio"),
        webcam:
          !this.camGranted ||
          (!this.micGranted && this.audioSettings == "Microphone"),
        screen:
          (this.audioSettings === "Microphone + System audio" ||
            this.audioSettings === "Microphone") &&
          !this.micGranted,
      };
    },
  },
  components: {
    CamPreview,
    HowToAllowAccess,
    CheckPremissions,
    AudioOptions,
  },

  methods: {
    checkIfMissingPermissions() {
      if (this.premissionsForModes[this.mode]) {
        return (this.needPermissions = true);
      }
      this.needPermissions = false;
      this.readyToStart += 1;
    },
    proceed() {
      if (this.needPermissions) {
        return (this.shouldCheckPermissions = true);
      }
      this.$emit("switch", "Recording");
    },
    continueToRec() {
      this.shouldCheckPermissions = false;

      if (this.mode === "webcam" && !this.camGranted) {
        return (this.showAllowAccess = true);
      }
      if (this.mode === "screenAndWebcam" && !this.camGranted) {
        this.$store.commit("changeMode", "screen");
        return this.$emit("switch", "Recording");
      }
      if (this.mode != "screen" && this.camGranted) {
        return this.$emit("switch", "Recording");
      }
      if (this.mode == "screen" && (!this.micGranted || !this.camGranted)) {
        return this.$emit("switch", "Recording");
      }
    },
    openAllowAccess(requestedGuide) {
      this.requestedGuide = requestedGuide;
      this.showAllowAccess = true;
    },

    switchComponent(comp) {
      this.$emit("switch", comp);
    },

    camPrevReady() {
      this.shouldNotWaitThePreview = true;
      this.$store.commit("camGranted", true);
    },
  },
  created() {
    if (
      this.mode === "screen" ||
      (this.mode === "screenAndWebcam" && !this.camGranted)
    ) {
      this.shouldNotWaitThePreview = true;
    }
    this.checkIfMissingPermissions();
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
    this.$store.commit("changeResolution", this.currentResolution);
  },
  watch: {
    audioSettings() {
      this.checkIfMissingPermissions();
    },
    camGranted(val) {
      if (val) {
        this.$store.commit("micGranted", true);
      }
    },
    currentResolution(val) {
      this.currentResolution = val;
      this.$store.commit("changeResolution", val);
    },
  },
};
</script>

<style scoped>
h3 {
  margin: var(--m-margin) 0;
  font-size: 16px;
}
.head {
  margin-bottom: var(--m-margin);
}
.step {
  gap: 1rem;
}
.step-options {
  width: 100%;
  padding: var(--m-padding);
  border-radius: var(--m-radius);
  background: #fff;
  color: #000;
  box-shadow: var(--shadow3);
  align-self: stretch;
}
#resolution {
  padding: var(--s-padding);
  background-color: #fff;
  margin-bottom: var(--m-margin);
  border-radius: var(--s-radius);
  border: 1px solid var(--main-color);
  cursor: pointer;
  color: #333;
}
.step-cam-preview {
  height: 100%;
  width: 100%;
}
.icon {
  margin: 0 var(--s-margin);
  color: var(--main-color);
  font-size: 20px;
}
.tips {
  margin-top: var(--l-margin);
  text-align: center;
}
@media only screen and (max-width: 1024px) and (min-width: 280px) {
  .step-options {
    width: 100%;
  }
}
</style>
