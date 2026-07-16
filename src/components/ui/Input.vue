<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
</script>

<template>
  <div>
    <input v-model="name" placeholder="Name likhun" />
    <input v-model="email" placeholder="Email likhun" />
    
    <p>👤 Name: {{ name }}</p>
    <p>📧 Email: {{ email }}</p>
  </div>
</template>