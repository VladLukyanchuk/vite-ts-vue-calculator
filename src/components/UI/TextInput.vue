<template>
  <input
    :value="modelValue"
    @input="updateModelValue"
    class="form-input__control"
    :class="{ error: error }"
    type="number"
  />
</template>

<script lang="ts" setup>
import { withDefaults } from "vue";
import { TextInputProps } from "../../utils/types";

const emit = defineEmits(["update:modelValue"]);

withDefaults(defineProps<TextInputProps>(), {
  required: false,
});

const updateModelValue = (event: Event) => {
  const newValue = (event.target as HTMLInputElement).value;
  emit("update:modelValue", Number(newValue));
};
</script>
