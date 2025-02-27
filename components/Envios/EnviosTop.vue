<template>
  <div class="pt-4">
    <DataTable
      size="small"
      v-model:expandedRows="expandedRows"
      v-model:filters="filters"
      :value="sendCollection"
      :rows="10"
      :rowHover="true"
      :rowClass="rowClass"
      dataKey="date_end"
      filterDisplay="row"
      :loading="loading"
      :globalFilterFields="['title', 'campaign']"
    >
      <template #header>
        <div
          class="flex flex-col gap-4 sm:flex-row sm:items-center justify-between"
        >
          <div class="flex flex-wrap gap-4">
            <!-- Seletor do tipo de status -->
            <FloatLabel class="w-full sm:w-56">
              <Dropdown
                v-model="filters['status'].value"
                id="status"
                :options="sendStatus"
                class="w-full"
                optionLabel="label"
                optionValue="code"
                :showClear="true"
              />
              <label for="status">Status</label>
            </FloatLabel>
            <div class="relative flex items-center">
              <span class="absolute left-2 text-gray-400">
                <i class="pi pi-search"></i>
              </span>
              <InputText
                v-model="filters['global'].value"
                placeholder="Pesquisar envio ou remetente"
                class="!pl-8 w-64 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
              />
            </div>
          </div>
          <div class="flex justify-end">LISTA dropdown</div>
        </div>
      </template>
      <template #empty>
        <p class="text-gray-600 text-center py-4">Nenhum envio encontrado.</p>
      </template>
      <!-- Dropdown de seleção -->
      <Column expander style="width: 5rem" />
      <!-- Coluna Nome do envio -->
      <Column
        field="title"
        sortable
        header="Envio"
        style="min-width: 5rem"
      ></Column>
      <!-- Coluna Remetente do envio -->
      <Column
        field="sender_email"
        sortable
        header="Remetente"
        style="min-width: 5rem"
        >{{ data.sender_email }}</Column
      >
      <!-- Coluna Status -->
      <Column field="status" sortable header="Status" style="min-width: 5rem">
        <template #body="{ data }">
          <Tag
            :icon="
              data.status === 'FN'
                ? 'pi pi-envelope'
                : data.status === 'AG'
                ? 'pi pi-calendar-plus'
                : data.status === 'PD'
                ? 'pi pi-file'
                : 'pi-exclamation-circle'
            "
            :value="
              data.status === 'FN'
                ? 'Enviado'
                : data.status === 'AG'
                ? 'Agendado'
                : data.status === 'PD'
                ? 'Rascunho'
                : 'Erro'
            "
            :severity="
              data.status === 'PD'
                ? 'warning'
                : data.status === 'AG'
                ? 'primary'
                : data.status === 'FN'
                ? 'success'
                : 'info'
            "
          ></Tag>
        </template>
      </Column>
      <!-- Coluna Data -->
      <Column field="date_end" header="Data" sortable style="min-width: 5rem">
        {{ data.date_end }}
      </Column>
      <!-- Coluna Público -->
      <Column
        field="deliverTax"
        header="Entrega"
        sortable
        style="min-width: 5rem"
      >
        <template #body="{ data }">
          <Knob
            readonly
            v-model="data.deliverTax"
            :strokeWidth="5"
            valueTemplate="{value}%"
            :size="70"
          />
        </template>
      </Column>
      <!-- Coluna Abertura -->
      <Column
        field="openingTax"
        header="Abertura"
        sortable
        style="min-width: 5rem"
      >
        <template #body="{ data }">
          <Knob
            readonly
            v-model="data.openingTax"
            :strokeWidth="5"
            valueTemplate="{value}%"
            valueColor="var(--p-purple-500)"
            :size="70"
          />
        </template>
      </Column>
      <!-- Coluna Clique -->
      <Column
        field="clicksTax"
        header="Clique"
        sortable
        style="min-width: 5rem"
      >
        <template #body="{ data }">
          <Knob
            v-model="data.clicksTax"
            :strokeWidth="5"
            valueTemplate="{value}%"
            valueColor="var(--p-cyan-500)"
            readonly
            :size="70"
          />
        </template>
      </Column>
      <template #expansion="{ data }">
        <div class="p-2 mx-40">
          <DataTable size="small" :value="[data]" :rowHover="false">
            <Column field="errorTax" header="Erros">
              <template #body="{ data }">
                <Knob
                  v-model="data.errorTax"
                  :strokeWidth="5"
                  valueTemplate="{value}%"
                  valueColor="var(--p-blue-900)"
                  readonly
                  :size="70"
                />
              </template>
            </Column>
            <Column field="spamTax" header="Denúncia SPAM">
              <template #body="{ data }">
                <Knob
                  v-model="data.spamTax"
                  :strokeWidth="5"
                  valueTemplate="{value}%"
                  valueColor="var(--p-red-500)"
                  readonly
                  :size="70"
                />
              </template>
            </Column>
            <Column field="optoutTax" header="OptOut">
              <template #body="{ data }">
                <Knob
                  v-model="data.optoutTax"
                  :strokeWidth="5"
                  valueTemplate="{value}%"
                  valueColor="var(--p-orange-500)"
                  readonly
                  :size="70"
                />
              </template>
            </Column>
          </DataTable>
        </div>
      </template>
    </DataTable>
  </div>
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { FilterMatchMode, FilterOperator } from '@primevue/core/api';

export default {
  data() {
    return {
      //Itens do tipo de status
      sendStatus: [
        { code: 'EN', label: 'Enviando' },
        { code: 'FN', label: 'Enviado' },
        { code: 'AG', label: 'Agendado' },
        { code: 'PP', label: 'Enviado Parcialmente' },
        { code: 'PD', label: 'Rascunho' },
        { code: 'AR', label: 'Arquivado' },
      ],
      metaKey: true,
      /*Dados da tabela*/
      /* sendCollection MOCK
      {
          title: 'Produtos top',
          campaign: 'Lançamento',
          status: 'FN',
          date: '12/01/2024',
          sent: '1100',
          delivered: 99,
          click: 28,
          view: 30,
          type: 'Instantânea',
        },
        {
          title: 'Pré-evento',
          campaign: 'Lançamento',
          status: 'AG',
          date: '13/01/2024',
          sent: '1100',
          delivered: 99,
          click: 7,
          view: 34,
          type: 'Instantânea',
        },
        {
          title: 'Presentes',
          campaign: 'Natal',
          status: 'FN',
          date: '14/01/2024',
          sent: '1100',
          delivered: 100,
          click: 10,
          view: 22,
          type: 'Instantânea',
        },
        {
          title: 'E-commerce repique',
          campaign: 'Destaques',
          status: 'PD',
          date: '15/01/2024',
          sent: '1100',
          delivered: 99,
          click: 5,
          view: 50,
          type: 'Instantânea',
        },
        {
          title: 'News atualizada',
          campaign: 'Destaques',
          status: 'FN',
          date: '16/01/2024',
          sent: '1100',
          delivered: 98,
          click: 8,
          view: 40,
          type: 'Instantânea',
        },
        {
          title: 'Selecionados do mês',
          campaign: 'E-commerce',
          status: 'AG',
          date: '17/01/2024',
          sent: '1100',
          delivered: 97,
          click: 10,
          view: 45,
          type: 'Instantânea',
        },
      */

      sendCollection: [],
      expandedRows: {},
      filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        status: { value: null, matchMode: FilterMatchMode.EQUALS },
      },
      loading: null,
    };
  },
  methods: {
    //Passa classe (estilo) para a linha selecionada
    rowClass(data) {
      return this.expandedRows[data.date_end] ? '!bg-yellow-50' : '';
    },
    async getDinaEnvios() {
      this.loading = true;
      const authStore = useAuthStore();
      const ConfigStore = useConfigStore();

      let chamada = {
        page_number: '1',
        page_size: '10',
        search: [
          {
            field: 'contact-list_code',
            operator: '=',
            value: ConfigStore.selectedList.code,
          },
          { field: 'status', operator: '=', value: 'FN' },
        ],
        order: [{ field: 'date_end', type: 'DESC' }],
      };

      try {
        const response = await $fetch(
          'https://proxy.cors.sh/https://api.dinamize.com/emkt/action/search',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
              'x-cors-api-key': 'temp_4be2c4562bb040588f036493d162b34f',
              'auth-token': authStore.authToken,
            },
            body: chamada,
          }
        );

        if (response.code_detail === 'Sucesso') {
          console.log('Sucesso em buscar envios. Buscando relatórios...');

          let items = response.body.items;

          // Usando map para criar um array de promessas para esperar todas carregarem
          const requests = items.map(async (item) => {
            try {
              const reportResponse = await $fetch(
                'https://proxy.cors.sh/https://api.dinamize.com/emkt/action/report',
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'x-cors-api-key': 'temp_4be2c4562bb040588f036493d162b34f',
                    'auth-token': authStore.authToken,
                  },
                  body: { action_code: item.code, type: 'summary' },
                }
              );

              console.log(`Relatório carregado para ${item.title}`);

              const sent = reportResponse.body.sent;
              const delivered = reportResponse.body.delivered;
              const views = reportResponse.body.view;
              const clicks = reportResponse.body.click;
              const spam = reportResponse.body.spam;
              const optout = reportResponse.body.optout;
              const error = reportResponse.body.error;

              //Taxas dos dados na linha externa da tabela
              item.deliverTax =
                sent > 0 ? Math.round((delivered / sent) * 100) : 0;
              item.openingTax =
                delivered > 0 ? Math.round((views / delivered) * 100) : 0;
              item.clicksTax =
                views > 0 ? Math.round((clicks / views) * 100) : 0;

              //Taxas dos dados na linha interna da tabela
              item.spamTax = views > 0 ? Math.round((spam / views) * 100) : 0;
              item.optoutTax =
                views > 0 ? Math.round((optout / views) * 100) : 0;
              item.errorTax = sent > 0 ? Math.round((error / sent) * 100) : 0;

              return item;
            } catch (error) {
              console.error(
                `Erro ao carregar relatório para ${item.title}:`,
                error
              );
              return item; // Retorna o item sem os dados do relatório
            }
          });
          // Aguarda todas as requisições terminarem antes de atualizar o estado
          this.sendCollection = await Promise.all(requests);
          this.loading = false;

          console.log('Todos os relatórios foram carregados.');
        } else {
          console.log('Falha ao buscar envios.');
        }
      } catch (error) {
        console.error('Erro genérico', error);
      }
    },
  },
  mounted() {
    this.getDinaEnvios();
  },
};
</script>

<style>
/* Remove hover apenas do segundo DataTable */
.p-datatable-row-expansion {
  background-color: transparent !important;
}
.p-datatable-row-expansion .p-row-even {
  background-color: transparent !important;
}
</style>
