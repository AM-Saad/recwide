<template>
  <div class="backdrop">
    <div class="inner">
      <div class="title">Get Webcam And Microphone Permissions</div>
      <div class="desc">
        Please click the lock button in the browser address bar to set
        permissions.
      </div>
      <video
        src="https://www.recordcast.com/media/tools/video/camera.mp4?v=1.1"
        muted
        autoplay
        loop="loop"
      ></video>
      <div class="flex f-space-between">
        <button class="btn" @click="gotit">Got it</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Guide",
  data() {
    return {};
  },
  created() {},
  methods: {
    gotit() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.782);
  z-index: 999999;
}
.inner {
  background-color: #fff;
  border-radius: var(--m-radius);
  border: 1px solid #ccc;
  padding: var(--m-padding);
  position: absolute;
  width: 40%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.inner .title {
  font-weight: bold;
  margin: var(--m-margin) 0;
  font-size: 22px;
}
.inner .desc {
  margin: var(--m-margin) 0;
}
.inner video {
  margin: auto;
  display: block;
  max-width: 90%;
}
@media only screen and (max-width: 767px) and (min-width: 320px) {
  .inner {
    width: 90%;
  }
}
</style>