<template>
  <div class="backdrop">
    <div class="inner">
      <div class="title">Check "Share Audio" Box</div>
      <div class="desc">
        Please check "Share Audio" box to record system audio.
      </div>
      <video
        src="@/assets/videos/share-sound.mp4"
        muted
        autoplay
        loop="loop"
      ></video>
      <div class="flex f-space-between">
        <div class="flex">
          <input
            @click="dontShow = !dontShow"
            type="checkbox"
            name=""
            id="dontShow"
          />
          <label for="dontShow">Don't Show Again</label>
        </div>
        <button class="btn btn-gradient" @click="gotit">Got it</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Guide",
  data() {
    return {
      dontShow: false,
    };
  },
  created() {
    localStorage.setItem("dontshowguideagain", false);
  },
  methods: {
    gotit() {
      this.$emit("gotit");
    },
  },
  watch: {
    dontShow(val) {
      if (val == true) {
        localStorage.setItem("dontshowguideagain", true);
      } else {
        localStorage.setItem("dontshowguideagain", false);
      }
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