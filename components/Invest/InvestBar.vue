<template>
  <div class="topo flex justify-end">
    <Button
      size="small"
      rounded
      icon="pi pi-plus"
      label="Cadastrar investimento"
    ></Button>
  </div>
  <p>
    Consolidado <span class="font-bold">mensal </span> e
    <span class="font-bold">anual: </span>
  </p>
  <div class="flex justify-evenly">
    <div class="flex flex-col gap-5">
      <Card>
        <template #content>
          <MeterGroup :value="valueInvest" class="flex justify-center mx-5">
          </MeterGroup>
        </template>
      </Card>

      <div class="flex justify-center">
        <InvestRoi></InvestRoi>
      </div>
    </div>

    <Divider layout="vertical" class="!h-80" />
    <div class="chart w-1/2">
      <Chart
        type="line"
        :data="chartData"
        :options="chartOptions"
        class="h-[20rem]"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      valueInvest: [
        {
          label: 'Google Ads',
          color: 'var(--p-green-500)',
          value: 15,
          icon: 'pi pi-google',
        },
        {
          label: 'E-mail',
          color: 'var(--p-primary-500)',
          value: 8,
          icon: 'pi pi-envelope',
        },
        {
          label: 'Campanha offline',
          color: 'var(--p-yellow-500)',
          value: 24,
          icon: 'pi pi-megaphone',
        },
        {
          label: 'Facebook Ads',
          color: 'var(--p-blue-500)',
          value: 43,
          icon: 'pi pi-facebook',
        },
        {
          label: 'Equipe',
          color: 'var(--p-surface-500)',
          value: 10,
          icon: 'pi pi-users',
        },
      ],
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
      const documentStyle = getComputedStyle(document.documentElement);

      return {
        labels: [
          'Janeiro',
          'Fevereiro',
          'Março',
          'Abril',
          'Maio',
          'Junho',
          'Julho',
        ],
        datasets: [
          {
            label: 'Google Ads',
            fill: false,
            borderColor: documentStyle.getPropertyValue('--p-green-500'),
            yAxisID: 'y',
            tension: 0.4,
            data: [65, 59, 80, 81, 56, 55, 10],
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            fill: true,
          },
          {
            label: 'Email',
            fill: false,
            borderColor: documentStyle.getPropertyValue('--p-primary-500'),
            yAxisID: 'y',
            tension: 0.4,
            data: [28, 48, 40, 19, 86, 27, 90],
            backgroundColor: 'rgba(224, 231, 255, 0.3)',
            fill: true,
          },
          {
            label: 'Campanha offline',
            fill: false,
            borderColor: documentStyle.getPropertyValue('--p-yellow-500'),
            yAxisID: 'y',
            tension: 0.4,
            data: [20, 85, 55, 19, 63, 52, 100],
            backgroundColor: 'rgba(255, 249, 196, 0.3)',
            fill: true,
          },
          {
            label: 'Facebook',
            fill: false,
            borderColor: documentStyle.getPropertyValue('--p-blue-500'),
            yAxisID: 'y',
            tension: 0.4,
            data: [44, 63, 55, 38, 53, 88, 90],
            backgroundColor: 'rgba(219, 234, 254, 0.3)',
            fill: true,
          },
          {
            label: 'Equipe',
            fill: false,
            borderColor: documentStyle.getPropertyValue('--p-surface-500'),
            yAxisID: 'y',
            tension: 0.4,
            data: [44, 63, 55, 38, 53, 88, 90],
            backgroundColor: 'rgba(219, 234, 254, 0.3)',
            fill: true,
          },
        ],
      };
    },
    setChartOptions() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');
      const textColorSecondary = documentStyle.getPropertyValue(
        '--p-text-muted-color'
      );
      const surfaceBorder = documentStyle.getPropertyValue(
        '--p-content-border-color'
      );

      return {
        stacked: false,
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
          legend: {
            labels: {
              color: textColor,
            },
          },
        },
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
              drawOnChartArea: true,
            },
          },
        },
      };
    },
  },
};
</script>
