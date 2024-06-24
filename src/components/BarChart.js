import { onMounted, ref, watch } from 'vue';
import { Chart, registerables } from 'chart.js';

// Register all the necessary components of Chart.js
Chart.register(...registerables);

// This function will run when the component is mounted
export function useBarChart(source) {
  const canvas = ref(null);

  watch(source, (newSource) => {
    if (canvas.value) {
      const ctx = canvas.value.getContext('2d');
      createBarChart(ctx, source);
    }
  });

  return {
    canvas
  };
}

function createBarChart (ctx, source) {
    const labels = source.value.map(item => item.month);
    const data = source.value.map(item => item.numberOfReports);

    if (ctx.chart) {
      ctx.chart.destroy();
    }
  
    ctx.chart = new Chart(ctx, {
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