<script setup lang="ts">
import { useBudgetStore } from '../stores/BudgetStore';

const budgetStore = useBudgetStore()
var selectedBudget  = ref()
var selectedCategory = ref()
var selectedMonths = ref()
var selectedPayee = ref()

function callData() {
  // budgetStore.se

}
var sortingCategories = computed(()=> {
  var givingBack: any[] | undefined = []
  if (selectedCategory.value != undefined) {
    console.log(selectedCategory.value)
  // console.log(selectedCategory.value?.categories)
  // console.log(selectedCategory.value?.id)
  budgetStore.transactions.forEach((transaction) => {
    console.log(transaction.category_id)
    // if (transaction?.category_id == selectedCategory.value?.id) {
    //   givingBack.push(transaction)
    // }
  })
  return givingBack
}

})

</script>
<template>
  <div>
    <button @click="budgetStore.getBudgets()" v-if="budgetStore.selectedBudget == null">Load Data</button>
    <button @click="budgetStore.getMonths(budgetStore.selectedBudget.id)" v-if="budgetStore.selectedBudget != null">Get Months</button>
    <button @click="budgetStore.getPayees(budgetStore.selectedBudget.id)" v-if="budgetStore.selectedBudget != null">Payees</button>
    <button @click="budgetStore.getCategories(budgetStore.selectedBudget.id)" v-if="budgetStore.selectedBudget != null">displayCategories</button>
    <button @click="budgetStore.getTransactions(budgetStore.selectedBudget.id)" v-if="budgetStore.selectedBudget != null">display transactions</button>
    <select v-model="budgetStore.selectedBudget">
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
    <select v-model="selectedMonths" v-if="budgetStore.months.length != 0">
      <option v-for="month in budgetStore.months" :key="month.month" :value="month">{{ month.month }}</option>
    </select>
    <p>{{ selectedCategory?.name }}</p>
    <p>{{ selectedBudget?.name, "CSAR" }}</p>
    <p>{{  selectedPayee?.name }}</p>
    <p>{{ selectedMonths?.month }}</p>
    <div v-for="transaction in budgetStore.transactions" :key="transaction.id">
      <p>payee: {{ transaction.payee_name }}</p><p v-if="transaction.memo != null ">Memo: {{ transaction.memo }}</p>
    </div>
    <p> {{ sortingCategories }}</p>
  </div>
</template>