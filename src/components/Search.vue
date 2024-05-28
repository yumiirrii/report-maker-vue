<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const items = ref([]);

onMounted( async () => {
  try {
    const res = await axios.get('http://localhost:8080/');
    items.value = res.data;
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <div>
    <ul>
      <li v-for="(item, index) in items" :key="index">
        <router-link :to="{ path: `/search/${item.id}` }">{{ item.week }}</router-link>
      </li>
    </ul>
  </div>
</template>