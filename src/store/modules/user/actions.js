
import User from '@/api/User';
import Auth from '@/api/auth';

const checkAuth = (res, dispatch) => {
  if (res.code == 401) {
    return dispatch('logout', null, { root: true });
  }
}


const login = async ({ commit, rootState }, { data }) => {
  const res = await Auth.login(data, rootState.url)
  res.state && commit('authenticate', res.json)
  return res
};
const signup = async ({ rootState }, { data }) => {
  const res = await Auth.signup(data, rootState.url)
  return res
};


const getVideos = async ({ commit, state, rootState, dispatch }) => {
  const res = await User.videos(rootState.url, state.jwt)
  checkAuth(res, dispatch)
  // !res.state && commit('msg', { msg: res.msg, type: 'warning' }, { root: true })
  res.state && commit('updatevideos', res.json)
  return res.state ? true : false
};
const saveVideo = async ({ commit, state, rootState, dispatch }, { data }) => {
  const res = await User.newVideo(rootState.url, state.jwt, data)
  checkAuth(res, dispatch)
  // !res.state && commit('msg', { msg: res.msg, type: 'warning' }, { root: true })
  res.state && commit('newvideo', res.json)
  return res.state ? true : false
};




export default {
  login,
  signup,
  getVideos,
  saveVideo
};