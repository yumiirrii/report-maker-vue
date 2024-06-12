<script setup>
import { ref } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  reports: {
    type: Array,
    required: true
  }
});

const isOpen = ref(false);

const toggle = () => {
  isOpen.value = !isOpen.value;
}
</script>

<template>
  <div class="accordion-item">
    <div class="accordion-header" @click="toggle">
      {{ title }}
    </div>
    <div class="accordion-body" v-if="isOpen">
      <ul>
        <li v-for="report in reports" :key="report.id">
          {{ report.week }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.accordion-item {
  border: 1px solid #ccc;
  margin-bottom: 10px;
}

.accordion-header {
  background: #f1f1f1;
  cursor: pointer;
  padding: 10px;
}

.accordion-body {
  padding: 10px;
}
</style>