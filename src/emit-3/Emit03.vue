<script setup>
import { ref, reactive } from 'vue'
import BaseInput from './BaseInput.vue'

const form = reactive({
    email: '',
    password: ''
})


const handleSubmit = () => {
    console.log(form);

}

</script>

<template>
    <h4>Emit-v-model</h4>

    <form @submit.prevent="handleSubmit">
        <BaseInput v-model="form.email" label="Email" type="text" placeholder="Enter Email" />
        <BaseInput v-model="form.password" label="Password" type="text" placeholder="Enter password" />
        <button type="submit">Login</button>
    </form>

</template>