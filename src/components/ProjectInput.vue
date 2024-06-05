<script setup>
import { ref } from 'vue';
import TaskInput from './TaskInput.vue';
import { useReportStore } from '@/stores/reportStore';
import axios from 'axios';

const reportStore = useReportStore();

const project = ref('');
const lastTaskList = ref([]);
const isProjectSubmitted = ref(false);
const errorMsg = ref('');

const submitProject = () => {
  if (project.value) {
    isProjectSubmitted.value = reportStore.addProjectList(project);
    checkLastTask();
    if (isProjectSubmitted.value === false) {
      errorMsg.value = 'project is duplicated.';
      project.value = '';
    }
  } else {
    errorMsg.value = 'project input is required.';
  }
}

const checkLastTask = async () => {
  try {
    console.log(project.value);
    const res = await axios.post('http://localhost:8080/input/checktask', project.value, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(res.data)
    lastTaskList.value = res.data;
  } catch (error) {
    console.log(error);
  }
}

const updateLastTaskList = (selectedLastTaskList) => {
  lastTaskList.value = lastTaskList.value.filter(lastTask => !selectedLastTaskList.includes(lastTask));
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
    <button @click="submitProject">ENTER</button>
    <br />
    <span class="warning">{{ errorMsg }}</span>
  </div>
  <div v-else>
    <p>{{ project }}</p>
    <TaskInput
      :project="project"
      :lastTaskList="lastTaskList"
      @updateLastTaskList="updateLastTaskList"
      @reset="reset"
    />
  </div>
</template>