<script setup>
import { ref, reactive } from 'vue';
import ProjectInput from './ProjectInput.vue';

const report = reactive({
  week: '',
  projectList: [],
  doneTaskMapList: [],
  planningTaskMapList: [],
  summary: ''
})
let isWeekSubmitted = ref(false);

const submitWeek = () => {
  isWeekSubmitted.value = true;
  report.week = weekToDateString(report.week); 
  console.log(report.week);
}

const weekToDateString = (weekValue) => {
  const [year, week] = weekValue.split('-W');
  const date = new Date(year, 0, 1 + (week - 1) * 7); // Set date to the start of the week
  const yearStr = date.getFullYear();
  const monthStr = String(date.getMonth() + 1).padStart(2, '0');
  const dayStr = String(date.getDate()).padStart(2, '0');
  return `${yearStr}-${monthStr}-${dayStr}`;
}
</script>

<template>
  <h2>WEEK</h2>
  <div v-if="!isWeekSubmitted">
    <input type="week" v-model="report.week" />
    <button @click="submitWeek">enter</button>
  </div>
  <div v-else>
    <p>{{ weekToDateString(report.week) }}</p>
    <ProjectInput :report="report"/>
  </div>
</template>