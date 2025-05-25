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
import { Pencil, Trash2, MinusCircle, Loader2Icon, Folder, LucideFileText, Eye, ArrowRightCircle, ArrowLeftCircle, ArrowRight, ArrowLeft } from 'lucide-vue-next';
import Skeleton from '@/components/Skeleton.vue';

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
            encrypted_id
            municipalStatus
            provincialStatus
            title
            firstReadingDate
            secondReadingDate
            thirdReadingDate
            ordinanceNumber
            finalTitle
            enactmentDate
            lceapprovalDate
            transmittalDate
            spslapprovalDate
            postStatus
            publishStatus
            file
            author {
              encrypted_id
              name
            }
            coAuthors {
              official {
                encrypted_id
                name
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
            <main class="flex-1 w-full lg:px-40 lg:pt-10">
                <Card class="shadow-none">
                    <CardHeader>
                        <CardDescription class="font-bold">Ordinances</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead class="w-[50px]"><small>#</small></TableHead>
                                    <TableHead class="w-[50px]"><small>File</small></TableHead>
                                    <TableHead class="w-[300px]"><small>Title</small></TableHead>
                                    <TableHead><small>Ordinance Number</small></TableHead>
                                    <TableHead><small>Author</small></TableHead>
                                    <TableHead><small>Mun. Status</small></TableHead>
                                    <TableHead><small>Prov. Status</small></TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                <TableRow v-if="isFetching">
                                    <TableCell colspan="10" class="text-center">
                                       <Skeleton />
                                    </TableCell>
                                </TableRow>

                                <TableRow v-else-if="filteredFiles.length === 0">
                                    <TableCell colspan="10" class="text-center">
                                        <small class="text-red-500 flex items-center justify-center">
                                            <MinusCircle class="mr-2 w-5" />
                                            No Data Found
                                        </small>
                                    </TableCell>
                                </TableRow>

                                <TableRow v-else v-for="(file, index) in filteredFiles" :key="file.encrypted_id">
                                    <TableCell><small>{{ index + 1 }}</small></TableCell>

                                    <TableCell>
                                        <a :href="`/storage/files/${file.file}`" target="_blank">
                                            <LucideFileText class="w-5 h-5 text-green-500" />
                                        </a>
                                    </TableCell>

                                    <TableCell class="pr-5">
                                        <div class="text-wrap text-[13px]">{{ file.title }}</div>
                                    </TableCell>

                                    <TableCell>
                                        <small class="text-nowrap">{{ file.ordinanceNumber ?? '-' }}</small>
                                    </TableCell>

                                    <TableCell class="pr-5">
                                        <div class="text-nowrap"><b>{{ file.author.name }}</b></div>
                                        <div><small class="text-blue-500">Co Authors:</small></div>
                                        <div v-for="coauthor in file.coAuthors" :key="coauthor.official.name">
                                            <small class="text-nowrap">{{ coauthor.official.name }}</small>
                                        </div>
                                        <div v-if="file.coAuthors.length == 0"><small>None</small></div>
                                    </TableCell>

                                    <TableCell>
                                        <small
                                            :class="file.municipalStatus == 1 ? 'text-wrap text-red-500' : 'text-wrap text-green-500'">
                                            {{ file.municipalStatus == 1 ? 'Draft' : 'Approved' }}
                                        </small>
                                    </TableCell>

                                    <TableCell>
                                        <small :class="file.provincialStatus == 1
                                            ? 'text-wrap text-red-500'
                                            : file.provincialStatus == 2
                                                ? 'text-wrap text-green-500'
                                                : 'text-wrap text-gray-500'">
                                            {{ file.provincialStatus == null ? '-' : file.provincialStatus == 1 ?
                                                'Disapproved'
                                                :
                                            'Approved' }}
                                        </small>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <div class="flex justify-between items-center mt-8">
                            <Button :disabled="paginatorInfo.currentPage <= 1" @click="goToPreviousPage"
                                class="cursor-pointer">
                                <ArrowLeft />
                            </Button>

                            <small>
                                Pages {{ paginatorInfo.currentPage }} of {{ paginatorInfo.lastPage }}
                            </small>

                            <Button :disabled="paginatorInfo.currentPage >= paginatorInfo.lastPage"
                                @click="goToNextPage" class="cursor-pointer">
                                <ArrowRight />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </main>
            <NavFooter />
        </div>

    </div>
</template>
