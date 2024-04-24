<script setup lang="ts">
const budgetStore = useBudgetStore()
</script>

<template>
  <button @click="budgetStore.getBudgets()" v-if="budgetStore.budgets.length == 0">Load Budgets</button>
  <select v-model="budgetStore.selectedBudget" v-if="budgetStore.budgets.length > 0">
    <option disabled >budget</option>
    <option v-for="budget in budgetStore.budgets" :value="budget" :key="budget.id">
      {{ budget.name }}
    </option>
  </select>
  <NuxtLink to="/budgetDetails" v-if="budgetStore.selectedBudget != null"><button>Budget Detail</button></NuxtLink>
  <NuxtLink to="/transaction" v-if="budgetStore.selectedBudget != null"><button>+ New Transaction</button></NuxtLink>
  <NuxtPage />
</template>