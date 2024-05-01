<template>
  <div class="form-select">
    <button
      @click="toggle()"
      class="form-select__control"
      :class="{
        'form-select__control_no-value': typeof modelValue !== 'number',
        error: error,
      }"
      ref="reference"
    >
      <span class="line-clamp">
        {{ buttonText }}
      </span>
      <svg
        height="10"
        width="10"
        id="Capa_1"
        style="enable-background: new 0 0 26.002 45.999"
        version="1.1"
        viewBox="0 0 26.002 45.999"
        xml:space="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <path
          d="M24.998,40.094c1.338,1.352,1.338,3.541,0,4.893c-1.338,1.35-3.506,1.352-4.846,0L1.004,25.447  c-1.338-1.352-1.338-3.543,0-4.895L20.152,1.014c1.34-1.352,3.506-1.352,4.846,0c1.338,1.352,1.338,3.541,0,4.893L9.295,23  L24.998,40.094z"
        />
      </svg>
    </button>
    <div
      v-if="showMenu"
      ref="floating"
      class="form-select__menu"
      :style="(floatingStyles, { width: width + 18 + 'px' })"
    >
      <ul class="form-select__list">
        <li
          v-for="option in options"
          :key="option.id"
          @click.prevent="handleOptionClick(option.id)"
          class="form-select__option"
          :class="{
            'form-select__acive-option': option.id === props.modelValue,
          }"
        >
          {{ option.label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { useFloating } from "@floating-ui/vue";
import { useElementSize } from "@vueuse/core";
import { onClickOutside } from "@vueuse/core";

import { FormSelectProps } from "../../utils/types";

const props = defineProps<FormSelectProps>();
const emit = defineEmits(["update:model-value"]);

const showMenu = ref<boolean>(false);

const buttonText = computed<string>(() => {
  if (typeof props.modelValue === "number") {
    const selectedOption = props.options.find((option) => {
      return option.id === props.modelValue;
    });

    return selectedOption ? selectedOption.label : "Wrong option";
  }
  return "Select option";
});

function handleOptionClick(value: number) {
  emit("update:model-value", value);
  close();
}

function toggle() {
  showMenu.value = !showMenu.value;
}
function close() {
  showMenu.value = false;
}

//POPPER
const reference = ref<HTMLButtonElement | null>(null);
const floating = ref<HTMLDivElement | null>(null);
const { width } = useElementSize(reference);

onClickOutside(floating, () => close());

const { floatingStyles } = useFloating(floating, floating, {
  placement: "bottom",
});
</script>
