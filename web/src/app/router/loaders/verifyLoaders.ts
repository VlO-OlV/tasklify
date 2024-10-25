import { Params } from 'react-router-dom'
import { authApi } from '../../store/api/endpoints/authApi'
import { store } from '../../store/store'

export const verifyEmailLoader = async ({ params }: { params: Params<string> }) => {
  const verifyEmail = await store.dispatch(authApi.endpoints.verifyEmail.initiate(params.userId as string));
  if (verifyEmail.error) {
    return null;
  }
  return verifyEmail.data;
}