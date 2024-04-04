<script setup lang="ts">

const token = process.env.YNAB_TOKEN as string;

const {data:budgets} = await useFetch('https://api.ynab.com/v1/budgets', {
  headers: { Authorization: `Bearer ${token}` }
})
const user = await useFetch('https://api.ynab.com/v1/user', {
  headers: { Authorization: `Bearer ${token}` }
})
 const {data:transactions} = await useFetch('https://api.ynab.com/v1/budgets/{946086d2-5d22-443a-b841-187464105e97}/transactions', {
 headers: { Authorization: `Bearer ${token}` },
 })
 const {data:categories} = await useFetch('https://api.ynab.com/v1/budgets/{946086d2-5d22-443a-b841-187464105e97}/categories', {
 headers: { Authorization: `Bearer ${token}` },
 })
const smt = ref()
function callData () {
  smt.value = budgets.value.data.budgets
}


const category = ref()
const categoryTransactions = ref()
function myCat () {
  for(let a = 0; a < transactions.value.data.transactions.length; a++) {
    var transaction = transactions.value.data.transactions[a]
    console.log(transactions.value.data.transactions[a])
  }
  transactions.value.data.transactions.foreach((transaction) => {
    console.log(transaction)
  })
  console.log(transactions.value.data.transactions[0])
}

</script>

<template>
<button @click="myCat()" >hi</button>
<h1>Hello World</h1>
<p>{{ smt }}</p>
<div>{{ categories.data.category_groups[2].name }}</div>
<select v-model="category" @click="">
  <option disabled value="">Bills</option>
  <option :key="category.id" v-for="category in categories.data.category_groups[2].categories"  :value="category">{{ category.name }}</option>
</select>

<h3>{{ category?.name }}</h3>
<h3>{{ category?.balance }}</h3>
<p>{{ category }}</p>
<p>{{ transactions.category }}</p>
<p>{{ transactions }}</p>
<p>hello world! Programming together</p>
</template>