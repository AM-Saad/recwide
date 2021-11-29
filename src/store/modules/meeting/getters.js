const articleById = (state) => (id) => {
  return state.articles.find(a => a._id.toString() === id.toString())
};



export default {
  articleById,
  checkauthintecated
};