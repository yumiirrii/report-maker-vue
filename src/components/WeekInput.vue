<script setup>
import { ref, reactive } from 'vue';
import ProjectInput from './ProjectInput.vue';

const report = reactive({
  week: null,
  // project: {
  //   name: '',
  //   tasks: []
  // },
  projects: [],
  summary: ''
})
let isWeekSubmitted = ref(false);

const submitWeek = () => {
  isWeekSubmitted.value = true;
}
</script>

<template>
  <h2>WEEK</h2>
  <div v-if="!isWeekSubmitted">
    <input type="week" v-model="report.week" />
    <button @click="submitWeek">enter</button>
  </div>
  <div v-else>
    <p>{{ report.week }}</p>
    <ProjectInput :report="report"/>
  </div>
</template>