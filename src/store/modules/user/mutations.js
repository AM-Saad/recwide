const authenticate = (state, data) => {

  state.jwt = data.res.token
  state.user = data.res.user.name
  state.isAuth = true
  const remainingMilliseconds = 60 * 60 * 1000;
  state.sessionExpiryDate = new Date(
    new Date().getTime() + remainingMilliseconds
  );

  localStorage.setItem('ut', state.jwt)
  localStorage.setItem('keepSession', data.info.rememberMe)
  localStorage.setItem('uexpiryd', state.sessionExpiryDate)
  localStorage.setItem('u', state.user)
}

const loginToStore = (state) => {
  state.jwt = localStorage.getItem('ut')
  state.userName = localStorage.getItem('u')
  state.isAuth = true

}

const logout = (state) => {

  localStorage.removeItem('jwt')
  localStorage.removeItem('sessionExpiryDate')
  localStorage.removeItem('ut')
  localStorage.removeItem('keepSession')
  localStorage.removeItem("uexpiryd")
  localStorage.removeItem("u")
  state.jwt = null
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