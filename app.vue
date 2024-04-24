<script setup lang="ts">
const budgetStore = useBudgetStore()
</script>

<template>
  <button @click="budgetStore.getBudgets()" v-if="budgetStore.selectedBudget == null">Load Budgets</button>
  <select v-model="budgetStore.selectedBudget">
    <option disabled >budget</option>
    <option v-for="budget in budgetStore.budgets" :value="budget" :key="budget.id">
      {{ budget.name }}
    </option>
  </select>
  <NuxtLink to="/budgetDetails" v-if="budgetStore.selectedBudget != null"><button>Budget Detail</button></NuxtLink>
  <NuxtLink to="/transaction" v-if="budgetStore.selectedBudget != null"><button>+ New Transaction</button></NuxtLink>
</template>