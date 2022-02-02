<template>
  <div class="finle_videos">
    <video
      id="cam-recorded-video"
      :class="{ fly: mode != 'webcam' }"
      v-if="mode === 'screenAndWebcam'"
      ref="camRecording"
      muted
    >
      Your browser doesn't support the video tag
    </video>
    <div class="video-player" ref="videomask" id="video-mask">
      <video
        id="main_video"
        width="100%"
        :ref="mode == 'webcam' ? 'camRecording' : 'screenRecording'"
      > Your browser is not support video tag </video>

      <div id="controls">
        <button
          id="playpause"
          ref="playPauseBtn"
          value="pause"
          @click="playpause"
        >
          <i class="fas fa-play"></i>
        </button>
        <button id="stop" @click="stop">
          <i class="fas fa-stop"></i>
        </button>
        <button id="replay" @click="replay">
          <i class="fas fa-redo"></i>
        </button>
        <div class="progress-bar">
          <input
            type="range"
            id="progress1"
            ref="mirageProgressBar"
            min="0"
            max="100"
            value="0"
            @click="pausebyprogress"
          />
          <progress id="progress2" ref="progress2" min="0" max="100" value="0">
            0% played
          </progress>
        </div>
        <button id="mute" ref="mute" class="mute" title="mute" @click="mute">
          <i class="fas fa-volume-up"></i>
        </button>
        <input
          type="range"
          id="volume"
          ref="volumeBtn"
          value="5"
          min="0"
          max="10"
          @change="volume"
        />
        <button
          v-if="mode !== 'screenAndWebcam'"
          id="expandcollapse"
          ref="expandcollapseBtn"
          class="expandcollapse"
          @click="expandcollapse"
        >
          <i class="fas fa-expand-arrows-alt"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Videos",
  data() {
    return {
      ready: false,
    };
  },
  props: ["allVideos"],
  computed: {
    ...mapState(["mode", "blobs", "videos"]),
  },
  mounted() {
    let ready = this.addVidsUrl();
    if (ready) {
      this.renderVideos();
    }
  },
  methods: {
    addVidsUrl() {
      for (var n = 0; n < this.allVideos.length; n++) {
        let vid = this.allVideos[n];
        if (vid.name == "screenRecording") {
          this.$refs.screenRecording.src = vid.url;
        } else {
          this.$refs.camRecording.src = vid.url;
        }
      }
      return true;
    },
    renderVideos() {
      let videoPlayer = document.getElementById("main_video");
      let _comp = this;

      videoPlayer.onloadedmetadata = function () {
        // it should already be available here
        // handle chrome's bug
        if (videoPlayer.duration === Infinity) {
          // set it to bigger than the actual duration
          videoPlayer.currentTime = 1e101;
          videoPlayer.ontimeupdate = function () {
            _comp.ready = true;

            this.ontimeupdate = () => {
              _comp.updateProgressBar();
              return;
            };
          };
        }
      };
      // videoPlayer.addEventListener("timeupdate", this.updateProgressBar, false);
    },
    playpause() {
      let videoPlayer = document.getElementById("main_video");
      let playPauseBtn = this.$refs.playPauseBtn;
      let videos = document.querySelectorAll("video");

      var isPlaying =
        videoPlayer.currentTime > 0 &&
        !videoPlayer.paused &&
        !videoPlayer.ended &&
        videoPlayer.readyState > videoPlayer.HAVE_CURRENT_DATA;

      if (!isPlaying) {
        playPauseBtn.value = "play";
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        for (let index = 0; index < videos.length; index++) {
          videos[index].play();
        }
      } else {
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';

        playPauseBtn.value = "pause";
        for (let index = 0; index < videos.length; index++) {
          videos[index].pause();
        }
      }
    },
    stop() {
      let playPauseBtn = this.$refs.playPauseBtn;

      let videos = document.querySelectorAll("video");
      for (let index = 0; index < videos.length; index++) {
        videos[index].currentTime = 0;
        videos[index].pause();
      }
      playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    },
    replay() {
      let playPauseBtn = this.$refs.playPauseBtn;

      let videos = document.querySelectorAll("video");
      for (let index = 0; index < videos.length; index++) {
        videos[index].currentTime = 0;
        videos[index].play();
      }
      playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    },

    updateProgressBar() {
      let videoPlayer = document.getElementById("main_video");
      let progressBar = this.$refs.progress2;
      let mirageProgressBar = this.$refs.mirageProgressBar;
      // Work out how much of the media has played via the duration and currentTime parameters
      var percentage = Math.floor(
        (100 / videoPlayer.duration || 0) * videoPlayer.currentTime
      );
      // Update the progress bar's value
      progressBar.value = percentage;
      mirageProgressBar.value = percentage;
      // Update the progress bar's text (for browsers that don't support the progress element)
      progressBar.innerHTML = percentage + "% played";
    },

    pausebyprogress() {
      let videoPlayer = document.getElementById("main_video");
      let mirageProgressBar = this.$refs.mirageProgressBar;
      let playPauseBtn = this.$refs.playPauseBtn;
      playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';

      let videos = document.querySelectorAll("video");
      for (let index = 0; index < videos.length; index++) {
        var current = (mirageProgressBar.value * videoPlayer.duration) / 100;
        videos[index].currentTime = current;
        videos[index].pause();
      }
    },

    volume() {
      let videoPlayer = document.getElementById("main_video");
      let volumeBtn = this.$refs.volumeBtn;

      var volumevalue = parseFloat(volumeBtn.value / 10);
      videoPlayer.volume = volumevalue;
    },

    mute() {
      let videoPlayer = document.getElementById("main_video");
      let volumeBtn = this.$refs.volumeBtn;
      let mute = this.$refs.mute;

      if (videoPlayer.muted) {
        mute.innerHTML = '<i class="fas fa-volume-up"></i>';
        videoPlayer.muted = false;
        volumeBtn.value = 5;
      } else {
        mute.innerHTML = '<i class="fas fa-volume-mute"></i>';
        videoPlayer.muted = true;
        volumeBtn.value = 0;
      }
    },

    expandcollapse() {
      let videoMask = this.$refs.videomask;
      let expandcollapseBtn = this.$refs.expandcollapseBtn;

      if (
        !document.fullscreenElement &&
        !document.mozFullScreenElement &&
        !document.webkitFullscreenElement &&
        !document.msFullscreenElement
      ) {
        if (videoMask.requestFullscreen) {
          videoMask.requestFullscreen();
        } else if (videoMask.msRequestFullscreen) {
          videoMask.msRequestFullscreen();
        } else if (videoMask.mozRequestFullScreen) {
          videoMask.mozRequestFullScreen();
        } else if (videoMask.webkitRequestFullscreen) {
          videoMask.webkitRequestFullscreen();
        }
        expandcollapseBtn.innerHTML =
          '<i class="fas fa-compress-arrows-alt"></i>';
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
        expandcollapseBtn.innerHTML =
          '<i class="fas fa-expand-arrows-alt"></i>';
      }
    },
    getDuration(url, next) {
      var _player = new Audio(url);
      _player.addEventListener(
        "durationchange",
        function () {
          if (this.duration != Infinity) {
            var duration = this.duration;
            _player.remove();
            next(duration);
          }
        },
        false
      );
      _player.load();
      _player.currentTime = 24 * 60 * 60; //fake big time
      _player.volume = 0;
      _player.play();
      //waiting...
    },
  },
  watch: {
    ready(val) {
      if (val == true) {
        let videoPlayer = document.getElementById("main_video");

        let videos = document.querySelectorAll("video");

        for (let index = 0; index < videos.length; index++) {
          var current = (1 * videoPlayer.duration) / 100;
          videos[index].currentTime = current;
          videos[index].pause();
        }
      }
    },
  },
};
</script>

<style scoped>
.finle_videos {
  position: relative;
  width: 100%;
  display: block;
  margin: var(--l-margin) auto;
}

.fly {
  position: absolute;
  bottom: 14%;
  left: 1%;
  height: 150px;
  width: unset;
  z-index: 99999999;
  border: 1.8px dashed var(--main-color);
}

.video-player {
  position: relative;
  width: 100%;
  box-shadow: var(--shadow);
  border-radius: var(--m-radius);
  overflow: hidden;
}
#controls {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.755);
  bottom: 0;
  right: 0;
  left: 0;
  padding: 5px;
  display: flex;
}
#controls > * {
  background-color: transparent;
  color: #fff;
  text-shadow: 1px 0px 8px #fff;
  border: 0;
  cursor: pointer;
  font-size: 18px;
  display: inline-block;
  position: relative;
  margin: var(--s-margin);
}
#controls > *:focus {
  outline: none;
}

#controls i[class^="flaticon-"] {
  padding: 3px;
  font-size: 13px;
}

.progress-bar {
  width: 65%;
}
#progress1,
#progress2 {
  width: 100%;
  -webkit-appearance: none;
  vertical-align: middle;
  background: transparent;
}
#progress1 {
  position: absolute;
  /* opacity: 0; */
  top: .5px;
  cursor: pointer;
  border-radius: 50px;
}

#progress2::-webkit-progress-bar {
  overflow: hidden;
  -webkit-appearance: none;
  height: 13px;
  border-radius: 3px;
  background: #eee;
}
#progress2::-webkit-progress-value {
  background: #2c73cc;
}

#progress2::-moz-progress-bar {
  overflow: hidden;
  height: 13px;
  border-radius: 3px;
  background: #eee;
}
#progress2::-moz-progress-value {
  background: #2c73cc;
}

#volume {
  text-align: left;
  vertical-align: middle;
  left: 0;
  width: 10%;
  -webkit-appearance: none;
}
#volume::-webkit-slider-runnable-track {
  -webkit-appearance: none;
  width: 100%;
  height: 3px;
  border: none;
  background: #fff;
}
#volume::-moz-range-track {
  width: 100%;
  height: 3px;
  border: none;
  background: #fff;
}
#volume::-ms-track {
  width: 100%;
  height: 3px;
  border: none;
  background: #fff;
}

#volume::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 5px;
  margin-top: -6px;
  height: 15px;
  border: none;
  background: #eee;
}
#volume::-moz-range-thumb {
  width: 5px;
  height: 15px;
  border: none;
  background: #eee;
}
#volume::-ms-thumb {
  width: 5px;
  height: 15px;
  border: none;
  background: #eee;
}
</style>