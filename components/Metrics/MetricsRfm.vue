<template>
  <div class="card flex flex-wrap gap-5 my-2 mx-6">
    <!--Parte inicial dos cards com métricas consolidadas-->
    <Card
      v-for="card in cards"
      class="group flex-1 justify-center border transition-all hover:!shadow-md"
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
    <!--Parte dedicada à análise RFM avançada-->
    <Card class="w-full">
      <template #header>
        <div class="bg-primary rounded-t-md h-2">&nbsp;</div>
      </template>
      <template #title>Análise avançada</template>
      <template #subtitle>RFM</template>
      <template #content>
        <div class="m-0">
          <OrganizationChart
            v-model:selectionKeys="selection"
            :value="data"
            collapsible
            selectionMode="single"
          >
            <template #metricType="slotProps">
              <div class="flex flex-col">
                <div class="flex flex-col items-center">
                  <img
                    :alt="slotProps.node.data.name"
                    :src="slotProps.node.data.image"
                    class="mb-4 w-12 h-12"
                  />
                  <span class="font-bold mb-2">{{
                    slotProps.node.data.name
                  }}</span>
                  <span>{{ slotProps.node.data.title }}</span>
                </div>
              </div>
            </template>
            <template #default="slotProps">
              <span>{{ slotProps.node.label }}</span>
            </template>
          </OrganizationChart>
        </div>
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
      data: {
        key: '0',
        type: 'metricType',
        data: {
          image:
            'https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png',
          name: 'RFM Geral',
          title: '100%',
        },
        children: [
          {
            key: '0_0',
            type: 'metricType',
            styleClass: 'hover:!bg-green-50',
            data: {
              image:
                'https://primefaces.org/cdn/primevue/images/avatar/annafali.png',
              name: 'RFM Alto',
              title: '75%',
            },
            children: [
              {
                key: '0_0_0',
                styleClass: 'hover:!bg-green-50',
                label: 'Campeões',
              },
              {
                key: '0_0_1',
                styleClass: 'hover:!bg-green-50',
                label: 'Fiéis',
              },
            ],
          },
          {
            key: '0_1',
            type: 'metricType',
            styleClass: 'hover:!bg-yellow-50',
            data: {
              image:
                'https://primefaces.org/cdn/primevue/images/avatar/stephenshaw.png',
              name: 'RFM Médio',
              title: '15%',
            },
            children: [
              {
                key: '0_1_0',
                label: 'Novos',
                styleClass: 'hover:!bg-yellow-50',
              },
              {
                key: '0_1_1',
                label: 'Promissores',
                styleClass: 'hover:!bg-yellow-50',
              },
              {
                key: '0_1_2',
                label: 'Atenção',
                styleClass: 'hover:!bg-yellow-50',
              },
              {
                key: '0_1_3',
                label: 'Risco',
                styleClass: 'hover:!bg-yellow-50',
              },
            ],
          },
          {
            key: '0_2',
            type: 'metricType',
            styleClass: 'hover:!bg-red-50',
            data: {
              image:
                'https://primefaces.org/cdn/primevue/images/avatar/annafali.png',
              name: 'RFM Baixo',
              title: '10%',
            },
            children: [
              {
                key: '0_2_0',
                label: 'Hibernando',
                styleClass: 'hover:!bg-red-50',
              },
              {
                key: '0_2_1',
                label: 'Perdidos',
                styleClass: 'hover:!bg-red-50',
              },
            ],
          },
        ],
      },
      selection: {},
    };
  },
};
</script>

<style scoped>
.group {
  box-shadow: none;
}
</style>
