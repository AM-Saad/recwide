<template>
  <div v-if="audioSettings">
    <h3>Audio Recording Options</h3>
    <div v-for="(opt, idx) in options" :key="opt.name">
      <div
        class="options-select"
        :class="[{ active: opt.isActive }, { none: opt.hide }]"
        @click="changeSoundOpts(opt.name)"
        @keydown="checkKeyPressed($event, opt.name)"
        :tabindex="idx + 1"
      >
        <div class="flex">
          <div class="icon">
            <i :class="opt.icon"></i>
          </div>
          <span>{{ opt.name }}</span>
        </div>
        <div v-if="opt.needPermissions">
          <p
            class="f-center m-t-3 c-r"
            @click="$emit('openAllowAccess', opt.name)"
          >
            Allow access to mic
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AudioOptions",
  computed: {
    ...mapState(["audioSettings", "mode", "micGranted"]),
    options: function() {
      return [
        {
          name: "Microphone + System audio",
          isActive: this.audioSettings === "Microphone + System audio",
          hide: this.mode === "webcam",
          needPermissions:
            !this.micGranted &&
            this.audioSettings === "Microphone + System audio",
          icon: "fas fa-volume-up",
        },
        {
          name: "Microphone",
          isActive: this.audioSettings === "Microphone",
          needPermissions:
            !this.micGranted && this.audioSettings === "Microphone",
          icon: "fas fa-microphone-alt",
        },
        {
          name: "System audio",
          isActive: this.audioSettings === "System audio",
          hide: this.mode === "webcam",
          needPermissions: false,
          icon: "fas fa-bullhorn",
        },
        {
          name: "No audio",
          isActive: this.audioSettings === "No audio",
          needPermissions: false,
          icon: "fas fa-volume-mute",
        },
      ];
    },
  },

  methods: {
    changeSoundOpts(mode) {
      this.$store.commit("recSettings", mode);
    },
    checkKeyPressed(e, mode) {
      if (e.key === "Enter") {
        this.changeSoundOpts(mode);
      }
    },
  },
};
</script>

<style scoped>
h3 {
  margin: var(--m-margin) 0;
  font-size: 16px;
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
.icon {
  margin: 0 var(--s-margin);
  color: var(--main-color);
  font-size: 20px;
}
</style>
