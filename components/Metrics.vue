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
              <div class="mt-6 flex justify-between">
                <div class="graph flex-1"><MetricsPie /></div>
                <div class="selector">Seletor</div>
              </div>
            </div>
            <hr />
            <div class="multiple py-8">
              <p class="text-lg text-black">Campo múltiplo</p>
              <div class="mt-6 flex justify-between">
                <div class="graph flex-1"><MetricsBar /></div>
                <div class="selector">Seletor</div>
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
