<template>
  <button
    :class="[
      'px-4 py-2 rounded',
      variant === 'primary' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black',
    ]"
    :type="type"
    @click="onClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

defineProps({
  variant: { type: String, default: 'primary' },
  type: { type: String, default: 'button' },
});

defineEmits(['click']);
</script>
