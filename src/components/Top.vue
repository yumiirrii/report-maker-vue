<script setup>
import { useReportStore } from '@/stores/reportStore';
import BarChart from '@/components/BarChart.vue';

const reportStore = useReportStore();

</script>

<template>
  <div id="top">
    <h1>WEEKLY REPORT</h1>
    <div class="register">
      <RouterLink :to="{ name: 'Input' }"><button>INPUT</button></RouterLink>
      <RouterLink :to="{ name: 'Search' }"><button>SEARCH</button></RouterLink>
    </div>
    <BarChart />
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
  font-weight: bold;
  margin: 30px 0;
}

button {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>