import { defineStore } from 'pinia';

export const useGlobalStore = defineStore('global', {
  state: () => ({
    access_token: '',
    refresh_token: '',
  }),
});
