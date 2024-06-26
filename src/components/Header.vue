<script setup>
import { RouterLink } from 'vue-router';
import { useReportStore } from '@/stores/reportStore';

const reportStore = useReportStore();
</script>

<template>
  <div>
    <RouterLink :to="{ name: 'Top' }" @click="reportStore.reset()">TOP</RouterLink>
  </div>
</template>