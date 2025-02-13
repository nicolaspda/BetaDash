<template>
  <div class="flex gap-5">
    <Card
      class="!border-t-4 !border-blue-500"
      style="width: 15rem; overflow: hidden"
    >
      <template #header></template>
      <template #title
        ><span class="text-sm">ROI de todas as mídias &nbsp;</span>
        <span
          v-tooltip.top="
            'Considera todos os investimentos realizados divididos pelo valor de receita total.'
          "
          class="pi pi-question-circle text-primary-500"
        ></span>
      </template>
      <template #footer>
        <ProgressBar :value="50" class="!bg-blue-300"></ProgressBar>
      </template>
    </Card>
    <Card
      style="width: 15rem; overflow: hidden"
      class="!border-t-4 !border-primary-500"
    >
      <template #header> </template>
      <template #title
        ><span class="text-sm">ROI do e-mail marketing &nbsp;</span
        ><span
          v-tooltip.top="
            'Considera todos os investimentos realizados divididos pelo valor da receita gerada pelo e-mail marketing.'
          "
          class="pi pi-question-circle text-primary-500"
        ></span
      ></template>
      <template #footer>
        <ProgressBar :value="70" class="!bg-blue-300"></ProgressBar>
      </template>
    </Card>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
