<template>
  <div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<!-- <script setup>
import { onMounted, ref } from 'vue';
import { Chart, registerables } from 'chart.js';

// Register all the necessary components of Chart.js
Chart.register(...registerables);

// This function will run when the component is mounted
export function useBarChart(source) {
  const canvas = ref(null);
  const ctx = canvas.value.getContext('2d');
  createBarChart(ctx, source);
  
  // onMounted(() => {
  // })
  return canvas;
}


function createBarChart (ctx, source) {
    const labels = source.map(item => item.month);
    const data = source.map(item => item.numberOfReports);
  
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        // labels: ['red', 'blue', 'yellow'],
        labels: labels,
        datasets: [
          {
            label: '# of Reports',
            // data: [12, 19, 25],
            data: data
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
</script>-->

<!-- <style scoped>
canvas {
  max-width: 600px;
  margin: 20px auto;
}
</style> -->