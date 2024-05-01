<template>
  <WhiteBlock>
    <VueApexCharts
      type="bar"
      height="100%"
      :options="store.options"
      :series="data?.series"
    />
  </WhiteBlock>
</template>

<script lang="ts" setup>
import { useChartStore } from "../../stores/ChartStore";
import { DataProps } from "../../utils/types";

// HACK: No typescript declaration file available: https://github.com/apexcharts/vue3-apexcharts/issues/2
// eslint-disable-next-line
// @ts-ignore
import VueApexCharts from "vue3-apexcharts";
import WhiteBlock from "./WhiteBlock.vue";

defineProps<DataProps>();
const store = useChartStore();
</script>
