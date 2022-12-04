import { useRefreshToken } from '@/composables/useRefreshToken';
const AutoLogin = {
  install: async () => {
    const { refresh } = useRefreshToken();
    const access_token = await refresh();
    console.log(access_token ? 'AutoLogin!!' : 'Not AutoLogin');
  },
};
export default AutoLogin;
