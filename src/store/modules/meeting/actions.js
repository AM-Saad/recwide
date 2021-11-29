
import User from '@/api/User';
import Auth from '@/api/auth';

const checkAuth = (res, dispatch) => {
  if (res.code == 401) {
    return dispatch('user/logout', null, { root: true });
  }
}




export default {

};