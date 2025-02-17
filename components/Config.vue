<template>
  <div class="card flex justify-center">
    <Drawer
      v-model:visible="visible"
      position="right"
    >
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
            <Avatar
              icon="pi pi-list"
              size="small"
              class="!bg-primary-100"
            />
            <span class="font-bold p-2">Código da Lista</span>
          </div>
        </template>
        <p class="m-2">Refletir dados da lista:</p>
        <Select
          v-model="list"
          :options="lists"
          optionLabel="title"
          :placeholder="list != null ? list.title : 'Selecione'"
          class="w-full md:w-56"
          size="small"
          @change="setList"
        />
      </Fieldset>
      <!--Analytics-->
      <Fieldset>
        <template #legend>
          <div class="flex items-center pl-2">
            <Avatar
              icon="pi pi-google"
              size="small"
              class="!bg-orange-200"
            />
            <span class="font-bold p-2">Google Analytics</span>
          </div>
        </template>
        <p class="m-0">Configure sua conta do GA4:</p>
      </Fieldset>
      <!--Campos do E-commerce da Lista-->
      <Fieldset>
        <template #legend>
          <div class="flex items-center pl-2">
            <Avatar
              icon="pi pi-cart-arrow-down"
              size="small"
              class="!bg-primary-100"
            />
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
            :placeholder="
              qtdCompras != null ? qtdCompras.title : 'Campo da Dinamize'
            "
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
            :placeholder="
              totalGasto != null ? totalGasto.title : 'Campo da Dinamize'
            "
            class="w-full md:w-56"
            size="small"
            @change="setTotalGasto"
          />
          <span id="lastPurchaseDate">Data da Última compra:</span>
          <Select
            v-model="lastPurchaseDate"
            aria-labelledby="lastPurchaseDate"
            :options="fields"
            optionLabel="title"
            :placeholder="
              lastPurchaseDate != null
                ? lastPurchaseDate.title
                : 'Campo da Dinamize'
            "
            class="w-full md:w-56"
            size="small"
            @change="setlastPurchaseDate"
          />
          <span id="ticketMedio">Ticket médio:</span>
          <InputGroup>
            <InputText
              :placeholder="ticketMedio != null ? ticketMedio : 'R$ 0,00'"
              size="small"
              v-model="ticketMedio"
            />
            <InputGroupAddon>
              <Button
                icon="pi pi-check"
                severity="primary"
                size="small"
                class="text-sm"
                @click="setTicketMedio"
              />
            </InputGroupAddon>
          </InputGroup>
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
import { useConfigStore } from "~/stores/configStore";
export default {
  data() {
    return {
      visible: false,
      list: null,
      qtdCompras: null,
      lastPurchaseDate: null,
      totalGasto: null,
      ticketMedio: null,
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
        page_number: "1",
        page_size: "10",
        order: [
          {
            field: "name",
            type: "ASC",
          },
        ],
      };
      try {
        const response = await $fetch(
          "https://proxy.cors.sh/https://api.dinamize.com/emkt/contact-list/search",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json; charset=utf-8",
              "Access-Control-Allow-Origin": "*",
              "x-cors-api-key": "temp_4be2c4562bb040588f036493d162b34f",
              "Access-Control-Allow-Headers": "x-requested-with",
              Accept: "application/json",
              "auth-token": authStore.authToken,
            },
            body: payload,
          }
        );
        if (response.code_detail == "Sucesso") {
          // Carrega as informações no front
          console.log("Sucesso em buscar nomes das listas");
          console.log(response.body);
          this.lists = response.body.items;

          //Adiciona a lista carregada da store
          const ConfigStore = useConfigStore();
          this.list = ConfigStore.selectedList;
          this.getDinamizeFields();
        } else {
          this.$toast.add({
            severity: "error",
            summary: "Atenção",
            detail: response.code_detail,
            life: 3000,
          });
          console.log("Falha");
        }
      } catch (error) {
        console.error("Login falhou:", error);
      }
    },
    async getDinamizeFields() {
      const authStore = useAuthStore();
      const ConfigStore = useConfigStore();

      if (ConfigStore.selectedList == null) {
        return;
      } else {
        const payload = {
          page_number: "1",
          page_size: "20",
          "contact-list_code": ConfigStore.selectedList.code,
          order: [
            {
              field: "name",
              type: "ASC",
            },
          ],
        };
        try {
          const response = await $fetch(
            "https://proxy.cors.sh/https://api.dinamize.com/emkt/field/search",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Access-Control-Allow-Origin": "*",
                "x-cors-api-key": "temp_4be2c4562bb040588f036493d162b34f",
                "Access-Control-Allow-Headers": "x-requested-with",
                Accept: "application/json",
                "auth-token": authStore.authToken,
              },
              body: payload,
            }
          );
          if (response.code_detail == "Sucesso") {
            // Adiciona informações no front
            console.log("Sucesso em buscar nomes dos campos");
            console.log(response.body);
            this.fields = response.body.items;

            //Adiciona a lista carregada da store
            const ConfigStore = useConfigStore();
            this.qtdCompras = ConfigStore.selectedQtdCompras;
            this.totalGasto = ConfigStore.selectedTotalGasto;
            this.lastPurchaseDate = ConfigStore.selectedLastPurchaseDate;
            this.ticketMedio = ConfigStore.selectedTicketMedio;

            console.log("qtd: " + this.qtdCompras);
            console.log("totalgasto: " + this.totalGasto);
            console.log("lastpurDate: " + this.lastPurchaseDate);
            console.log("lastpurDate: " + this.ticketMedio);
          } else {
            this.$toast.add({
              severity: "error",
              summary: "Atenção",
              detail: response.code_detail,
              life: 3000,
            });
            console.log("Falha");
          }
        } catch (error) {
          console.error("Login falhou:", error);
        }
      }
    },
    setList() {
      const ConfigStore = useConfigStore();

      //Limpa as opções de campo anterior
      ConfigStore.clearFields();

      //Resgata os campos para busca
      ConfigStore.saveSelectedList(this.list);
      console.log("Passando objeto e funcionando: " + ConfigStore.selectedList);
      this.getDinamizeFields();

      this.$toast.add({
        severity: "success",
        summary: "Seleção de lista",
        detail: "Lista alterada",
        life: 2000,
      });
    },
    setQtdCompras() {
      //Adiciona no store configStore
      const ConfigStore = useConfigStore();
      ConfigStore.saveQtdCompras(this.qtdCompras);
      this.$toast.add({
        severity: "success",
        summary: "Campo e-commerce",
        detail: "Campo quantidade de compras alterado",
        life: 2000,
      });
    },
    setlastPurchaseDate() {
      //Adiciona no store configStore
      const ConfigStore = useConfigStore();
      ConfigStore.saveLastPurchaseDate(this.lastPurchaseDate);

      this.$toast.add({
        severity: "success",
        summary: "Campo e-commerce",
        detail: "Campo Data da última compra alterado",
        life: 2000,
      });
    },
    setTotalGasto() {
      //Adiciona no store configStore
      const ConfigStore = useConfigStore();
      ConfigStore.saveTotalGasto(this.totalGasto);

      this.$toast.add({
        severity: "success",
        summary: "Campo e-commerce",
        detail: "Campo Total gasto alterado",
        life: 2000,
      });
    },
    setTicketMedio() {
      //Adiciona no store configStore
      const ConfigStore = useConfigStore();
      ConfigStore.saveTicketMedio(this.ticketMedio);

      this.$toast.add({
        severity: "success",
        summary: "Campo e-commerce",
        detail: "Campo Ticket médio salvo.",
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

      // Redireciona para a página de login
      this.$router.push("/");
    },
  },
};
</script>
