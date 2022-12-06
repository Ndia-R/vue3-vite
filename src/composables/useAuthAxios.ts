import { ref, onMounted, onUnmounted } from 'vue';
import type { AxiosRequestConfig } from 'axios';
import { authAxios } from '@/api/axios';
import router from '@/router';
import { useRefreshToken } from './useRefreshToken';

export function useAuthAxios() {
  const { refresh } = useRefreshToken();

  const requestIntercept = ref();
  const responseIntercept = ref();

  onMounted(() => {
    // リクエスト前（headerに認証情報を付与する）
    requestIntercept.value = authAxios.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        if (!config.headers!['Authorization']) {
          const accessToken = localStorage.getItem('access_token');
          config.headers!['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // レスポンスを受け取った直後（認証エラーだった場合、再度リクエストする）
    responseIntercept.value = authAxios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        // 401認証エラー(headerにaccess_tokenがない、もしくはaccess_tokenが無効)
        if (error?.response?.status === 401 && !prevRequest.sent) {
          prevRequest.sent = true;

          // 新しくaccess_tokenを発行する
          const newAccessToken = await refresh();
          if (newAccessToken) {
            // トークンをセットし、再度リクエストする
            prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return authAxios(prevRequest);
          } else {
            router.push('/login');
          }
        }
        return Promise.reject(error);
      }
    );
  });

  onUnmounted(() => {
    // 離脱するときにejectする
    authAxios.interceptors.request.eject(requestIntercept.value);
    authAxios.interceptors.response.eject(responseIntercept.value);
  });

  return authAxios;
}
