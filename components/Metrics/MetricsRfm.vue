<template>
  <div class="card flex flex-wrap gap-5 my-2 mx-6">
    <Card
      v-for="card in cards"
      class="group flex-1 justify-center border transition-all hover:shadow-md"
    >
      <template #header></template>
      <template #content>
        <div class="flex justify-between">
          <div class="flex flex-col">
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
    <Card class="w-full">
      <template #header>
        <div class="bg-primary rounded-t-md h-2">&nbsp;</div>
      </template>
      <template #title>Advanced Card</template>
      <template #subtitle>Card subtitle</template>
      <template #content>
        <p class="m-0">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
          sed consequuntur error repudiandae numquam deserunt quisquam repellat
          libero asperiores earum nam nobis, culpa ratione quam perferendis
          esse, cupiditate neque quas!
        </p>
      </template>
      <template #footer>
        <div class="flex gap-4 mt-1">
          <Button label="Cancel" severity="secondary" outlined class="w-full" />
          <Button label="Save" class="w-full" />
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
          label: 'Uma compra',
          color1: 'var(--p-primary-color)',
          value: 5000,
          icon: 'pi pi-shopping-bag',
        },
        {
          label: 'Mais de uma compra',
          color1: 'var(--p-emerald-700)',
          value: 3000,
          icon: 'pi pi-shopping-cart',
        },
        {
          label: 'Maior que Ticket med.',
          color1: 'var(--p-green-500)',
          value: 1000,
          icon: 'pi pi-dollar',
        },
        {
          label: 'Última compra a 30 dias',
          color1: 'var(--p-surface-500)',
          value: 1000,
          icon: 'pi pi-calendar',
        },
        {
          label: 'Última compra a 90 dias',
          color1: 'var(--p-surface-500)',
          value: 1000,
          icon: 'pi pi-calendar-clock',
        },
        {
          label: 'Última compra a 180 dias',
          color1: 'var(--p-surface-500)',
          value: 1000,
          icon: 'pi pi-calendar-times',
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
