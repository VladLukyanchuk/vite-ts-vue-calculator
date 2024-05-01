<template>
  <button class="button" :class="{ 'button--danger': type === 'danger' }">
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { withDefaults } from "vue";
import { ButtonProps } from "../../utils/types";

const props = withDefaults(defineProps<ButtonProps>(), {
  type: "blue",
});
</script>
