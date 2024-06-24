<script setup>
import { useReportStore } from '@/stores/reportStore';
import BarChart from '@/components/BarChart.vue';

const reportStore = useReportStore();

</script>

<template>
  <div id="top">
    <h1>WEEKLY REPORT</h1>
    <div>
      <RouterLink :to="{ name: 'Input' }"><button>INPUT</button></RouterLink>
    </div>
    <div>
      <RouterLink :to="{ name: 'Search' }"><button>SEARCH</button></RouterLink>
    </div>
    <BarChart />
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
  font-weight: bold;
}

button {
    color: #e7d491ff;
    text-align: center;
    font-size: 18px;
    font-family: Avenir;
    font-weight: bold;
    background: #222222;
    background-clip: padding-box;
    border: 3px solid #222222;
    border-radius: 5px;
    width: 18%;
    display: block;
    padding: 10px 0px;
    margin: 10px auto;
    transition: 0.3s;
}

button:hover {
    color: #222222;
    background: #e7d491ff;
    border-color: #222222;
}
</style>