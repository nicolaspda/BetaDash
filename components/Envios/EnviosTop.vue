<template>
  <div class="pt-4">
    <DataTable
      size="small"
      v-model:filters="filters"
      v-model:selection="sendSelected"
      :value="sendCollection"
      paginator
      :rows="10"
      rowHover
      :rowClass="rowClass"
      dataKey="title"
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
                placeholder="Pesquisar envio ou campanha"
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
      <template #loading>
        <p class="text-gray-600 text-center py-4">
          Carregando informações. Por favor, aguarde.
        </p>
      </template>
      <!-- Checkbox de seleção -->
      <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
      <!-- Coluna Nome do envio -->
      <Column
        field="title"
        sortable
        header="Envio"
        style="min-width: 5rem"
      ></Column>
      <!-- Coluna Campanha do envio -->
      <Column
        field="campaign"
        sortable
        header="Campanha"
        style="min-width: 5rem"
      ></Column>
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
      <Column field="date" header="Data" sortable style="min-width: 5rem">
        {{ data.date }}
      </Column>
      <!-- Coluna Público -->
      <Column
        field="delivered"
        header="Entrega"
        sortable
        style="min-width: 5rem"
      >
        <template #body="{ data }">
          <Knob
            readonly
            v-model="data.delivered"
            :strokeWidth="5"
            valueTemplate="{value}%"
            :size="70"
          />
        </template>
      </Column>
      <!-- Coluna Abertura -->
      <Column field="view" header="Abertura" sortable style="min-width: 5rem">
        <template #body="{ data }">
          <Knob
            readonly
            v-model="data.view"
            :strokeWidth="5"
            valueTemplate="{value}%"
            valueColor="var(--p-purple-500)"
            :size="70"
          />
        </template>
      </Column>
      <!-- Coluna Clique -->
      <Column field="click" header="Clique" sortable style="min-width: 5rem">
        <template #body="{ data }">
          <Knob
            v-model="data.click"
            :strokeWidth="5"
            valueTemplate="{value}%"
            valueColor="var(--p-cyan-500)"
            readonly
            :size="70"
          />
        </template>
      </Column>
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
      sendSelected: [],
      metaKey: true,
      /*Dados da tabela*/
      sendCollection: [
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
      ],
      filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        status: { value: null, matchMode: FilterMatchMode.EQUALS },
      },
      loading: false,
    };
  },
  methods: {
    //Passa classe (estilo) para a linha selecionada
    rowClass(data) {
      return [{ '!bg-yellow-50': this.sendSelected.includes(data) }];
    },
  },
};
</script>
