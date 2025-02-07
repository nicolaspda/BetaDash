<template>
  <div class="charts-container">
    <div class="chart">
      <span>
        Taxa de impacto pontual:
        <span class="text-black text-lg">
          {{ chartData1.datasets[0].data[0] }} %</span
        >
      </span>
      <Chart
        type="doughnut"
        :data="chartData1"
        :options="chartOptions"
        class="xl:w-80 xl:h-64 w-48 h-56"
      />
    </div>
    <Divider layout="vertical" />
    <div class="chart">
      <span>
        Taxa de impacto nas automações:
        <span class="text-black text-lg">
          {{ chartData2.datasets[0].data[0] }} %
        </span>
      </span>
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
            data: [1, 1],
          },
        ],
      },
      chartData2: {
        labels: ['Compra', 'Visualização'],
        datasets: [
          {
            label: 'Dataset 2',
            backgroundColor: ['#81C784', '#9B59B6'],
            data: [1, 1],
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
              label: function () {
                return ''; // Exibe o valor e a porcentagem
              },
            },
          },
        },
      },
    };
  },
  methods: {
    loadImpact() {
      //Recebe da API
      let TotalvisuPontual = 5000;
      let TotalvisuAuto = 10000;
      let Totalcompra = 1000;

      // Carregamento de taxa de impacto pontual
      let percentagePontual = (Totalcompra / TotalvisuPontual) * 100;
      let restantePontual = 100 - percentagePontual;
      this.chartData1.datasets[0].data = [percentagePontual, restantePontual];

      // Carregamento de taxa de impacto das automações
      let percentageAuto = (Totalcompra / TotalvisuAuto) * 100;
      let restanteAuto = 100 - percentageAuto;
      this.chartData2.datasets[0].data = [percentageAuto, restanteAuto];
    },
  },
  mounted() {
    this.loadImpact();
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
