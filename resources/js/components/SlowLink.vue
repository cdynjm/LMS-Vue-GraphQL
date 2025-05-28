<script setup lang="ts">
import { ref } from 'vue';
import { router, Link } from '@inertiajs/vue3';

const props = defineProps({
  href: { type: String, required: true },
  class: {
    type: [String, Object, Array],
    default: '',
  },
});

const loading = ref(false);

function handleClick(event: Event) {
  event.preventDefault();

  if (loading.value) return;

  loading.value = true;

  setTimeout(() => {
    router.visit(props.href);
    loading.value = false;
  }, 1500);
}
</script>

<template>
  <a
    :href="props.href"
    :class="[
      props.class,
      { 'pointer-events-none opacity-50': loading }
    ]"
    @click="handleClick"
  >
    <slot />
  </a>
</template>
