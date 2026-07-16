<script setup>
const emit = defineEmits(['reset'])
</script>

<template>
    <button @click="emit('reset')">reset</button>
</template>