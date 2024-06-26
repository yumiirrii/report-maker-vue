<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps(['isThisMonth']);

const isOpen = ref(false);

onMounted(() => {
  if (props.isThisMonth) {
    isOpen.value = true;
  }
})

const toggle = () => {
  isOpen.value = !isOpen.value;
}
</script>

<template>
  <div class="accordion-item">
    <div class="accordion-header" @click="toggle">
      <slot name="title"></slot>
    </div>
    <div class="accordion-body" v-if="isOpen">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style scoped>
.accordion-item {
  border: 1px solid #222222;
  margin-bottom: 10px;
  width: 400px;
}

.accordion-header {
  background: #222222;
  cursor: pointer;
  padding: 10px;
  color: #e7d491ff;
}

.accordion-body {
  padding: 10px;
}
</style>