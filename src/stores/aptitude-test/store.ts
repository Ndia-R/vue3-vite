import { defineStore } from 'pinia';
import { ref } from 'vue';
import { axios, emeraldApi } from '@/api/axios';
import type { AptitudeTest, CreateAptitudeTestDto } from './types';

export const useAptitudeTestStore = defineStore('aptitudeTest', () => {
  const aptitudeTests = ref<AptitudeTest[]>([]);

  const create = async (aptitudeTest: CreateAptitudeTestDto) => {
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
      aptitudeTests.value = await emeraldApi.get('/aptitude-test/results');
      return aptitudeTests.value;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response);
      }
    }
  };

  const findOne = async (id: number) => {
    try {
      const result = await emeraldApi.get(`/aptitude-test/result/${id}`);
      return result;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response);
      }
    }
  };

  return {
    create,
    findAll,
    findOne,
  };
});
