<script setup lang="ts">
const budgetStore = useBudgetStore()
</script>

<template>
  <NuxtLink to="/budgetDetails">Rand0m Data</NuxtLink>
  <NuxtLink to="/transaction" v-if="budgetStore.selectedBudget != null"><button>+ New Transaction</button></NuxtLink>
  <NuxtPage />
</template>