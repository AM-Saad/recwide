const articleById = (state) => (id) => {
  return state.articles.find(a => a._id.toString() === id.toString())
};


const checkauthintecated = () => {
  const expiryDate = localStorage.getItem("uexpiryd");
  const jwtToken = localStorage.getItem("ut");
  const keepSession = localStorage.getItem("keepSession");

  if (!keepSession) {
    const nineHours = 60 * 60 * 9 * 1000
    if (new Date(expiryDate) <= nineHours || !jwtToken) {
      return false
    }else{
      return true
    }
  } else {
    if (jwtToken) {
      return true
    } else {
     return false
    }
  }
}

export default {
  articleById,
  checkauthintecated
};