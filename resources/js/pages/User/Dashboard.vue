<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/vue3';
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Users, Folder, File, UserCheck } from 'lucide-vue-next'
import SkeletonCard from '@/components/SkeletonCard.vue';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/user/dashboard',
    },
];

const queryClient = useQueryClient()

const fetchDashboardCounts = async () => {
    const query = `
        query {
            userdashboard {
                officialsCount
                categoriesCount
                filesCount
            }
        }
    `

    const response = await axios.post('/graphql', {query});
    return response.data.data;
}

const { isPending, data, error, isFetching } = useQuery({
    queryKey: ['fetchDashboardCounts'],
    queryFn: fetchDashboardCounts
});

</script>

<template>
    <Head title="Dashboard" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            <Card class="pt-0">
                <CardHeader class="flex items-center justify-between bg-blue-50 py-2">
                    <CardTitle>Categories</CardTitle>
                    <Folder class="w-5 h-5 text-muted-foreground"  />
                </CardHeader>
                <CardContent v-if="isFetching"><SkeletonCard /></CardContent>
                <CardContent v-else>
                    <p class="text-2xl font-bold">{{ data?.userdashboard.categoriesCount }}</p>
                </CardContent>
            </Card>

            <Card class="pt-0">
                <CardHeader class="flex items-center justify-between bg-red-50 py-2">
                    <CardTitle>Files</CardTitle>
                    <File class="w-5 h-5 text-muted-foreground"  />
                </CardHeader>
                <CardContent v-if="isFetching"><SkeletonCard /></CardContent>
                <CardContent v-else>
                    <p class="text-2xl font-bold">{{ data?.userdashboard.filesCount }}</p>
                </CardContent>
            </Card>

            <Card class="pt-0">
                <CardHeader class="flex items-center justify-between bg-orange-50 py-2">
                    <CardTitle>Officials</CardTitle>
                    <UserCheck class="w-5 h-5 text-muted-foreground"  />
                </CardHeader>
                <CardContent v-if="isFetching"><SkeletonCard /></CardContent>
                <CardContent v-else>
                    <p class="text-2xl font-bold">{{ data?.userdashboard.officialsCount }}</p>
                </CardContent>
            </Card>
        </div>
        
    </AppLayout>
</template>
