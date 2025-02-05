<template>
  <div class="flex justify-center gap-3">
    <!--Receita obtida de Compradores recentes-->
    <Card
      style="overflow: hidden"
      class="flex-1 shadow-none hover:shadow-md !transition-shadow"
    >
      <template #header>
        <div
          class="text-lg bg-primary-100 h-12 flex justify-center items-center"
        >
          Compradores recentes
        </div>
      </template>
      <template #subtitle
        ><div class="flex justify-center items-center">(em R$)</div></template
      >
      <template #content>
        <div class="flex justify-center items-center text-lg">830.230,50</div>
      </template>
    </Card>
    <!--Receita obtida de Novos compradores-->
    <Card
      style="overflow: hidden"
      class="flex-1 shadow-none hover:shadow-md !transition-shadow"
    >
      <template #header>
        <div class="text-lg bg-blue-100 h-12 flex justify-center items-center">
          Novos Compradores
        </div>
      </template>
      <template #subtitle
        ><div class="flex justify-center items-center">(em R$)</div></template
      >
      <template #content>
        <div class="flex justify-center items-center text-lg">830.230,50</div>
      </template>
    </Card>
    <!--Quantidade de transações-->
    <Card
      style="overflow: hidden"
      class="flex-1 shadow-none hover:shadow-md !transition-shadow"
    >
      <template #header>
        <div class="text-lg bg-cyan-100 h-12 flex justify-center items-center">
          Transações
        </div>
      </template>
      <template #subtitle
        ><div class="flex justify-center items-center">(em R$)</div></template
      >
      <template #content>
        <div class="flex justify-center items-center text-lg">830.230</div>
      </template>
    </Card>
  </div>
</template>

<script>
export default {};
</script>

<style scoped></style>
