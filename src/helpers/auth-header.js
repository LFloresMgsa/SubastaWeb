import { store } from '../store';

export function authHeader(isMultiPart, newToken) {
  const { accessToken } = store.getState();
  const token = accessToken?.token || newToken;

  if (token) {
    if (isMultiPart) {
      return {
        // 'Content-type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      };
    }
    return {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  } else {
    return { 'Content-type': 'application/json' };
  }
}
