<template>
  <div class="main">
    <!--Controller Nav-->
    <div
      class="flex justify-between h-20 mx-11 mt-8 p-5 rounded-md shadow-sm bg-white text-2xl"
    >
      <div class="title flex items-center">
        Analisar /
        <span class="text-primary font-bold">&nbsp;Listas de Valores </span>
      </div>
    </div>
    <div class="area flex mx-11">
      <!--Conteúdo principal-->
      <div class="content w-full mt-5">
        <Card class="h-full rounded-md z-10">
          <template #content>
            <div class="unique py-8">
              <p class="text-lg text-black">Campo único</p>
              <div class="selectorPie flex justify-end">
                <Select
                  v-model="selectedLvu"
                  :options="fieldsLvu"
                  optionLabel="name"
                  size="small"
                  filter
                  placeholder="Campos"
                  class="w-full md:w-56"
                />
              </div>
              <div class="mt-6">
                <div class="graph"><MetricsPie /></div>
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
  middleware: 'auth',
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
      fieldsLvu: [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' },
      ],
    };
  },
  methods: {
    DisplayContent(item) {
      this.btnSelected = item.label;
    },
  },
};
</script>
<style></style>
