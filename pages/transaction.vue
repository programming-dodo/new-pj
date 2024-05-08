<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useBudgetStore } from '../stores/BudgetStore'
const budgetStore = useBudgetStore()
var date = ref()
var account = ref()
var payee = ref()
var categoryGroup = ref()
var category = ref()
var memo =  ref()
var amount = ref()
var transnactions: { account_id: any; date: any; amount: any; payee_id: any; payee_name: any; category_id: any; memo: any; cleared: string; approved: boolean; flag_color: null; import_id: null; }[] = []
// var inflow = ref()

const budgetId = budgetStore.selectedBudget.id
onBeforeMount(() => {
    budgetStore.getCategories(budgetId)
    budgetStore.getPayees(budgetId)
    budgetStore.getUsers(budgetId)
})
async function saveTransaction() {
    var newTransaction = {
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
    budgetStore.postTransaction(newTransaction, budgetId)
}
function addToTransactionArray() {
    var newTransaction = {
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
    transnactions.push(newTransaction)
    console.log(transnactions)
}
async function postMany() {
    budgetStore.postTransactions(transnactions, budgetId)
}
</script>
<template>
    <div>
        <p>Date</p>
        <input type="date" v-model="date"><br/>
        <div v-if="budgetStore.accounts.length != 0">
            <p>Account</p>
            <select v-model="account">
                <option disabled>Accounts</option>
                <option :value="account" v-for="account in budgetStore.accounts" :key="account?.id">
                    {{ account.name }}
                </option>
            </select>
        </div>
        <div v-if="budgetStore.payees.length != 0">
            <p>Payee</p>
            <select v-model="payee">
                <option v-for="payee in budgetStore.filterPayees" :key="payee?.id" :value="payee"> {{ payee?.name }}</option>
            </select><br/>
        </div>
        <div v-if="budgetStore.categories.length != 0">
            <p>categoryGroup</p>
            <select v-model="categoryGroup">
                <option v-for="cat in budgetStore.categories" :key="cat?.id" :value="cat">{{ cat.name }}</option>
            </select>
        </div>
        <div v-if="categoryGroup != null">
            <p>Category</p>
            <select v-model="category">
                <option v-for="category in categoryGroup.categories" :value="category">{{ category.name }}</option>
            </select>
        </div>
        <p>memo</p>
        <input type="text" v-model="memo"><br/>
        <p>amount</p>
        <input type="text" v-model="amount"><br/>
        <!-- <p>inflow</p>
        <input type="text" v-model="inflow"><br/> -->
        <button @click="addToTransactionArray()">add to array list</button>
        <button @click="saveTransaction()">Save Transaction</button>
        <button @click="postMany()">Save Array</button>
    </div>
</template>