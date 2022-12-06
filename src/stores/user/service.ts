import axios from '@/api/axios';
import type { LoginDto } from './types';

export const refresh = async (loginDto: LoginDto) => {
  const res = await axios.post('/auth/login', loginDto, { withCredentials: true });
  return res.data;
};

/**
 * ------------------------------------------------------------
 * ログアウト
 * @return ログアウト成否（成功：true、失敗：false）
 * ------------------------------------------------------------
 */
export function logoutFromApp(): Promise<boolean> {
  return new Promise((resolve) => {
    const url = '/Garnet/login';
    axios
      .put(url)
      .then(() => resolve(true))
      .catch(() => resolve(false));
  });
}

/**
 * ------------------------------------------------------------
 * ログインユーザー情報を取得
 * @return ユーザー情報（ない場合はnull）
 * ------------------------------------------------------------
 */
export function getCurrentUser(): Promise<LoginDto | null> {
  return new Promise((resolve) => {
    const url = '/Garnet/login';
    axios
      .get(url)
      .then((res) => resolve(res.data))
      .catch(() => resolve(null));
  });
}
