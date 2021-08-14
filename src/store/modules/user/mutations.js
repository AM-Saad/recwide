const authenticate = (state, authData) => {
  state.jwt = authData.token
  state.user = authData.user.name
  state.isAuth = true
  const remainingMilliseconds = 60 * 60 * 1000;
  state.sessionExpiryDate = new Date(
    new Date().getTime() + remainingMilliseconds
  );

  localStorage.setItem('ut', state.jwt)
  localStorage.setItem('uexpiryd', state.sessionExpiryDate)
  localStorage.setItem('u', state.user)
}

const loginToStore = (state) => {
  state.jwt = localStorage.getItem('ut')
  state.user = localStorage.getItem('u')
  state.isAuth = true

}

const logout = (state) => {

  localStorage.removeItem('jwt')
  localStorage.removeItem('sessionExpiryDate')
  // state.user = null
  state.jwt = null
  // state.expiryDate = null
  state.isAuth = false

}



const updatevideos = (state, videos) => {
  console.log(videos);
  state.videos = videos.videos

}

const newvideo = (state, video) => {
  state.videos.push(video)

}
const fetching = (state, status) => {
  console.log(status);
  state.fetching = status

}







export default {
  authenticate, loginToStore, logout, updatevideos, fetching, newvideo
};