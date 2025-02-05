<template>
  <div class="pt-4">
    <DataTable
      size="small"
      v-model:filters="filters"
      :value="productsCollection"
      :rows="10"
      rowHover
      dataKey="title"
      filterDisplay="row"
      :loading="loading"
      :globalFilterFields="['title', 'category']"
    >
      <template #header>
        <div
          class="flex flex-col gap-4 sm:flex-row sm:items-center justify-between"
        >
          <div class="flex flex-wrap gap-4">
            <div class="relative flex items-center">
              <span class="absolute left-2 text-gray-400">
                <i class="pi pi-search"></i>
              </span>
              <InputText
                v-model="filters['global'].value"
                placeholder="Listar produtos"
                class="!pl-8 w-64 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
              />
            </div>
          </div>
        </div>
      </template>
      <template #empty>
        <p class="text-gray-600 text-center py-4">Nenhum produto encontrado.</p>
      </template>
      <template #loading>
        <p class="text-gray-600 text-center py-4">
          Carregando informações. Por favor, aguarde.
        </p>
      </template>
      <!-- Coluna Nome do Produto -->
      <Column
        field="title"
        sortable
        header="Produto"
        style="min-width: 5rem"
      ></Column>
      <!-- Coluna categoria do envio -->
      <Column
        field="category"
        sortable
        header="Categoria"
        style="min-width: 5rem"
      ></Column>
      <!-- Coluna imagem do produto -->
      <Column header="Foto">
        <template #body="{ data }">
          <img :src="data.image" class="w-24 rounded" />
        </template>
      </Column>
      <!-- Coluna Valor -->
      <Column
        field="value"
        header="Valor total"
        sortable
        style="min-width: 5rem"
      >
        <template #body="{ data }">
          {{ data.value }}
          <ProgressBar
            :showValue="false"
            :value="calculateProgressBarValue(data.value)"
          ></ProgressBar>
          {{ calculateProgressBarValue(data.value) }}
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
      sendSelected: [],
      metaKey: true,
      /*Dados da tabela*/
      productsCollection: [
        {
          title: 'Carrinho Rush',
          value: 'R$ 5.000,00',
          category: 'Brinquedos',
          image:
            'https://candide.vtexassets.com/arquivos/ids/1376997-800-800?v=638586912796600000&width=800&height=800&aspect=true',
        },
        {
          title: 'Boneca Encantada',
          value: 'R$ 1.200,00',
          category: 'Brinquedos',
          image:
            'https://www.havan.com.br/media/catalog/product/cache/73a52df140c4d19dbec2b6c485ea6a50/b/o/boneca-love-born-nenem-nanando-cotiplas_742265.webp',
        },
        {
          title: 'Jogo de Tabuleiro Estratégico',
          value: 'R$ 2.500,00',
          category: 'Brinquedos',
          image:
            'https://a-static.mlcdn.com.br/800x560/jogo-de-tabuleiro-estrategia-war-game-of-thrones-grow/maisquebrinquedos/15810970721/61b6e89f255c56ea44cd86efa5fe3c40.jpg',
        },
        {
          title: 'Lego Construção Criativa',
          value: 'R$ 6.000,00',
          category: 'Brinquedos',
          image:
            'https://rihappy.vtexassets.com/arquivos/ids/340861-800-auto?v=636438556914100000&width=800&height=auto&aspect=true',
        },
        {
          title: 'Fone de Ouvido Bluetooth',
          value: 'R$ 10.000,00',
          category: 'Eletrônicos',
          image:
            'https://lojamultilaser.vteximg.com.br/arquivos/ids/1361194-1000-1000/9481-00.jpg?v=638718196780230000',
        },
        {
          title: 'Smartwatch Fitness',
          value: 'R$ 750,00',
          category: 'Eletrônicos',
          image:
            'https://rihappy.vtexassets.com/arquivos/ids/6711496-800-auto?v=638631582707170000&width=800&height=auto&aspect=true',
        },
        {
          title: 'Camiseta Estilosa',
          value: 'R$ 900,00',
          category: 'Moda',
          image:
            'https://static.zattini.com.br/produtos/camiseta-criativa-urbana-caveira-estilosa-masculina/06/EMI-1439-006/EMI-1439-006_zoom1.jpg',
        },
        {
          title: 'Tênis Esportivo',
          value: 'R$ 4.000,00',
          category: 'Moda',
          image:
            'https://multitare.com/cdn/shop/products/tenis-esportivo-masculino-preto-34-163-373.jpg?v=1678742071',
        },
        {
          title: 'Cadeira Gamer',
          value: 'R$ 15.000,00',
          category: 'Móveis',
          image:
            'https://www.fujioka.com.br/arquivos/ids/227818-1000-1000/p_57591_alta_1.png?v=638206184549130000',
        },
        {
          title: 'Livro de Ficção Científica',
          value: 'R$ 800,00',
          category: 'Livros',
          image:
            'https://photos.enjoei.com.br/livro-de-ficcao-cientifica-95363531/800x800/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy8zNDUwODE0OS9kNzFmYWQ1NDc2MGEyNmE1ODJhNjdlYWUxODM0ODI1MS5qcGc',
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
    //Calcula o maior valor pra exibir na progressBar
    calculateProgressBarValue(value) {
      // Remover "R$", substituir vírgula por ponto e converter para número
      const numericValue = parseInt(value.replace(/[^\d,]/g, ''), 10);

      // Encontrar o valor máximo na coleção de produtos
      const maxValue = Math.max(
        ...this.productsCollection.map((product) =>
          parseInt(product.value.replace(/[^\d,]/g, ''), 10)
        )
      );
      // Calcular a porcentagem proporcional
      const progressValue = (numericValue / maxValue) * 100;
      return progressValue;
    },
  },
};
</script>
