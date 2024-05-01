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

import VueApexCharts from "vue3-apexcharts";
import WhiteBlock from "./WhiteBlock.vue";

defineProps<DataProps>();
const store = useChartStore();
</script>
