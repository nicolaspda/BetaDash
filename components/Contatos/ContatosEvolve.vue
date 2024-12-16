<template>
  <div class="card mt-5">
    <MeterGroup
      :value="value"
      labelPosition="start"
      :max="10000"
    >
      <template #label="{ value }">
        <div class="flex flex-wrap gap-4">
          <template
            v-for="val of value"
            :key="val.label"
          >
            <Card class="flex-1 border border-surface shadow-none">
              <template #content>
                <div class="flex justify-between gap-8">
                  <div class="flex flex-col gap-1">
                    <span
                      class="text-surface-500 dark:text-surface-400 text-sm"
                      >{{ val.label }}</span
                    >
                    <span class="font-bold text-lg">{{ val.value }}</span>
                  </div>
                  <span
                    class="inline-flex justify-center items-center text-center"
                    :style="{
                      color: `${val.color1}`,
                    }"
                  >
                    <i :class="val.icon" />
                  </span>
                </div>
              </template>
            </Card>
          </template>
        </div>
      </template>
      <template #meter="slotProps">
        <span
          :class="slotProps.class"
          :style="{
            background: `${slotProps.value.color1}`,
            width: slotProps.size,
          }"
        />
      </template>
      <template #start="{ totalPercent }">
        <div class="flex justify-between mt-4 mb-2 relative">
          <span>Total</span>
          <span class="font-medium">10.000</span>
        </div>
      </template>
      <template #end>
        <div class="flex justify-between mt-4">
          <Button
            label="Manage Storage"
            outlined
            size="small"
          />
          <Button
            label="Update Plan"
            size="small"
          />
        </div>
      </template>
    </MeterGroup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: [
        {
          label: "Total de contatos",
          color1: "var(--p-primary-color)",
          value: 5000,
          icon: "pi pi-users",
        },
        {
          label: "Entrada (novos)",
          color1: "var(--p-emerald-700)",
          value: 3000,
          icon: "pi pi-arrow-up",
        },
        {
          label: "Saída (opt-out)",
          color1: "var(--p-red-500)",
          value: 1000,
          icon: "pi pi-arrow-down",
        },
        {
          label: "Disponível",
          color1: "var(--p-surface-200)",
          value: 1000,
          icon: "pi pi-cog",
        },
      ],
    };
  },
};
</script>
