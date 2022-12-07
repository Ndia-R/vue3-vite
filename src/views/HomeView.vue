<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { emeraldApi } from '@/api/axios';
import { useAuthAxios } from '@/composables/useAuthAxios';
import { useUserStore } from '@/stores/user';

const authAxios = useAuthAxios(emeraldApi);
const { logout } = useUserStore();

type User = {
  user_id: string;
  username: string;
  password: string;
  refresh_token: string;
};

type TestResult = {
  id: number;
  userId: number;
  testName: string;
  score: number;
};

type TestResultDTO = {
  testName: string;
  score: number;
};

const users = ref<User[]>([]);
const testResults = ref<TestResult[]>([]);

onMounted(async () => {
  users.value = await fetchUsers();
});

const handleClickUser = async () => {
  users.value = await fetchUsers();
};

const handleClickTest = async () => {
  testResults.value = await fetchTestResults();
};

const handleClickRegister = async () => {
  await registerTestResult();
};

const handleClickLogout = async () => {
  await logout();
};

const fetchUsers = async (): Promise<User[]> => {
  const url = '/user/users';
  try {
    const res = await authAxios.get(url);
    return res.data;
  } catch (err: any) {
    throw new Error(err);
  }
};

const fetchTestResults = async (): Promise<TestResult[]> => {
  const url = '/test-result/test-results';
  try {
    const res = await authAxios.get(url);
    return res.data;
  } catch (err: any) {
    throw new Error(err);
  }
};

const registerTestResult = async (): Promise<TestResult> => {
  const url = '/test-result/test-result';
  const testResultDto: TestResultDTO = {
    score: 90,
    testName: 'TypeScript',
  };
  try {
    const res = await authAxios.post(url, testResultDto);
    return res.data;
  } catch (err: any) {
    throw new Error(err);
  }
};
</script>

<template>
  <h1>Home</h1>
  <button @click="handleClickUser">ユーザー読み込み</button>
  <button @click="handleClickTest">テスト情報読み込み</button>
  <button @click="handleClickRegister">テスト情報追加</button>
  <button @click="handleClickLogout">ログアウト</button>

  <template v-if="users">
    <table>
      <thead>
        <tr>
          <th>user_id</th>
          <th>username</th>
          <th>password</th>
          <th>refresh_token</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="item in users" :key="item.user_id">
          <tr>
            <td>{{ item.user_id }}</td>
            <td>{{ item.username }}</td>
            <td>{{ item.password }}</td>
            <td>{{ item.refresh_token }}</td>
          </tr>
        </template>
      </tbody>
    </table>
  </template>

  <template v-if="testResults">
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>userId</th>
          <th>testName</th>
          <th>score</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="item in testResults" :key="item.id">
          <tr>
            <td>{{ item.id }}</td>
            <td>{{ item.userId }}</td>
            <td>{{ item.testName }}</td>
            <td>{{ item.score }}</td>
          </tr>
        </template>
      </tbody>
    </table>
  </template>
</template>

<style scoped lang="scss">
table {
  width: 100%;
  text-align: center;
  border-collapse: collapse;
  border-spacing: 0;
}
table th {
  padding: 10px;
  border-bottom: solid 4px #778ca3;
  color: #778ca3;
}

table td {
  padding: 10px;
  border-bottom: solid 1px #778ca3;
}
</style>
