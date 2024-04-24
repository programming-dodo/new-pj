<script setup lang="ts">
import { useBudgetStore } from '../stores/BudgetStore';
import {utils} from 'ynab'
const budgetStore = useBudgetStore()
var selectedCategory = ref()
var selectedMonths = ref()
var selectedPayee = ref()
var selectedSubCat = ref()

var sortingCategories = computed(()=> {
  var givingBack: any[] | undefined = []
  if (selectedSubCat.value != undefined) {
    budgetStore.transactions.forEach((transaction) => {
      if (transaction?.category_id == selectedSubCat.value?.id) {
        givingBack?.push(transaction)
      }
    })
    return givingBack
  }
})
function moneyFormat(moneyDinero: number) {
  return utils.convertMilliUnitsToCurrencyAmount(moneyDinero)
}
function capitalizeFirstLetter(string: String) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

 var sortingDate = computed(()=>{
  var givingBack: any[] | undefined = []
  if (selectedMonths.value != undefined ) {
    budgetStore.transactions.forEach((transaction) => {
      var tmy = transaction.date.slice(0, 7)
      var smy = selectedMonths.value.month.slice(0,7)
      console.log(tmy, smy) 
      if (tmy == smy) {
        givingBack?.push(transaction)
      }
    })
    return givingBack
  }
 })

</script>
<template>
  <div>
    <button @click="budgetStore.getMonths(budgetStore.selectedBudget.id)" v-if="budgetStore.selectedBudget != null">Get Months</button>
    <button @click="budgetStore.getPayees(budgetStore.selectedBudget.id)" v-if="budgetStore.selectedBudget != null">Payees</button>
    <button @click="budgetStore.getCategories(budgetStore.selectedBudget.id)" v-if="budgetStore.selectedBudget != null">displayCategories</button>
    <button @click="budgetStore.getTransactions(budgetStore.selectedBudget.id)" v-if="budgetStore.selectedBudget != null">display transactions</button>
    <select v-model="selectedCategory" v-if="budgetStore.categories.length != 0">
      <option v-for="cat in budgetStore.categories" :key="cat.id" :value="cat">{{ cat.name }}</option>
    </select>
    <select v-if="budgetStore.payees.length != 0" v-model="selectedPayee">
      <option v-for="payee in budgetStore.filterPayees" :key="payee?.id" :value="payee"> {{ payee?.name }}</option>
    </select>
    <select v-model="selectedMonths" v-if="budgetStore.months.length != 0">
      <option v-for="month in budgetStore.months" :key="month.month" :value="month">{{ month.month }}</option>
    </select>
    <select v-model="selectedSubCat" v-if="selectedCategory != undefined">
      <option v-for="category in selectedCategory.categories" :value="category">{{ category.name }}</option>
    </select>
    <div v-for="cat in sortingCategories" :key="cat?.id">
      <p> Amount: {{ moneyFormat(cat?.amount) }}</p>
      <p v-if="cat.memo != null">Memo: {{ cat?.memo }}</p>
      <p>Payee: {{ capitalizeFirstLetter(cat?.payee_name) }}</p>
    </div>
    <div v-for="transaction in sortingDate" :key="transaction?.id">
      <p> Amount: {{ moneyFormat(transaction?.amount) }}</p>
      <p v-if="transaction.memo != null">Memo: {{ transaction?.memo }}</p>
      <p>Payee: {{ capitalizeFirstLetter(transaction?.payee_name) }}</p>
      <p>Date: {{ transaction.date }}</p>
    </div>
  </div>
</template>