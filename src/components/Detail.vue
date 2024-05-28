<script setup>
import axios from 'axios';
import { reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const report = reactive({
  week: '',
  projectList: [],
  doneTaskMapList: [],
  planningTaskMapList: [],
  summary: ''
});

onMounted( async () => {
  try {
    const res = await axios.get(`http://localhost:8080/detail/${route.params.reportId}`);
    Object.assign(report, res.data);
  } catch (error) {
    console.log(error);
  }
})
</script>

<template>
  <p>{{ report.summary }}</p>
</template>