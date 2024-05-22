<script setup>
import {ref} from 'vue';
import axios from 'axios';

const items = ref([]);
const fetchItems = async () => {
  try {
    const res = await axios.get('http://localhost:8080/');
    items.value = res.data;
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div>
      <button @click="fetchItems">Get Items</button>
    <ul>
      <li v-for="(item, index) in items" :key="index">{{ item }}</li>
    </ul>
  </div>
</template>