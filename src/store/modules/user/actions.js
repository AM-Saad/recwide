
import User from '@/api/User';
import Auth from '@/api/auth';

const checkAuth = (res, dispatch) => {
  if (res.code == 401) {
    return dispatch('user/logout', null, { root: true });
  }
}


const login = async ({ commit, rootState }, { data }) => {
  const res = await Auth.login(data, rootState.url)
  res.state && commit('authenticate', { res: res.json, info: data })
  return res
};

const signup = async ({ rootState }, { data }) => {
  const res = await Auth.signup(data, rootState.url)
  return res
};


const getUser = async ({ commit, state, rootState, dispatch }) => {
  const res = await User.getUser(rootState.url, state.jwt)
  checkAuth(res, dispatch)
  // !res.state && commit('msg', { msg: res.msg, type: 'warning' }, { root: true })
  res.state && commit('updateUser', res.json.user)
  return res.state
};
const changeInfo = async ({ commit, state, rootState, dispatch }, { data }) => {

  const res = await User.changeInfo(rootState.url, state.jwt, data)
  checkAuth(res, dispatch)
  res.state && commit('updateUser', res.json.user)
  return res
};
const changePassword = async ({ commit, state, rootState, dispatch }, { data }) => {

  const res = await User.changePassword(rootState.url, state.jwt, data)
  checkAuth(res, dispatch)
  res.state && commit('updateUser', res.json.user)
  return res
};
const getProjects = async ({ commit, state, rootState, dispatch }) => {
  const res = await User.projects(rootState.url, state.jwt)
  checkAuth(res, dispatch)
  // !res.state && commit('msg', { msg: res.msg, type: 'warning' }, { root: true })
  res.state && commit('updateProjects', res.json.projects)
  return res.state ? true : false
};
const saveProject = async ({ commit, state, rootState, dispatch }, { data }) => {

  const res = await User.newProject(rootState.url, state.jwt, data)
  checkAuth(res, dispatch)
  // !res.state && commit('msg', { msg: res.msg, type: 'warning' }, { root: true })
  res.state && commit('updateProjects', res.json.projects)
  return res
};
const deleteProject = async ({ commit, state, rootState, dispatch }, { id }) => {

  const res = await User.deleteProject(rootState.url, state.jwt, id)
  checkAuth(res, dispatch)
  // !res.state && commit('msg', { msg: res.msg, type: 'warning' }, { root: true })
  res.state && commit('updateProjects', res.json.projects)
  return res
};

const logout = async ({ commit }) => {
  commit('logout')
};




export default {
  login,
  logout,
  changeInfo,
  changePassword,
  signup,
  getUser,
  getProjects,
  saveProject,
  deleteProject
};