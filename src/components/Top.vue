<script setup>
import { useReportStore } from '@/stores/reportStore';

const reportStore = useReportStore();

</script>

<template>
    <div>
      <RouterLink :to="{ name: 'Input' }">Input</RouterLink>
    </div>
    <div>
      <RouterLink :to="{ name: 'Search' }">Search</RouterLink>
    </div>
</template>