<script setup lang="ts">
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Folder } from 'lucide-vue-next';
import { Link } from '@inertiajs/vue3';
</script>

<template>
    <footer class="m-4">
        <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
            <div class="sm:flex sm:items-center sm:justify-between">
                <Link :href="'/'" class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                    <img src="/app-logo.jpg" class="h-11 w-auto" alt="" />

                    <div class="flex flex-col">
                        <span class="text-[16px] font-semibold whitespace-nowrap dark:text-white">Legislative MS</span>
                        <span class="text-[13px] text-gray-500">Legislative Management System</span>
                    </div>
                </Link>

                <ul
                    class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                    <li>
                        <a href="#" class="hover:underline me-4 md:me-6">About</a>
                    </li>
                    <li>
                        <a href="#" class="hover:underline me-4 md:me-6">Privacy Policy</a>
                    </li>
                    <li>
                        <a href="#" class="hover:underline me-4 md:me-6">Licensing</a>
                    </li>
                    <li>
                        <a href="#" class="hover:underline">Contact</a>
                    </li>
                </ul>
            </div>

            <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© {{ new Date().getFullYear() }} 
            <Link :href="'/'" class="hover:underline">Legislative Management System</Link></span>
        </div>
    </footer>


</template>
