<script setup>
import { ref, reactive } from 'vue'
import UserForm from './UserForm.vue';
import User from '@/User.vue';

const user = ref({
    firstName: '',
    lastName: '',
    email: ''
})


const handleSubmit = () => {
    console.log(user.value);
}

</script>

<template>
    <h4>Emit-v-model</h4>

    <UserForm v-model:firstName="user.firstName" v-model:lastName="user.lastName" v-model:email="user.email" />


    <div>
        <p>Full Name: {{ user.firstName }} {{ user.lastName }}</p>
        <p>Email: {{ user.email }}</p>
    </div>

    <div>
        <button @click="handleSubmit">
            submit 
        </button>
    </div>

</template>