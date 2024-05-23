<script setup lang="ts">
import { useTimeShift } from './functions'
const budgetStore = useBudgetStore()
let date = ref()
function changeDate() {
  var da = new Date()
  let mili = useTimeShift(da, null, 4, false)
  date.value = new Date(mili ?? 0).toDateString()
}
</script>

<template>
  <button @click="budgetStore.getBudgets()" v-if="budgetStore.budgets.length == 0">Load Budgets</button>
  <h2>{{ date }}</h2>
  <button @click="changeDate()">date modifier</button>
  <select v-model="budgetStore.selectedBudget" v-if="budgetStore.budgets.length > 0">
    <option disabled >budget</option>
    <option v-for="budget in budgetStore.budgets" :value="budget" :key="budget.id">
      {{ budget.name }}
    </option>
  </select>
  <NuxtLink to="/budgetDetails" v-if="budgetStore.selectedBudget != null"><button>Budget Detail</button></NuxtLink>
  <NuxtLink to="/transaction" v-if="budgetStore.selectedBudget != null"><button>+ New Transaction</button></NuxtLink>
  <NuxtLink to="/accounts" v-if="budgetStore.selectedBudget != null"><button>categories</button></NuxtLink>
  <NuxtPage />
</template>