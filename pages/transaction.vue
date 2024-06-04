<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useBudgetStore } from '../stores/BudgetStore'
import transactions from '../data/transactions.json'
import { useTimeShift, findSymbol } from '~/functions';
import type { Transaction } from '../types/ynab'

const budgetStore = useBudgetStore()
var date = ref()
var account = ref()
var payee = ref()
var categoryGroup = ref()
var category = ref()
var memo =  ref()
var amount = ref()
var transnactions: { account_id: any; date: any; amount: any; payee_id: any; payee_name: any; category_id: any; memo: any; cleared: string; approved: boolean; flag_color: null; import_id: null; }[] = []
var maxDate = ref(useTimeShift(new Date(), 'day',0, 'add'))
// var inflow = ref()
//@ts-ignore
const budgetId = budgetStore.selectedBudget.id
onBeforeMount(() => {
    budgetStore.getCategories(budgetId)
    budgetStore.getPayees(budgetId)
    budgetStore.getUsers(budgetId)
})
function checkTransaction(tran: Transaction): Boolean {
    if (tran.account_id != null && tran.date != null && tran.amount != null && tran.payee_name != null && tran.category_id != null) {
        return true
    } else {
        return false
    }
}
async function saveTransaction() {
    var newTransaction: Transaction = {
        account_id: account.value?.id,
        date: date.value,
        amount: amount.value,
        payee_id: payee.value?.id,
        payee_name: payee.value?.name,
        category_id: category.value?.id,
        memo: memo.value,
        cleared: 'uncleared',
        approved: false,
        flag_color: null, 
        import_id: null
    }
    if (checkTransaction(newTransaction) === true) {
        budgetStore.postTransaction(newTransaction)
    } else {
        alert('must  fill in necessary fields')
    }
}
function addToTransactionArray() {  
    var newTransaction: Transaction = {
        account_id: account.value?.id,
        date: date.value,
        amount: amount.value,
        payee_id: payee.value?.id,
        payee_name: payee.value?.name,
        category_id: category.value?.id,
        memo: memo.value,
        cleared: 'uncleared',
        approved: false,
        flag_color: null, 
        import_id: null
    }
    if (checkTransaction(newTransaction) === true) {
        transnactions.push(newTransaction)
    } else {
        alert('must fill in necessary fields')
    }
}
async function postMany() {
    budgetStore.postTransactions(transnactions)
}
function preCreated() {
    if (budgetStore.selectedCategory != null) {
        budgetStore.preCreated()
    } else {
        alert('Please select a category')
    }
}
</script>
<template>
    <div>
        <h2>New Transaction</h2>     
        <h4>Date *</h4>
        <input type="date" v-model="date" min="1980-01-01" :max="maxDate"><br/>
        <div v-if="budgetStore.accounts.length != 0">
            <h4>Account *</h4>
            <select v-model="account">
                <option disabled>Accounts</option>
                <option :value="account" v-for="account in budgetStore.accounts" :key="account?.id">
                    {{ account.name }}
                </option>
            </select>
        </div>
        <div v-if="budgetStore.payees.length != 0">
            <h4>Payee *</h4>
            <select v-model="payee">
                <option v-for="payee in budgetStore.filterPayees" :key="payee?.id" :value="payee"> {{ payee?.name }}</option>
            </select><br/>
        </div>
        <div v-if="budgetStore.categories.length != 0">
            <h4>categoryGroup *</h4>
            <select v-model="categoryGroup">
                <option v-for="cat in budgetStore.categories" :key="cat?.id" :value="cat">{{ cat.name }}</option>
            </select>
        </div>
        <div v-if="categoryGroup != null">
            <h4>Category *</h4>
            <select v-model="budgetStore.selectedCategory">
                <option v-for="category in categoryGroup.categories" :value="category">{{ category.name }}</option>
            </select>
        </div>
        <h4>Memo: optional</h4>
        <textarea name="Memo" id="" cols="30" rows="5" v-model="memo" maxlength="200"></textarea>
        <h4>Amount *</h4>
        <input type="text" v-model="amount"><br/>
        <button @click="addToTransactionArray()">add to array list</button>
        <button @click="saveTransaction()">Save Transaction</button>
        <button @click="postMany()">Save Array</button>
        <h2>Pre Created: select Category</h2>
        <button @click="preCreated()" class='btn btn-secondary'>post</button>
    </div>
</template>