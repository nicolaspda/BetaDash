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
          <p class="m-2">Info</p>
        </Fieldset>
        <!--Insight 2-->
        <Fieldset>
          <template #legend>
            <div class="flex items-center pl-2">
              <Avatar icon="pi pi-shopping-bag" size="small" />
              <span class="font-bold p-2">Volume de compras</span>
            </div>
          </template>
          <p class="m-2">Info</p>
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
          Conteúdo da resposta
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
    };
  },
  methods: {
    showDrawer() {
      this.visible = true; // Abre a drawer
    },
    showPrompt() {
      this.promptPhase = 2; // Manda para a textarea
    },
    executePrompt() {
      this.promptPhase = 3; // Executa a query
    },
  },
};
</script>
