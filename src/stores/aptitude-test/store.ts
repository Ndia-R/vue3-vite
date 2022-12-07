import { defineStore } from 'pinia';
import { ref } from 'vue';
import { axios, emeraldApi } from '@/api/axios';
import type { AptitudeTest, AptitudeTestDto } from './types';

export const useAptitudeTestStore = defineStore('aptitudeTest', () => {
  const aptitudeTests = ref<AptitudeTest[]>([]);

  const create = async (aptitudeTest: AptitudeTestDto) => {
    try {
      const result = await emeraldApi.post('/aptitude-test/register', aptitudeTest);
      return result;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response);
      }
    }
  };

  const findAll = async () => {
    try {
      aptitudeTestResults.value = await emeraldApi.post('/aptitude-test/results');
      return aptitudeTestResults.value;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response);
      }
    }
  };

  const findOne = async (id: number) => {
    try {
      const result = await emeraldApi.post(`/aptitude-test/result/${id}`);
      return result;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response);
      }
    }
  };

  return {
    register,
    findAll,
    findOne,
  };
});
