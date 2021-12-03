
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

const getMeetings = async ({ commit, state, rootState, dispatch }) => {
  const res = await Meeting.getAll(rootState.url, state.jwt)
  checkAuth(res, dispatch)
  // !res.state && commit('msg', { msg: res.msg, type: 'warning' }, { root: true })
  res.state && commit('updateMeetings', res.json.meetings)
  return res.state ? true : false
};

export default {
  createMeeting,
  getMeetings
}
