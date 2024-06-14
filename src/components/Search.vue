<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import AccordionItem from '@/components/AccordionItem.vue';

const items = ref([]);
const deleteItems = ref(new Set());

const reportMonthlyMap = ref(new Map());

onMounted(() => {
  getReports();
});

const getReports = async() => {
  try {
    const res = await axios.get('http://localhost:8080/search');
    reportMonthlyMap.value = res.data;
  } catch (error) {
    console.log(error);
  }
}

const toggleItem = (id) => {
  if (deleteItems.value.has(id)) {
    deleteItems.value.delete(id);
  } else {
    deleteItems.value.add(id);
  }
  console.log(deleteItems.value);
}

const deleteReports = async () => {
  try {
    const res = await axios.delete('http://localhost:8080/delete', {
      data: Array.from(deleteItems.value)
    })
    getReports();
    deleteItems.value.clear();
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <div v-for="(value, key) in reportMonthlyMap" :key="key">
    <AccordionItem>
      <template #title>
        {{ key }}
      </template>
      <template #content>
        <ul class="checkbox-ul">
          <li v-for="report in value" :key="report.id">
            <input type="checkbox" @change="toggleItem(report.id)" :checked="deleteItems.has(report.id)" />
            <router-link :to="{ path: `/search/${report.id}` }">{{ report.week }}</router-link>
          </li>
        </ul>
      </template>
    </AccordionItem>
  </div>
  <button @click="deleteReports">DELETE</button>
</template>