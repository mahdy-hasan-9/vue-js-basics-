<script setup>
import { reactive } from 'vue';


const cart = reactive({
  items: [{ id: 1, name: 'Laravel Book', price: 50, qty: 2 }],
  coupon: 'PROMO10',
  discount: 10
})

const addItem = () => {
  const id = cart.items.length + 1
  cart.items.push({
    id: id,
    name: "item - " + id,
    price: 50 + id,
    qty: 1
  })
}

const inc = (id) => {
  const item = cart.items.find((item) => item.id == id)
  item.qty += 1;
}

const dec = (id) => {
  const item = cart.items.find((item) => item.id == id)
  if (item.qty <= 1) {
    removeItem(id)
  }
  item.qty -= 1;
}

const removeItem = (id) => {
  const index = cart.items.findIndex((i) => i.id === id)
  if (index !== -1) cart.items.splice(index, 1)
}

const reset = () => {
  cart.items.length = 0
}



</script>

<template>
  <div>
    <button @click="reset">
      reset Item
    </button>
    <button @click="addItem">
      Add Item
    </button>
  </div>
  <div>
    Cart Items :
    <div v-for="item in cart.items" class="ml-2">{{ item }} <button @click="inc(item.id)">inc</button> <button
        @click="dec(item.id)">dec</button>
      <button @click="removeItem(item.id)">x</button>
    </div>
  </div>
</template>

<style scoped></style>
