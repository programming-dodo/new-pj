<script setup lang="ts">
const budgetStore = useBudgetStore()
</script>

<template data-theme="synthwave">
  <html data-theme>
  <div class="navbar">
    <h1 v-if="budgetStore.selectedBudget != null" class="navbar-start">{{ budgetStore.selectedBudget?.name }}</h1>
    <NuxtLink to="/shops"  class="navbar-middle, link"><h2>Shops</h2></NuxtLink>
    <NuxtLink to="/transactionPage" class="navbar-middle, link"><h2>Transaction Related</h2></NuxtLink>
  </div>
  <h3 v-if="budgetStore.budgets.length > 0 && budgetStore.selectedBudget === null">Select Budget</h3>
  
  <button @click="budgetStore.getBudgets()" v-if="budgetStore.budgets.length == 0">Load Budgets</button>
  <select v-model="budgetStore.selectedBudget" v-if="budgetStore.budgets.length > 0 && budgetStore.selectedBudget === null">
    <option disabled >budget</option>
    <option v-for="budget in budgetStore.budgets" :value="budget" :key="budget.id">
      {{ budget.name }}
    </option>
  </select>
  <NuxtPage />
  </html>
</template>