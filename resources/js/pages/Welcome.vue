<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import Button from '@/components/ui/button/Button.vue';
import NavFooter from '@/components/NavFooter.vue';
import { ref, computed, watchEffect } from 'vue';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/./components/ui/table/';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import axios from 'axios';
import { Pencil, Trash2, MinusCircle, Loader2Icon, Folder, LucideFileText, Eye, ArrowRightCircle, ArrowLeftCircle, ArrowRight, ArrowLeft,CheckCircle } from 'lucide-vue-next';
import Skeleton from '@/components/Skeleton.vue';
import SkeletonCard from '@/components/SkeletonCard.vue';
import SkeletonBox from '@/components/SkeletonBox.vue';

const queryClient = useQueryClient();

const currentPage = ref(1);
const searchQuery = ref('');
const fileSearchData = ref<any[]>([]);

const paginatorInfo = ref({
    currentPage: 1,
    lastPage: 1,
    hasMorePages: false,
})

const guestFetchFiles = async () => {
    const query = `
    query ($page: Int, $first: Int!)  {
      welcome(page: $page, first: $first) {
        filesListPaginated {
          data {
            municipalStatus
            provincialStatus
            title
            ordinanceNumber
            finalTitle
            file
            updated_at
            author {
                name
                photo
                position
            }
            coAuthors {
                official {
                    name
                    position
                }
            }
          }
          paginatorInfo {
            currentPage
            lastPage
            total
            perPage
            hasMorePages
          }
        }
      }
    }
  `;

    const response = await axios.post('/graphql', {
        query,
        variables: {
            page: currentPage.value,
            first: 20,
        },
    });

    return response.data.data;
};

const { data, isPending, isFetching, isLoading } = useQuery({
    queryKey: ['guestFetchFiles', currentPage],
    queryFn: guestFetchFiles,
});

watchEffect(() => {
    if (data.value?.welcome?.filesListPaginated) {
        fileSearchData.value = data.value.welcome.filesListPaginated.data;
        paginatorInfo.value = data.value.welcome.filesListPaginated.paginatorInfo;
    }
});

const filteredFiles = computed(() => {
    const query = searchQuery.value.toLowerCase();
    return fileSearchData.value.filter((file) => {
        return (
            file.title?.toLowerCase().includes(query) ||
            file.ordinanceNumber?.toLowerCase()?.includes(query) ||
            file.author.name?.toLowerCase()?.includes(query)
        );
    });
});

const goToNextPage = () => {
    if (currentPage.value < paginatorInfo.value.lastPage) {
        currentPage.value++;
    }
};

const goToPreviousPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
};

</script>

<template>

    <Head title="Welcome">
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
    </Head>
    <div
        class="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] dark:bg-[#0a0a0a] lg:justify-center lg:p-8">
        <header class="not-has-[nav]:hidden mb-6 w-full lg:px-40">
            <nav class="flex items-center justify-between gap-4 w-full">
                <!-- Logo + Labels -->
                <div class="flex items-center gap-3">
                    <img src="/app-logo.jpg" alt="Logo" class="h-10 w-auto" />

                    <!-- Labels -->
                    <div class="flex flex-col leading-tight">
                        <!-- Full label for sm and up -->
                        <div class="hidden sm:flex flex-col">
                            <span class="text-base font-semibold text-[#1b1b18] text-[14px] dark:text-white">
                                Legislative MS
                            </span>
                            <span class="text-sm text-gray-500 text-[12px] dark:text-gray-400">
                                Legislative Management System
                            </span>
                        </div>
                        <!-- LMS only for smaller than sm -->
                        <span class="block sm:hidden text-base font-semibold text-[#1b1b18] dark:text-white">
                            LMS
                        </span>
                    </div>
                </div>

                <!-- Auth Buttons -->
                <div class="flex items-center gap-4">
                    <Link :href="route('login')"
                        class="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]">
                    Log in
                    </Link>
                    <Button class="inline-block rounded-sm">
                        LMS
                    </Button>
                </div>
            </nav>
        </header>

        <div class="min-h-screen flex flex-col w-full">
            <main class="flex-1 w-full lg:px-20 lg:pt-10">
                <div class="grid grid-cols-1 xl:grid-cols-3 gap-4">
                    <Card v-if="isFetching" class="shadow-none" v-for="n in 3">
                        <CardHeader class="text-[14px]">
                            <SkeletonCard />
                        </CardHeader>
                        <CardContent class="grid gap-4">
                            <SkeletonBox />
                        </CardContent>
                    </Card>

                    <Card v-else class="shadow-none flex flex-col h-full" v-for="(files, index) in filteredFiles">
                        <CardHeader class="text-[14px]">
                            <CardTitle>Ordinance Number</CardTitle>
                            <CardDescription>{{ files.ordinanceNumber != null ? files.ordinanceNumber : '-' }}
                            </CardDescription>
                            <div class=" flex items-center space-x-4 rounded-md border p-4">
                                <img :src="'/storage/profile/' + files.author.photo"
                                    class="w-10 h-10 rounded-full object-cover" />
                                <div class="flex-1 space-y-1">
                                    <p class="text-sm font-medium leading-none">
                                        {{ files.author.name }}
                                    </p>
                                    <p class="text-[13px] text-muted-foreground">
                                        {{ files.author.position }}
                                    </p>
                                </div>
                                <PenIcon class="h-auto w-5" />
                            </div>
                        </CardHeader>
                        <CardContent class="grid gap-4">
                            <div>
                                <p class="text-[14px]">{{ files.finalTitle == null ? files.title : files.finalTitle }}
                                </p>
                            </div>
                            <div>
                                <div class="text-[14px] mb-4 font-bold text-blue-500">Co-Authors</div>
                                <div v-for="(coauhor, index) in files.coAuthors"
                                    class="mb-4 grid grid-cols-[25px_minmax(0,1fr)] items-start pb-0 last:mb-0 last:pb-0">
                                    <span class="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                                    <div class="space-y-1">
                                        <p class="text-sm font-medium leading-none">
                                            {{ coauhor.official.name }}
                                        </p>
                                        <p class="text-[12px] text-muted-foreground">
                                            {{ coauhor.official.position }}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div class="text-gray-500 text-[13px] flex items-center gap-2">
                                <div v-if="files.municipalStatus == 1">
                                    <MinusCircle class="w-5 h-5 text-red-500" />
                                </div>
                                <div v-else>
                                    <CheckCircle class="w-5 h-5 text-green-500" />
                                </div>
                                Municipal Status: <span
                                    :class="files.municipalStatus == 1 ? 'text-red-500' : 'text-green-500'">{{
                                        files.municipalStatus == 1 ? 'Draft Ordinance' : 'Approved Ordinance'
                                    }}</span>
                            </div>

                            <div class="text-gray-500 text-[13px] flex items-center gap-2">
                                <!-- Municipal Status Icon -->
                                <div v-if="files.provincialStatus == null || files.provincialStatus == 1">
                                    <MinusCircle class="w-5 h-5 text-red-500" />
                                </div>
                                <div v-else>
                                    <CheckCircle class="w-5 h-5 text-green-500" />
                                </div>
                                Provincial Status:
                                <span :class="[
                                    files.provincialStatus == 1 ? 'text-red-500' :
                                        files.provincialStatus == 2 ? 'text-green-500' :
                                            'text-gray-500'
                                ]">
                                    {{
                                        files.provincialStatus == 1
                                            ? 'Disapproved'
                                            : files.provincialStatus == 2
                                                ? 'Approved Ordinance'
                                                : 'No Status Yet'
                                    }}
                                </span>
                            </div>
                            <small class="text-gray-500">{{ formatDateTime(files.updated_at) }}</small>
                        </CardContent>

                        <CardFooter class="mt-auto">
                            <Button class="w-full text-[12px] cursor-pointer">
                                <a :href="'/storage/files/' + files.file" class="flex items-center gap-2"
                                    target="_blank">
                                    <File /> Open PDF File
                                </a>
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
                <div class="flex justify-between items-center mt-8">
                    <Button :disabled="paginatorInfo.currentPage <= 1" @click="goToPreviousPage" class="cursor-pointer">
                        <ArrowLeft />
                    </Button>

                    <small>
                        Pages {{ paginatorInfo.currentPage }} of {{ paginatorInfo.lastPage }}
                    </small>

                    <Button :disabled="paginatorInfo.currentPage >= paginatorInfo.lastPage" @click="goToNextPage"
                        class="cursor-pointer">
                        <ArrowRight />
                    </Button>
                </div>
            </main>
            <NavFooter />
        </div>

    </div>
</template>

<script lang="ts">

function formatDateTime(dateInput: string | Date): string {
    const date = new Date(dateInput);

    const datePart = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    const timePart = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });

    return `${datePart} | ${timePart}`;
}

</script>
