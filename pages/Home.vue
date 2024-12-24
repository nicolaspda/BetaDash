<template>
  <div class="flex h-screen">
    <!-- Menu lateral (drawer) -->
    <div
      :class="[
        panel ? 'w-40 block p-2 items-start' : 'w-16 block p-4 items-center',
        ' bg-surface-50 border border-gray-200 shadow-md rounded-lg transition-all duration-300 flex flex-col gap-4',
      ]"
    >
      <!-- Topo reservado -->
      <div class="flex justify-between items-center">
        <button
          class="mb-10 p-button p-button-icon-only p-button-rounded"
          @click="panelAction"
          v-tooltip="panel ? 'Reduzir' : 'Expandir'"
        >
          <i class="pi pi-bars"></i>
        </button>
      </div>

      <!-- Ícones -->
      <Button
        v-for="menu in menus"
        :key="menu.label"
        :icon="menu.icon"
        :label="panel ? menu.label : ''"
        :class="[
          selectedMenu == menu.label ? '!bg-slate-300' : '',
          'p-button-text !text-slate-600 p-button-sm hover:!bg-slate-300',
        ]"
        @click="SelectMenu($event, menu)"
        v-tooltip="!panel ? menu.label : ''"
      />
    </div>

    <!-- Painel principal -->
    <div class="flex-1 p-4 overflow-auto">
      <div class="flex items-center gap-4">
        <img
          src="https://i.postimg.cc/DyWW65wL/dina-logo.png"
          alt="Logo"
          class="w-32"
        />
      </div>

      <div class="main">
        <p class="mb-4 text-sm font-medium text-gray-600">Metrics</p>
        <Dash v-if="selectedMenu == 'Dashboard'" />
        <Metrics v-if="selectedMenu == 'Analisar'" />
        <Config ref="childConfig" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      panel: false,
      selectedMenu: 'Dashboard',
      menus: [
        { label: 'Dashboard', icon: 'pi pi-home' },
        { label: 'Analisar', icon: 'pi pi-chart-line' },
        { label: 'Configurar', icon: 'pi pi-cog' },
        { label: 'Ajuda', icon: 'pi pi-question' },
      ],
    };
  },
  methods: {
    panelAction() {
      this.panel = !this.panel;
    },
    SelectMenu(event, menu) {
      // Apenas chama a função do componente filho para abrir a drawer
      if (menu.label === 'Configurar') {
        this.$refs.childConfig.showDrawer();
      } else {
        this.selectedMenu = menu.label;
      }
    },
  },
  computed: {},
};
</script>
<style>
body {
  overflow: hidden; /* Desativa a rolagem na página inteira */
}
</style>
