<script setup>
import { ref, onMounted, computed, reactive, nextTick } from 'vue';
import axios from 'axios';
import AccordionItem from '@/components/AccordionItem.vue';
import { useBarChart } from '@/components/BarChart.js';

const deleteItems = ref(new Set());
const reportMonthlyMap = ref(new Map());
const infoForBarChart = ref([])
const { canvas } = useBarChart(infoForBarChart);

onMounted(() => {
  getReports();
});

const getReports = async () => {
  try {
    const res = await axios.get('http://localhost:8080/search');
    reportMonthlyMap.value = res.data;
    connectBarChart();
  } catch (error) {
    console.log(error);
  }
}

const connectBarChart = () => {
  infoForBarChart.value = [];
  for (let [key,value] of Object.entries(reportMonthlyMap.value)) {
    infoForBarChart.value.push({
      month: key,
      numberOfReports: value.length,
    })
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

const thisMonth = computed(() => {
  const date = new Date();
  const yearStr = date.getFullYear();
  const monthStr = String(date.getMonth() + 1).padStart(2, '0');
  return `${yearStr}-${monthStr}`;
})

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
    <AccordionItem :isThisMonth="key === thisMonth">
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
  <div>
    <canvas ref="canvas"></canvas>
  </div>
</template>