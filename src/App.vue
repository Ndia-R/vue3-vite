<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <div class="wrapper">
    <nav>
      <RouterLink class="link" to="/home">Home</RouterLink>
      <RouterLink class="link" to="/sign-up">SIGN UP</RouterLink>
      <RouterLink class="link" to="/sign-in">SIGN IN</RouterLink>
    </nav>
  </div>

  <RouterView />
</template>

<style scoped lang="scss">
.link {
  margin: 8px;
}
</style>
