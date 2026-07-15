<script setup>
import { computed, defineProps, onMounted, ref } from "vue";
import JobListing from "./JobListing.vue";
import axios from "axios";
import Preloader from "./Preloader.vue";


defineProps({
    limit: Number,
    showButton: {
        type: Boolean,
        default: false
    }
})

const jobs = ref([]);

const loading = ref(true);

onMounted(async () => {
    try {
        const response = await axios.get('/api/jobs');
        jobs.value = response.data;
    } catch (error) {
        console.error("Error fetching jobs: ", error);
    } finally {
        loading.value = false;
    }
});

</script>

<template>
    <section class="bg-blue-50 px-4 py-10">
        <div class="container-xl lg:container m-auto">
            <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">
                Browser Jobs
            </h2>

            <div v-if="loading" class="flex justify-center items-center py-20">
                <Preloader/>
            </div>

            <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <JobListing v-for="job in jobs" :key="job.id" :job="job" />
            </div>
        </div>
    </section>


    <section v-if="showButton" class="m-auto max-w-lg my-10 px-6">
        <RouterLink to="/jobs" class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700">View
            All Jobs</RouterLink>
    </section>


</template>

<style></style>