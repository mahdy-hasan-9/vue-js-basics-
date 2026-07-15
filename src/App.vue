<script setup>

import Navbar from './components/Navbar.vue';
import { RouterView } from 'vue-router';
import { ref } from 'vue'
import 'primeicons/primeicons.css'

</script>

<template lang="">
  <Navbar/>
  <RouterView/>
</template>
