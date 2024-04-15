<script setup lang="ts">

const budgetStore = useBudgetStore()
var selectedBudget  = ref()
var selectedCategory = ref()

</script>

<template>
<div>
  <button @click="budgetStore.getPayee(selectedBudget.id)" v-if="selectedBudget != null">Payees</button>
<button @click="budgetStore.getCategories(selectedBudget.id)" v-if="selectedBudget != null">
  displayCategories
</button>
  <button @click="budgetStore.getBudgets()" v-if="selectedBudget == null">Load Data</button>
  <select v-model="selectedBudget">
    <option disabled >budget</option>
    <option v-for="budget in budgetStore.budgets" :value="budget" :key="budget.id">
      {{ budget.name }}
    </option>
  </select>
  <select v-model="selectedCategory" v-if="budgetStore.categories.length != 0">
    <option v-for="cat in budgetStore.categories" :key="cat.id" :value="cat">{{ cat.name }}</option>
  </select>
  <select v-if="budgetStore.payees.length != 0">
    <option v-for="payee in budgetStore.filterPayees" :key="payee?.id" :value="payee"> {{ payee?.name }}</option>
  </select>
  <p>{{ selectedCategory?.name }}</p>
</div>
</template>