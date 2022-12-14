import { authApi } from '@/api/axios';

export function useRefreshToken() {
  const refresh = async () => {
    try {
      const res = await authApi.get('/auth/refresh', { withCredentials: true });
      localStorage.setItem('access_token', res.data.access_token);
      return res.data.access_token;
    } catch (e) {
      return null;
    }
  };
  return { refresh };
}
