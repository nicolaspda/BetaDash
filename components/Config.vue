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
            <Avatar icon="pi pi-list" size="small" class="!bg-primary-100" />
            <span class="font-bold p-2">Código da Lista</span>
          </div>
        </template>
        <p class="m-2">Refletir dados da lista:</p>
        <Select
          v-model="selectedList"
          :options="lists"
          optionLabel="name"
          placeholder="Seleção de lista"
          class="w-full md:w-56"
          size="small"
        />
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
      <!--Campos do E-commerce da Lista-->
      <Fieldset>
        <template #legend>
          <div class="flex items-center pl-2">
            <Avatar icon="pi pi-list" size="small" class="!bg-primary-100" />
            <span class="font-bold p-2">E-commerce</span>
          </div>
        </template>
        <p class="m-2"></p>
        <div class="flex flex-col gap-2">
          <span for="qtdCompras">Quantidade de compras:</span>
          <Select
            v-model="qtdCompras"
            :options="fields"
            aria-labelledby="qtdCompras"
            optionLabel="name"
            placeholder="Campo da Dinamize"
            class="w-full md:w-56"
            size="small"
          />
          <span for="totalGasto">Total Gasto:</span>
          <Select
            v-model="totalGasto"
            aria-labelledby="totalGasto"
            :options="fields"
            optionLabel="name"
            placeholder="Campo da Dinamize"
            class="w-full md:w-56"
            size="small"
          />
          <span id="lastPurchaseTotal">Valor da Última compra:</span>
          <Select
            v-model="lastPurchaseTotal"
            aria-labelledby="lastPurchaseTotal"
            :options="fields"
            optionLabel="name"
            placeholder="Campo da Dinamize"
            class="w-full md:w-56"
            size="small"
          />
        </div>
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
            @click="logout"
          ></Button>
        </div>
      </template>
    </Drawer>
  </div>
</template>

<style>
.p-drawer-content {
  overflow-x: hidden;
}
</style>

<script>
export default {
  data() {
    return {
      visible: false,
      selectedList: null,
      qtdCompras: null,
      lastPurchaseTotal: null,
      totalGasto: null,
      lists: [
        { name: 'Meus Contatos', code: '1' },
        { name: 'Meus Contatos 2', code: '2' },
        { name: 'Lista de cód externo', code: '3' },
      ],
      fields: [
        { name: 'Quantidade de compras', code: '1' },
        { name: 'Valor total gasto', code: '2' },
        { name: 'Valor da última compra', code: '3' },
        { name: 'Cidade', code: '5' },
      ],
    };
  },
  methods: {
    showDrawer() {
      this.visible = true; // Abre a drawer
    },
    logout() {
      //Remove da Store o State
      const authStore = useAuthStore();
      authStore.logout();

      // Remover informações do localStorage
      localStorage.removeItem('auth_token');
      localStorage.removeItem('loggedIn');

      // Redireciona para a página de login
      this.$router.push('/');
    },
  },
};
</script>
