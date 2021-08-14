<template>
  <div>
    <div class="head">
      <div class="goBack" @click="switchComponent('Scene')">
        <i class="fas fa-arrow-left icon"></i>
        <span>Back To Recording Scene</span>
      </div>
    </div>
    <Allowaccess v-on:close="closeAllowAccess" v-if="showAllowAccess" />

    <Permissions
      v-on:gotit="closePermissions"
      v-if="showPermissions"
      v-on:continueToRec="continueToRec"
    />

    <div class="grid step" :class="{ 'g-two': mode !== 'screen' }">
      <div class="step-options">
        <!-- <h2>Recording Settings</h2> -->
        <div class="options">
          <h3>Audio Recording Options</h3>
          <div>
            <div
              class="options-select"
              :class="[
                {
                  active: recordingSettings == 'Microphone + System audio',
                },
                { none: mode == 'webcam' },
              ]"
              @click="changeSoundOpts('Microphone + System audio')"
            >
              <div class="flex">
                <div class="icon">
                  <i class="fas fa-volume-up"></i>
                </div>
                <span>Microphone + System audio</span>
              </div>
              <div
                v-if="
                  !micGranted &&
                  recordingSettings == 'Microphone + System audio'
                "
              >
                <p class="f-center m-t-3 c-r" @click="openAllowAccess">
                  Allow access to mic
                </p>
              </div>
            </div>
          </div>
          <div>
            <div
              class="options-select"
              :class="[{ active: recordingSettings == 'Microphone' }]"
              @click="changeSoundOpts('Microphone')"
            >
              <div class="flex">
                <div class="icon">
                  <i class="fas fa-microphone-alt"></i>
                </div>
                <span>Microphone</span>
              </div>
              <div v-if="!micGranted && recordingSettings == 'Microphone'">
                <p class="f-center m-t-3 c-r" @click="openAllowAccess">
                  Allow access to mic
                </p>
              </div>
            </div>
          </div>
          <div>
            <div
              class="options-select flex"
              :class="[
                { active: recordingSettings == 'System audio' },
                { none: mode == 'webcam' },
              ]"
              @click="changeSoundOpts('System audio')"
            >
              <div class="icon">
                <i class="fas fa-bullhorn"></i>
              </div>
              <span>System audio</span>
            </div>
            <!---->
          </div>
          <div>
            <div
              class="options-select flex"
              :class="{ active: recordingSettings == 'No audio' }"
              @click="changeSoundOpts('No audio')"
            >
              <div class="icon">
                <i class="fas fa-volume-mute"></i>
              </div>
              <span>No audio</span>
            </div>
            <!---->
          </div>
          <button class="btn btn-big" @click="startRec()">
            Start Recording
          </button>
        </div>
      </div>
      <div class="cam-area" v-if="this.mode != 'screen'">
        <!-- Broadcast -->
        <CamBroadcast />
        <div v-if="!camGranted">
          <button class="btn" @click="openAllowAccess">
            Allow access to Camera
            <p class="font-xl">&#x261C;</p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CamBroadcast from "@/components/models/Cam_broadcast.vue";
import Allowaccess from "@/components/Popups/Allow_access.vue";
import Permissions from "@/components/Popups/Permissions_check.vue";

import { mapState } from "vuex";

export default {
  name: "Options",
  data() {
    return {
      needPermissions: false,
      showPermissions: false,

      showAllowAccess: false,
    };
  },
  computed: {
    ...mapState(["recordingSettings", "mode", "micGranted", "camGranted"]),
  },
  components: {
    CamBroadcast,
    Allowaccess,
    Permissions,
  },
  mounted() {},
  created() {
    this.checkIfNeedPermissions();
    try {
      window.camstream.getTracks().forEach((track) => {
        track.stop();
      });
      window.boradcast.getTracks().forEach((track) => {
        track.stop();
      });
    } catch (error) {
      console.log("___");
    }
  },
  methods: {
    checkIfNeedPermissions() {
      if (!this.micGranted || !this.camGranted) {
        this.needPermissions = true;
      } else {
        this.readyToStart += 1;
      }
    },

    startRec() {
      if (this.needPermissions) {
        this.showPermissions = true;
      } else {
        this.$emit("switch", "Recording");
      }
    },
    continueToRec() {
      this.showPermissions = false;

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
    },
    openAllowAccess() {
      this.showAllowAccess = true;
    },
    closeAllowAccess() {
      this.showAllowAccess = false;
    },

    closePermissions() {
      this.showPermissions = false;
    },

    switchComponent(comp) {
      this.$emit("switch", comp);
    },
    changeSoundOpts(mode) {
      this.$store.commit("recSettings", mode);
    },
  },
};
</script>

<style scoped>
h3 {
  margin: var(--m-margin) 0;
  font-size: 16px;
}

.step-options {
  width: 75%;
  height: 100%;
  margin: var(--m-margin) auto;
  padding: var(--m-padding);
  border-radius: var(--m-radius);
  background: #fff;
  color: #000;
}
.options-select {
  padding: var(--s-padding);
  background-color: #fff;
  margin-bottom: var(--m-margin);
  border-radius: var(--s-radius);
  border: 1px solid #fff;
  cursor: pointer;
  color: #333;
}
.options-select.active {
  border-color: var(--main-color);
  background-color: #eee;
}
.options-select:hover {
  background-color: #eee;
}
.cam-area {
  height: 100%;
  width: 100%;
  /* background: #fff; */
  /* margin: var(--m-margin) auto; */
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
@media only screen and (max-width: 767px) and (min-width: 320px) {
  .step-options {
    width: 100%;
  }
}
</style>