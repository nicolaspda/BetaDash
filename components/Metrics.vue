<template>
  <div class="main">
    <!--Controller Nav-->
    <div
      class="flex justify-between h-20 mx-11 mt-8 p-5 rounded-md shadow-sm bg-white text-2xl"
    >
      <div class="title flex items-center">
        Analisar /
        <span class="text-primary font-bold">&nbsp;Base de contatos </span>
      </div>
    </div>
    <div class="area flex mx-11">
      <!--Conteúdo principal-->
      <div class="content w-full mt-5">
        <Card class="h-full rounded-md z-10">
          <template #content>
            <div class="rfm py-8">
              <p class="text-lg text-black">RFM</p>
              <div class="mt-6">
                <div class="rfm data">
                  <MetricsRfm />
                </div>
              </div>
            </div>
            <hr />
            <div class="unique py-8">
              <p class="text-lg text-black">Campo único</p>
              <div class="selectorPie flex justify-end">
                <Select
                  v-model="selectedLvu"
                  :options="fieldsLvu"
                  optionLabel="title"
                  size="small"
                  filter
                  placeholder="Campos"
                  class="w-full md:w-56"
                  @change="callChild"
                />
              </div>
              <div class="mt-6">
                <div class="graph">
                  <MetricsPie
                    :selectedLvu="selectedLvu"
                    ref="changeLvuFields"
                  />
                </div>
              </div>
            </div>
            <hr />
            <div class="multiple py-8">
              <p class="text-lg text-black">Campo múltiplo</p>
              <div class="selectorBar flex justify-end">
                <MultiSelect
                  v-model="selectedLvm"
                  :options="fieldsLvm"
                  size="small"
                  filter
                  optionLabel="name"
                  showClear
                  placeholder="Campos"
                  :maxSelectedLabels="2"
                  :selectionLimit="2"
                  class="w-full md:w-56"
                  display="chip"
                />
              </div>
              <div class="mt-6">
                <div class="graph"><MetricsBar /></div>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>
    <br />
  </div>
</template>

<script>
export default {
  data() {
    return {
      btnSelected: 'Sessões',
      selectedLvm: null,
      fieldsLvm: [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' },
      ],
      selectedLvu: null,
      fieldsLvu: [],
    };
  },
  methods: {
    callChild() {
      this.$nextTick(() => {
        this.$refs.changeLvuFields.setChartData();
      });
    },
    async GetPieFields() {
      const chamada = {
        'contact-list_code': '7',
        page_number: '1',
        page_size: '10000',
        search: [
          {
            field: 'is_uniquevalue',
            operator: '=',
            value: 'true',
          },
          {
            field: 'type',
            operator: '=',
            value: 'LV',
          },
        ],
      };
      try {
        const response = await $fetch(
          'https://proxy.cors.sh/https://api.dinamize.com/emkt/field/search',
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
        );
        //const { fieldsLvu } = response;
        if (response.code_detail == 'Sucesso') {
          console.log('sucesso em buscar campos');
          this.fieldsLvu = response.body.items;
        } else {
          this.$toast.add({
            severity: 'error',
            summary: 'Atenção',
            detail: response.code_detail,
            life: 3000,
          });
          console.log('Falha');
        }
      } catch (error) {
        console.error('Login falhou:', error);
      }
    },
  },
  created() {
    this.GetPieFields();
  },
};
</script>
<style></style>
