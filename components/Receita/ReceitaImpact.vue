<template>
  <div class="charts-container">
    <div class="chart">
      <span>Taxa de impacto pontual</span>
      <Chart
        type="doughnut"
        :data="chartData1"
        :options="chartOptions"
        class="xl:w-80 xl:h-64 w-48 h-56"
      />
    </div>
    <Divider layout="vertical" />
    <div class="chart">
      <span>Taxa de impacto nas automações</span>
      <Chart
        type="doughnut"
        :data="chartData2"
        :options="chartOptions"
        class="xl:w-80 xl:h-64 w-48 h-56"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartData1: {
        labels: ['Compra', 'Visualização'],
        datasets: [
          {
            label: 'Dataset 1',
            backgroundColor: ['#4CAF50', '#8E44AD'],
            data: [40, 30],
          },
        ],
      },
      chartData2: {
        labels: ['Compra', 'Visualização'],
        datasets: [
          {
            label: 'Dataset 2',
            backgroundColor: ['#81C784', '#9B59B6'],
            data: [100, 25],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        cutout: '60%',
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            onClick: false,
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                const dataset = tooltipItem.dataset;
                const total = dataset.data.reduce(
                  (acc, value) => acc + value,
                  0
                );
                const currentValue = dataset.data[tooltipItem.dataIndex];
                const percentage = ((currentValue / total) * 100).toFixed(2); // Calcula a porcentagem
                return `${currentValue} (${percentage}%)`; // Exibe o valor e a porcentagem
              },
            },
          },
        },
      },
    };
  },
};
</script>

<style scoped>
.charts-container {
  display: flex;
  justify-content: center;
  gap: 30px;
  padding: 20px;
}
.chart {
  text-align: center;
}
</style>
