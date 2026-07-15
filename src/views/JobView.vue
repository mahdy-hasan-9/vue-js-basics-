<script setup>
import Preloader from '@/components/Preloader.vue';
import axios from 'axios';
import { onMounted, reactive } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

const router = useRouter();
const toast = useToast();
const route = useRoute();
const jobId = route.params.jobId;

const state = reactive({
    job: null,
    loading: false
});

onMounted(async () => {
    try {
        state.loading = true;
        const response = await axios.get(`/api/jobs/${jobId}`);
        state.job = response.data;
        state.loading = false;
    } catch (error) {
        console.error("Error fetching job details: ", error);
    } finally {
        state.loading = false;
    }
});

const deleteJob = async () => {
    if (confirm('Are you sure you want to delete this job?')) {
        try {
            state.loading = true;
            await axios.delete(`http://localhost:5000/jobs/${jobId}`);
            toast.success("Job Deleted Successfully!");
            router.push(`/jobs`);
        } catch (error) {
            console.error("Error deleting job: ", error);
            state.loading = false;
        }
        finally {
            state.loading = false;
        }
    }
};
</script>

<template>
    <div v-if="state.loading" class="flex justify-center items-center py-20">
        <Preloader />
    </div>

    <section v-else-if="state.job" class="bg-green-50 min-h-screen">
        <div class="container m-auto py-10 px-6">
            <div class="grid grid-cols-1 md:grid-cols-3 w-full gap-6">

                <main class="md:col-span-2">
                    <div class="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                        <div class="text-gray-500 mb-4">{{ state.job.type }}</div>
                        <h1 class="text-3xl font-bold mb-4">{{ state.job.title }}</h1>
                        <div class="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                            <i class="pi pi-map-marker text-xl text-orange-700 mr-2"></i>
                            <p class="text-orange-700">{{ state.job.location }}</p>
                        </div>
                    </div>

                    <div class="bg-white p-6 rounded-lg shadow-md mt-6">
                        <h3 class="text-green-800 text-lg font-bold mb-6">Job Description</h3>
                        <p class="mb-4">{{ state.job.description }}</p>

                        <h3 class="text-green-800 text-lg font-bold mb-2">Salary</h3>
                        <p class="mb-4">{{ state.job.salary }} / Year</p>
                    </div>
                </main>

                <aside class="md:col-span-1">
                    <div class="bg-white p-6 rounded-lg shadow-md">
                        <h3 class="text-xl font-bold mb-6">Company Info</h3>
                        <h2 class="text-2xl font-semibold">{{ state.job.company?.name }}</h2>
                        <p class="my-2 text-gray-600">{{ state.job.company?.description }}</p>

                        <hr class="my-4" />

                        <h3 class="text-md font-bold text-gray-700">Contact Email:</h3>
                        <p class="my-2 bg-green-100 p-2 font-bold rounded break-words">
                            {{ state.job.company?.contactEmail }}
                        </p>

                        <h3 class="text-md font-bold text-gray-700">Contact Phone:</h3>
                        <p class="my-2 bg-green-100 p-2 font-bold rounded">
                            {{ state.job.company?.contactPhone }}
                        </p>
                    </div>

                    <div class="bg-white p-6 rounded-lg shadow-md mt-6">
                        <h3 class="text-xl font-bold mb-6">Manage Job</h3>
                        <RouterLink :to="`/jobs/edit/${state.job.id}`"
                            class="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-full w-full mt-4 block transition">
                            Edit Job
                        </RouterLink>
                        <button @click="deleteJob"
                            class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full mt-4 block transition">
                            Delete Job
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    </section>
</template>