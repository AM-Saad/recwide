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
      <div class="flex f-center">
      <a
        class="btn btn"
        download="ams-recorder.webm"
        name="ams-recorder.webm"
        ref="downloadButton"
        @click="download"
        >Download</a
      >
      <a class="btn btn-gradient" v-if="isAuth" @click="openSaveModel()">Save</a>
      <a class="btn btn-gradient" v-if="!isAuth" @click="openAuthFormModel()">Register to save...</a>
      </div>

      <SaveProject 
      v-if="saveTheProject"
      v-on:cancel="closeSaveModel"
      v-on:finished="reRecord"

      :videotype="videotype"
      />
      
      <AuthForm 
      v-if="register"
      v-on:cancel="closeAuthFormModel"
      />
    </div>
    <p class="footer-copyright">
      Designed and developed by
      <a style="color: #fff" href="https://amsstudio.me">AMS-Studio</a>
    </p>
  </div>
</template>

<script>
import Videos from "@/components/models/Videos";
import SaveProject from "@/components/Popups/Save_Project";
import AuthForm from "@/components/Popups/Auth";


import { mapState } from "vuex";
export default {
  name: "Finle",
  data() {
    return {
      loading: true,
      saveTheProject: false,
      register: false,
      allVideos: [],
      converted: false,
      videotype: "webm" 
    };
  },
  components: {
    Videos,
    SaveProject,
    AuthForm
  },
  computed: {
    ...mapState(["mode", "blobs"]),
    ...mapState("user", ["isAuth", "user"]),

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
    closeSaveModel() {
      this.saveTheProject = false;
    },
    openSaveModel() {
      this.saveTheProject = true;
    },

    closeAuthFormModel() {
      this.register = false;
    },
    openAuthFormModel() {
      this.register = true;
    }
  }
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