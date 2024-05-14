<script setup lang="ts">
import { useBudgetStore } from '../stores/BudgetStore';
import { ref } from 'vue';
import {utils} from 'ynab'
const budgetStore = useBudgetStore()
let actVal= ref()

async function pullAccount(){
   if (budgetStore.Account.length == 0){
        budgetStore.getAccount(budgetStore.selectedBudget.id)
    }
    actVal.value = budgetStore.Account
}

</script>



<template>
<button @click="pullAccount">Get Account</button>    
<p v-for="category in actVal">{{ account.name }}</p>
</template>