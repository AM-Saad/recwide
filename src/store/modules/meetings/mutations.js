

const updateMeetings = (state, meetings) => {
    state.meetings = meetings
  }
  const fetching = (state, status) => {
    state.fetching = status
  }
  
  export default {
    updateMeetings,
    fetching
  };