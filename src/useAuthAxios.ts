import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';
import { authAxios } from './axios';
import useRefreshToken from './useRefreshToken';

const useAuthAxios = () => {
  const refresh = useRefreshToken();

  // リクエスト前に実行。headerに認証情報を付与する
  const requestIntercept = authAxios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      if (!config.headers!['Authorization']) {
        const accessToken = localStorage.getItem('access_token');
        config.headers!['Authorization'] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // レスポンスを受け取った直後に実行。もし認証エラーだった場合、再度リクエストする。
  const responseIntercept = authAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const prevRequest = error?.config;
      // 403認証エラー(headerにaccess_tokenがない。もしくはaccess_tokenが無効)
      if (error?.response?.status === 403 && !prevRequest.sent) {
        prevRequest.sent = true;

        // 新しくaccess_tokenを発行する
        const newAccessToken = await refresh();
        prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        // 再度実行する
        return authAxios(prevRequest);
      }
      return Promise.reject(error);
    }
  );

  return () => {
    // 離脱するときにejectする
    authAxios.interceptors.request.eject(requestIntercept);
    authAxios.interceptors.response.eject(responseIntercept);
  };

  return authAxios;
};

export default useAuthAxios;
