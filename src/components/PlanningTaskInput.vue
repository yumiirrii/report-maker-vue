<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import axios from 'axios';
import { useReportStore } from '@/stores/reportStore';
import { useRouter } from 'vue-router';

const reportStore = useReportStore();
const router = useRouter();

const props = defineProps(['project']);
const emit = defineEmits(['reset']);

const doneTask = ref('');
const doneTaskList = ref([]);
const isDoneTaskAdded = ref(false);

const addDoneTask = () => {
  if (doneTask.value) {
    doneTaskList.value.push(doneTask.value);
    isDoneTaskAdded.value = true;
    doneTask.value = '';
  } else {
    event.preventDefault();
  }
}

const planningTask = ref('');
const planningTaskList = ref([]);
const isPlanningTaskAdded = ref(false);

const addPlanningTask = () => {
  if (planningTask.value) {
    planningTaskList.value.push(planningTask.value);
    isPlanningTaskAdded.value = true;
    planningTask.value = '';
  } else {
    event.preventDefault();
  }
}

const isRegisterBtnClicked = ref(false);
const existOtherProject = ref(false);

const registerProjectAndTasks = () => {
  isRegisterBtnClicked.value = true;
  submitTasks();
}
  
const submitTasks = () => {
  const doneTaskMap = new Map().set(props.project, doneTaskList.value);
  const planningTaskMap = new Map().set(props.project, planningTaskList.value);
  reportStore.report.doneTaskMapList.push(doneTaskMap);
  reportStore.report.planningTaskMapList.push(planningTaskMap);
  console.log(reportStore.report);
}

const handleNoClick = () => {
  router.push({ name: 'Confirm' });
}

const handleYesClick = () => {
  existOtherProject.value = true;
  emit('reset');
}

// const registerProjectAndTasks = async () => {
//   props.report.doneTaskMapList.push(doneTaskMap);
//   props.report.planningTaskMapList.push(planningTaskMap);
//   console.log(props.report);
//   try {
//     const res = await axios.post('http://localhost:8080/confirm/submit', props.report);
//     responseMessage.value = res.data.message;
//   } catch (error) {
//     console.log(error);
//   }
// }
</script>

<template>
  <div v-if="!existOtherProject">
    <div>
      <h2>TASKS DONE THIS WEEK</h2>
      <div>
        <input type="text" v-model="doneTask" />
        <button @click="addDoneTask">enter</button>
      </div>
      <div>
        <ul>
          <li v-for="(doneTask, index) in doneTaskList" :key="index">
            {{ doneTask }}
          </li>
        </ul>
      </div>
    </div>
    <div v-if="isDoneTaskAdded">
      <h2>TASKS PLANNED TO DO NEXT WEEK</h2>
      <div>
        <input type="text" v-model="planningTask" />
        <button @click="addPlanningTask">enter</button>
      </div>
      <div>
        <ul>
          <li v-for="(planningTask, index) in planningTaskList" :key="index">
            {{ planningTask }}
          </li>
        </ul>
      </div>
    </div>
    <div v-if="isPlanningTaskAdded">
      <button @click="registerProjectAndTasks">Register Project & Tasks</button>
    </div>
    <div v-if="isRegisterBtnClicked">
      <p>Do you have any other project working on?</p>
      <button @click="handleNoClick">no</button>
      <button @click="handleYesClick">yes</button>
    </div>
  </div>
</template>