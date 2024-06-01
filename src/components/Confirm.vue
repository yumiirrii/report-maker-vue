<script setup>
import { ref } from 'vue';
import { useReportStore } from '@/stores/reportStore';
import axios from 'axios';
import WeekInput from './WeekInput.vue';

const reportStore = useReportStore();
const responseMessage = ref('');

const serializeTaskMapList = (taskMapList) => {
  return taskMapList.map(taskMap => {
    const obj = {};
    taskMap.forEach((value, key) => {
      obj[key] = value;
    })
    return obj;
  })
}

const submitReport = async () => {
  console.log(reportStore.report);
  try {
    const serializedData = {
      ...reportStore.report,
      doneTaskMapList: serializeTaskMapList(reportStore.report.doneTaskMapList),
      planningTaskMapList: serializeTaskMapList(reportStore.report.planningTaskMapList)
    }
    const res = await axios.post('http://localhost:8080/confirm/submit', serializedData);
    responseMessage.value = res.data.message;
    if (responseMessage.value === 'week duplicated') {
      reportStore.isWeekModify = true;
      reportStore.isWeekSubmitted = false;
    }
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <div v-if="responseMessage === 'week duplicated'">
    <WeekInput />
  </div>
  <div v-else>
    <h2>WEEK</h2>
    <p>{{ reportStore.report.week }}</p>
  </div>
  <div>
    <h2>PROJECTS</h2>
    <div>
      <ul>
        <li v-for="(project, index) in reportStore.report.projectList" :key="index">
          {{ project }}
        </li>
      </ul>
    </div>
  </div>
  <div>
    <h2>TASKS DONE THIS WEEK</h2>
    <div v-for="(doneTaskMap, index) in reportStore.report.doneTaskMapList" :key="index">
      <ul>
        <li v-for="[key, value] in doneTaskMap" :key="key">
          {{ key }}
          <ul>
            <li v-for="(doneTask, subIndex) in value" :key="subIndex">
              {{ doneTask }}
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
  <div>
    <h2>TASKS PLANNED TO DO NEXT WEEK</h2>
    <div v-for="(planningTaskMap, index) in reportStore.report.planningTaskMapList" :key="index">
      <ul>
        <li v-for="[key, value] in planningTaskMap" :key="key">
          {{ key }}
          <ul>
            <li v-for="(planningTask, subIndex) in value" :key="subIndex">
              {{ planningTask }}
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
  <div>
    <h2>SUMMARY</h2>
    <div>
      {{ reportStore.report.summary }}
    </div>
  </div>
  <div class="register">
    <button @click="submitReport">SUBMIT REPORT</button>
  </div>
  {{ responseMessage }}
</template>