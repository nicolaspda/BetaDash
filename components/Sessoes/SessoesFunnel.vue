<template>
  <div class="funnel"></div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.loadGraph();
  },
  methods: {
    loadGraph() {
      var graph = new FunnelGraph({
        container: '.funnel',
        gradientDirection: 'horizontal',
        data: {
          labels: ['Impressions', 'Add To Cart', 'Purchase'],
          subLabels: ['Direct', 'Social Media', 'Ads'],
          colors: [['#FFB178', '#FF78B1', '#FF3C8E'], '#6366f1', ['#363885']],
          values: [
            [2000, 4000, 6000],
            [3000, 1000, 1700],
            [200, 30, 130],
          ],
        },
        displayPercent: true,
        direction: 'horizontal',
      });
      graph.draw();
    },
  },
};
</script>

<style>
.funnel {
  width: 100%;
  height: 200px;
}
</style>
