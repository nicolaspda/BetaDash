<template>
  <div class="card flex justify-center">
    <Chart
      type="pie"
      :data="chartData"
      :options="chartOptions"
      class="w-full md:w-[20rem]"
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
    this.setChartData();
    this.chartOptions = this.setChartOptions();
  },
  methods: {
    setChartData() {
      const documentStyle = getComputedStyle(document.body);

      //Chamada para buscar o valor das Labels
      let getDataValue = [];
      const chamada = {
        'contact-list_code': '7',
        page_number: '1',
        page_size: '10000',
        search: [
          {
            field: 'cmp7',
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
            console.log('Sucesso em buscar valores dos campos');
            console.log(response.body.items);
            getDataValue = response.body.items;

            //Chamada para buscar o nome das Labels
            let getDataName = [];
            const chamada = {
              'contact-list_code': '7',
              page_number: '1',
              page_size: '10000',
              field_code: '7',
            };

            $fetch(
              'https://proxy.cors.sh/https://api.dinamize.com/emkt/field-lov/search',
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
              .then((response2) => {
                if (response2.code_detail === 'Sucesso') {
                  console.log('Sucesso em buscar Labels dos campos');
                  console.log(response2.body.list);

                  //Pega a quantidade de valores de cada campo e consolida
                  getDataName = response2.body.list;
                  const filterValues = getDataValue.map(
                    (item) => item.custom_fields.cmp7
                  );
                  let filterSets = Object.values(
                    filterValues.reduce((acc, item) => {
                      acc[item] = (acc[item] || 0) + 1;
                      return acc;
                    }, {})
                  )
                    .sort((a, b) => b - a)
                    .map(Number); //TESTAR sem object values
                  console.log(filterSets);
                  // Adiciona as informações no gráfico
                  this.chartData = {
                    // Labels contém o campo a ser substituido
                    labels: filterValues,
                    // Datasets contém a quantidade de contatos com aqueles valores
                    datasets: [
                      {
                        data: filterSets,
                        backgroundColor: [
                          documentStyle.getPropertyValue('--p-cyan-500'),
                          documentStyle.getPropertyValue('--p-orange-500'),
                        ],
                        hoverBackgroundColor: [
                          documentStyle.getPropertyValue('--p-cyan-400'),
                          documentStyle.getPropertyValue('--p-orange-400'),
                        ],
                      },
                    ],
                  };
                } else {
                  this.$toast.add({
                    severity: 'error',
                    summary: 'Atenção',
                    detail: response.code_detail,
                    life: 3000,
                  });
                  console.log('Falha');
                }
              })
              .catch((error) => {
                console.error('Buscar dados falhou:', error);
              });

            // Adiciona as informações no gráfico
            this.chartData = {
              // Labels contém o campo a ser substituido
              labels: getDataValue.map((item) => item.custom_fields.cmp7),
              // Datasets contém a quantidade de contatos com aqueles valores
              datasets: [
                {
                  data: [540, 325, 702],
                  backgroundColor: [
                    documentStyle.getPropertyValue('--p-cyan-500'),
                    documentStyle.getPropertyValue('--p-orange-500'),
                    documentStyle.getPropertyValue('--p-gray-500'),
                  ],
                  hoverBackgroundColor: [
                    documentStyle.getPropertyValue('--p-cyan-400'),
                    documentStyle.getPropertyValue('--p-orange-400'),
                    documentStyle.getPropertyValue('--p-gray-400'),
                  ],
                },
              ],
            };
          } else {
            this.$toast.add({
              severity: 'error',
              summary: 'Atenção',
              detail: response.code_detail,
              life: 3000,
            });
            console.log('Falha');
          }
        })
        .catch((error) => {
          console.error('Buscar dados falhou:', error);
        });
    },

    setChartOptions() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');

      return {
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
              color: textColor,
            },
          },
        },
      };
    },
  },
};
</script>
