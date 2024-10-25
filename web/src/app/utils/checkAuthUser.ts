import { Cookies } from 'react-cookie';
import { authApi } from '../store/api/endpoints/authApi';
import { store } from '../store/store';

const checkAuthUser = async () => {
  const getMe = await store.dispatch(authApi.endpoints.getMe.initiate());
  const accessCookie = new Cookies().get('accessToken');
  if (getMe.error || !accessCookie) {
    return false;
  }
  return getMe.data;
}

export default checkAuthUser;