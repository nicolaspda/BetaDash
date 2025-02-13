<template>
  <div class="card flex justify-center">
    <Drawer v-model:visible="visible" position="right">
      <Toast></Toast>
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
          v-model="list"
          :options="lists"
          optionLabel="title"
          :placeholder="list != null ? list : 'Selecione'"
          class="w-full md:w-56"
          size="small"
          @change="setList"
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
            optionLabel="title"
            :placeholder="qtdCompras != null ? qtdCompras : 'Campo da Dinamize'"
            class="w-full md:w-56"
            size="small"
            @change="setQtdCompras"
          />
          <span for="totalGasto">Total Gasto:</span>
          <Select
            v-model="totalGasto"
            aria-labelledby="totalGasto"
            :options="fields"
            optionLabel="title"
            :placeholder="totalGasto != null ? totalGasto : 'Campo da Dinamize'"
            class="w-full md:w-56"
            size="small"
            @change="setTotalGasto"
          />
          <span id="lastPurchaseTotal">Valor da Última compra:</span>
          <Select
            v-model="lastPurchaseTotal"
            aria-labelledby="lastPurchaseTotal"
            :options="fields"
            optionLabel="title"
            :placeholder="
              lastPurchaseTotal != null
                ? lastPurchaseTotal
                : 'Campo da Dinamize'
            "
            class="w-full md:w-56"
            size="small"
            @change="setlastPurchase"
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
import { useConfigStore } from '~/stores/configStore';
export default {
  data() {
    return {
      visible: false,
      list: null,
      qtdCompras: null,
      lastPurchaseTotal: null,
      totalGasto: null,
      lists: [],
      fields: [],
    };
  },
  mounted() {
    this.getDinamizeLists();
  },
  methods: {
    async getDinamizeLists() {
      const authStore = useAuthStore();
      const payload = {
        page_number: '1',
        page_size: '10',
        order: [
          {
            field: 'name',
            type: 'ASC',
          },
        ],
      };
      try {
        const response = await $fetch(
          'https://proxy.cors.sh/https://api.dinamize.com/emkt/contact-list/search',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
              'Access-Control-Allow-Origin': '*',
              'x-cors-api-key': 'temp_4be2c4562bb040588f036493d162b34f',
              'Access-Control-Allow-Headers': 'x-requested-with',
              Accept: 'application/json',
              'auth-token': authStore.authToken,
            },
            body: payload,
          }
        );
        if (response.code_detail == 'Sucesso') {
          // Carrega as informações no front
          console.log('Sucesso em buscar nomes das listas');
          console.log(response.body);
          this.lists = response.body.items;

          //Adiciona a lista carregada da store
          const ConfigStore = useConfigStore();
          this.list = ConfigStore.selectedList;
          this.getDinamizeFields();
        } else {
          this.$toast.add({
            severity: 'error',
            summary: 'Atenção',
            detail: response.code_detail,
            life: 3000,
          });
          console.log('Falha');
        }
      } catch (error) {
        console.error('Login falhou:', error);
      }
    },
    async getDinamizeFields() {
      const authStore = useAuthStore();
      const ConfigStore = useConfigStore();

      const contact_list_code = this.lists.find(
        (list) => list.title == ConfigStore.selectedList
      );

      const payload = {
        page_number: '1',
        page_size: '10',
        'contact-list_code': contact_list_code.code,
        order: [
          {
            field: 'name',
            type: 'ASC',
          },
        ],
      };
      try {
        const response = await $fetch(
          'https://proxy.cors.sh/https://api.dinamize.com/emkt/field/search',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
              'Access-Control-Allow-Origin': '*',
              'x-cors-api-key': 'temp_4be2c4562bb040588f036493d162b34f',
              'Access-Control-Allow-Headers': 'x-requested-with',
              Accept: 'application/json',
              'auth-token': authStore.authToken,
            },
            body: payload,
          }
        );
        if (response.code_detail == 'Sucesso') {
          // Adiciona informações no front
          console.log('Sucesso em buscar nomes dos campos');
          console.log(response.body);
          this.fields = response.body.items;

          //Adiciona a lista carregada da store
          const ConfigStore = useConfigStore();
          this.qtdCompras = ConfigStore.selectedQtdCompras;
          this.totalGasto = ConfigStore.selectedTotalGasto;
          this.lastPurchaseTotal = ConfigStore.selectedLastPurchaseTotal;

          console.log('qtd: ' + this.qtdCompras);
          console.log('totalgasto: ' + this.totalGasto);
          console.log('lastpur: ' + this.lastPurchaseTotal);
        } else {
          this.$toast.add({
            severity: 'error',
            summary: 'Atenção',
            detail: response.code_detail,
            life: 3000,
          });
          console.log('Falha');
        }
      } catch (error) {
        console.error('Login falhou:', error);
      }
    },
    setList() {
      // Salva informações no localStorage
      localStorage.setItem('selectedList', this.list.title);

      const ConfigStore = useConfigStore();

      //Adiciona no store configStore os novos campos
      ConfigStore.alterConfig();
      this.getDinamizeFields();
      //Limpa as opções de campo anterior
      ConfigStore.clearFields();

      this.$toast.add({
        severity: 'success',
        summary: 'Seleção de lista',
        detail: 'Lista alterada',
        life: 2000,
      });
    },
    setQtdCompras() {
      // Salva informações no localStorage
      localStorage.setItem('selectedQtdCompras', this.qtdCompras.title);

      //Adiciona no store configStore
      const ConfigStore = useConfigStore();
      ConfigStore.alterConfig();
      this.$toast.add({
        severity: 'success',
        summary: 'Campo e-commerce',
        detail: 'Campo quantidade de compras alterado',
        life: 2000,
      });
    },
    setlastPurchase() {
      // Salva informações no localStorage
      localStorage.setItem(
        'selectedLastPurchaseTotal',
        this.lastPurchaseTotal.title
      );

      //Adiciona no store configStore
      const ConfigStore = useConfigStore();
      ConfigStore.alterConfig();

      this.$toast.add({
        severity: 'success',
        summary: 'Campo e-commerce',
        detail: 'Campo Valor da última compra alterado',
        life: 2000,
      });
    },
    setTotalGasto() {
      // Salva informações no localStorage
      localStorage.setItem('selectedTotalGasto', this.totalGasto.title);

      //Adiciona no store configStore
      const ConfigStore = useConfigStore();
      ConfigStore.alterConfig();

      this.$toast.add({
        severity: 'success',
        summary: 'Campo e-commerce',
        detail: 'Campo Total gasto alterado',
        life: 2000,
      });
    },
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
