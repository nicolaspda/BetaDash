<template>
  <div class="Knob h-80">
    <div class="Knobs flex justify-center text-center gap-9">
      <Card
        v-for="(knob, index) in knobs"
        :key="knob.title"
        class="!shadow-none"
      >
        <template #title>{{ knob.title }}</template>
        <template #subtitle
          >Performance Geral
          <span
            v-tooltip.top="knob.tooltip"
            class="pi pi-question-circle text-primary-500"
          ></span
        ></template>
        <template #content>
          <Knob
            readonly
            v-model="knob.valuePercent"
            :strokeWidth="5"
            :valueTemplate="`${knob.valuePercent}%`"
            :size="160"
            :valueColor="knob.valueColor"
            class="font-semibold"
          />
        </template>
      </Card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      knobs: [
        {
          title: 'Taxa de Entrega',
          valueColor: 'var(--p-indigo-500)',
          valuePercent: 0,
          tooltip:
            'Representa a porcentagem geral dos envios que estão sendo entregues aos contatos relacionados nos disparos. \n\n DICA: Realize a higienização de sua base frequentemente. Adicionando os contatos sem interação em um período de descanso.',
        },
        {
          title: 'Taxa de Abertura',
          valueColor: 'var(--p-purple-500)',
          valuePercent: 0,
          tooltip:
            'Representa a porcentagem geral dos envios que estão sendo abertos no período selecionado. \n\n DICA: Envie disparos personalizados por interesse aos seus contatos e procure trabalhar sempre com sua base quente.',
        },
        {
          title: 'Taxa de Cliques',
          valueColor: 'var(--p-cyan-500)',
          valuePercent: 0,
          tooltip:
            'Representa a porcentagem geral dos cliques em envios dentre aqueles que foram abertos.\n\n DICA: Adicione links em CTAs para compreender as preferências do seu público.',
        },
      ],
      sendCollection: {
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
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        // Simulação de API (substitua pela sua URL real)
        //const response = await fetch('https://api.exemplo.com/dados');
        //const data = await response.json();

        // Supondo que a API retorne { entrega: 95, abertura: 34, cliques: 10 }
        const valoresAPI = [95, 34, 10]; //[data.entrega, data.abertura, data.cliques];

        // Duração da animação
        const duracaoAnimacao = 1000; // 1 segundo
        const intervalo = 20; // Intervalo entre atualizações
        const totalSteps = duracaoAnimacao / intervalo;

        this.knobs.forEach((knob, index) => {
          this.animateKnob(knob, valoresAPI[index], totalSteps, intervalo);
        });
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    },
    animateKnob(knob, finalValue, totalSteps, intervalo) {
      let current = 0;
      let stepSize = finalValue / totalSteps; // Incremento fixo

      const animation = setInterval(() => {
        if (current >= totalSteps) {
          knob.valuePercent = finalValue; // Garante que o valor final seja exato
          clearInterval(animation);
        } else {
          knob.valuePercent = Math.round(current * stepSize);
          current++;
        }
      }, intervalo);
    },
  },
};
</script>

<style>
.p-knob-text {
  font-size: small;
}
</style>
