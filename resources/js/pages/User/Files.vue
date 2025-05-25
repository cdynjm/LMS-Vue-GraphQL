<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue';

import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, Link, router } from '@inertiajs/vue3';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';


import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/./components/ui/select/';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/./components/ui/table/';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import axios from 'axios';
import { Pencil, Trash2, MinusCircle, Loader2Icon, Folder, LucideFileText, LoaderCircle, Eye, ArrowRightCircle, ArrowLeftCircle, ArrowRight, ArrowLeft } from 'lucide-vue-next';
import { toast } from 'vue-sonner'
import { Textarea } from '@/./components/ui/textarea/'
import Skeleton from '@/components/Skeleton.vue';

const props = defineProps<{
    id: string
}>();

const queryClient = useQueryClient();

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Files',
        href: '/user/files/' + props.id,
    },
];

const currentPage = ref(1);
const searchQuery = ref('');
const fileSearchData = ref<any[]>([]);

const paginatorInfo = ref({
    currentPage: 1,
    lastPage: 1,
    hasMorePages: false,
})

const fetchFiles = async () => {
    const query = `
    query ($id: String!, $page: Int!, $first: Int!) {
      userfiles(id: $id, page: $page, first: $first) {
        categoryName {
          encrypted_id
          category
        }
        authors {
          encrypted_id
          name
        }
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
        subCategoriesList {
          encrypted_id
          category
          parentID
          created_at
          totalFiles
        }
      }
    }
  `;

    const response = await axios.post('/graphql', {
        query,
        variables: {
            id: props.id,
            page: currentPage.value,
            first: 20,
        },
    });

    return response.data.data;
};

const { data, isPending, isFetching, isLoading } = useQuery({
    queryKey: ['fetchFiles', currentPage],
    queryFn: fetchFiles,
});

watchEffect(() => {
    if (data.value?.userfiles?.filesListPaginated) {
        fileSearchData.value = data.value.userfiles.filesListPaginated.data;
        paginatorInfo.value = data.value.userfiles.filesListPaginated.paginatorInfo;
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

function navigateTo(name: string, params: Record<string, any> = {}) {
    router.get(route(name, params));
}

</script>

<template>

    <Head title="Files" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="p-6 space-y-6">
            <div class="flex w-full justify-between items-center">
                <div>
                    <div v-if="!isLoading && !isFetching">
                        <h6 class="flex text-md font-bold items-center">
                            <Folder class="h-8 w-8 mr-2 flex-shrink-0 rounded-full border p-1 text-blue-500"
                                fill="currentColor" />
                            {{ data?.userfiles.categoryName.category }}
                        </h6>
                    </div>
                </div>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead class="w-[50px]"><small>#</small></TableHead>
                        <TableHead class="w-[300px]"><small>Category</small></TableHead>
                        <TableHead><small>No. of Files</small></TableHead>
                        <TableHead><small>Creation Date</small></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-if="isFetching">
                        <TableCell colspan="10" class="text-center">
                            <Skeleton />
                        </TableCell>
                    </TableRow>
                    <TableRow v-else-if="data?.userfiles.subCategoriesList.length == 0">
                        <TableCell colspan="5">
                            <small class="text-center text-red-500 flex items-center justify-center">
                                <MinusCircle class="mr-2 w-5" />
                                No Data Found
                            </small>
                        </TableCell>
                    </TableRow>
                    <TableRow v-else v-for="(category, index) in data?.userfiles.subCategoriesList" :key="category.id">
                        <TableCell>
                            <small>{{ index + 1 }}</small>
                        </TableCell>
                        <TableCell class="w-[300px] pr-20">
                            <a href="#" @click="navigateTo('user.files', { id: category.encrypted_id })">
                                <div class="flex items-center space-x-3">
                                    <div>
                                        <Folder class="h-8 w-8 flex-shrink-0 rounded-full border p-1 text-blue-500"
                                            fill="currentColor" />
                                    </div>
                                    <div>
                                        <div class="font-medium">{{ category.category }}</div>
                                    </div>
                                </div>
                            </a>
                        </TableCell>
                        <TableCell>{{ category.totalFiles }}</TableCell>
                        <TableCell><small>{{ formatDateTime(category.created_at) }}</small></TableCell>
                    </TableRow>

                </TableBody>
            </Table>

            <div class="flex items-center justify-between space-x-4">
                <Input v-model="searchQuery" placeholder="Search... (if no results, go to next page)"
                    class="w-full max-w-md text-sm" />
            </div>


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
                        <TableHead class="text-right"><small>Actions</small></TableHead>
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
                            <a href="#" @click="navigateTo('user.view-file', { id: file.encrypted_id })">
                                <div class="text-wrap text-[13px]">{{ file.title }}</div>
                            </a>
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
                                {{ file.provincialStatus == null ? '-' : file.provincialStatus == 1 ? 'Disapproved' :
                                    'Approved' }}
                            </small>
                        </TableCell>
                        <TableCell class="text-right">
                            <a href="#" @click="navigateTo('user.view-file', { id: file.encrypted_id })">
                                <Button variant="link" class="ml-0 cursor-pointer">
                                    <Eye />
                                </Button>
                            </a>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
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
        </div>
    </AppLayout>
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

function trimTitle(title: string, limit: number = 50): string {
    if (title.length <= limit) return title;
    return title.slice(0, limit).trim() + '...';
}

</script>
