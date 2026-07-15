<script setup>

import Preloader from '@/components/Preloader.vue';
import router from '@/router';
import axios from 'axios';
import { reactive, ref } from 'vue'
import { useToast } from 'vue-toastification';

const form = reactive({
    type: "Full-Time",
    title: "",
    description: "",
    salary: "",
    location: "",
    company: {
        name: "",
        description: "",
        contactEmail: "",
        contactPhone: ""
    }
})
const loading = ref(false)
const toast = useToast();

const errors = reactive({
    title: "",
    description: "",
    contactEmail: ""
})

const validationForm = () => {
    let isValid = true;
    errors.title = "";
    errors.description = "";
    errors.contactEmail = "";
    errors.title = "";
    errors.description = "";
    errors.contactEmail = "";

    if (!form.title || form.title.trim().length < 5) {
        errors.title = "Job title must be at least 5 characters long.";
        isValid = false;
    }

    if (!form.description || form.description.trim().length < 20) {
        errors.description = "Job description must be at least 20 characters long.";
        isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.company.contactEmail || !emailRegex.test(form.company.contactEmail)) {
        errors.contactEmail = "Please enter a valid email address.";
        isValid = false;
    }

    return isValid;
}

const resetForm = () => {
    form.type = "Full-Time";
    form.title = "";
    form.description = "";
    form.salary = "";
    form.location = "";
    form.company.name = "";
    form.company.description = "";
    form.company.contactEmail = "";
    form.company.contactPhone = "";
    errors.title = "";
    errors.description = "";
    errors.contactEmail = "";
}



const handleSubmit = async (e) => {

    if (e) e.preventDefault();

    if (validationForm() == false) {
        toast("Validation Failed");
        return;
    }

    loading.value = true;

    const newJob = {
        title: form.title,
        type: form.type,
        location: form.location,
        description: form.description,
        salary: form.salary,
        company: {
            name: form.company.name,
            description: form.company.description,
            contactEmail: form.company.contactEmail,
            contactPhone: form.company.contactPhone
        }
    }

    try {
        const response = await axios.post(`/api/jobs`, newJob);
        const data = response.data;
        toast.success("A New Job Added Successfully!");
        resetForm();
        router.push(`/jobs/${data.id}`)
    } catch (error) {
        console.log(error);
        toast("Something Went Wrong!");
    }
    finally {
        loading.value = false
    }

}


</script>

<template>
    <section class="bg-green-50">
        <div class="container m-auto max-w-2xl py-24">
            <div class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                <div v-if="loading">
                    <Preloader />
                </div>
                <div v-else>
                    <form @submit.prevent="handleSubmit">
                        <h2 class="text-3xl text-center font-semibold mb-6">Add Job</h2>

                        <div class="mb-4">
                            <label for="type" class="block text-gray-700 font-bold mb-2">Job
                                Type</label>
                            <select v-model="form.type" id="type" name="type" class="border rounded w-full py-2 px-3">
                                <option value="Full-Time">Full-Time</option>
                                <option value="Part-Time">Part-Time</option>
                                <option value="Remote">Remote</option>
                                <option value="Internship">Internship</option>
                            </select>
                        </div>

                        <div class="mb-4">
                            <label class="block text-gray-700 font-bold mb-2">Job Listing Name</label>
                            <input type="text" v-model="form.title" id="title" name="title"
                                class="border rounded w-full py-2 px-3 mb-2"
                                placeholder="eg. Beautiful Apartment In Miami" />
                            <p v-if="errors.title" class="text-red-500 text-xs italic">{{ errors.title }}</p>
                        </div>
                        <div class="mb-4">
                            <label for="description" class="block text-gray-700 font-bold mb-2">Description</label>
                            <textarea v-model="form.description" id="description" name="description"
                                class="border rounded w-full py-2 px-3" rows="4"
                                placeholder="Add any job duties, expectations, requirements, etc"></textarea>
                            <p v-if="errors.description" class="text-red-500 text-xs italic">{{ errors.description }}
                            </p>
                        </div>

                        <div class="mb-4">
                            <label for="type" class="block text-gray-700 font-bold mb-2">Salary</label>
                            <select v-model="form.salary" id="salary" name="salary"
                                class="border rounded w-full py-2 px-3">
                                <option value="Under $50K">under $50K</option>
                                <option value="$50K - $60K">$50 - $60K</option>
                                <option value="$60K - $70K">$60 - $70K</option>
                                <option value="$70K - $80K">$70 - $80K</option>
                                <option value="$80K - $90K">$80 - $90K</option>
                                <option value="$90K - $100K">$90 - $100K</option>
                                <option value="$100K - $125K">$100 - $125K</option>
                                <option value="$125K - $150K">$125 - $150K</option>
                                <option value="$150K - $175K">$150 - $175K</option>
                                <option value="$175K - $200K">$175 - $200K</option>
                                <option value="Over $200K">Over $200K</option>
                            </select>
                        </div>

                        <div class="mb-4">
                            <label class="block text-gray-700 font-bold mb-2">
                                Location
                            </label>
                            <input v-model="form.location" type="text" id="location" name="location"
                                class="border rounded w-full py-2 px-3 mb-2" placeholder="Company Location" />
                        </div>

                        <h3 class="text-2xl mb-5">Company Info</h3>

                        <div class="mb-4">
                            <label for="company" class="block text-gray-700 font-bold mb-2">Company Name</label>
                            <input v-model="form.company.name" type="text" id="company" name="company"
                                class="border rounded w-full py-2 px-3" placeholder="Company Name" />
                        </div>

                        <div class="mb-4">
                            <label for="company_description" class="block text-gray-700 font-bold mb-2">Company
                                Description</label>
                            <textarea v-model="form.company.description" id="company_description"
                                name="company_description" class="border rounded w-full py-2 px-3" rows="4"
                                placeholder="What does your company do?"></textarea>
                        </div>

                        <div class="mb-4">
                            <label for="contact_email" class="block text-gray-700 font-bold mb-2">Contact Email</label>
                            <input v-model="form.company.contactEmail" type="email" id="contact_email"
                                name="contact_email" class="border rounded w-full py-2 px-3"
                                placeholder="Email address for applicants" />
                            <p v-if="errors.contactEmail" class="text-red-500 text-xs italic">{{ errors.contactEmail }}
                            </p>
                        </div>
                        <div class="mb-4">
                            <label for="contact_phone" class="block text-gray-700 font-bold mb-2">Contact Phone</label>
                            <input v-model="form.company.contactPhone" type="tel" id="contact_phone"
                                name="contact_phone" class="border rounded w-full py-2 px-3"
                                placeholder="Optional phone for applicants" />
                        </div>

                        <div>
                            <button
                                class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                                type="submit">
                                Add Job
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>