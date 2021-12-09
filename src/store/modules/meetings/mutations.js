

const updateMeetings = (state, meetings) => {
  state.meetings = meetings
}

const updateMeeting = (state, meeting) => {
  state.currentMeeting = meeting
  const meetingIdx = state.meetings.findIndex(m => meeting._id.toString() === m._id.toString())
  state.meetings[meetingIdx] = meeting
}
const fetching = (state, status) => {
  state.fetching = status
}
const updateCurrentMeeting = (state, currentMeeting) => {
  state.currentMeeting = currentMeeting
}

export default {
  updateMeetings,
  fetching,
  updateMeeting,
  updateCurrentMeeting
};