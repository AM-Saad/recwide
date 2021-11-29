
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


export default {
  createMeeting
}
