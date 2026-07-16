<script setup>

import { computed, ref } from 'vue'
import UsersChild from './UsersChild.vue'



const emit = defineEmits(['increment','decrement' , 'reset'])

const props = defineProps({
    name: {
        type: String,
        default: "name"
    },
    age: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
    }
})


const dynamicClass = computed(() => {
    return [
        'bg-slate-900 text-white'
    ]
})

const dynamicStatus = computed(() => {
    return {
        'text-white': props.isActive == true,
        'text-purple-600': props.isActive == false
    }
})

</script>

<template>
    <div>
        <div>
            <button @click="emit('increment')">increment</button>
            <button @click="emit('decrement')">decrement</button>
            <UsersChild @reset="emit('reset')"/>
        </div>
        <div :class="dynamicClass">
            <h3>Name : {{ name }}</h3>
            <p>Age : {{ age }}</p>
            <p>Status : <span :class="dynamicStatus">{{ isActive == true ? 'active' : 'in-active' }}</span> </p>
        </div>
    </div>
</template>

<style scoped></style>