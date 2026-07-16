<script setup>
const props = defineProps({
    firstName: String,
    lastName: String,
    email: String,
})


const emit = defineEmits([
    'update:firstName',
    'update:lastName',
    'update:email'
])

</script>


<template>
    <div>
        <div>
            <input name="firstName" :value="firstName" @input="$emit('update:firstName', $event.target.value)"
                placeholder="first name" />
        </div>
        <div>
            <input name="lastName" :value="lastName" @input="$emit('update:lastName', $event.target.value)"
                placeholder="enter last name" />
        </div>
        <div>
            <input name="email" :value="email" @input="$emit('update:email',$event.target.value)" placeholder="enter email"/>
        </div>
    </div>
</template>