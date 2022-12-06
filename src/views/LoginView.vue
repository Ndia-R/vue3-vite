<script setup lang="ts">
import { ref } from 'vue';
import router from '@/router';
import { useUserStore, type LoginDto } from '@/stores/user';

const userStore = useUserStore();

const username = ref('');
const password = ref('');

const message = ref('');

const handleClickLogin = async () => {
  const loginDto: LoginDto = {
    username: username.value,
    password: password.value,
  };
  const isLogin = await userStore.login(loginDto);
  if (isLogin) {
    router.push('/home');
  } else {
    message.value = 'ユーザー名またはパスワードが違います';
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
