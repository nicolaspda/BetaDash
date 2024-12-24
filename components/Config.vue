<template>
  <div class="card flex justify-center">
    <Drawer v-model:visible="visible" position="right">
      <template #header>
        <div class="flex items-center gap-2">
          <Avatar
            image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
            shape="circle"
          />
          <span class="font-bold">Amy Elsner</span>
        </div>
      </template>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      <template #footer>
        <div class="flex items-center gap-2">
          <Button
            label="Conta"
            icon="pi pi-user"
            class="flex-auto"
            outlined
          ></Button>
          <Button
            label="Sair"
            icon="pi pi-sign-out"
            class="flex-auto"
            severity="danger"
            text
          ></Button>
        </div>
      </template>
    </Drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    showDrawer() {
      this.visible = true; // Abre a drawer
    },
  },
};
</script>
