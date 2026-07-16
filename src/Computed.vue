<script setup>
import { ref, computed, reactive } from 'vue'

const cart = reactive({
    items: [
        { name: 'Laravel Book', price: 50, qty: 2 },
        { name: 'Vue.js Guide', price: 40, qty: 1 }
    ],
    discount: 10
})



const subTotal = computed(() => {
    const total = cart.items.reduce((total, item) => total += (item.price * item.qty), 0)
    return total
})


const totalAmount = computed(() => {
    return subTotal.value - cart.discount
})

</script>

<template>
    <div class="flex flex-col">
        <div>
            <p v-for="item in cart.items">
                {{ item }}
            </p>
        </div>
        <div>
            <p>Sub total: ${{ subTotal }}</p>
            <p>Total Amount(with discount): ${{ totalAmount }}</p>
        </div>
    </div>
</template>
