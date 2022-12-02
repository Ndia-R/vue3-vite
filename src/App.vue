<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <div class="wrapper">
    <nav>
      <RouterLink class="link" to="/home">Home</RouterLink>
      <RouterLink class="link" to="/user-register">ユーザー登録</RouterLink>
      <RouterLink class="link" to="/login">ログイン</RouterLink>
    </nav>
  </div>

  <RouterView />
</template>

<style scoped lang="scss">
.link {
  margin: 8px;
}
</style>
