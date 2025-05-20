<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/vue3';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Users, Folder, FileArchive, UserCheck } from 'lucide-vue-next'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
    },
];
</script>

<template>
    <Head title="Dashboard" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
            <Card class="pt-0">
                <CardHeader class="flex items-center justify-between bg-gray-100 py-2">
                    <CardTitle>Admins</CardTitle>
                    <Users class="w-5 h-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <p class="text-2xl font-bold">0</p>
                </CardContent>
            </Card>

            <Card class="pt-0">
                <CardHeader class="flex items-center justify-between bg-gray-100 py-2">
                    <CardTitle>Categories</CardTitle>
                    <Folder class="w-5 h-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <p class="text-2xl font-bold">0</p>
                </CardContent>
            </Card>

            <Card class="pt-0">
                <CardHeader class="flex items-center justify-between bg-gray-100 py-2">
                    <CardTitle>Files</CardTitle>
                    <FileArchive class="w-5 h-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <p class="text-2xl font-bold">0</p>
                </CardContent>
            </Card>

            <Card class="pt-0">
                <CardHeader class="flex items-center justify-between bg-gray-100 py-2">
                    <CardTitle>Officials</CardTitle>
                    <UserCheck class="w-5 h-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <p class="text-2xl font-bold">0</p>
                </CardContent>
            </Card>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 p-4">
        <Card>
            <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
        </Card>
        </div>
    </AppLayout>
</template>
