<template>
  <div class="backdrop">
    <div class="inner">
      <div class="inner-title" >
        Create New Project
      </div>
   
     
    <div>
     <div class="flex f-space-between">

              <div class="mb">

                  <span id='Uploaded' class="none"> <span id='mb'>{{this.totalMbDone}}</span>/{{this.totalMBSize }} MB</span>
              </div>
                 <div class="circulr">
            <span class="title timer" data-from="0" :data-to="this.currentPercent" data-speed="800"><span v-if="!uploaded">{{currentFileIndex}}</span> <span v-if="uploaded">{{currentFileIndex + 1}}</span> / {{this.blobs.length}}</span>
        </div>
            </div>
        <div class="progress-bar"  :style="'--progress:'+ '00.' + this.currentPercent">
            <div class="box">
                <p :class="{'none' : uploaded}" class="loading-text">Loading <span id="percent">:0</span>%</p>
                <p :class="{'done-text' : !uploaded}">Video('s) Successfully Uploaded 🎉</p>
                <div class="box-front"></div>
                <div class="box-bottom"></div>
            </div>
           
        </div>
    
        <span id='UploadArea'>
        </span>
      <div v-if="!uploading && !saving && uploaded && !saved">
        <input type="text" name="name" id="name" class="form-control" placeholder="Add Project Name.." v-model="name" autoComplete="false">
      <p class="video-error c-r"></p>
    </div>
    </div>
      <div class="flex f-space-between">
        <button class="btn " @click="cancel">Cancel</button>
        <button class="btn btn-gradient" @click="startUploading" v-if="!uploading && !saving && !uploaded && isAuth">Upload Videos</button>
        <button class="btn btn-gradient" @click="register" v-if="!isAuth">Login To Upload</button>
        <button class="btn btn-info" @click="submitPorject" v-if="!uploading && !saving && uploaded && !saved">Save Project</button>
        <button class="btn btn-success"  v-if="saved && isAuth">Saved!</button>
        <button class="btn btn-info" disabled v-if="saving">
          <div class="spinner">
            <div class="double-bounce1"></div>
            <div class="double-bounce2"></div>
          </div>
        </button>
        
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import io from "socket.io-client";

export default {
  name: "Save_Project",
  data() {
    return {
      dontShow: false,
      name: "",
      socket: null,
      uploading: false,
      uploadError: false,
      uploaded: false,
      saving: false,
      saved: false,
      fReader: null,
      totalSize: 0,
      totalMBSize: 0,
      totalMbDone: 0,
      allDone: false,
      currentFile: null,
      currentFileIndex: 0,
      lastPercent: 0,
      currentPercent: 0,
      videosNames: [],
      cancled: false
    };
  },
  props: ["videotype"],
  computed: {
    ...mapState([
      "micGranted",
      "camGranted",
      "audioSettings",
      "mode",
      "blobs",
      "videos",
      "url",
      "resolution"
    ]),
    ...mapState("user", ["isAuth", "user"])
  },
  created() {
    this.socket = io(`${this.url}/video`);
    let _comp = this;

    this.socket.on("more-data", function(data) {
      if (!_comp.cancled) {
        let percentage = Math.floor(data["Percent"]);

        _comp.updateProgressBar(percentage);
        _comp.calcMegabytesDone()

        let Place = data["Place"] * 524288; //The Next Blocks Starting Position
        let NewFile; //The Variable that will hold the new Block of Data
        if (_comp.currentFile.webkitSlice) {
          NewFile = _comp.currentFile.webkitSlice(
            Place,
            Place + Math.min(524288, _comp.currentFile.size - Place)
          );
        } else {
          NewFile = _comp.currentFile.slice(
            Place,
            Place + Math.min(524288, _comp.currentFile.size - Place)
          );
        }

        _comp.fReader.readAsBinaryString(NewFile);
      }
    });

    this.socket.on("Done", function() {
      if (_comp.blobs.length > _comp.currentFileIndex + 1) {
        setTimeout(()=>{

        _comp.currentFileIndex = _comp.currentFileIndex + 1;
        _comp.startUploading();
        }, 1000)
      } else {
        _comp.uploaded = true;
        _comp.uploading = false;
        _comp.currentPercent = "99";
        _comp.videosNames.forEach(function(value, i) {
          localStorage.removeItem(`video/${i}`);
        });
        this.totalMbDone =  Math.round( this.currentPercent / 100.0 * this.currentFile.size / 1048576 );
      }
    });
    this.socket.on("error", function() {
      _comp.uploadError = true;
    });
    this.checkBroswerSupport();
  },
  methods: {
    cancel() {
      this.$emit("cancel");
      this.cancled = true;
    },

    checkBroswerSupport() {
      let bar = document.getElementsByClassName("progress-bar")[0];
      bar.style = `--progress: ${0}`;
      window.addEventListener("load", Ready);
      this.calcMegabytes();

      function Ready() {
        if (window.File && window.FileReader) {
          //These are the relevant HTML5 objects that we are going to use
        } else {
          document.getElementById("UploadArea").innerHTML =
            "Your Browser Doesn't Support The File API Please Update Your Browser";
        }
      }
    },
    startUploading() {
    

      this.uploading = true;
      const _comp = this;
      this.cancled = false;

      const { selectedFile, name } = this.getReadyToUploadVideo();

      this.videosNames.push(name);

      this.currentFile = selectedFile;

      _comp.fReader = new FileReader();

      _comp.fReader.onload = function(evnt) {
        _comp.socket.emit("upload", {
          Name: _comp.currentFile.name,
          Data: evnt.target.result
        });
      };
      _comp.socket.emit("start", {
        Name: _comp.currentFile.name,
        Size: _comp.currentFile.size
      });
    },

    updateProgressBar(percent) {
      this.lastPercent = this.lastPercent;
      this.currentPercent = percent;

      let bar = document.getElementsByClassName("progress-bar")[0];
      if (this.currentPercent >= 0.45) {
        // $(".box p").addClass("c-b");
      }
      bar.style = `--progress: 00.${this.currentPercent}`;

      document.getElementById("percent").innerHTML =
        Math.round(this.currentPercent * 100) / 100;

    },
    async submitPorject() {
        if (!this.name)
        return (document.querySelector(".video-error").innerHTML =
          "Please add project name. ");
      let bar = document.getElementsByClassName("progress-bar")[0];
      bar.classList.add("done");

      bar.style = `--progress: 1`;
      this.currentPercent = "100";

      document.getElementById("percent").innerHTML = "100";
      this.totalMbDone = this.totalMBSize;

      this.saving = true;
      //   $(".file__value").remove();
      const today = new Date();
      const date =
        today.getFullYear() +
        "/" +
        (today.getMonth() + 1) +
        "/" +
        today.getDate();

      const res = await this.$store.dispatch({
        type: "user/saveProject",
        data: {
          videos: this.videosNames,
          name: this.name,
          mode: this.mode,
          audioSettings: this.audioSettings,
          resolution: this.resolution,
          videotype: this.videotype,
          date: date
        }
      });
      this.saving = false;

      if (!res.state) {
        return (document.querySelector(".video-error").innerHTML = res.msg);
      }

      window.onbeforeunload = null;
      window.onbeforeunload = false;
      this.saved = true;

      setTimeout(() => {
        this.$emit("finished");
        return this.$router.push(`/project/${res.json.projectId}`);
      }, 100);
    },
    calcMegabytes() {
      const _comp = this;
      for (let i = 0; i < this.blobs.length; i++) {
        const element = this.blobs[i];
        const myFile = new File(
          [this.blobs[i]],
          element.name + "." + _comp.videotype,
          {
            type: `video/${_comp.videotype}`
          }
        );
        this.totalMBSize += myFile.size;

        let obj = this.blobs[i];
        let blob = new Blob(obj.chunks, { type: `video/${_comp.videotype}` });

        this.totalSize += blob.size;
      }
      this.totalMBSize = Math.ceil(this.totalSize / 1048576);
    },
    calcMegabytesDone(){

      let MBDone = Math.round( this.currentPercent / 100.0 * this.currentFile.size / 1048576 );
      const total = this.totalMbDone +MBDone
      this.totalMbDone = total;
    
    },
    createVideoNameAndSaveToStorage() {
      var today = new Date();
      var date =
        today.getFullYear() +
        "_" +
        (today.getMonth() + 1) +
        "_" +
        today.getDate();
      var time =
        today.getHours() + "_" + today.getMinutes() + "_" + today.getSeconds();

      var random_number = Math.floor(Math.random() * 10);

      let completeName = date + "_" + time + random_number;

      localStorage.setItem(`video/${this.currentFileIndex}`, completeName);
      return completeName;
    },
    getReadyToUploadVideo() {
      const alreadyStarted = localStorage.getItem(
        `video/${this.currentFileIndex}`
      );

      let name;

      if (!alreadyStarted) {
        name = this.createVideoNameAndSaveToStorage();
      } else {
        name = alreadyStarted;
      }
      let obj = this.blobs[this.currentFileIndex];
      let blob = new Blob(obj.chunks, { type: `video/${this.videotype}` });
      const selectedFile = new File([blob], name + "." + this.videotype, {
        type: `video/${this.videotype}`
      });
      return { selectedFile, name };
    },
    register(){
      this.$emit('register')
    }
  },
  watch: {}
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
  z-index: 99999999;
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
.inner-title {
  font-weight: bold;
  margin: var(--m-margin) 0;
  font-size: 22px;
}
input[type="text"] {
  height: 80px;
  margin-top: var(--s-margin);
  margin-bottom: var(--m-margin);
}
@media only screen and (max-width: 767px) and (min-width: 320px) {
  .inner {
    width: 90%;
  }
}

#uploads {
  margin: auto;
  display: block;
  padding: 20px;
  background: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 5px;
}

#uploads div {
  padding: 5px;
  background-color: #eee;
  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

#uploads div .delete {
  background-color: red;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  padding: 5px;
}

.wrap {
  border-radius: 4px;
  background-color: #2e4261;
  box-shadow: 0 1px 2px 0 #c9ced1;
  padding: 1.25rem;
  margin-bottom: 1.5rem;
  min-height: 40vh;
}

.circulr {
color: #fff;
    line-height: 50px;
    height: 35px;
    width: 35px;
    background: #000;
    line-height: 35px;
    margin-top: 10px;
    text-align: center;
    border-radius: 50px;
    padding: 1px;
    font-size: 13px;
}

.progress-bar {
  --progressbar-color: rgb(255, 255, 255);
  --progress-color: rgba(104, 255, 149, 1);
  --progress: 0;
  --box-side-height: 6px;
  position: relative;
  width: 100%;
  height: 75px;
  perspective: 200px;
  margin: 15px 0;
}

.progress-bar .box {
  position: relative;
  width: 100%;
  height: 30px;
  background: var(--progressbar-color);
  transform-style: preserve-3d;
  transform: rotateX(0);
  transition: transform 1s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  transform: rotateX(12deg);
  border-radius: 3px;
  margin: auto;
}

.progress-bar.done .box {
  transform: rotateX(0);
}

.progress-bar .box-front {
  position: absolute;
  background: #b9b8b8;
  width: 100%;
  height: 22px;
  left: 0;
  bottom: 0;
  transform-origin: center bottom;
  transform: rotateX(95deg);
  transition: transform 1s;
  border-radius: 3px;
}

.progress-bar .box p {
  position: absolute;
  top: 5px;
  left: 0;
  color: #333;
  text-align: center;
  width: 100%;
  height: 100%;
  line-height: 100%;
  z-index: 99;
  transition: opacity 1s, visibility 1s;
}

.progress-bar.done .box p.loading-text {
  opacity: 0;
  visibility: hidden;
}

.progress-bar:not(.done) .box p.done-text {
  opacity: 0;
  visibility: hidden;
}

.progress-bar .box-bottom {
  position: absolute;
  background: #111;
  opacity: 0.4;
  width: 100%;
  height: var(--box-side-height);
  left: 0;
  bottom: 0;
  transform-origin: center bottom;
  transform: translateZ(-30px);
  transition: transform 1s;
  filter: blur(10px);
}

.progress-bar .box::after {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  background: var(--progress-color);
  transform-origin: top left;
  transform: scaleX(var(--progress));
  transition: transform 0.1s;
  box-shadow: 0px 0px 17px 3px rgb(0 255 35 / 71%);
  border-radius: 3px;
}

.progress-bar .box-front::after {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  background: var(--progress-color);
  opacity: 0.3;
  transform-origin: top left;
  transform: scaleX(var(--progress));
  transition: transform 0.1s;
  box-shadow: 0px 0px 20px rgba(100, 255, 121, 0.4);
  border-radius: 3px;
}

.mb {
  margin: 10px;
  font-size: 19px;
  color: #333;
}

#UploadButton {
  border: 0;
  border-radius: 3px;
  background-color: #ff9445;
  box-shadow: 0 2px 2px 0 rgb(0 0 0 / 18%);
  padding: 0.9375rem 1.0625rem;
  margin: -0.9375rem -1.0625rem;
  color: white;
  cursor: pointer;
  /* float: right; */
  display: block;
  margin: auto;
}

.footer-copyright {
  background-color: #ff9445;
  text-align: center;
  padding: 5px;
  border-radius: 5px;
  color: #333;
  position: absolute;
  bottom: 0;
  width: 100%;
}

@media only screen and (max-width: 767px) and (min-width: 320px) {
  .wrapper {
    width: 90%;
  }
}
</style>