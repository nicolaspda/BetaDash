<template>
  <div class="flex gap-5">
    <Card
      style="width: 20rem; overflow: hidden"
      class="!border-t-4 !border-blue-500"
    >
      <template #header></template>
      <template #title
        >ROI de todas as mídias &nbsp;
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
      style="width: 20rem; overflow: hidden"
      class="!border-t-4 !border-primary-500"
    >
      <template #header></template>
      <template #title
        >ROI do e-mail marketing &nbsp;<span
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
