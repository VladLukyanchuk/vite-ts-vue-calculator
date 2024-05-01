<template>
  <div class="white-block">
    <div class="white-block__content">
      <div v-if="$slots.title" class="white-block__title">
        <h2><slot name="title" /></h2>
      </div>
      <slot />
      <div v-if="$slots.buttons" class="white-block__buttons">
        <slot name="buttons" />
      </div>
    </div>
  </div>
</template>
