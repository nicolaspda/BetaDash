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
    <Dialog
      :visible="visible"
      modal
      header="Show RFMdata"
      :closable="false"
    >
      <template #header>
        <div class="inline-flex items-center justify-center gap-2">
          <Avatar
            icon="pi pi-users"
            shape="circle"
          />
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
          :loading="tableLoading"
          size="small"
          :rowsPerPageOptions="[5, 10, 20]"
          tableStyle="min-width: 50rem"
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="{first} até {last} de {totalRecords}"
        >
          <template #empty>
            Não foram encontrados contatos neste critério.
          </template>
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
          <OrganizationChart
            :value="data"
            collapsible
          >
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
      tableContent: [],
      tableLoading: null,
      cards: [
        {
          label: "Uma compra",
          color1: "var(--p-primary-color)",
          value: 5000,
          icon: "pi pi-shopping-bag",
        },
        {
          label: "Mais de uma compra",
          color1: "var(--p-emerald-700)",
          value: 3000,
          icon: "pi pi-shopping-cart",
        },
        {
          label: "Maior que Ticket med.",
          color1: "var(--p-cyan-500)",
          value: 1000,
          icon: "pi pi-dollar",
        },
        {
          label: "Última compra a 30 dias",
          color1: "var(--p-green-500)",
          value: 1000,
          icon: "pi pi-calendar",
        },
        {
          label: "Última compra a 90 dias",
          color1: "var(--p-yellow-500)",
          value: 1000,
          icon: "pi pi-calendar-clock",
        },
        {
          label: "Última compra a 180 dias",
          color1: "var(--p-red-500)",
          value: 1000,
          icon: "pi pi-calendar-times",
        },
      ],
      data: {
        key: "0",
        type: "metricType",
        data: {
          image:
            "https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png",
          name: "RFM Geral",
          title: "100%",
        },
        children: [
          {
            key: "0_0",
            type: "metricType",
            styleClass: "hover:!bg-green-50 hover:cursor-default",
            data: {
              image:
                "https://primefaces.org/cdn/primevue/images/avatar/annafali.png",
              name: "RFM Alto",
              title: "75%",
              info: "Te amam! Seu Cliente ideal.",
            },
            children: [
              {
                key: "0_0_0",
                styleClass: "hover:!bg-green-50 cursor-pointer",
                label: "Campeões",
                info: "Os melhores clientes. Compraram e gastaram muito além de terem feito compras recentes.",
              },
              {
                key: "0_0_1",
                styleClass: "hover:!bg-green-50 cursor-pointer",
                label: "Clientes VIP",
                info: "Clientes muito bons. Gastaram bastante recentemente.",
              },
            ],
          },
          {
            key: "0_1",
            type: "metricType",
            styleClass: "hover:!bg-yellow-50 hover:cursor-default",
            data: {
              image:
                "https://primefaces.org/cdn/primevue/images/avatar/stephenshaw.png",
              name: "RFM Médio",
              title: "15%",
              info: "Tem simpatia por você! Seu Cliente médio.",
            },
            children: [
              {
                key: "0_1_0",
                label: "Novos",
                styleClass: "hover:!bg-yellow-50 cursor-pointer",
                info: "Clientes recentes que realizaram apenas uma compra.",
              },
              {
                key: "0_1_1",
                label: "Promissores",
                styleClass: "hover:!bg-yellow-50 cursor-pointer",
                info: "Gastam bastante ou fazem muitas compras mas a última já faz algum tempo.",
              },
              {
                key: "0_1_2",
                label: "Atenção",
                styleClass: "hover:!bg-yellow-50 cursor-pointer",
                info: "Compravam com frequencia, mas não fazem compras há um bom tempo",
              },
              {
                key: "0_1_3",
                label: "Risco",
                styleClass: "hover:!bg-yellow-50 cursor-pointer",
                info: "Gastaram muito mas estão inativos há um bom tempo.",
              },
            ],
          },
          {
            key: "0_2",
            type: "metricType",
            styleClass: "hover:!bg-red-50 hover:cursor-default",
            data: {
              image:
                "https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png",
              name: "RFM Baixo",
              title: "10%",
              info: "Você é indiferente para eles. Cliente problemático.",
            },
            children: [
              {
                key: "0_2_0",
                label: "Hibernando",
                styleClass: "hover:!bg-red-50 cursor-pointer",
                info: "Baixa frequencia e baixo gasto. Não compram há muito tempo.",
              },
              {
                key: "0_2_1",
                label: "Perdidos",
                styleClass: "hover:!bg-red-50 cursor-pointer",
                info: "Os piores clientes. Não compram a muito tempo, compraram apenas 1x e gastaram pouco.",
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
      this.tableLoading = true;
      //Busca dado do node selecionado (Metric) no Dinamize Automation
      this.loadDinamizeContacts();
      this.visible = true;
    },

    async getDinamizeContacts(filterValue) {
      const authStore = useAuthStore();
      const ConfigStore = useConfigStore();
      //Define a variável para seleção de payload
      let selectedFilter = filterValue.find((item) =>
        item.title.includes(this.selection.label)
      );

      console.log(selectedFilter);

      try {
        const response = await $fetch(
          "https://proxy.cors.sh/https://api.dinamize.com/emkt/contact/search",
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
            body: {
              "contact-list_code": ConfigStore.selectedList.code,
              page_number: "1",
              page_size: "100",
              custom_filter: selectedFilter.code,
              order: [
                {
                  field: "name",
                  type: "ASC",
                },
              ],
            },
          }
        );
        if (response.code_detail == "Sucesso") {
          // Adiciona informações no front
          console.log("Sucesso em buscar contatos do RFM");
          console.log(response.body);
          this.tableContent = response.body.items;
          this.tableLoading = false;
        } else {
          console.log("Falha");
        }
      } catch (error) {
        console.error("Login falhou:", error);
      }
    },
    async loadDinamizeContacts() {
      const authStore = useAuthStore();
      const ConfigStore = useConfigStore();

      if (ConfigStore.selectedList == null) {
        return;
        //O que fazer quando o cliente não selecionou nada
      } else {
        //Busca filtros
        try {
          const response = await $fetch(
            "https://proxy.cors.sh/https://api.dinamize.com/emkt/filter/search",
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
              body: {
                "contact-list_code": ConfigStore.selectedList.code,
                page_number: "1",
                page_size: "100",
                order: [
                  {
                    field: "value",
                    type: "ASC",
                  },
                ],
              },
            }
          );
          if (response.code_detail == "Sucesso") {
            // Sucesso em buscar nomes das segmentações
            console.log("Sucesso em buscar nomes das segmentações");

            const reservedFilter = "Dinamize Metrics";
            const containsReservedFilter = response.body.items.some((item) =>
              item.title.includes(reservedFilter)
            );
            if (!containsReservedFilter) {
              //Resgata a data atual comparando com o tempo necessário e formata no padrão Dinamize API
              const formatDate = (date) => {
                return (
                  date.getFullYear() +
                  "-" +
                  String(date.getMonth() + 1).padStart(2, "0") +
                  "-" +
                  String(date.getDate()).padStart(2, "0") +
                  " " +
                  String(date.getHours()).padStart(2, "0") +
                  ":" +
                  String(date.getMinutes()).padStart(2, "0") +
                  ":" +
                  String(date.getSeconds()).padStart(2, "0")
                );
              };

              const date30 = formatDate(
                new Date(new Date().setDate(new Date().getDate() - 30))
              );
              const date90 = formatDate(
                new Date(new Date().setDate(new Date().getDate() - 90))
              );
              const date180 = formatDate(
                new Date(new Date().setDate(new Date().getDate() - 180))
              );

              //Criar segmentações
              const segmentations = [
                {
                  "contact-list_code": ConfigStore.selectedList.code,
                  title: "Dinamize Metrics - Campeões",
                  type: "AND",
                  rule_list: [
                    {
                      type: "C",
                      reverse: false,
                      rule: {
                        field: ConfigStore.selectedQtdCompras.code,
                        operator: "GREATER_THAN",
                        value: "1",
                      },
                    },
                    {
                      type: "C",
                      reverse: false,
                      rule: {
                        field: ConfigStore.selectedTotalGasto.code,
                        operator: "GREATER_THAN",
                        value: ConfigStore.selectedTicketMedio,
                      },
                    },
                    {
                      type: "C",
                      reverse: false,
                      rule: {
                        field: ConfigStore.selectedLastPurchaseDate.code,
                        operator: "GREATER_THAN",
                        value: date30,
                      },
                    },
                  ],
                },
                {
                  "contact-list_code": ConfigStore.selectedList.code,
                  title: "Dinamize Metrics - Clientes VIP",
                  type: "AND",
                  rule_list: [
                    {
                      type: "C",
                      reverse: false,
                      rule: {
                        field: ConfigStore.selectedTotalGasto.code,
                        operator: "GREATER_THAN",
                        value: ConfigStore.selectedTicketMedio,
                      },
                    },
                    {
                      type: "C",
                      reverse: false,
                      rule: {
                        field: ConfigStore.selectedLastPurchaseDate.code,
                        operator: "GREATER_THAN",
                        value: date30,
                      },
                    },
                  ],
                },
                {
                  "contact-list_code": ConfigStore.selectedList.code,
                  title: "Dinamize Metrics - Novos",
                  type: "AND",
                  rule_list: [
                    {
                      type: "C",
                      reverse: false,
                      rule: {
                        field: ConfigStore.selectedQtdCompras.code,
                        operator: "EQUAL",
                        value: "1",
                      },
                    },
                    {
                      type: "C",
                      reverse: false,
                      rule: {
                        field: ConfigStore.selectedLastPurchaseDate.code,
                        operator: "GREATER_THAN",
                        value: date30,
                      },
                    },
                  ],
                },
                {
                  "contact-list_code": ConfigStore.selectedList.code,
                  title: "Dinamize Metrics - Promissores",
                  type: "AND",
                  rule_list: [
                    {
                      type: "C",
                      reverse: false,
                      rule: {
                        field: ConfigStore.selectedQtdCompras.code,
                        operator: "GREATER_THAN",
                        value: "1",
                      },
                    },
                    {
                      type: "C",
                      reverse: false,
                      rule: {
                        field: ConfigStore.selectedTotalGasto.code,
                        operator: "GREATER_THAN",
                        value: ConfigStore.selectedTicketMedio,
                      },
                    },
                    {
                      type: "C",
                      reverse: false,
                      rule: {
                        field: ConfigStore.selectedLastPurchaseDate.code,
                        operator: "LESS_THAN",
                        value: date30,
                      },
                    },
                    {
                      type: "C",
                      reverse: false,
                      rule: {
                        field: ConfigStore.selectedLastPurchaseDate.code,
                        operator: "GREATER_THAN",
                        value: date90,
                      },
                    },
                  ],
                },
                {
                  "contact-list_code": ConfigStore.selectedList.code,
                  title: "Dinamize Metrics - Atenção",
                  type: "AND",
                  rule_list: [
                    {
                      type: "C",
                      reverse: false,
                      rule: {
                        field: ConfigStore.selectedQtdCompras.code,
                        operator: "GREATER_THAN",
                        value: "1",
                      },
                    },
                    {
                      type: "C",
                      reverse: false,
                      rule: {
                        field: ConfigStore.selectedLastPurchaseDate.code,
                        operator: "GREATER_THAN",
                        value: date30,
                      },
                    },
                    {
                      type: "C",
                      reverse: false,
                      rule: {
                        field: ConfigStore.selectedLastPurchaseDate.code,
                        operator: "LESS_THAN",
                        value: date90,
                      },
                    },
                  ],
                },
                {
                  "contact-list_code": ConfigStore.selectedList.code,
                  title: "Dinamize Metrics - Risco",
                  type: "AND",
                  rule_list: [
                    {
                      type: "C",
                      reverse: false,
                      rule: {
                        field: ConfigStore.selectedTotalGasto.code,
                        operator: "GREATER_THAN",
                        value: ConfigStore.selectedTicketMedio,
                      },
                    },
                    {
                      type: "C",
                      reverse: false,
                      rule: {
                        field: ConfigStore.selectedLastPurchaseDate.code,
                        operator: "LESS_THAN",
                        value: date30,
                      },
                    },
                    {
                      type: "C",
                      reverse: false,
                      rule: {
                        field: ConfigStore.selectedLastPurchaseDate.code,
                        operator: "GREATER_THAN",
                        value: date90,
                      },
                    },
                  ],
                },
                {
                  "contact-list_code": ConfigStore.selectedList.code,
                  title: "Dinamize Metrics - Hibernando",
                  type: "AND",
                  rule_list: [
                    {
                      type: "C",
                      reverse: false,
                      rule: {
                        field: ConfigStore.selectedQtdCompras.code,
                        operator: "GREATER_THAN",
                        value: "1",
                      },
                    },
                    {
                      type: "C",
                      reverse: false,
                      rule: {
                        field: ConfigStore.selectedTotalGasto.code,
                        operator: "LESS_THAN",
                        value: ConfigStore.selectedTicketMedio,
                      },
                    },
                    {
                      type: "C",
                      reverse: false,
                      rule: {
                        field: ConfigStore.selectedLastPurchaseDate.code,
                        operator: "LESS_THAN",
                        value: date180,
                      },
                    },
                  ],
                },
                {
                  "contact-list_code": ConfigStore.selectedList.code,
                  title: "Dinamize Metrics - Perdidos",
                  type: "AND",
                  rule_list: [
                    {
                      type: "C",
                      reverse: false,
                      rule: {
                        field: ConfigStore.selectedQtdCompras.code,
                        operator: "EQUAL",
                        value: "1",
                      },
                    },
                    {
                      type: "C",
                      reverse: false,
                      rule: {
                        field: ConfigStore.selectedTotalGasto.code,
                        operator: "LESS_THAN",
                        value: ConfigStore.selectedTicketMedio,
                      },
                    },
                    {
                      type: "C",
                      reverse: false,
                      rule: {
                        field: ConfigStore.selectedLastPurchaseDate.code,
                        operator: "LESS_THAN",
                        value: date180,
                      },
                    },
                  ],
                },
              ];

              for (const segmentation of segmentations) {
                const response = await $fetch(
                  "https://proxy.cors.sh/https://api.dinamize.com/emkt/filter/add",
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
                    body: segmentation,
                  }
                );
                console.log("Segmentação criada :" + response);
              }
            }
            this.getDinamizeContacts(response.body.items);
          } else {
            console.log("Falha");
          }
        } catch (error) {
          console.error("Login falhou:", error);
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
