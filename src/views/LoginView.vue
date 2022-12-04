<script setup lang="ts">
import { ref } from 'vue';
import router from '@/router';
import { useAuthAxios } from '@/composables/useAuthAxios';

const authAxios = useAuthAxios();

const username = ref('');
const password = ref('');

const message = ref('');

const handleClickLogin = async () => {
  const body: { username: String; password: String } = {
    username: username.value,
    password: password.value,
  };
  try {
    const res = await authAxios.post('/auth/login', body, { withCredentials: true });
    console.log(res.data);
    localStorage.setItem('access_token', res.data.access_token);
    router.push('/home');
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
    <h1>ログイン</h1>
    <div class="input-form">
      <input type="text" v-model="username" placeholder="username" />
      <input type="password" v-model="password" placeholder="password" />
      <button @click="handleClickLogin">ログイン</button>
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
