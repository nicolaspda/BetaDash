<template>
  <div class="card flex gap-5 m-2">
    <Card
      v-for="card in cards"
      class="group flex-1 gap-8 border transition-all hover:shadow-md"
    >
      <template #content>
        <div class="flex justify-between gap-8">
          <div class="flex flex-col gap-1">
            <span class="text-surface-500 dark:text-surface-400 text-sm"
              >{{ card.label }}
            </span>
            <span class="font-bold text-lg">
              {{ card.value }}
            </span>
          </div>
          <span
            class="inline-flex justify-center items-center text-center"
            :style="{
              color: `${card.color1}`,
            }"
          >
            <i :class="card.icon" />
          </span>
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cards: [
        {
          label: 'Total de contatos',
          color1: 'var(--p-primary-color)',
          value: 5000,
          icon: 'pi pi-users',
        },
        {
          label: 'Entrada (novos)',
          color1: 'var(--p-emerald-700)',
          value: 3000,
          icon: 'pi pi-arrow-up',
        },
        {
          label: 'Saída (opt-out)',
          color1: 'var(--p-red-500)',
          value: 1000,
          icon: 'pi pi-arrow-down',
        },
        {
          label: 'Disponível',
          color1: 'var(--p-surface-500)',
          value: 1000,
          icon: 'pi pi-cog',
        },
      ],
    };
  },
};
</script>

<style>
.group {
  box-shadow: none;
}
</style>
