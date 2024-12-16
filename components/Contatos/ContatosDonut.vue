<template>
  <div class="card flex justify-center">
    <Chart
      type="doughnut"
      :data="chartData"
      :options="chartOptions"
      class="w-full md:w-[30rem]"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartData: null,
      chartOptions: {
        cutout: "60%",
      },
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
        labels: ["Quente 🔥", "Frio 🧊", "Morno ☕"],
        datasets: [
          {
            data: [540, 325, 702],
            backgroundColor: [
              documentStyle.getPropertyValue("--p-red-500"),
              documentStyle.getPropertyValue("--p-blue-500"),
              documentStyle.getPropertyValue("--p-yellow-500"),
            ],
            hoverBackgroundColor: [
              documentStyle.getPropertyValue("--p-surface-500"),
              documentStyle.getPropertyValue("--p-surface-500"),
              documentStyle.getPropertyValue("--p-surface-500"),
            ],
          },
        ],
      };
    },
    setChartOptions() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue("--p-text-color");

      return {
        plugins: {
          legend: {
            labels: {
              cutout: "60%",
              color: textColor,
            },
          },
        },
      };
    },
  },
};
</script>
