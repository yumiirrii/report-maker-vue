<script setup>
import { ref } from 'vue';
import ProjectInput from './ProjectInput.vue';
import { useReportStore } from '@/stores/reportStore';

const reportStore = useReportStore();

const week = ref(null);
const isWeekSubmitted = ref(false);
const errorMsg = ref('');

const submitWeek = () => {
  if (week.value) {
    reportStore.report.week = weekToDateString(week.value);
    isWeekSubmitted.value = true;
  } else {
    errorMsg.value = 'week input is required.'
  }
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
    <input type="week" v-model="week" />
    <button @click="submitWeek">enter</button>
    <br />
    <span>{{ errorMsg }}</span>
  </div>
  <div v-else>
    <p>{{ reportStore.report.week }}</p>
    <ProjectInput />
  </div>
</template>