<template>
  <div>
    <div class="funnel animate-fadein animate-duration-400"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      graph: null,
      currentValues: [3000, 2200, 1000, 500, 200],
    };
  },
  mounted() {
    this.loadGraph();
  },

  methods: {
    loadGraph() {
      const interval = setInterval(() => {
        if (typeof FunnelGraph !== 'undefined') {
          clearInterval(interval); // Para a verificação quando o FunnelGraph estiver disponível
          document.querySelector('.funnel').innerHTML = '';
          this.graph = new FunnelGraph({
            container: '.funnel',
            gradientDirection: 'vertical',
            data: {
              labels: [
                'Enviados',
                'Entregues',
                'Visualizados',
                'Clicados',
                'Receita',
              ],
              colors: [
                ['#FFB178', '#FF78B1', '#FF3C8E'],
                '#6366f1',
                ['#363885'],
              ],
              values: this.currentValues,
            },
            displayPercent: true,
            direction: 'vertical',
          });
          this.graph.draw();
        }
      }, 100);
    },
    updateGraph() {
      this.currentValues = [8000, 3200, 2800, 950, 90];
      this.loadGraph();
    },
  },
};
</script>

<style>
.funnel {
  width: 100%;
  height: 200px;
}
.btn {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #6366f1;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.btn:hover {
  background-color: #4f46e5;
}

.svg-funnel-js__labels .label__value,
.svg-funnel-js__subLabel--title {
  color: #111324 !important;
}
.svg-funnel-js__labels .label__title {
  color: #6366f1 !important;
}
</style>
