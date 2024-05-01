import { ref } from "vue";
import { defineStore } from "pinia";

export const useChartStore = defineStore("counter", () => {
  const options = ref({
    chart: {
      stacked: true,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    xaxis: {
      categories: [0],
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        sparkline: {
          enabled: true,
        },
      },
    },
    dataLabels: {
      enabled: true,
    },
    colors: ["#5925dc", "#1570ef", "#32d583"],
  });

  function changeDataLabelsVisibility(val: boolean): void {
    options.value.dataLabels.enabled = val;
  }

  return { options, changeDataLabelsVisibility };
});
