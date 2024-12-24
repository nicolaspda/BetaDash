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
      <!--Código da Lista-->
      <Fieldset>
        <template #legend>
          <div class="flex items-center pl-2">
            <Avatar icon="pi pi-user" size="small" class="!bg-primary-100" />
            <span class="font-bold p-2">Código da Lista</span>
          </div>
        </template>
        <p class="m-0">Escolha a lista que deve refletir as informações:</p>
      </Fieldset>
      <!--Analytics-->
      <Fieldset>
        <template #legend>
          <div class="flex items-center pl-2">
            <Avatar icon="pi pi-google" size="small" class="!bg-orange-200" />
            <span class="font-bold p-2">Google Analytics</span>
          </div>
        </template>
        <p class="m-0">Configure sua conta do GA4:</p>
      </Fieldset>
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
