<script setup>
import { reactive, ref } from 'vue';

const props = defineProps(['report', 'project']);

const doneTaskMap = new Map();
const doneTask = ref('');
const doneTaskList = ref([]);
const isDoneTaskSubmitted = ref(false);

const planningTaskMap = new Map();
const planningTask = ref('');
const planningTaskList = ref([]);
const isPlanningTaskSubmitted = ref(false);

const submitDoneTask = () => {
  isDoneTaskSubmitted.value = true;
  doneTaskList.value.push(doneTask.value);
  doneTaskMap.set(props.project, doneTaskList.value);
  console.log(doneTaskMap);
  doneTask.value = '';
}

const submitPlanningTask = () => {
  isPlanningTaskSubmitted.value = true;
  planningTaskList.value.push(planningTask.value);
  planningTaskMap.set(props.project, planningTaskList.value);
  planningTask.value = '';
}

const registerProjectAndTasks = () => {
  props.report.doneTaskMapList.push(doneTaskMap);
  props.report.planningTaskMapList.push(planningTaskMap);
  console.log(props.report);
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
    <h2>TASKS DONE THIS WEEK</h2>
    <div>
      <input type="text" v-model="planningTask" />
      <button @click="submitPlanningTask">enter</button>
    </div>
    <div>
      <ul>
        <li v-for="(planningTask, index) in planningTaskList" :key="index">
          {{ planningTask }}
        </li>
      </ul>
    </div>
  </div>
  <div v-if="isPlanningTaskSubmitted">
    <button @click="registerProjectAndTasks">Register Project & Tasks</button>
  </div>
</template>