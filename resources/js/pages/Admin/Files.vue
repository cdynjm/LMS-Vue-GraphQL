<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue';

import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, Link } from '@inertiajs/vue3';
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
import { Pencil, Trash2, MinusCircle, Loader2Icon, Folder, LucideFileText, Eye, ArrowRightCircle, ArrowLeftCircle, ArrowRight, ArrowLeft } from 'lucide-vue-next';
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
      files(id: $id, page: $page, first: $first) {
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
    if (data.value?.files?.filesListPaginated) {
        fileSearchData.value = data.value.files.filesListPaginated.data;
        paginatorInfo.value = data.value.files.filesListPaginated.paginatorInfo;
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

const addCoAuthor = () => {
    createForm.coauthor.push('');
};

const removeCoAuthor = (index: number) => {
    createForm.coauthor.splice(index, 1);
};



const editDialog = ref(false);

function editFileDialog(
    id: string,
    categoryID: string,
    municipalStatus: string,
    provincialStatus: string,
    title: string,
    author: string,
    coauthor: string[],
    firstReadingDate: string,
    secondReadingDate: string,
    thirdReadingDate: string,
    ordinanceNumber: string,
    finalTitle: string,
    enactmentDate: string,
    lceapprovalDate: string,
    transmittalDate: string,
    spslapprovalDate: string,
    postStatus: string,
    publishStatus: string,
) {
    updateForm.id = id;
    updateForm.categoryID = categoryID;
    updateForm.municipalStatus = municipalStatus;
    updateForm.provincialStatus = provincialStatus;
    updateForm.title = title;
    updateForm.author = author;
    updateForm.coauthor = coauthor;
    updateForm.firstReadingDate = firstReadingDate;
    updateForm.secondReadingDate = secondReadingDate;
    updateForm.thirdReadingDate = thirdReadingDate;
    updateForm.ordinanceNumber = ordinanceNumber;
    updateForm.finalTitle = finalTitle;
    updateForm.enactmentDate = enactmentDate;
    updateForm.lceapprovalDate = lceapprovalDate;
    updateForm.transmittalDate = transmittalDate;
    updateForm.spslapprovalDate = spslapprovalDate;
    updateForm.postStatus = postStatus;
    updateForm.publishStatus = publishStatus;
    editDialog.value = true;
}

const updateForm = useForm({
    id: '' as string,
    categoryID: '' as string,
    municipalStatus: '' as string,
    provincialStatus: '' as string,
    title: '' as string,
    author: '' as string,
    coauthor: [] as string[],
    firstReadingDate: '' as string,
    secondReadingDate: '' as string,
    thirdReadingDate: '' as string,
    ordinanceNumber: '' as string,
    finalTitle: '' as string,
    enactmentDate: '' as string,
    lceapprovalDate: '' as string,
    transmittalDate: '' as string,
    spslapprovalDate: '' as string,
    postStatus: '' as string,
    publishStatus: '' as string,
    file: null as any,
});

const updateFile = () => {
    updateForm.post(route('update.file'), {
        onSuccess: () => {
            toast.success('File updated successfully');
            updateForm.reset();
            editDialog.value = false;
            queryClient.invalidateQueries({ queryKey: ['fetchFiles'] });
        },
        onError: () => {
            toast.error('Error creating file');
            console.error('Error');
        },
    });
};

const handleEditFileChange = async (event: Event) => {
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

const addEditCoAuthor = () => {
    updateForm.coauthor.push('');
};

const removeEditCoAuthor = (index: number) => {
    updateForm.coauthor.splice(index, 1);
};

function getCoAuthorIds(coAuthors: { official: { encrypted_id: string } }[]) {
    return coAuthors.map(co => co.official.encrypted_id);
}


const deleteDialog = ref(false);

function deleteFileDialog(id: string) {
    deleteForm.id = id;
    deleteDialog.value = true;
}

const deleteForm = useForm({
    id: '',
});

const deleteFile = () => {
    deleteForm.delete(route('delete.file'), {
        onSuccess: () => {
            toast.success('File deleted successfully');
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


const openCategoryDialog = ref(false);

function createCategoryDialog(id: string) {
    createCategoryForm.id = id;
    openCategoryDialog.value = true;
}

const createCategoryForm = useForm({
    id: '' as string,
    category: '' as string,
});

const createCategory = () => {
    createCategoryForm.post(route('create.subcategory'), {
        onSuccess: () => {
            toast.success('Subcategory created successfully');
            createCategoryForm.reset();
            openCategoryDialog.value = false;
            queryClient.invalidateQueries({ queryKey: ['fetchFiles'] });
        },
        onError: () => {
            toast.error('Error creating category');
            console.error('Error');
        },
    });
};

const editCategoryDialog = ref(false);

function updateCategoryDialog(id: string, category: string) {
    updateCategoryForm.id = id;
    updateCategoryForm.category = category;
    editCategoryDialog.value = true;
}

const updateCategoryForm = useForm({
    id: '' as string,
    category: '' as string,
});

const updateCategory = () => {
    updateCategoryForm.patch(route('update.subcategory'), {
        onSuccess: () => {
            toast.success('Subcategory updated successfully');
            updateCategoryForm.reset();
            editCategoryDialog.value = false;
            queryClient.invalidateQueries({ queryKey: ['fetchFiles'] });
        },
        onError: () => {
            toast.error('Error updating category');
            console.error('Error');
        },
    });
};

const deleteCategoryDialog = ref(false);

function removeCategoryDialog(id: string) {
    deleteCategoryForm.id = id;
    deleteCategoryDialog.value = true;
}

const deleteCategoryForm = useForm({
    id: '',
});

const deleteCategory = () => {
    deleteCategoryForm.delete(route('delete.subcategory'), {
        onSuccess: () => {
            toast.success('Subcategory deleted successfully');
            deleteCategoryForm.reset();
            deleteCategoryDialog.value = false;
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
                        <h6 class="flex text-md font-bold items-center">
                            <Folder class="h-8 w-8 mr-2 flex-shrink-0 rounded-full border p-1 text-muted-foreground" />
                            {{ data?.files.categoryName.category }}
                        </h6>
                    </div>
                </div>

                <Dialog v-model:open="openCategoryDialog">
                    <DialogTrigger as-child>
                        <Button @click="createCategoryDialog(data?.files.categoryName.encrypted_id)"
                            class="cursor-pointer">
                            + New
                        </Button>
                    </DialogTrigger>
                    <DialogContent class="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>Add Category</DialogTitle>
                            <DialogDescription>
                                Create a sub-category for <b>{{ data?.files.categoryName.category }}</b>
                            </DialogDescription>
                        </DialogHeader>

                        <form action="" @submit.prevent="createCategory">
                            <div class="grid gap-4 py-4">
                                <div class="grid grid-cols-4 items-center gap-4">
                                    <Label class="text-right">Category</Label>
                                    <Input v-model="createCategoryForm.category" placeholder="Category Name"
                                        class="col-span-3" required />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" class="cursor-pointer"
                                    :disabled="createCategoryForm.processing">Save</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>

                <Dialog v-model:open="editCategoryDialog">
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
                                    <Input v-model="updateCategoryForm.category" placeholder="Category Name"
                                        class="col-span-3" required />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" class="cursor-pointer"
                                    :disabled="updateCategoryForm.processing">Save</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>

                <Dialog v-model:open="deleteCategoryDialog">
                    <DialogContent class="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>Delete Subcategory</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to delete this category? This action cannot be undone.
                            </DialogDescription>
                        </DialogHeader>

                        <form action="" @submit.prevent="deleteCategory">
                            <DialogFooter>
                                <Button type="submit" class="cursor-pointer" variant="destructive"
                                    :disabled="deleteCategoryForm.processing">Delete</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>

                <Dialog v-model:open="openDialog">

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
                    <DialogContent class="sm:max-w-[800px] w-full max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Edit File</DialogTitle>
                            <DialogDescription>Edit the selected file's details below.</DialogDescription>
                        </DialogHeader>

                        <form @submit.prevent="updateFile" class="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <div>
                                <Label class="text-sm font-medium text-gray-700">Municipal Status</Label>
                                <Select v-model="updateForm.municipalStatus" required>
                                    <SelectTrigger class="w-full">
                                        <SelectValue placeholder="Select a status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">Draft Ordinance</SelectItem>
                                        <SelectItem value="2">Approved Ordinance</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                           
                            <div>
                                <Label class="text-sm font-medium text-gray-700">Provincial Status</Label>
                                <Select v-model="updateForm.provincialStatus">
                                    <SelectTrigger class="w-full">
                                        <SelectValue placeholder="Select a status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="0">No Status Yet</SelectItem>
                                        <SelectItem value="1">Disapproved Ordinance</SelectItem>
                                        <SelectItem value="2">Approved Ordinance</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                          
                            <div class="md:col-span-2">
                                <Label class="text-sm font-medium text-gray-700">Title of Ordinance</Label>
                                <Textarea v-model="updateForm.title" class="w-full" required />
                            </div>

                            <div class="md:col-span-2">
                                <Label class="text-sm font-medium text-gray-700">Ordinance Number</Label>
                                <Input v-model="updateForm.ordinanceNumber" type="text" class="w-full" />
                            </div>

                            <div class="md:col-span-2">
                                <Label class="text-sm font-medium text-gray-700">Final Title</Label>
                                <Textarea v-model="updateForm.finalTitle" class="w-full" />
                            </div>

                          
                            <div>
                                <Label class="text-sm font-medium text-gray-700">Author</Label>
                                <Select v-model="updateForm.author" required>
                                    <SelectTrigger class="w-full">
                                        <SelectValue placeholder="Select an author" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem v-for="author in data?.files.authors" :key="author.encrypted_id"
                                            :value="author.encrypted_id">
                                            {{ author.name }}
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <!-- Co Authors -->
                            <div class="md:col-span-2">
                                <Label class="text-sm font-medium text-gray-700">Co Authors</Label>
                                <div class="space-y-3">
                                    <div v-for="(co, index) in updateForm.coauthor" :key="index"
                                        class="flex items-center gap-2">
                                        <Select v-model="updateForm.coauthor[index]" required class="flex-1">
                                            <SelectTrigger class="w-full">
                                                <SelectValue placeholder="Select a co-author" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem v-for="author in data?.files.authors"
                                                    :key="author.encrypted_id" :value="author.encrypted_id">
                                                    {{ author.name }}
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <button type="button" @click="removeEditCoAuthor(index)"
                                            class="text-red-500 cursor-pointer">✕</button>
                                    </div>

                                    <button type="button" @click="addEditCoAuthor" class="text-blue-500 text-sm cursor-pointer">
                                        + Add
                                    </button>
                                </div>
                            </div>

                            
                            <div>
                                <Label class="text-sm font-medium text-gray-700">1st Reading Date</Label>
                                <Input v-model="updateForm.firstReadingDate" type="date" />
                            </div>
                            <div>
                                <Label class="text-sm font-medium text-gray-700">2nd Reading Date</Label>
                                <Input v-model="updateForm.secondReadingDate" type="date" />
                            </div>
                            <div>
                                <Label class="text-sm font-medium text-gray-700">3rd Reading Date</Label>
                                <Input v-model="updateForm.thirdReadingDate" type="date" />
                            </div>
                            <div>
                                <Label class="text-sm font-medium text-gray-700">Enactment Date</Label>
                                <Input v-model="updateForm.enactmentDate" type="date" />
                            </div>
                            <div>
                                <Label class="text-sm font-medium text-gray-700">LCE Approval Date</Label>
                                <Input v-model="updateForm.lceapprovalDate" type="date" />
                            </div>
                            <div>
                                <Label class="text-sm font-medium text-gray-700">Transmittal Date</Label>
                                <Input v-model="updateForm.transmittalDate" type="date" />
                            </div>
                            <div>
                                <Label class="text-sm font-medium text-gray-700">SPSL Approval Date</Label>
                                <Input v-model="updateForm.spslapprovalDate" type="date" />
                            </div>

                            <div>
                                <Label class="text-sm font-medium text-gray-700">Post Status</Label>
                                <Select v-model="updateForm.postStatus">
                                    <SelectTrigger class="w-full">
                                        <SelectValue placeholder="Select a status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Status</SelectLabel>
                                            <SelectItem value="0">Not Yet</SelectItem>
                                            <SelectItem value="1">Posted</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label class="text-sm font-medium text-gray-700">Publish Status</Label>
                                <Select v-model="updateForm.publishStatus">
                                    <SelectTrigger class="w-full">
                                        <SelectValue placeholder="Select a status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Status</SelectLabel>
                                            <SelectItem value="0">Not Yet</SelectItem>
                                            <SelectItem value="1">Published</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div class="md:col-span-2">
                                <Label class="text-sm font-medium text-gray-700">Update File</Label>
                                <Input type="file" @change="handleEditFileChange" accept=".pdf" />
                            </div>

                            <div class="md:col-span-2 text-right">
                                <Button type="submit" class="cursor-pointer" :disabled="updateForm.processing">
                                    Save Changes
                                </Button>
                            </div>

                        </form>
                    </DialogContent>
                </Dialog>

                <Dialog v-model:open="deleteDialog">
                    <DialogContent class="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>Delete File</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to delete this file? This action cannot be undone.
                            </DialogDescription>
                        </DialogHeader>

                        <form action="" @submit.prevent="deleteFile">
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
                        <TableHead class="w-[300px]"><small>Category</small></TableHead>
                        <TableHead><small>No. of Files</small></TableHead>
                        <TableHead><small>Creation Date</small></TableHead>
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
                    <TableRow v-if="data?.files.subCategoriesList.length == 0">
                        <TableCell colspan="5">
                            <small class="text-center text-red-500 flex items-center justify-center">
                                <MinusCircle class="mr-2 w-5" />
                                No Data Found
                            </small>
                        </TableCell>
                    </TableRow>
                    <TableRow v-for="(category, index) in data?.files.subCategoriesList" :key="category.id">
                        <TableCell>
                            <small>{{ index + 1 }}</small>
                        </TableCell>
                        <TableCell class="w-[300px] pr-20">
                            <Link :href="route('admin.files', { id: category.encrypted_id })">
                            <div class="flex items-center space-x-3">
                                <div>
                                    <Folder
                                        class="h-8 w-8 flex-shrink-0 rounded-full border p-1 text-muted-foreground" />
                                </div>
                                <div>
                                    <div class="font-medium">{{ category.category }}</div>
                                </div>
                            </div>
                            </Link>
                        </TableCell>
                        <TableCell>{{ category.totalFiles }}</TableCell>
                        <TableCell><small>{{ formatDateTime(category.created_at) }}</small></TableCell>

                        <TableCell class="text-right">
                            <Button variant="link"
                                @click="updateCategoryDialog(category.encrypted_id, category.category)"
                                class="ml-2 cursor-pointer">
                                <Pencil />
                            </Button>
                            <Button variant="destructive" @click="removeCategoryDialog(category.encrypted_id)"
                                class="ml-2 cursor-pointer">
                                <Trash2 />
                            </Button>
                        </TableCell>
                    </TableRow>

                </TableBody>
            </Table>

            <div class="flex items-center justify-between space-x-4">
                <Input v-model="searchQuery" placeholder="Search... (if no results, go to next page)"
                    class="w-full max-w-md text-sm" />

                <Button @click="createFileDialog(data?.files.categoryName.encrypted_id)" class="cursor-pointer">
                    + New
                </Button>
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
                            <small class="text-green-500 flex items-center justify-center">
                                <Loader2Icon class="mr-2 w-5" />
                                Loading...
                            </small>
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
                            <Link :href="route('admin.view-file', { id: file.encrypted_id })">
                                <div class="text-wrap text-[13px]">{{ file.title }}</div>
                            </Link>
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
                            <Link :href="route('admin.view-file', { id: file.encrypted_id })">
                                <Button variant="link" class="ml-0 cursor-pointer">
                                    <Eye />
                                </Button> 
                            </Link>
                            <Button variant="link" class="ml-0 cursor-pointer" @click="editFileDialog(
                                file.encrypted_id,
                                file.categoryID,
                                file.municipalStatus,
                                file.provincialStatus,
                                file.title,
                                file.author.encrypted_id,
                                getCoAuthorIds(file.coAuthors),
                                file.firstReadingDate,
                                file.secondReadingDate,
                                file.thirdReadingDate,
                                file.ordinanceNumber,
                                file.finalTitle,
                                file.enactmentDate,
                                file.lceapprovalDate,
                                file.transmittalDate,
                                file.spslapprovalDate,
                                file.postStatus,
                                file.publishStatus
                            )">
                                <Pencil />
                            </Button>

                            <Button variant="destructive" class="ml-0 cursor-pointer" @click="deleteFileDialog(file.encrypted_id)">
                                <Trash2 />
                            </Button>
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
