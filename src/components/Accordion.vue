<script setup>
import { ref } from 'vue';
import AccordionItem from './AccordionItem.vue';

const props = defineProps({
  reportMonthlyMap: {
    type: Map,
    required: true
  }
})
</script>

<template>
  <div class="accordion">
    <AccordionItem
      v-for="(value, key, index) in reportMonthlyMap"
      :key="index"
      :title="key"
      :reports="value"
    />
  </div>
</template>

<style scoped>
.accordion {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}
</style>