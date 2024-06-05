<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const items = ref([]);
const checkedItems = ref(new Set());

onMounted( async () => {
  try {
    const res = await axios.get('http://localhost:8080/');
    items.value = res.data;
  } catch (error) {
    console.log(error);
  }
});

const toggleItem = (id) => {
  if (checkedItems.value.has(id)) {
    checkedItems.value.delete(id);
  } else {
    checkedItems.value.add(id);
  }
  console.log(checkedItems.value);
}

const deleteItems = async () => {
  try {
    const res = await axios.delete('http://localhost:8080/delete', {
      data: Array.from(checkedItems.value)
    })
    items.value = items.value.filter(item => !checkedItems.value.has(item.id));
    checkedItems.value.clear();
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <div>
    <ul>
      <li v-for="(item, index) in items" :key="index">
        <router-link :to="{ path: `/search/${item.id}` }">{{ item.week }}</router-link>
        <input type="checkbox" @change="toggleItem(item.id)" :checked="checkedItems.has(item.id)" />
      </li>
    </ul>
    <button @click="deleteItems">DELETE</button>
  </div>
</template>