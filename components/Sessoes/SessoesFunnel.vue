<template>
  <div>
    <div class="funnel animate-fadein animate-duration-400"></div>
    <button @click="updateGraph" class="btn">Atualizar Gráfico</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      graph: null,
      currentValues: [
        [2000, 4000, 6000],
        [3000, 1000, 1700],
        [200, 30, 130],
      ],
    };
  },
  mounted() {
    this.loadGraph();
  },
  methods: {
    loadGraph() {
      document.querySelector('.funnel').innerHTML = '';
      this.graph = new FunnelGraph({
        container: '.funnel',
        gradientDirection: 'horizontal',
        data: {
          labels: ['Impressions', 'Add To Cart', 'Purchase'],
          subLabels: ['Direct', 'Social Media', 'Ads'],
          colors: [['#FFB178', '#FF78B1', '#FF3C8E'], '#6366f1', ['#363885']],
          values: this.currentValues,
        },
        displayPercent: true,
        direction: 'horizontal',
      });
      this.graph.draw();
    },

    updateGraph() {
      this.currentValues = [
        [8000, 4500, 2000],
        [3200, 1200, 1900],
        [250, 50, 150],
      ];
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
