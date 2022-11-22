<script setup lang="ts">
import router from '@/router';
import axios from 'axios';
import { ref } from 'vue';

const username = ref('');
const password = ref('');

const errorMessage = ref('');

const handleClickSignUp = async () => {
  const body: { username: String; password: String } = {
    username: username.value,
    password: password.value,
  };
  try {
    const res = await axios.post('/api/auth/sign-up', body);
    localStorage.setItem('access_token', res.data.access_token);
    console.log(res.data);
    router.push('/home');
  } catch (err: any) {
    console.log(err.response.data);
    errorMessage.value = err.response.data.message;
    setTimeout(() => {
      errorMessage.value = '';
    }, 1000);
  }
};
</script>

<template>
  <div>
    <h1>Sign up</h1>
    <div class="input-form">
      <input type="text" v-model="username" placeholder="username" />
      <input type="password" v-model="password" placeholder="password" />
      <button @click="handleClickSignUp">SIGN UP</button>
      <div>{{ errorMessage }}</div>
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
