<script setup>
import { ref } from 'vue';
import TaskInput from './TaskInput.vue';

const props = defineProps(['report']);
let isProjectSubmitted = ref(false);

const submitProject = () => {
  isProjectSubmitted.value = true;
}
</script>

<template>
  <h2>PROJECT</h2>
  <div v-if="!isProjectSubmitted">
    <input type="text" v-model="report.project.name" />
    <button @click="submitProject">enter</button>
  </div>
  <div v-else>
    <p>{{ report.project.name }}</p>
    <TaskInput :report="report"/>
  </div>
</template>