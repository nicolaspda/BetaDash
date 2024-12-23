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
        class="p-button-text !text-slate-600 p-button-sm hover:!bg-slate-300"
        @click="toggle($event, menu)"
        v-tooltip="!panel ? menu.label : ''"
      />

      <!-- Menu flutuante -->
      <Menu
        ref="menu"
        id="overlay_menu"
        :model="filteredMenu"
        :popup="true"
        :class="[popup ? 'block' : 'hidden']"
      >
        <template #submenuheader="{ item }">
          <span class="text-primary font-bold"> {{ item.label }}</span>
        </template>
      </Menu>
    </div>

    <!-- Painel principal -->
    <div class="flex-1 p-4 overflow-auto">
      <div class="flex items-center gap-4">
        <img
          src="https://i.postimg.cc/DyWW65wL/dina-logo.png"
          alt="Logo"
          class="w-32"
        />
        <h4 class="text-lg font-bold">Olá, Nicolas!</h4>
      </div>

      <div class="main">
        <p class="mb-4 text-sm font-medium text-gray-600">{{ selectedMenu }}</p>
        <Dash v-if="selectedMenu == 'Dashboard'" />
        <Metrics v-if="selectedMenu == 'Analisar'" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      popup: false,
      panel: false,
      selectedMenu: 'Dashboard',
      menus: [
        { label: 'Dashboard', icon: 'pi pi-home', route: '/Dash' },
        {
          label: 'Criar',
          icon: 'pi pi-bolt',
          route: '/Dash',
          items: [
            { label: 'E-mail', icon: 'pi pi-send', route: '/Journey' },
            { label: 'Landing page', icon: 'pi pi-desktop', route: '/Journey' },
            { label: 'Pop-up', icon: 'pi pi-id-card', route: '/Journey' },
            { label: 'WhatsApp', icon: 'pi pi-whatsapp', route: '/Journey' },
            { label: 'SMS', icon: 'pi pi-mobile', route: '/Journey' },
            { label: 'Templates', icon: 'pi pi-palette' },
          ],
        },
        {
          label: 'Gerenciar',
          icon: 'pi pi-wrench',
          route: '/Dash',
          items: [
            {
              label: 'Contatos',
              icon: 'pi pi-users',
              route: '/ManageContacts',
            },
            { label: 'Tags', icon: 'pi pi-tags', route: '/Journey' },
            { label: 'Filtros', icon: 'pi pi-filter', route: '/Journey' },
            { label: 'Campanhas', icon: 'pi pi-megaphone', route: '/Journey' },
            {
              label: 'Lead Score',
              icon: 'pi pi-sort-numeric-up-alt',
              route: '/Journey',
            },
            {
              label: 'Galeria de imagens',
              icon: 'pi pi-image',
              route: '/Journey',
            },
          ],
        },
        { label: 'Automatizar', icon: 'pi pi-forward', route: '/Dash' },
        { label: 'Analisar', icon: 'pi pi-chart-line', route: '/Dash' },
        { label: 'Integrar', icon: 'pi pi-sync', route: '/Dash' },
        { label: 'Configurar', icon: 'pi pi-cog', route: '/Dash' },
        { label: 'Jornadas', icon: 'pi pi-truck', route: '/Dash' },
      ],
    };
  },
  methods: {
    panelAction() {
      this.panel = !this.panel;
    },
    toggle(event, menu) {
      this.$refs.menu.toggle(event);
      this.selectedMenu = menu.label;
      this.popup = !!menu.items;
    },
  },
  computed: {
    filteredMenu() {
      return this.menus.filter((menu) => menu.label.match(this.selectedMenu));
    },
  },
};
</script>
<style>
body {
  overflow: hidden; /* Desativa a rolagem na página inteira */
}
</style>
