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
    <!--Abre dialog com pessoas segmentadas na opção-->
    <Dialog :visible="visible" modal header="Show RFMdata" :closable="false">
      <template #header>
        <div class="inline-flex items-center justify-center gap-2">
          <Avatar icon="pi pi-users" shape="circle" />
          <span class="font-bold whitespace-nowrap">
            {{ selection.label }}
          </span>
        </div>
      </template>
      <span class="text-surface-500 dark:text-surface-400 block mb-8">{{
        selection.info
      }}</span>
      <div class="table">
        <DataTable
          :value="tableContent"
          paginator
          :rows="5"
          :row-hover="true"
          size="small"
          :rowsPerPageOptions="[5, 10, 20, 50]"
          tableStyle="min-width: 50rem"
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="{first} até {last} de {totalRecords}"
        >
          <Column
            field="name"
            header="Nome"
            style="width: 25%"
            sortable
          ></Column>
          <Column
            field="email"
            header="Email"
            style="width: 25%"
            sortable
          ></Column>
        </DataTable>
      </div>

      <template #footer>
        <Button
          label="Fechar"
          text
          severity="secondary"
          @click="visible = false"
          autofocus
        />
        <Button
          label="Exportar"
          icon="pi pi-download"
          outlined
          severity="secondary"
          @click="visible = false"
          autofocus
        />
      </template>
    </Dialog>
    <!--Parte dedicada à análise RFM avançada-->
    <Card class="w-full">
      <template #header>
        <div class="bg-primary rounded-t-md h-2">&nbsp;</div>
      </template>
      <template #title>Análise avançada</template>
      <template #subtitle>RFM</template>
      <template #content>
        <div class="m-0 flex justify-center">
          <OrganizationChart :value="data" collapsible>
            <template #metricType="slotProps">
              <div
                class="flex flex-col"
                v-tooltip.top="slotProps.node.data.info"
              >
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
              <div @click="openMetric(slotProps)">
                <span>{{ slotProps.node.label }} </span>
              </div>
            </template>
          </OrganizationChart>
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      tableContent: [
        { name: 'Nicolas', email: 'nicolas@dinamize.com' },
        { name: 'Laura da Silva', email: 'laura@dinamize.com' },
      ],
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
          color1: 'var(--p-cyan-500)',
          value: 1000,
          icon: 'pi pi-dollar',
        },
        {
          label: 'Última compra a 30 dias',
          color1: 'var(--p-green-500)',
          value: 1000,
          icon: 'pi pi-calendar',
        },
        {
          label: 'Última compra a 90 dias',
          color1: 'var(--p-yellow-500)',
          value: 1000,
          icon: 'pi pi-calendar-clock',
        },
        {
          label: 'Última compra a 180 dias',
          color1: 'var(--p-red-500)',
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
            styleClass: 'hover:!bg-green-50 hover:cursor-default',
            data: {
              image:
                'https://primefaces.org/cdn/primevue/images/avatar/annafali.png',
              name: 'RFM Alto',
              title: '75%',
              info: 'Te amam! Seu Cliente ideal.',
            },
            children: [
              {
                key: '0_0_0',
                styleClass: 'hover:!bg-green-50 cursor-pointer',
                label: 'Campeões',
                info: 'Os melhores clientes. Compraram e gastaram muito além de terem feito compras recentes.',
              },
              {
                key: '0_0_1',
                styleClass: 'hover:!bg-green-50 cursor-pointer',
                label: 'Fiéis',
                info: 'Clientes muito bons. Gastaram muito.',
              },
            ],
          },
          {
            key: '0_1',
            type: 'metricType',
            styleClass: 'hover:!bg-yellow-50 hover:cursor-default',
            data: {
              image:
                'https://primefaces.org/cdn/primevue/images/avatar/stephenshaw.png',
              name: 'RFM Médio',
              title: '15%',
              info: 'Tem simpatia por você! Seu Cliente médio.',
            },
            children: [
              {
                key: '0_1_0',
                label: 'Novos',
                styleClass: 'hover:!bg-yellow-50 cursor-pointer',
                info: 'Clientes recentes, que fizeram apenas algumas compras.',
              },
              {
                key: '0_1_1',
                label: 'Promissores',
                styleClass: 'hover:!bg-yellow-50 cursor-pointer',
                info: 'Gastam bastante ou fazem muitas compras mas a última já faz algum tempo.',
              },
              {
                key: '0_1_2',
                label: 'Atenção',
                styleClass: 'hover:!bg-yellow-50 cursor-pointer',
                info: 'Compravam com frequencia, mas não fazem compras a um bom tempo',
              },
              {
                key: '0_1_3',
                label: 'Risco',
                styleClass: 'hover:!bg-yellow-50 cursor-pointer',
                info: 'Gastaram muito mas estão inativos há um bom tempo.',
              },
            ],
          },
          {
            key: '0_2',
            type: 'metricType',
            styleClass: 'hover:!bg-red-50 hover:cursor-default',
            data: {
              image:
                'https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png',
              name: 'RFM Baixo',
              title: '10%',
              info: 'Você é indiferente para eles. Cliente problemático.',
            },
            children: [
              {
                key: '0_2_0',
                label: 'Hibernando',
                styleClass: 'hover:!bg-red-50 cursor-pointer',
                info: 'Baixa frequencia e baixo gasto. Não compram há muito tempo.',
              },
              {
                key: '0_2_1',
                label: 'Perdidos',
                styleClass: 'hover:!bg-red-50 cursor-pointer',
                info: 'Os piores clientes. Não compram a muito tempo, compraram apenas 1x e gastaram pouco.',
              },
            ],
          },
        ],
      },
      selection: [],
    };
  },
  methods: {
    openMetric(slotProps) {
      this.selection = slotProps.node;

      //Busca dado do node no Dinamize Automation
      getDinamizeContacts();

      console.log(this.selection);
      this.visible = true;
    },
    async getDinamizeContacts() {
      const authStore = useAuthStore();
      const ConfigStore = useConfigStore();

      if (ConfigStore.selectedList == null) {
        return;
        //O que fazer quando o cliente não selecionou nada
      } else {
        const payload = {
          page_number: '1',
          page_size: '10',
          'contact-list_code': ConfigStore.selectedList.code,
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
      }
    },
  },
};
</script>

<style>
.group {
  box-shadow: none;
}
.p-organizationchart {
  --p-organizationchart-gutter: 10px;
}
</style>
