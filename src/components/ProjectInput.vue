<script setup>
import { reactive, ref } from 'vue';
import TaskInput from './TaskInput.vue';

const props = defineProps(['report']);

const name = ref('');
let isProjectSubmitted = ref(false);

const submitProject = () => {
  isProjectSubmitted.value = true;
  props.report.projects.push({
    name: name.value,
    tasks:[]
  })
}
</script>

<template>
  <h2>PROJECT</h2>
  <div v-if="!isProjectSubmitted">
    <input type="text" v-model="name" />
    <button @click="submitProject">enter</button>
  </div>
  <div v-else>
    <p>{{ name }}</p>
    <TaskInput :report="report"/>
  </div>
</template>