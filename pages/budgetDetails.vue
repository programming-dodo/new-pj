<script setup lang="ts">
import { useBudgetStore } from '../stores/BudgetStore';
import {utils} from 'ynab'
const budgetStore = useBudgetStore()
var selectedCategory = ref()
var selectedMonths = ref()
var selectedPayee = ref()
var selectedSubCat = ref()
var displayedTransaction = ref([])
const emptyDecimal = (.00)
watch(selectedSubCat, () => {
  var newArray: never[] =[]
  if (selectedSubCat.value != undefined) {
    displayedTransaction.value.forEach((transaction) => {
      if (transaction?.category_id == selectedSubCat.value?.id) {
        newArray.push(transaction)
      }
    })
  }
  displayedTransaction.value = newArray
})
watch(selectedMonths, ()=> {
  var newArray: never[] = []
  if (selectedMonths.value != undefined ) {
    displayedTransaction.value.forEach((transaction) => {
      var tmy = transaction.date.slice(0, 7)
      var smy = selectedMonths.value.month.slice(0,7)
      if (tmy == smy) {
        newArray.push(transaction)
      }
    })
  }
  displayedTransaction.value = newArray
})
watch(selectedPayee, () => {
  var newArray: never[] = []
  if (selectedPayee.value != undefined) {
    displayedTransaction.value.forEach((transaction) => {
      if (transaction?.payee_id == selectedPayee.value.id) {
        newArray.push(transaction)
      }
    })
  }
  displayedTransaction.value = newArray
})
function capitalizeFirstLetter(string: String) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function moneyFormat(moneyDinero: number) {
  return utils.convertMilliUnitsToCurrencyAmount(moneyDinero)
}
async function displayTransactions() {
  if(budgetStore.transactions.length == 0) {
    await budgetStore.getTransactions(budgetStore.selectedBudget?.id)
  }
  displayedTransaction.value.length = 0
  budgetStore.transactions.forEach((transa) => displayedTransaction.value.push(transa))
}
function resetFilters() {
  selectedCategory.value = undefined
  selectedMonths.value = undefined
  selectedPayee.value = undefined
  selectedSubCat.value = undefined
  budgetStore.transactions.forEach((transa) => displayedTransaction.value.push(transa))
}
</script>
<template>
  <div>
    <button @click="displayTransactions()" v-if="budgetStore.selectedBudget != null">display transactions</button>
    <button @click="resetFilters()">Reset Selection</button>
    <div v-if="budgetStore.transactions.length > 0">
      <button @click="budgetStore.getMonths(budgetStore.selectedBudget.id)" v-if="budgetStore.selectedBudget != null && selectedMonths == undefined">Get Months</button>
      <button @click="budgetStore.getPayees(budgetStore.selectedBudget.id)" v-if="budgetStore.selectedBudget != null && selectedPayee == undefined">Payees</button>
      <button @click="budgetStore.getCategories(budgetStore.selectedBudget.id)" v-if="budgetStore.selectedBudget != null && selectedCategory == undefined">displayCategories</button>
      <select v-model="selectedCategory" v-if="budgetStore.categories.length != 0 && selectedCategory == undefined">
        <option v-for="cat in budgetStore.categories" :key="cat.id" :value="cat">{{ cat.name }}</option>
      </select>
      <select v-model="selectedSubCat" v-if="selectedCategory != undefined && selectedSubCat == undefined">
        <option v-for="category in selectedCategory.categories" :value="category">{{ category.name }}</option>
      </select>
      <select v-if="budgetStore.payees.length != 0 && selectedPayee == undefined" v-model="selectedPayee">
        <option v-for="payee in budgetStore.filterPayees" :key="payee?.id" :value="payee"> {{ payee?.name }}</option>
      </select>
      <select v-model="selectedMonths" v-if="budgetStore.months.length != 0 && selectedMonths == undefined">
        <option v-for="month in budgetStore.months" :key="month.month" :value="month">{{ month.month }}</option>
      </select>
    </div>
    <div v-for="transaction in displayedTransaction" :key="transaction?.id">
      <div v-if="transaction.length = 2">Amount: {{ moneyFormat(transaction?.amount)}}<p>.00</p>  </div>
      <div>Amount: {{ moneyFormat(transaction?.amount)}}<p>.00</p>  </div>
      <p v-if="transaction.memo != null">Memo: {{ transaction?.memo }}</p>
      <p>Payee: {{ capitalizeFirstLetter(transaction?.payee_name) }}</p>
    </div>
  </div>
</template>