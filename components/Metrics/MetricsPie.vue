<template>
  <div class="card flex justify-center">
    <Chart
      type="pie"
      :data="chartData"
      :options="chartOptions"
      class="w-full md:w-[20rem]"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartData: null,
      chartOptions: null,
    };
  },
  mounted() {
    this.chartData = this.setChartData();
    this.chartOptions = this.setChartOptions();
  },
  methods: {
    setChartData() {
      const documentStyle = getComputedStyle(document.body);

      return {
        labels: ['A', 'B', 'C'],
        datasets: [
          {
            data: [540, 325, 702],
            backgroundColor: [
              documentStyle.getPropertyValue('--p-cyan-500'),
              documentStyle.getPropertyValue('--p-orange-500'),
              documentStyle.getPropertyValue('--p-gray-500'),
            ],
            hoverBackgroundColor: [
              documentStyle.getPropertyValue('--p-cyan-400'),
              documentStyle.getPropertyValue('--p-orange-400'),
              documentStyle.getPropertyValue('--p-gray-400'),
            ],
          },
        ],
      };
    },
    setChartOptions() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');

      return {
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
              color: textColor,
            },
          },
        },
      };
    },
  },
};
</script>
