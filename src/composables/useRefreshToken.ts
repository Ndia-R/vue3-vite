import axios from '@/api/axios';

export function useRefreshToken() {
  const refresh = async () => {
    const res = await axios.get('/auth/refresh', { withCredentials: true });
    if (res.data.access_token) {
      localStorage.setItem('access_token', res.data.access_token);
    }
    return res.data.access_token;
  };
  return { refresh };
}
