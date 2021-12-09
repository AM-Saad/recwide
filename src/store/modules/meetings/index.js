import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  isAuth: false,
  jwt: localStorage.getItem('ut'),
  fetching: true,
  meetings: [],
  currentMeeting:null
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};