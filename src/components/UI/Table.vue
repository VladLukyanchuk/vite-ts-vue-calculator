<template>
  <table v-if="data">
    <thead>
      <tr>
        <th>Year</th>
        <th>Refills</th>
        <th>Percents</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="year of data.yearsArray" :key="year">
        <td>{{ year }}</td>
        <td>
          {{
            getNumberWithSpaces(data.series[1].data[year - 1]) +
            " " +
            data.currency
          }}
        </td>
        <td>
          {{
            getNumberWithSpaces(data.series[2].data[year - 1]) +
            " " +
            data.currency
          }}
        </td>
        <td>
          {{ getNumberWithSpaces(getTotalPerYear(year)) + " " + data.currency }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import { getNumberWithSpaces } from "../../utils/getNumberWithSpaces";
import { DataProps } from "../../utils/types";

const props = defineProps<DataProps>();

function getTotalPerYear(year: number): number {
  if (!props.data) {
    return 0;
  }
  return props.data.series.reduce((accumulator, currentValue) => {
    const currentSum =
      currentValue.data[year - 1] !== undefined
        ? currentValue.data[year - 1]
        : 0;
    return accumulator + currentSum;
  }, 0);
}
</script>
