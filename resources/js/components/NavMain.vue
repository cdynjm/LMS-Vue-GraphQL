<script setup lang="ts">
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem, type SharedData } from '@/types';
import { usePage, router } from '@inertiajs/vue3';

defineProps<{
  items: NavItem[];
}>();

const page = usePage<SharedData>();

function navigateTo(routeName: string) {
  router.get(route(routeName));
}
</script>

<template>
  <SidebarGroup class="px-2 py-0">
    <SidebarGroupLabel>Pages</SidebarGroupLabel>
    <SidebarMenu>
      <SidebarMenuItem v-for="item in items" :key="item.title">
        <SidebarMenuButton 
          as-child 
          :is-active="route().current(item.href)"
          :tooltip="item.title"
        >
          <a @click.prevent="navigateTo(item.href)" href="#">
            <component :is="item.icon" class="text-gray-500" />
            <span class="text-[13px]">{{ item.title }}</span>
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarGroup>
</template>
