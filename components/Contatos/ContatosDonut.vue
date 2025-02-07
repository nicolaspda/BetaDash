<template>
  <div class="flex justify-center">
    <div class="flex gap-5 justify-center xl:w-80 xl:h-64 w-48 h-56 mb-5">
      <Chart
        type="doughnut"
        :data="chart.data"
        :options="chart.options"
        v-for="(chart, index) in charts"
        :key="index"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      charts: [],
      chartLoading: false,
    };
  },
  mounted() {
    this.charts = this.generateCharts();
    this.getChartData();
  },
  methods: {
    generateCharts() {
      const documentStyle = getComputedStyle(document.body);
      const commonOptions = {
        cutout: '60%',
        plugins: {
          legend: {
            onClick: false,
            labels: {
              color: documentStyle.getPropertyValue('--p-text-color'),
            },
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
    getChartData() {
      // Recebe os dados da API
      this.chartLoading = true;
      //Chamada para buscar o valor das Labels
      /*   let getDataValue = [];
      const chamada = {
        'contact-list_code': '7',
        page_number: '1',
        page_size: '10000',
        search: [
          {
            field: this.selectedLvu.code_name,
            operator: '!=',
            value: '0',
          },
        ],
      };

      $fetch(
        'https://proxy.cors.sh/https://api.dinamize.com/emkt/contact/search',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            'x-cors-api-key': 'temp_4be2c4562bb040588f036493d162b34f',
            'Access-Control-Allow-Headers': 'x-requested-with',
            Accept: 'application/json',
            'auth-token': localStorage.getItem('auth_token'),
          },
          body: chamada,
        }
      )
        .then((response) => {
          if (response.code_detail === 'Sucesso') {
            console.log('Sucesso em buscar valores dos campos e contatos');
            console.log(response.body.items);
            getDataValue = response.body.items}})
*/
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
