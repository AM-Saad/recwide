import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user: user,
  },
  state: {
    url: "http://localhost:3000",
    msg: null,
    networkconnections: true,
    mode: 'screenAndWebcam',
    audioSettings: 'Microphone + System audio',
    camGranted: false,
    micGranted: false,
    blobs: [],
    finished: false,
    camerror: false,
    camIsReady: false,
    screenIsReady: false,
    resolution: 1080,
    resolutions: [
      {
        height: 1080, width: 1920, aspectRatio: { ideal: 1.7777777778 },
        frameRate: 30
      },
      {
        height: 720, width: 1280, aspectRatio: { ideal: 1.7777777778 },
        frameRate: 30
      },
      {
        height: 480, width: 720, aspectRatio: { ideal: 1.7777777778 },
        frameRate: 30
      },
    ]
  },
  getters: {},
  mutations: {

    changeMode(state, mode) {
      state.mode = mode
      if (mode === 'webcam') {
        state.audioSettings = 'Microphone'
      }
    },
    recSettings(state, mode) {
      state.audioSettings = mode
    },
    newBlob(state, blob) {
      state.blobs.push(blob)
    },
    finished(state, val) {
      state.finished = val
    },
    camerror(state, val) {
      state.camerror = val
    },
    camReady(state, val) {
      state.camIsReady = val
    },
    screenReady(state, val) {
      state.screenIsReady = val
    },
    camGranted(state, val) {
      state.camGranted = val
    },
    micGranted(state, val) {
      state.micGranted = val
    },
    reRecord(state) {
      state.camerror = false
      state.finished = false
      state.camIsReady = false
      state.screenIsReady = false
      state.blobs = []
      state.mode = 'screen'
      state.audioSettings = 'Microphone + System audio'
      state.resolution = 1080
    },
    changeResolution(state,val) {
      state.resolution = state.resolutions.find(
        (i) => i.height === val
      );
    },
  },

  actions: {
    async checkConnection({ state }) {

    await fetch("http://info.cern.ch/")
      state.networkconnections = !state.networkconnections
    },

  },

});
