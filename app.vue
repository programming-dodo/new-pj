<script setup lang="ts">
import { useFetch } from "nuxt/app";
const api_token = process.env.YNAB_TOKEN

const budgetStore = useBudgetStore()

const {data:budgets} = await useFetch('https://api.ynab.com/v1/budgets', {
  headers: { Authorization: `Bearer ${api_token}` }
})

const mb = ref(budgets.value.data.budgets)

function gBud()  {
  budgetStore.getBudgets()
}
const yb = budgetStore.budgets

// console.log(budgets)

// onBeforeMount(() => {
//   budgetStore.getBudgets()
// })
</script>

<template>
  <div>
    {{ mb }}
    <hr>
    <button @click="gBud">Get Budgets</button>
    <hr>
    {{ yb }}
  </div>
</template>