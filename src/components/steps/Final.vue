<template>
  <div>
    <div class="head">
      <div class="goBack" @click="reRecord()">
        <i class="fas fa-arrow-left icon"></i>
        <span>Re-record</span>
      </div>
    </div>
    <div class="step">
      <Videos v-if="converted" :allVideos="allVideos" />
      <div v-if="loading">Loading...</div>
      <div>
        <label for="videotype">Select Type</label>
        <select v-model="videotype">
          <option value="webm" selected>Webm</option>
          <option value="mp4">Mp4</option>
        </select>
      </div>
      <a
        class="btn btn-big"
        download="ams-recorder.webm"
        name="ams-recorder.webm"
        ref="downloadButton"
        @click="download"
        >Download</a
      >
      <!-- <a class="btn" @click="saveVideo">Save</a> -->
    </div>
    <p class="footer-copyright">
      Designed and developed by
      <a style="color: #fff" href="https://amsstudio.me">AMS-Studio</a>
    </p>
  </div>
</template>

<script>
import Videos from "@/components/models/Videos";

import { mapState } from "vuex";
export default {
  name: "Finle",
  data() {
    return {
      loading: true,
      allVideos: [],
      converted: false,
      videotype: "webm",
    };
  },
  components: {
    Videos,
  },
  computed: {
    ...mapState(["mode", "blobs"]),
  },
  mounted() {
    this.createRenderUrl();
  },
  methods: {
    reRecord() {
      if (
        confirm("Your records will be lost, are you sure you want to leave?")
      ) {
        this.converted = false;
        this.allVideos = [];
        this.videotype = "webm";
        this.$emit("reRecord");
      }
    },
    download() {
      var temporaryDownloadLink = document.createElement("a");
      temporaryDownloadLink.style.display = "none";

      document.body.appendChild(temporaryDownloadLink);

      for (var n = 0; n < this.blobs.length; n++) {
        let obj = this.blobs[n];
        let blob = new Blob(obj.chunks, { type: `video/${this.videotype}` });
        let url = window.URL.createObjectURL(blob);

        temporaryDownloadLink.setAttribute("href", url);
        temporaryDownloadLink.setAttribute("download", obj.name);
        temporaryDownloadLink.click();
      }

      document.body.removeChild(temporaryDownloadLink);
    },
    async saveVideo() {
      let blobs = [];
      for (var n = 0; n < this.blobs.length; n++) {
        let obj = this.blobs[n];
        let blob = new Blob(obj.chunks, { type: `video/mp4` });
        blobs.push(blob);
      }

      await this.$store.dispatch({
        type: "user/saveVideo",
        data: blobs,
      });
    },
    async createChunkUrls(chunks, mimeType, name) {
      let blob = new Blob(chunks, { type: `video/${mimeType}` });
      let url = window.URL.createObjectURL(blob);
      return { blob, url, name };
    },
    async createRenderUrl() {
      for (var n = 0; n < this.blobs.length; n++) {
        let obj = this.blobs[n];
        let blob = new Blob(obj.chunks, { type: `video/mp4` });
        let url = window.URL.createObjectURL(blob);
        this.allVideos.push({ url: url, name: obj.name });
      }
      this.converted = true;
      this.loading = false;
    },
  },
};
</script>

<style scoped>
.head i {
  color: var(--main-color);
  margin-right: var(--m-margin);
}
.step {
  margin-top: 0;
  padding: 0;
}
select {
  display: block;
  padding: var(--m-padding);
  margin: var(--m-margin) 0;
  border-radius: var(--m-radius);
  width: 100%;
}
</style>