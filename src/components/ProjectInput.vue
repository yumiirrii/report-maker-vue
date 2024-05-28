<script setup>
import { ref } from 'vue';
import PlanningTaskInput from './PlanningTaskInput.vue';
import { useReportStore } from '@/stores/reportStore';

const reportStore = useReportStore();

const project = ref('');
const isProjectSubmitted = ref(false);
const errorMsg = ref('');

const submitProject = () => {
  if (project.value) {
    reportStore.report.projectList.push(project.value);
    isProjectSubmitted.value = true;
  } else {
    errorMsg.value = 'project input is required.'
  }
}

const reset = () => {
  project.value = '';
  isProjectSubmitted.value = false;
}
</script>

<template>
  <h2>PROJECT</h2>
  <div v-if="!isProjectSubmitted">
    <input type="text" v-model="project" />
    <button @click="submitProject">enter</button>
    <br />
    <span>{{ errorMsg }}</span>
  </div>
  <div v-else>
    <p>{{ project }}</p>
    <PlanningTaskInput :project="project" @reset="reset"/>
  </div>
</template>