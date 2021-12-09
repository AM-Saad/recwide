const authenticate = (state, data) => {
  console.log( data.res.user._id)
  state.jwt = data.res.token
  state.userName = data.res.user.name
  state.isAuth = true
  state.userId = data.res.user._id
  const remainingMilliseconds = 60 * 60 * 1000;
  state.sessionExpiryDate = new Date(
    new Date().getTime() + remainingMilliseconds
  );

  localStorage.setItem('ut', state.jwt)
  localStorage.setItem('keepSession', data.info.rememberMe)
  localStorage.setItem('uexpiryd', state.sessionExpiryDate)
  localStorage.setItem('un', state.userName)
  localStorage.setItem('uid', state.userId)
}

const loginToStore = (state) => {
  state.jwt = localStorage.getItem('ut')
  state.userName = localStorage.getItem('un')
  state.userId = localStorage.getItem('uid')
  state.isAuth = true

}

const logout = (state) => {

  localStorage.removeItem('jwt')
  localStorage.removeItem('sessionExpiryDate')
  localStorage.removeItem('ut')
  localStorage.removeItem('keepSession')
  localStorage.removeItem("uexpiryd")
  localStorage.removeItem("un")
  localStorage.removeItem("uid")
  // state.user = null
  state.jwt = null
  // state.expiryDate = null
  state.isAuth = false

}



const updateProjects = (state, projects) => {
  state.projects = projects

}
const updateUser = (state, user) => {
  state.user = user

}

const newvideo = (state, video) => {
  state.videos.push(video)

}
const fetching = (state, status) => {
  state.fetching = status
}







export default {
  authenticate, loginToStore, updateUser, logout, updateProjects, fetching, newvideo
};