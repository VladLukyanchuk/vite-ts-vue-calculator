<template>
  <label class="form-label" :class="{ error: error }">
    <div class="form-label__text" :class="{ 'form-label__required': required }">
      {{ text }}
    </div>
    <slot />
    <Transition name="fade">
      <div v-if="error" class="form-label__error-text">
        {{ error }}
      </div>
    </Transition>
  </label>
</template>

<script lang="ts" setup>
defineProps({
  text: {
    required: true,
    type: String,
  },
  required: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: "",
  },
});
</script>
