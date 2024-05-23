<script setup>
import { reactive, ref } from 'vue';
import TaskInput from './TaskInput.vue';

const props = defineProps(['report']);

const project = ref('');
const isProjectSubmitted = ref(false);

const submitProject = () => {
  isProjectSubmitted.value = true;
  props.report.projectList.push(project.value);
}
</script>

<template>
  <h2>PROJECT</h2>
  <div v-if="!isProjectSubmitted">
    <input type="text" v-model="project" />
    <button @click="submitProject">enter</button>
  </div>
  <div v-else>
    <p>{{ project }}</p>
    <TaskInput :report="report" :project="project"/>
  </div>
</template>