<script setup>
import axios from 'axios';
import { reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const router = useRoute();
const report = reactive({
  week: '',
  projectList: [],
  doneTaskMapList: [],
  planningTaskMapList: [],
  summary: ''
});

onMounted( async () => {
  try {
    const res = await axios.get(`http://localhost:8080/detail/${router.params.reportId}`);
    Object.assign(report, res.data);
  } catch (error) {
    console.log(error);
  }
})
</script>

<template>
  <div>
    <h2>WEEK</h2>
    <p>{{ report.week }}</p>
  </div>
  <div>
    <h2>PROJECTS</h2>
    <div>
      <ul>
        <li v-for="(project, index) in report.projectList" :key="index">
          {{ project }}
        </li>
      </ul>
    </div>
  </div>
  <div>
    <h2>TASKS DONE THIS WEEK</h2>
    <div v-for="(doneTaskMap, index) in report.doneTaskMapList" :key="index">
      <ul>
        <li v-for="(doneTasks, key) in doneTaskMap" :key="key">
          {{ key }}
          <ul>
            <li v-for="doneTask in doneTasks" :key="doneTask">
              {{ doneTask }}
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
  <div>
    <h2>TASKS PLANNED TO DO NEXT WEEK</h2>
    <div v-for="(planningTaskMap, index) in report.planningTaskMapList" :key="index">
      <ul>
        <li v-for="(planningTasks, key) in planningTaskMap" :key="key">
          {{ key }}
          <ul>
            <li v-for="planningTask in planningTasks" :key="planningTask">
              {{ planningTask }}
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
  <div>
    <h2>SUMMARY</h2>
    <p>{{ report.summary }}</p>
  </div>
  <div>
    <button @click="$router.push({ name: 'Search' })">BACK</button>
  </div>
</template>