import { redirect } from 'react-router-dom';
import checkAuthUser from '../../utils/checkAuthUser';

export const userAuthenticatedLoader = async () => {
  const isAuth = await checkAuthUser();
  return isAuth ? isAuth : redirect('/login');
}

export const userNotAuthenticatedLoader = async () => {
  const isAuth = await checkAuthUser();
  return isAuth ? redirect('/profile') : null;
}