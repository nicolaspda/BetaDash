<template>
  <div class="card">
    <Chart
      type="line"
      :data="chartData"
      :options="chartOptions"
      class="h-[20rem]"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartData: null,
      chartOptions: null,
    };
  },
  mounted() {
    this.chartData = this.setChartData();
    this.chartOptions = this.setChartOptions();
  },
  methods: {
    async setChartData() {
      const documentStyle = getComputedStyle(document.documentElement);
      const authStore = useAuthStore();
      const ConfigStore = useConfigStore();
      const chamada = {
        'contact-list_code': ConfigStore.selectedList.code,
        page_number: '1',
        page_size: '10000',
        search: [
          {
            field: 'request_date',
            operator: '>',
            value: '2024-06-23 00:00:00',
          },
        ],
        order: [
          {
            field: 'request_date',
            type: 'DESC',
          },
        ],
      };
      try {
        const response = await $fetch(
          'https://proxy.cors.sh/https://api.dinamize.com/emkt/optout-email/search',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
              'Access-Control-Allow-Origin': '*',
              'x-cors-api-key': 'temp_4be2c4562bb040588f036493d162b34f',
              'Access-Control-Allow-Headers': 'x-requested-with',
              Accept: 'application/json',
              'auth-token': authStore.authToken,
            },
            body: chamada,
          }
        );
        if (response.code_detail == 'Sucesso') {
          console.log('sucesso em buscar Denuncias e OptOuts');
          //Consolida o acumulado das datas nos meses de acordo com a categoria
          const resultado = response.body.items.reduce(
            (acc, item) => {
              const mesIndex = new Date(item.request_date).getMonth(); // Obtém o índice do mês (0 a 11)
              if (item.origin === 'D') {
                acc.spamCount[mesIndex] = (acc.spamCount[mesIndex] || 0) + 1;
              } else {
                acc.optCount[mesIndex] = (acc.optCount[mesIndex] || 0) + 1;
              }
              return acc;
            },
            { spamCount: Array(12).fill(0), optCount: Array(12).fill(0) }
          );

          this.chartData = {
            labels: [
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
            ],
            datasets: [
              {
                label: 'Denúncia',
                fill: false,
                borderColor: documentStyle.getPropertyValue('--p-red-500'),
                yAxisID: 'y',
                data: resultado.spamCount,
                fill: true,
              },
              {
                label: 'Descadastro',
                fill: false,
                borderColor: documentStyle.getPropertyValue('--p-surface-500'),
                yAxisID: 'y',
                data: resultado.optCount,
                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                fill: true,
              },
            ],
          };
        } else {
          console.log('Falha');
        }
      } catch (error) {
        console.error('Erro na tentativa de realizar a chamada:', error);
      }
    },
    setChartOptions() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');
      const textColorSecondary = documentStyle.getPropertyValue(
        '--p-text-muted-color'
      );
      const surfaceBorder = documentStyle.getPropertyValue(
        '--p-content-border-color'
      );

      return {
        stacked: false,
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
          legend: {
            labels: {
              color: textColor,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            min: 0,
            max: 100,
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
        },
      };
    },
  },
};
</script>
