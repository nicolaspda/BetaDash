<template>
  <div class="Knob h-80">
    <div class="Knobs flex justify-center gap-9">
      <Card
        v-for="(knob, index) of knobs"
        :key="knob.title"
        class="shadow-none"
      >
        <template #header> </template>
        <template #title>{{ knob.title }}</template>
        <template #subtitle>Performance Geral</template>
        <template #content>
          <Knob
            readonly
            v-model="knob.valuePercent"
            :strokeWidth="5"
            :valueTemplate="`${knob.valuePercent}%`"
            :size="160"
            :valueColor="knob.valueColor"
            class="font-semibold"
          />
        </template>
      </Card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      knobs: [
        {
          title: "Média de Entrega",
          valueColor: "var(--p-indigo-500)",
          valuePercent: "95",
        },
        {
          title: "Média de Abertura",
          valueColor: "var(--p-purple-500)",
          valuePercent: "34",
        },
        {
          title: "Média de Cliques",
          valueColor: "var(--p-cyan-500)",
          valuePercent: "10",
        },
      ],
      sendCollection: {
        title: "Produtos top",
        campaign: "Lançamento",
        status: "FN",
        date: "12/01/2024",
        sent: "1100",
        delivered: 99,
        click: 28,
        view: 30,
        type: "Instantânea",
      },
    };
  },
};
</script>

<style>
.p-knob-text {
  font-size: small;
}
</style>
