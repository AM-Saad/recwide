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
    recordingSettings: 'Microphone + System audio',
    camGranted: false,
    micGranted: false,
    blobs: [],
    finished: false,
    camerror: false,
    camIsReady: false,
    screenIsReady: false
  },
  getters: {},
  mutations: {

    changeMode(state, mode) {
      state.mode = mode
      console.log(state);
      if(mode === 'webcam'){
        state.recordingSettings = 'Microphone'
      }
    },
    recSettings(state, mode) {
      console.log(mode);
      state.recordingSettings = mode
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
      state.recordingSettings = 'Microphone + System audio'

    }
  },

  actions: {
    async checkConnection({ state }) {

      const res = await fetch("http://info.cern.ch/")
      console.log(res);

      state.networkconnections = !state.networkconnections
    },

  },

});
