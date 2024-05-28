<script setup>
import { useReportStore } from '@/stores/reportStore';

const reportStore = useReportStore();
</script>

<template>
  <div>
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
    <div>
      <ul>
        <li v-for="(doneTaskMap, index) in reportStore.report.doneTaskMapList" :key="index">
          {{ doneTaskMap }}
        </li>
      </ul>
    </div>
  </div>
  <div>
    <h2>TASKS PLANNED TO DO NEXT WEEK</h2>
    <div>
      <ul>
        <li v-for="(planningTaskMap, index) in reportStore.report.planningTaskMapList" :key="index">
          {{ planningTaskMap }}
        </li>
      </ul>
    </div>
  </div>
  <div>
    <button @click="submitReport">Submit Report</button>
  </div>
</template>