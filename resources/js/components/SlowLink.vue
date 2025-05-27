<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Link } from '@inertiajs/vue3';

const props = defineProps({
  href: { type: String, required: true },
  as: { type: String, default: 'a' },
  method: String,
  data: Object,
  headers: Object,
  preserveScroll: Boolean,
  preserveState: [Boolean, String],
  replace: Boolean,
  only: Array,
  prefetch: Boolean,
  active: Boolean,
  class: {
    type: [String, Object, Array],
    default: '',
  },
});

const linksEnabled = ref(false);

onMounted(() => {
  setTimeout(() => {
    linksEnabled.value = true;
  }, 1500); 
});
</script>

<template>
  <Link
    :href="props.href"
    :class="[
      props.class,
      { 'pointer-events-none': !linksEnabled }
    ]"
  >
    <slot />
  </Link>
</template>
