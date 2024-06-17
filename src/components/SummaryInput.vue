<script setup>
import { ref, computed } from 'vue';
import { useReportStore } from '@/stores/reportStore';
import { useRouter } from'vue-router';

const reportStore = useReportStore();
const router = useRouter();
const summary = ref('');
const maxCharLimit = ref(500);

const remainCharNum = computed(() => {
  return maxCharLimit.value - summary.value.length;
})

const confirmReport = () => {
  reportStore.report.summary = summary.value;
  router.push({ name: 'Confirm'});
}
</script>

<template>
  <h2>SUMMARY</h2>
  <textarea v-model="summary" rows="10" cols="80"></textarea>
  <span :style="{ color: remainCharNum < 0 ? 'red' : 'black' }">{{ remainCharNum }}</span>
  <div class="register">
    <button @click="confirmReport">CONFIRMATION</button>
  </div>
</template>