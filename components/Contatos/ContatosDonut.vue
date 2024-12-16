<template>
  <div class="flex gap-4 justify-center">
    <div
      v-for="(chart, index) in charts"
      :key="index"
      class="flex justify-center w-80 h-64 mb-5"
    >
      <Chart type="doughnut" :data="chart.data" :options="chart.options" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      charts: [],
    };
  },
  mounted() {
    this.charts = this.generateCharts();
    this.updateChartData();
  },
  methods: {
    generateCharts() {
      const documentStyle = getComputedStyle(document.body);

      const commonOptions = {
        cutout: '60%',
        plugins: {
          legend: {
            labels: {
              color: documentStyle.getPropertyValue('--p-text-color'),
            },
          },
        },
      };

      // Configuração inicial dos gráficos com dados zerados
      const chartDataArray = [
        {
          labels: ['Quente 🔥', 'Frio 🧊', 'Morno ☕'],
          datasets: [
            {
              data: [0, 0, 0], // Inicialmente zerado
              backgroundColor: [
                documentStyle.getPropertyValue('--p-red-500'),
                documentStyle.getPropertyValue('--p-blue-500'),
                documentStyle.getPropertyValue('--p-yellow-500'),
              ],
              hoverBackgroundColor: [
                documentStyle.getPropertyValue('--p-surface-500'),
                documentStyle.getPropertyValue('--p-surface-500'),
                documentStyle.getPropertyValue('--p-surface-500'),
              ],
            },
          ],
        },
        {
          labels: ['Ativos 😊', 'Descanso 🏖️'],
          datasets: [
            {
              data: [0, 0], // Inicialmente zerado
              backgroundColor: [
                documentStyle.getPropertyValue('--p-primary-900'),
                documentStyle.getPropertyValue('--p-primary-400'),
              ],
              hoverBackgroundColor: [
                documentStyle.getPropertyValue('--p-surface-500'),
                documentStyle.getPropertyValue('--p-surface-500'),
              ],
            },
          ],
        },
        {
          labels: ['Válidos 🚀', 'Inválidos 👎'],
          datasets: [
            {
              data: [0, 0], // Inicialmente zerado
              backgroundColor: [
                documentStyle.getPropertyValue('--p-purple-500'),
                documentStyle.getPropertyValue('--p-purple-900'),
              ],
              hoverBackgroundColor: [
                documentStyle.getPropertyValue('--p-surface-500'),
                documentStyle.getPropertyValue('--p-surface-500'),
              ],
            },
          ],
        },
      ];

      return chartDataArray.map((data) => ({
        data,
        options: commonOptions,
      }));
    },

    // Função para atualizar os dados dinamicamente
    updateChartData() {
      // Recebe os dados da API
      const newChartData = [
        [500, 150, 100], // Dados para o primeiro gráfico
        [300, 400], // Dados para o segundo gráfico
        [50, 100], // Dados para o terceiro gráfico
      ];

      // Atualiza os valores no dataset de cada gráfico
      this.charts.forEach((chart, index) => {
        chart.data.datasets[0].data = newChartData[index];
      });
    },
  },
};
</script>
