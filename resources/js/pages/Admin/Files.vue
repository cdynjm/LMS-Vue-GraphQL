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
import { Pencil, Trash2, MinusCircle, Loader2Icon, Folder } from 'lucide-vue-next';
import { toast } from 'vue-sonner'

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

function createCategoryDialog() {
    openDialog.value = true;
}

const createForm = useForm({
    category: '',
});

const createCategory = () => {
    createForm.post(route('create.category'), {
        onSuccess: () => {
            toast.success('Category created successfully');
            createForm.reset();
            openDialog.value = false;
            queryClient.invalidateQueries({ queryKey: ['fetchFiles'] });
        },
        onError: () => {
            toast.error('Error creating category');
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
                        <Button @click="createCategoryDialog" class="cursor-pointer">
                            + New
                        </Button>
                    </DialogTrigger>
                    <DialogContent class="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>Add Category</DialogTitle>
                            <DialogDescription>
                                Create a new category for the files
                            </DialogDescription>
                        </DialogHeader>

                        <form action="" @submit.prevent="createCategory">
                            <div class="grid gap-4 py-4">
                                <div class="grid grid-cols-4 items-center gap-4">
                                    <Label class="text-right">Category</Label>
                                    <Input v-model="createForm.category" placeholder="Category Name" class="col-span-3"
                                        required />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" class="cursor-pointer"
                                    :disabled="createForm.processing">Save</Button>
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
                        <TableHead class="w-[50px]">#</TableHead>
                        <TableHead class="w-[300px]">Category</TableHead>
                        <TableHead>No. of Files</TableHead>
                        <TableHead>Creation Date</TableHead>
                        <TableHead class="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-if="isPending">
                        <TableCell colspan="10" class="text-center">
                            <small class="text-center text-green-500 flex items-center justify-center">
                                <Loader2Icon class="mr-2 w-5" />
                                Loading...
                            </small>
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

</script>
