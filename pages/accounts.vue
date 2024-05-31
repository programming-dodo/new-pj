<script setup lang="ts">
import { useBudgetStore } from '../stores/BudgetStore';
import { ref } from 'vue';
import {utils} from 'ynab'
const budgetStore = useBudgetStore()
let actVal= ref()

async function pullAccounts(){
   if (budgetStore.accounts.length === 0){
        budgetStore.getAccounts(budgetStore.selectedBudget!.id)
    }
    actVal.value = budgetStore.accounts
}



</script>



<template>
<button @click="pullAccounts">Get Accounts</button>    
<p>{{ actVal }}</p>
</template>