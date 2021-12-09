
import Meeting from '@/api/Meeting';

const checkAuth = (res, dispatch) => {
  if (res.code == 401) {
    return dispatch('user/logout', null, { root: true });
  }
}



const createMeeting = async ({ commit, rootState, state }, { data }) => {

  const res = await Meeting.create(rootState.url, state.jwt, data)
  // checkAuth(res, dispatch)
  res.state && commit('updateMeetings', res.json.meeting)
  return res
};
const sendInvitation = async ({ commit, rootState, state }, { data }) => {
  const res = await Meeting.sendInvitation(rootState.url, state.jwt, data)
  // checkAuth(res, dispatch)
  res.state && commit('updateMeeting', res.json.meeting)
  return res
};

const getMeetings = async ({ commit, state, rootState, dispatch }) => {
  const res = await Meeting.getAll(rootState.url, state.jwt)
  // checkAuth(res, dispatch)
  // !res.state && commit('msg', { msg: res.msg, type: 'warning' }, { root: true })
  res.state && commit('updateMeetings', res.json.meetings)
  return res.state ? true : false
};
const currentMeeting = async ({ commit }, { currentMeeting }) => {
  return commit('updateCurrentMeeting', currentMeeting)
};

const deleteMeeting = async ({ commit, state, rootState, dispatch }, { id }) => {

  const res = await Meeting.deleteMeeting(rootState.url, state.jwt, id)
  checkAuth(res, dispatch)
  res.state && commit('updateMeetings', res.json.meetings)
  return res
};

export default {
  createMeeting,
  getMeetings,
  sendInvitation,
  currentMeeting,
  deleteMeeting
}
