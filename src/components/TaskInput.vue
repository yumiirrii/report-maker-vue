<script setup>
import { ref, computed } from 'vue';

const props = defineProps(['report']);

const doneTask = ref('');
let isDoneTaskSubmitted = ref(false);
const planningTask = ref('');

const doneTasks = computed(() => {
  return props.report.project.tasks.filter(task => task.isDone);
})

const planningTasks = computed(() => {
  return props.report.project.tasks.filter(task => !task.isDone);
})

const submitDoneTask = () => {
  isDoneTaskSubmitted.value = true;
  props.report.project.tasks.push({
    task: doneTask.value,
    isDone: true
  });
  doneTask.value = '';
  console.log(props.report);
}

const submitPlanningTask = () => {
  isDoneTaskSubmitted.value = true;
  props.report.project.tasks.push({
    task: planningTask.value,
    isDone: false
  });
  planningTask.value = '';
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
        <li v-for="(doneTask, index) in doneTasks" :key="index">
          {{ doneTask.task }}
        </li>
      </ul>
    </div>
  </div>
  <div v-if="isDoneTaskSubmitted">
    <h2>TASKS PLANNED TO DO NEXT WEEK</h2>
    <div>
      <input type="text" v-model="planningTask" />
      <button @click="submitPlanningTask">enter</button>
    </div>
    <div>
      <ul>
        <li v-for="(planningTask, index) in planningTasks" :key="index">
          {{ planningTask.task }}
        </li>
      </ul>
    </div>
  </div>
</template>