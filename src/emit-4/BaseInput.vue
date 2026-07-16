<script setup>

const props = defineProps({
    modelValue: String,
    label: String,
    type: {
        type: String, default: 'text'
    },
    placeholder: String,
})


const emit = defineEmits(['update:modelValue'])


const handleInput = (evnt) => {
    emit('update:modelValue', evnt.target.value)
}


</script>

<template>
    <div class="form-group">
        <label v-if="label">{{ label }}</label>
        <input :type="type" :value="modelValue" @input="handleInput" :placeholder="placeholder" />
    </div>
</template>


<style>
.form-group {
    margin-bottom: 12px;
}

label {
    display: block;
    margin-bottom: 4px;
    font-weight: 500;
}

input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

input.has-error {
    border-color: red;
}

.error-text {
    color: red;
    font-size: 12px;
}
</style>