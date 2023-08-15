import { AUTH_CONFIG } from '../config';

export const handleIsAuth = () => {
  const auth = localStorage.getItem('auth');

  if (!auth) return false;

  const authData = JSON.parse(auth);

  if (
    authData.login !== AUTH_CONFIG.LOGIN ||
    authData.password !== AUTH_CONFIG.PASSWORD
  ) {
    return false;
  }

  return true;
};
