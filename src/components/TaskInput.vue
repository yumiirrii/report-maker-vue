<script setup>
import { ref } from 'vue';
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
  const doneTaskMap = new Map().set(props.project, [...doneTaskList.value]);
  const planningTaskMap = new Map().set(props.project, planningTaskList.value);
  reportStore.report.doneTaskMapList.push(doneTaskMap);
  reportStore.report.planningTaskMapList.push(planningTaskMap);
  console.log(reportStore.report);
}

const handleNoClick = () => {
  router.push({ name: 'Summary' });
}

const handleYesClick = () => {
  existOtherProject.value = true;
  emit('reset');
}
</script>

<template>
  <div v-if="!existOtherProject">
    <div>
      <h2>TASKS DONE THIS WEEK</h2>
      <div>
        <input type="text" v-model="doneTask" />
        <button @click="addDoneTask">ENTER</button>
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
        <button @click="addPlanningTask">ENTER</button>
      </div>
      <div>
        <ul>
          <li v-for="(planningTask, index) in planningTaskList" :key="index">
            {{ planningTask }}
          </li>
        </ul>
      </div>
    </div>
    <div v-if="isPlanningTaskAdded" class="register">
      <button @click="registerProjectAndTasks">REGISTER PROJECT & TASKS</button>
    </div>
    <div v-if="isRegisterBtnClicked">
      <p>Do you have any other project working on?</p>
      <button @click="handleNoClick">NO</button>
      <button @click="handleYesClick">YES</button>
    </div>
  </div>
</template>