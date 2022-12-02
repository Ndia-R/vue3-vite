<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';

type UserDTO = {
  id: number;
  username: string;
  password: string;
  refresh_token: string;
  refresh_token_iat: number;
};

type TestResultDTO = {
  id: number;
  userId: number;
  testName: string;
  score: number;
};

const users = ref<UserDTO[]>([]);
const testResults = ref<TestResultDTO[]>([]);

onMounted(async () => {
  users.value = await fetchUsers();
});

const handleClickUser = async () => {
  users.value = await fetchUsers();
};

const handleClickTest = async () => {
  testResults.value = await fetchTestResults();
};

const fetchUsers = async (): Promise<UserDTO[]> => {
  const url = '/api/user/users';
  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
    return res.data;
  } catch (err: any) {
    console.log(err);
    throw new Error(err);
  }
};

const fetchTestResults = async (): Promise<TestResultDTO[]> => {
  const url = '/api/test-result/test-results';
  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
    return res.data;
  } catch (err: any) {
    switch (err.response.data.errors.message.name) {
      case 'TokenExpiredError':
        console.log('JWTの有効期限が切れています');
        break;
    }
    throw new Error(err);
  }
};
</script>

<template>
  <h1>Home</h1>
  <button @click="handleClickUser">ユーザー読み込み</button>
  <button @click="handleClickTest">テスト情報読み込み</button>

  <template v-if="users">
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>username</th>
          <th>password</th>
          <th>refresh_token</th>
          <th>refresh_token_iat</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="item in users" :key="item.id">
          <tr>
            <td>{{ item.id }}</td>
            <td>{{ item.username }}</td>
            <td>{{ item.password }}</td>
            <td>{{ item.refresh_token }}</td>
            <td>{{ item.refresh_token_iat }}</td>
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
