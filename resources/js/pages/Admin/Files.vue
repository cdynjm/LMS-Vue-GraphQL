<script setup lang="ts">
import { ref } from 'vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/vue3';
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
import { Pencil, Trash2, MinusCircle, Loader2Icon, Folder, LucideFileText, Eye } from 'lucide-vue-next';
import { toast } from 'vue-sonner'
import { Textarea } from '@/./components/ui/textarea/'

const queryClient = useQueryClient();

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Files',
        href: '/admin/files',
    },
];

const props = defineProps<{
    id: string
}>();

const fetchFiles = async () => {
    const query = `
    query ($id: String!) {
      files (id: $id) {
        categoryName {
            encrypted_id
            category
        }
        authors {
            encrypted_id
            name
        }     
        filesList {
            encrypted_id
            title
            ordinanceNumber
            municipalStatus
            provincialStatus
            author {
                name
            }  
            coAuthors {
                official {
                    name
                }
            }
        }
      }
    }
  `
    const response = await axios.post('/graphql', {
        query,
        variables: { id: props.id }
    });
    return response.data.data
}

const { isPending, error, data, isFetching, isLoading } = useQuery({
    queryKey: ['fetchFiles'],
    queryFn: fetchFiles,
});

const openDialog = ref(false);

function createFileDialog(id: string) {
    createForm.categoryID = id;
    openDialog.value = true;
}

const createForm = useForm({
    categoryID: '' as string,
    municipalStatus: '' as string,
    title: '' as string,
    author: '' as string,
    coauthor: [] as string[],
    file: null as any
});

const addCoAuthor = () => {
    createForm.coauthor.push('');
};

const removeCoAuthor = (index: number) => {
    createForm.coauthor.splice(index, 1);
};

const createFile = () => {
    createForm.post(route('create.file'), {
        onSuccess: () => {
            toast.success('File created and uploaded successfully');
            createForm.reset();
            openDialog.value = false;
            queryClient.invalidateQueries({ queryKey: ['fetchFiles'] });
        },
        onError: () => {
            toast.error('Error creating file');
            console.error('Error');
        },
    });
};

const editDialog = ref(false);

function editCategoryDialog(id: string, category: string) {
    updateForm.id = id;
    updateForm.category = category;
    editDialog.value = true;
}

const updateForm = useForm({
    id: '',
    category: '',
});

const updateCategory = () => {
    updateForm.patch(route('update.category'), {
        onSuccess: () => {
            toast.success('Category updated successfully');
            updateForm.reset();
            editDialog.value = false;
            queryClient.invalidateQueries({ queryKey: ['fetchFiles'] });
        },
        onError: () => {
            toast.error('Error updating category');
            console.error('Error');
        },
    });
};

const deleteDialog = ref(false);

function deleteCategoryDialog(id: string) {
    deleteForm.id = id;
    deleteDialog.value = true;
}

const deleteForm = useForm({
    id: '',
});

const deleteCategory = () => {
    deleteForm.delete(route('delete.category'), {
        onSuccess: () => {
            toast.success('Category deleted successfully');
            deleteForm.reset();
            deleteDialog.value = false;
            queryClient.invalidateQueries({ queryKey: ['fetchFiles'] });
        },
        onError: () => {
            toast.error('Deletion Error');
            console.error('Error');
        },
    });
};

const handleFileChange = async (event: Event) => {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    const maxSizeInMB = 2;
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

    if (file.size > maxSizeInBytes) {
        input.value = ''; // Clear input
        toast.error('File too large. Please select a smaller file.');
    }
    createForm.file = file;
    console.log('Selected file:', file);
};

</script>

<template>

    <Head title="Files" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="p-6 space-y-6">

            <!-- Top Right Add Button -->
            <div class="flex w-full justify-between items-center">

                <div>
                    <div v-if="!isLoading && !isFetching">
                        <h6 class="flex-1 text-md font-bold">
                            {{ data?.files.categoryName.category }}
                        </h6>
                    </div>
                </div>

                <Dialog v-model:open="openDialog">
                    <DialogTrigger as-child>
                        <Button @click="createFileDialog(data?.files.categoryName.encrypted_id)" class="cursor-pointer">
                            + New
                        </Button>
                    </DialogTrigger>
                    <DialogContent class="sm:max-w-[800px] w-full">
                        <DialogHeader>
                            <DialogTitle>Add New File</DialogTitle>
                            <DialogDescription>
                                Create a new file for <b>{{ data?.files.categoryName.category }}</b>
                            </DialogDescription>
                        </DialogHeader>

                        <form @submit.prevent="createFile" class="space-y-6">

                            <div class="flex flex-col space-y-1">
                                <Label class="text-sm font-medium text-gray-700">Municipal Status</Label>
                                <Select v-model="createForm.municipalStatus" required>
                                    <SelectTrigger class="w-full">
                                        <SelectValue placeholder="Select a status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Status</SelectLabel>
                                            <SelectItem value="1">Draft Ordinance</SelectItem>
                                            <SelectItem value="2">Approved Ordinance</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div class="flex flex-col space-y-1">
                                <Label class="text-sm font-medium text-gray-700">Title of Ordinance</Label>
                                <Textarea v-model="createForm.title" class="w-full" />
                            </div>

                            <div class="flex flex-col space-y-1">
                                <Label class="text-sm font-medium text-gray-700">Author</Label>
                                <Select v-model="createForm.author" required>
                                    <SelectTrigger class="w-full">
                                        <SelectValue placeholder="Select an author" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectLabel>Authors</SelectLabel>
                                        <SelectGroup v-for="author in data?.files.authors">
                                            <SelectItem :value="author.encrypted_id">
                                                {{ author.name }}
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div class="flex flex-col space-y-1">
                                <Label class="text-sm font-medium text-gray-700">Co Authors</Label>

                                <div class="space-y-3">
                                    <div v-for="(co, index) in createForm.coauthor" :key="index"
                                        class="flex items-center gap-2">
                                        <Select v-model="createForm.coauthor[index]" required>
                                            <SelectTrigger class="w-full">
                                                <SelectValue placeholder="Select an author" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectLabel>Authors</SelectLabel>
                                                <SelectGroup>
                                                    <SelectItem v-for="author in data?.files.authors"
                                                        :key="author.encrypted_id" :value="author.encrypted_id">
                                                        {{ author.name }}
                                                    </SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>

                                        <!-- Optional: Remove button -->
                                        <button type="button" @click="removeCoAuthor(index)"
                                            class="text-red-500 hover:text-red-700 text-sm cursor-pointer">
                                            ✕
                                        </button>
                                    </div>

                                    <!-- Add Co-Author Button -->
                                    <button type="button" @click="addCoAuthor"
                                        class="text-blue-500 hover:text-blue-700 text-sm cursor-pointer">
                                        + Add
                                    </button>
                                </div>
                            </div>

                            <div class="flex flex-col space-y-1">
                                <Label class="text-sm font-medium text-gray-700">Upload a File</Label>
                                <Input type="file" class="col-span-3" @change="handleFileChange" accept=".pdf"
                                    required />
                            </div>

                            <!-- Footer -->
                            <DialogFooter>
                                <Button type="submit" class="cursor-pointer" :disabled="createForm.processing">
                                    Save
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>

                </Dialog>

                <Dialog v-model:open="editDialog">
                    <DialogContent class="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>Edit Category</DialogTitle>
                            <DialogDescription>
                                Edit the details of the selected category
                            </DialogDescription>
                        </DialogHeader>

                        <form action="" @submit.prevent="updateCategory">
                            <div class="grid gap-4 py-4">
                                <div class="grid grid-cols-4 items-center gap-4">
                                    <Label class="text-right">Category</Label>
                                    <Input v-model="updateForm.category" placeholder="Category Name" class="col-span-3"
                                        required />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" class="cursor-pointer"
                                    :disabled="updateForm.processing">Save</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>

                <Dialog v-model:open="deleteDialog">
                    <DialogContent class="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>Delete Official</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to delete this official? This action cannot be undone.
                            </DialogDescription>
                        </DialogHeader>

                        <form action="" @submit.prevent="deleteCategory">
                            <DialogFooter>
                                <Button type="submit" class="cursor-pointer" variant="destructive"
                                    :disabled="deleteForm.processing">Delete</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
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
                <TableBody v-if="!isLoading && !isFetching">
                    <TableRow v-if="isPending">
                        <TableCell colspan="10" class="text-center">
                            <small class="text-center text-green-500 flex items-center justify-center">
                                <Loader2Icon class="mr-2 w-5" />
                                Loading...
                            </small>
                        </TableCell>
                    </TableRow>
                    <TableRow v-if="data?.files.filesList.length == 0">
                        <TableCell colspan="10">
                            <small class="text-center text-red-500 flex items-center justify-center">
                                <MinusCircle class="mr-2 w-5" />
                                No Data Found
                            </small>
                        </TableCell>
                    </TableRow>
                    <TableRow v-for="(files, index) in data?.files.filesList" :key="files.encrypted_id">
                        <TableCell>
                            <small>{{ index + 1 }}</small>
                        </TableCell>
                        <TableCell>
                            <LucideFileText class="w-5 h-5 text-green-500" />
                        </TableCell>
                        <TableCell class="pr-5">
                            <div class="text-nowrap">{{ trimTitle(files.title) }}</div>
                        </TableCell>
                        <TableCell>
                            <small class="text-nowrap">{{ files.ordinanceNumber != null ? files.ordinanceNumber : '-'}}</small>
                        </TableCell>
                        <TableCell class="pr-5">
                            <div class="text-nowrap"><b>{{ files.author.name }}</b></div>
                            <div><small class="text-blue-500">Co Authors:</small></div>
                            <div v-for="coauthor in files.coAuthors">
                                <small class="text-nowrap">{{ coauthor.official.name }}</small>
                            </div>
                        </TableCell>
                        <TableCell>
                            <small :class="files.municipalStatus == 1 ? 'text-wrap text-red-500' : 'text-wrap text-green-500'">{{ files.municipalStatus == 1 ? 'Draft' : 'Approved' }}</small>
                        </TableCell>
                        <TableCell>
                            <small
                                :class="files.provincialStatus === 1
                                    ? 'text-wrap text-red-500'
                                    : files.provincialStatus === 2
                                    ? 'text-wrap text-green-500'
                                    : 'text-wrap text-gray-500'"
                            >
                                {{ files.provincialStatus === null ? '-' : files.provincialStatus === 1 ? 'Draft' : 'Approved' }}
                            </small>
                        </TableCell>
                        <TableCell class="text-right">
                            <Button variant="link" 
                                class="ml-0 cursor-pointer">
                                <Eye />
                            </Button>
                            <Button variant="link" 
                                class="ml-0 cursor-pointer">
                                <Pencil />
                            </Button>
                            <Button variant="destructive"
                                class="ml-0 cursor-pointer">
                                <Trash2 />
                            </Button>
                        </TableCell>
                    </TableRow>

                </TableBody>
            </Table>
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
