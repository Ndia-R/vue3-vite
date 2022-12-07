<script setup lang="ts">
import { ref } from 'vue';
import { emeraldApi } from '@/api/axios';
import { useAuthAxios } from '@/composables/useAuthAxios';

const authAxios = useAuthAxios(emeraldApi);

const username = ref('');
const password = ref('');

const message = ref('');

const handleClickUserRegister = async () => {
  const body: { username: String; password: String } = {
    username: username.value,
    password: password.value,
  };
  try {
    const res = await authAxios.post('/auth/user-register', body);
    console.log(res.data);
    message.value = '登録完了しました';
    setTimeout(() => {
      message.value = '';
    }, 1000);
  } catch (err: any) {
    console.log(err.response.data);
    message.value = err.response.data.error.message;
    setTimeout(() => {
      message.value = '';
    }, 1000);
  }
};
</script>

<template>
  <div>
    <h1>ユーザー登録</h1>
    <div class="input-form">
      <input type="text" v-model="username" placeholder="username" />
      <input type="password" v-model="password" placeholder="password" />
      <button @click="handleClickUserRegister">ユーザー登録</button>
      <div>{{ message }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.input-form {
  width: 300px;
  display: flex;
  flex-direction: column;
  padding: 12px;
  border-radius: 4px;
  border: solid 1px lightgray;

  input,
  button {
    padding: 8px;
    margin: 8px;
    border-radius: 4px;
    border: solid 1px lightgray;
  }

  button {
    cursor: pointer;
  }
}
</style>
