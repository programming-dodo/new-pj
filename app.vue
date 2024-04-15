<script setup lang="ts">

const budgetStore = useBudgetStore()
var selectedBudget  = ref()
var selectedCategory = ref()
var selectedMonth = ref()
var selectedPayee = ref()
</script>

<template>
<div>
  <button @click="budgetStore.getBudgets()" v-if="selectedBudget == null">Load Data</button>
  <button @click="budgetStore.getMonth(selectedBudget.id)" v-if="selectedBudget != null">Get Months</button>
  <button @click="budgetStore.getPayee(selectedBudget.id)" v-if="selectedBudget != null">Payees</button>
<button @click="budgetStore.getCategories(selectedBudget.id)" v-if="selectedBudget != null">
  displayCategories
</button>
  <select v-model="selectedBudget">
    <option disabled >budget</option>
    <option v-for="budget in budgetStore.budgets" :value="budget" :key="budget.id">
      {{ budget.name }}
    </option>
  </select>
  <select v-model="selectedCategory" v-if="budgetStore.categories.length != 0">
    <option v-for="cat in budgetStore.categories" :key="cat.id" :value="cat">{{ cat.name }}</option>
  </select>
  <select v-if="budgetStore.payees.length != 0" v-model="selectedPayee">
    <option v-for="payee in budgetStore.filterPayees" :key="payee?.id" :value="payee"> {{ payee?.name }}</option>
  </select>
  <select v-model="selectedMonth" v-if="budgetStore.months.length != 0">
    <option v-for="month in budgetStore.months" :key="month.month" :value="month">{{ month.month }}</option>
  </select>
  <p>{{ selectedCategory?.name }}</p>
  <p>{{ selectedBudget?.name, "CSAR" }}</p>
  <p>{{  selectedPayee?.name }}</p>
  <p>{{ selectedMonth?.month }}</p>
  <p></p>
</div>
</template>