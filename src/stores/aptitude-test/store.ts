import { defineStore } from 'pinia';
import { ref } from 'vue';
import { axios, emeraldApi } from '@/api/axios';
import type { AptitudeTestResult, CreateAptitudeTestDto } from './types';

export const useAptitudeTestStore = defineStore('aptitudeTest', () => {
  const aptitudeTestResults = ref<AptitudeTestResult[]>([]);

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
      aptitudeTestResults.value = await emeraldApi.get('/aptitude-test/results');
      return aptitudeTestResults.value;
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
