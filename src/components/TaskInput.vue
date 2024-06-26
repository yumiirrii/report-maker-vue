<script setup>
import { reactive, ref } from 'vue';
import { useReportStore } from '@/stores/reportStore';
import { useRouter } from 'vue-router';
import Modal from '@/components/Modal.vue';

const reportStore = useReportStore();
const router = useRouter();

const props = defineProps(['project', 'lastTaskList']);
const emit = defineEmits(['updateLastTaskList', 'reset']);

const doneTask = ref('');
const doneTaskList = ref(new Set());
const selectedLastTaskList = ref(new Set());
const isDoneTaskAdded = ref(false);
const isDoneTaskDupe = ref(false);

const addDoneTask = () => {
  console.log(selectedLastTaskList);
  if (doneTask.value) {
    if(doneTaskList.value.has(doneTask.value)||props.lastTaskList.includes(doneTask.value)) {
      isDoneTaskDupe.value = true;
    } else {
      doneTaskList.value.add(doneTask.value);
      isDoneTaskDupe.value = false;
      isDoneTaskAdded.value = true;
    }
    doneTask.value = '';
  } else if(selectedLastTaskList.value.size > 0) {
    selectedLastTaskList.value.forEach(selectedLastTask => {
      doneTaskList.value.add(selectedLastTask);
    });
    emit('updateLastTaskList', Array.from(selectedLastTaskList.value));
    selectedLastTaskList.value.clear();
    isDoneTaskDupe.value = false;
    isDoneTaskAdded.value = true;
  } else {
    return;
  }
}

const toggleSelectedLastTask = (task) => {
  if (selectedLastTaskList.value.has(task)) {
    selectedLastTaskList.value.delete(task);
  } else {
    selectedLastTaskList.value.add(task);
  }
}

const planningTask = ref('');
const planningTaskList = ref(new Set());
const isPlanningTaskAdded = ref(false);
const isPlanningTaskDupe = ref(false);

const addPlanningTask = () => {
  if (planningTask.value) {
    isPlanningTaskDupe.value = planningTaskList.value.has(planningTask.value);
    planningTaskList.value.add(planningTask.value);
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
  const planningTaskMap = new Map().set(props.project, [...planningTaskList.value]);
  reportStore.report.doneTaskMapList.push(doneTaskMap);
  reportStore.report.planningTaskMapList.push(planningTaskMap);
  console.log(reportStore.report);
}

const handleNoClick = () => {
  if (reportStore.report.summary) {
    router.push({ name: 'Confirm'});
  } else {
    router.push({ name: 'Summary' });
  }
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
      <span class="warning" v-if="isDoneTaskDupe">task is duplicated.</span>
      <div>
        <ul>
          <li v-for="(doneTask, index) in doneTaskList" :key="index">
            {{ doneTask }}
          </li>
        </ul>
      </div>
      <div id="options" v-if="props.lastTaskList.length > 0">
        <p>OPTIONS</p>
        <ul class="checkbox-ul">
          <li v-for="(lastTask, index) in props.lastTaskList" :key="index">
            <input
              type="checkbox"
              :value="lastTask"
              :checked="selectedLastTaskList.has(lastTask)"
              @change="toggleSelectedLastTask(lastTask)"
            />
            {{ lastTask }}
          </li>
        </ul>
        <button @click="addDoneTask">DONE</button>
      </div>
    </div>
    <div v-if="isDoneTaskAdded">
      <h2>TASKS PLANNED TO DO NEXT WEEK</h2>
      <div>
        <input type="text" v-model="planningTask" />
        <button @click="addPlanningTask">ENTER</button>
      </div>
      <span class="warning" v-if="isPlanningTaskDupe">task is duplicated.</span>
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
    <div v-if="isRegisterBtnClicked" class="modal-content">
      <Modal>
        <template #content>
          <p>Do you have any other project working on?</p>
          <button @click="handleNoClick">NO</button>
          <button @click="handleYesClick">YES</button>
        </template>
      </Modal>
    </div>
  </div>
</template>

<style scoped>
#options {
    margin: 10px;
    padding: 10px 30px;
    background: #eee3bdff;
    width: 60%;
}

#options p {
    margin: 10px;
    font-weight: bold;
    font-size: 18px;
}

#options button {
    margin: 10px;
}

.no-task {
    margin-top: 5px;
    margin-bottom: 15px;
}

.modal-content p {
  padding: 10px;
}

.modal-content button {
  color: #e7d491ff;
  background: #222222;
  margin-right: 5px;
}

.modal-content button:hover {
  color: #222222;
  background: #e7d491ff;
  border-color: #222222;
}
</style>