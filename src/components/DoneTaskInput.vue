<script setup>
import { ref } from 'vue';
import PlanningTaskInput from './PlanningTaskInput.vue';

const props = defineProps(['project']);

const doneTask = ref('');
const doneTaskList = ref([]);
const isDoneTaskSubmitted = ref(false);

const submitDoneTask = () => {
  if (doneTask.value) {
    doneTaskList.value.push(doneTask.value);
    isDoneTaskSubmitted.value = true;
    doneTask.value = '';
  } else {
    event.preventDefault();
  }
}
</script>

<template>
  <div>
    <h2>TASKS DONE THIS WEEK</h2>
    <div>
      <input type="text" v-model="doneTask" />
      <button @click="submitDoneTask">enter</button>
    </div>
    <div>
      <ul>
        <li v-for="(doneTask, index) in doneTaskList" :key="index">
          {{ doneTask }}
        </li>
      </ul>
    </div>
  </div>
  <div v-if="isDoneTaskSubmitted">
    <PlanningTaskInput :project="project" :doneTaskList="doneTaskList"/>
  </div>
</template>