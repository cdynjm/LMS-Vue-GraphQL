<script setup lang="ts">
import { SidebarInset } from '@/components/ui/sidebar';
import { computed } from 'vue';
import NavFooter from './NavFooter.vue';
import NavFooterFix from './NavFooterFix.vue';
interface Props {
    variant?: 'header' | 'sidebar';
    class?: string;
}

const props = defineProps<Props>();
const className = computed(() => props.class);

</script>

<template>
    <SidebarInset v-if="props.variant === 'sidebar'" :class="className">
        <div class="min-h-screen flex flex-col">
            <main class="flex-1">
                <slot />
                <NavFooterFix />
            </main>
            <NavFooter />
        </div>
    </SidebarInset>
    <main v-else class="mx-auto flex h-full w-full max-w-7xl flex-1 flex-col gap-4 rounded-xl" :class="className">
        <slot />
        <NavFooter />
    </main>
</template>
