<template>
  <div class="flex justify-center items-center">
    <Skeleton
      shape="circle"
      animation="wave"
      size="18rem"
      v-if="chartLoading"
    ></Skeleton>
    <div v-if="selectedLvu == null" class="flex flex-col items-center">
      <p>Selecione um campo na lista</p>
      <Chart
        type="pie"
        :data="{
          labels: ['N/A'],
          datasets: [
            {
              data: [100],
            },
          ],
        }"
        :options="{
          responsive: true,
        }"
        class="w-full md:w-[20rem]"
      />
    </div>
    <Chart
      type="pie"
      :data="chartData"
      :options="chartOptions"
      class="w-full md:w-[20rem]"
      v-if="chartLoading == false"
    />
  </div>
</template>

<script>
export default {
  props: ['selectedLvu'],
  data() {
    return {
      chartData: null,
      chartOptions: null,
      chartLoading: null,
    };
  },
  mounted() {
    this.chartOptions = this.setChartOptions();
  },
  methods: {
    setChartData() {
      const documentStyle = getComputedStyle(document.body);
      this.chartLoading = true;
      //Chamada para buscar o valor das Labels
      let getDataValue = [];
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
            console.log('Sucesso em buscar valores dos campos');
            console.log(response.body.items);
            getDataValue = response.body.items;

            //Chamada para buscar o nome das Labels
            let getDataName = [];
            const chamada = {
              'contact-list_code': '7',
              page_number: '1',
              page_size: '10000',
              field_code: this.selectedLvu.code,
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
                  getDataName = response2.body.list;

                  //Pega a quantidade de valores de cada campo e consolida
                  const filterValues = getDataValue.map(
                    (item) => item.custom_fields[this.selectedLvu.code_name]
                  );
                  console.log('filterVALEUS');
                  console.log(filterValues);
                  const acum = filterValues.reduce((acc, item) => {
                    acc[item] = (acc[item] || 0) + 1;
                    return acc;
                  }, {});

                  // Filtra as labels acumuladas e unifica com o valor retornado
                  const filterLabels = Object.keys(acum);
                  const mergeLabel = filterLabels.map((element) => {
                    const values = getDataName.find(
                      (item) => item.code == element
                    );
                    return values ? values.value : null;
                  });
                  console.log('Label found:');
                  console.log(mergeLabel);

                  // Filtra os valores acumulados
                  const filterSets = Object.values(acum);
                  console.log('Qtd de valores acumulada:');
                  console.log(filterSets);
                  // Adiciona as informações no gráfico
                  this.chartData = {
                    labels: mergeLabel,
                    datasets: [
                      {
                        data: filterSets,
                        /* backgroundColor: [
                          documentStyle.getPropertyValue('--p-cyan-500'),
                          documentStyle.getPropertyValue('--p-orange-500'),
                        ],
                        hoverBackgroundColor: [
                          documentStyle.getPropertyValue('--p-cyan-400'),
                          documentStyle.getPropertyValue('--p-orange-400'),
                        ],*/
                      },
                    ],
                  };
                  // Atualiza o estado de carregamento após todos os dados estarem configurados
                  this.chartLoading = false;
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
