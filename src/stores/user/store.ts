import { defineStore } from 'pinia';
import { ref } from 'vue';
import { axios, authApi } from '@/api/axios';
import type { User, LoginDto } from './types';

export const useUserStore = defineStore('user', () => {
  const user = ref<User | undefined>(undefined);

  const registerUser = async (loginDto: LoginDto) => {
    try {
      await authApi.post('/auth/register', loginDto);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response);
      }
    }
  };

  const login = async (loginDto: LoginDto) => {
    try {
      const res = await authApi.post('/auth/login', loginDto, {
        withCredentials: true,
      });
      user.value = res.data;
      return true;
    } catch (err) {
      return false;
    }
  };

  const logout = async () => {
    await authApi.get('/auth/logout', { withCredentials: true });
    localStorage.removeItem('access_token');
    user.value = undefined;
  };

  return {
    registerUser,
    login,
    logout,
  };

  // user: (): User => ({
  //   loginUser: null,
  // }),
  // getters: {
  //   isTraineeUser: (s): boolean => s.loginUser?.groupType === '新人',
  //   isCareerUpSupportUser: (s): boolean =>
  //     s.loginUser?.groupType === 'キャリアアップサポート',
  //   // ログイン済みかどうか
  //   isLogin: (s): boolean => !!s.loginUser,
  //   // ユーザー権限レベルの取得
  //   userAuthorityLevel(s): number {
  //     const authorityArray = [
  //       { level: 4, name: 'システム管理者' },
  //       { level: 3, name: '管理者' },
  //       { level: 2, name: '標準' },
  //       { level: 1, name: '新人' },
  //       { level: 0, name: '内定者' },
  //     ];
  //     let level = 0;
  //     for (const item of authorityArray) {
  //       if (item.name === s.loginUser?.authority) {
  //         level = item.level;
  //         break;
  //       }
  //     }
  //     return level;
  //   },
  // },
  // actions: {
  //   /**
  //    * ------------------------------------------------------------
  //    * ログイン認証し、ユーザー情報をセットする
  //    * @param payload
  //    * @prop account アカウント
  //    * @prop password パスワード
  //    * @return ログイン成否（成功：true、失敗：false）
  //    * ------------------------------------------------------------
  //    */
  //   async login(payload: { account: string; password: string }): Promise<boolean> {
  //     const { account, password } = payload;
  //     // ログイン認証（成功：ユーザー情報、失敗：null）
  //     this.loginUser = await loginWithAccountAndPassword(account, password);
  //     return !!this.loginUser;
  //   },
  //   /**
  //    * ------------------------------------------------------------
  //    * ログアウトし、ユーザー情報を初期化
  //    * ------------------------------------------------------------
  //    */
  //   async logout(): Promise<boolean> {
  //     const isSuccess = await logoutFromApp();
  //     if (isSuccess) {
  //       this.loginUser = null;
  //       return true;
  //     }
  //     return false;
  //   },
  //   /**
  //    * ------------------------------------------------------------
  //    * ログインチェック
  //    * @return ログイン済み：true、未ログイン：false
  //    * ------------------------------------------------------------
  //    */
  //   async checkAuth(): Promise<boolean> {
  //     // ログインチェック（ログイン済み：ユーザー情報、未ログイン：null）
  //     this.loginUser = await getCurrentUser();
  //     return !!this.loginUser;
  //   },
  // },
});
