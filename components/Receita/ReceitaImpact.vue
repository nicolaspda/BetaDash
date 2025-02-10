<template>
  <div class="charts-container">
    <div class="chart">
      <span> Taxa de impacto pontual </span>
      <span
        v-tooltip="
          'A influência do e-mail marketing nas vendas impactadas por disparos pontuais.'
        "
        class="pi pi-question-circle text-primary-500"
      ></span>
      <Chart
        type="doughnut"
        :data="chartData1"
        :options="chartOptions"
        class="mt-2 xl:w-80 xl:h-64 w-48 h-56"
      />
    </div>
    <Divider layout="vertical" />
    <div class="chart">
      <span> Taxa de impacto nas automações </span>
      <span
        v-tooltip="
          'A influência do e-mail marketing nas vendas impactadas por fluxos de automação.'
        "
        class="pi pi-question-circle text-primary-500"
      ></span>
      <Chart
        type="doughnut"
        :data="chartData2"
        :options="chartOptions"
        class="mt-2 xl:w-80 xl:h-64 w-48 h-56"
      />
    </div>
  </div>
</template>

<script>
import { Chart } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';

Chart.register(annotationPlugin);

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
          annotation: {
            annotations: {
              dLabel: {
                type: 'doughnutLabel',
                content: ({ chart }) => [chart.data.datasets[0].data[0] + '%'],
                font: [{ size: 30 }],
                color: '#334155',
              },
            },
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
