<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';

const users = ref();

onMounted(async () => {
  try {
    const res = await axios.get('/api/user/users', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
    users.value = res.data;
  } catch (err: any) {
    console.log(err.response);
  }
});
</script>

<template>
  <h1>Home</h1>
  <table>
    <thead>
      <tr>
        <th>id</th>
        <th>username</th>
        <th>password</th>
        <th>email</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="item in users" :key="item.id">
        <tr>
          <td>{{ item.id }}</td>
          <td>{{ item.username }}</td>
          <td>{{ item.password }}</td>
          <td>{{ item.email }}</td>
        </tr>
      </template>
    </tbody>
  </table>
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
