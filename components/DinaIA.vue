<template>
  <div class="card flex justify-center">
    <Drawer v-model:visible="visible" position="right">
      <template #header>
        <div class="flex items-center gap-2">
          <Avatar icon="pi pi-sparkles" shape="circle" />
          <span class="font-bold">Insights</span>
        </div>
      </template>
      <div v-if="promptPhase == 1">
        <!--Insight 1-->
        <Fieldset>
          <template #legend>
            <div class="flex items-center pl-2">
              <Avatar
                icon="pi pi-envelope"
                size="small"
                class="!bg-primary-100"
              />
              <span class="font-bold p-2">Evolução de envios</span>
            </div>
          </template>
          <p class="m-2">
            A taxa de abertura média teve uma queda em relação a última semana.
            <span class="font-semibold"> De 10% para 6%.</span>
            Que tal dar uma chance para conteúdos diferentes?
          </p>
        </Fieldset>
        <!--Insight 2-->
        <Fieldset>
          <template #legend>
            <div class="flex items-center pl-2">
              <Avatar icon="pi pi-shopping-bag" size="small" />
              <span class="font-bold p-2">Volume de compras</span>
            </div>
          </template>
          <p class="m-2">
            O produto <span class="font-semibold">Bota preta JB</span> teve um
            aumento de vendas de <span class="font-semibold">6%</span> em
            relação ao mês anterior.
          </p>
        </Fieldset>
        <!--Insight 3-->
        <Fieldset>
          <template #legend>
            <div class="flex items-center pl-2">
              <Avatar icon="pi pi-shopping-bag" size="small" />
              <span class="font-bold p-2">Ações de implementação</span>
            </div>
          </template>
          <p class="m-2">
            Você nunca efetuou um disparo do tipo
            <span class="font-semibold">Teste A/B</span>. Crie uma ação com este
            recurso para avaliar o melhor resultado entre conteúdos distintos.
          </p>
        </Fieldset>
      </div>
      <div v-if="promptPhase == 2" class="mt-2">
        <FloatLabel variant="on">
          <Textarea
            id="question"
            v-model="question"
            rows="5"
            cols="25"
            style="resize: none"
          />
          <label for="question">Gostaria de saber</label>
        </FloatLabel>
      </div>
      <div v-if="promptPhase == 3" class="flex mt-2">
        <div>
          <Button
            icon="pi pi-copy sm"
            size="small"
            v-tooltip.top="'Copiar'"
          ></Button>
        </div>
        <div
          class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium"
        >
          {{ resposta }}
        </div>
      </div>
      <template #footer>
        <div class="flex items-center gap-2">
          <!--Phase 1-->
          <Button
            label="Perguntar à Dina-IA"
            icon="pi pi-sparkles text-yellow-300"
            class="flex-auto"
            @click="showPrompt"
            v-if="promptPhase == 1"
          ></Button>
          <Button
            label="Voltar"
            class="flex-auto"
            severity="danger"
            outlined
            @click="promptPhase = 1"
            v-if="promptPhase == 2"
          ></Button>
          <!--Phase 2-->
          <Button
            label="Questionar!"
            class="flex-auto"
            @click="executePrompt"
            v-if="promptPhase == 2"
          ></Button>
          <!--Phase 3-->
          <Button
            label="Voltar"
            class="flex-auto"
            @click="promptPhase = 2"
            v-if="promptPhase == 3"
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
      promptPhase: 1,
      question: '',
      history: [
        {
          GenericInfo: 0,
          GenericInfo2: '0',
          Kind: 3,
          Time: '2021-03-23 09:21:00',
          code: 18,
          custom_fields: {
            cmp10: '',
            cmp11: '0',
            cmp12: '0',
            cmp13: '',
            cmp4: '',
            cmp5: 'Porto Alegre',
            cmp6: '0',
            cmp7: '',
            cmp8: '',
            cmp9: '',
          },
          email: 'maisum@dinamize.com',
          external_code: '',
          name: 'Another One',
        },
        {
          GenericInfo: 0,
          GenericInfo2: '0',
          Kind: 3,
          Time: '2021-03-23 09:21:00',
          code: 17,
          custom_fields: {
            cmp10: '',
            cmp11: '0',
            cmp12: '0',
            cmp13: '',
            cmp4: '',
            cmp5: 'Curitiba',
            cmp6: '0',
            cmp7: 'RJ',
            cmp8: '',
            cmp9: '',
          },
          email: 'juliana.lopes@dinamize.com',
          external_code: '',
          name: 'Juliana',
        },
        {
          GenericInfo: 0,
          GenericInfo2: '0',
          Kind: 3,
          Time: '2021-03-23 09:22:00',
          code: 1,
          custom_fields: {
            cmp10: 'Anexo API',
            cmp11: '0',
            cmp12: '0',
            cmp13: '',
            cmp4: '',
            cmp5: 'Santo André',
            cmp6: '30',
            cmp7: 'RS',
            cmp8: '1zx8b0SJiOsoXIRRugHe7sQlg6_ZwXcCg',
            cmp9: 'Sim',
          },
          email: 'nicolas@dinamize.com',
          external_code: '',
          name: 'Nicolas',
        },
        {
          GenericInfo: 4,
          GenericInfo2: '0',
          Kind: 1,
          Time: '2021-03-23 09:38:00',
          code: 1,
          custom_fields: {
            cmp10: 'Anexo API',
            cmp11: '0',
            cmp12: '0',
            cmp13: '',
            cmp4: '',
            cmp5: 'Santo André',
            cmp6: '30',
            cmp7: 'RS',
            cmp8: '1zx8b0SJiOsoXIRRugHe7sQlg6_ZwXcCg',
            cmp9: 'Sim',
          },
          email: 'nicolas@dinamize.com',
          external_code: '',
          name: 'Nicolas',
        },
        {
          GenericInfo: 4,
          GenericInfo2: '0',
          Kind: 1,
          Time: '2021-03-23 09:38:00',
          code: 17,
          custom_fields: {
            cmp10: '',
            cmp11: '0',
            cmp12: '0',
            cmp13: '',
            cmp4: '',
            cmp5: 'Curitiba',
            cmp6: '0',
            cmp7: 'RJ',
            cmp8: '',
            cmp9: '',
          },
          email: 'juliana.lopes@dinamize.com',
          external_code: '',
          name: 'Juliana',
        },
        {
          GenericInfo: 4,
          GenericInfo2: '0',
          Kind: 1,
          Time: '2021-03-23 09:38:00',
          code: 18,
          custom_fields: {
            cmp10: '',
            cmp11: '0',
            cmp12: '0',
            cmp13: '',
            cmp4: '',
            cmp5: 'Porto Alegre',
            cmp6: '0',
            cmp7: '',
            cmp8: '',
            cmp9: '',
          },
          email: 'maisum@dinamize.com',
          external_code: '',
          name: 'Another One',
        },
        {
          GenericInfo: 0,
          GenericInfo2: '0',
          Kind: 3,
          Time: '2021-03-23 09:42:00',
          code: 1,
          custom_fields: {
            cmp10: 'Anexo API',
            cmp11: '0',
            cmp12: '0',
            cmp13: '',
            cmp4: '',
            cmp5: 'Santo André',
            cmp6: '30',
            cmp7: 'RS',
            cmp8: '1zx8b0SJiOsoXIRRugHe7sQlg6_ZwXcCg',
            cmp9: 'Sim',
          },
          email: 'nicolas@dinamize.com',
          external_code: '',
          name: 'Nicolas',
        },
        {
          GenericInfo: 0,
          GenericInfo2: '0',
          Kind: 3,
          Time: '2021-03-23 09:42:00',
          code: 17,
          custom_fields: {
            cmp10: '',
            cmp11: '0',
            cmp12: '0',
            cmp13: '',
            cmp4: '',
            cmp5: 'Curitiba',
            cmp6: '0',
            cmp7: 'RJ',
            cmp8: '',
            cmp9: '',
          },
          email: 'juliana.lopes@dinamize.com',
          external_code: '',
          name: 'Juliana',
        },
        {
          GenericInfo: 0,
          GenericInfo2: '0',
          Kind: 3,
          Time: '2021-03-23 09:42:00',
          code: 18,
          custom_fields: {
            cmp10: '',
            cmp11: '0',
            cmp12: '0',
            cmp13: '',
            cmp4: '',
            cmp5: 'Porto Alegre',
            cmp6: '0',
            cmp7: '',
            cmp8: '',
            cmp9: '',
          },
          email: 'maisum@dinamize.com',
          external_code: '',
          name: 'Another One',
        },
        {
          GenericInfo: 4,
          GenericInfo2: '0',
          Kind: 1,
          Time: '2021-03-23 09:43:00',
          code: 1,
          custom_fields: {
            cmp10: 'Anexo API',
            cmp11: '0',
            cmp12: '0',
            cmp13: '',
            cmp4: '',
            cmp5: 'Santo André',
            cmp6: '30',
            cmp7: 'RS',
            cmp8: '1zx8b0SJiOsoXIRRugHe7sQlg6_ZwXcCg',
            cmp9: 'Sim',
          },
          email: 'nicolas@dinamize.com',
          external_code: '',
          name: 'Nicolas',
        },
      ],
      resposta: '',
    };
  },
  methods: {
    showDrawer() {
      this.visible = true; // Abre a drawer
    },
    showPrompt() {
      this.promptPhase = 2; // Manda para a textarea
    },
    async executePrompt() {
      // Executa a query para o GPT
      const history = JSON.stringify(this.history);
      const chamada = {
        model: 'command-r-plus-08-2024',
        messages: [
          {
            role: 'user',
            content:
              'Considerando ' +
              history +
              'responda essa pergunta:' +
              this.question +
              ' sem me explicar como você chegou ao resultado',
          },
        ],
      };
      try {
        const response = await $fetch('https://api.cohere.com/v2/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Accept: 'application/json',
            Authorization: 'Bearer oqCJQ0tzV8yROmK4px8oo9uvDSCC6Bw99cixNzIH',
          },
          body: JSON.stringify(chamada),
        });
        console.log('sucesso em efetuar o prompt');
        this.resposta = response.message.content[0].text;
      } catch (error) {
        console.error('Login falhou:', error);
        this.$toast.add({
          severity: 'error',
          summary: 'Atenção',
          life: 3000,
        });
        console.log('Falha ao consumir API do CHATGPT');
      }
      this.promptPhase = 3; // Envia para a página com a resposta
    },
  },
};
</script>
