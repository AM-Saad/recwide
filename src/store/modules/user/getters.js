const articleById = (state) => (id) => {
    return state.articles.find(a => a._id.toString() === id.toString())
};


const checkauthintecated = () => {
    const expiryDate = localStorage.getItem("uexpiryd");
    const jwtToken = localStorage.getItem("ut");
    const oneday = 60 * 60 * 24 * 1000
    if (new Date(expiryDate) <= oneday || !jwtToken) {
      return false
    } else {
      return true
    }
  }

export default {
    articleById,
    checkauthintecated
};