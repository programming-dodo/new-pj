<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useBudgetStore } from '../stores/BudgetStore'
const budgetStore = useBudgetStore()
var date = ref()
var payee = ref()
var category = ref()
onBeforeMount(() => {
    const budgetId = budgetStore.selectedBudget.id
    budgetStore.getCategories(budgetId)
    budgetStore.getPayee(budgetId)
})
</script>
<template>
    <div>
        <p>Date</p>
        <input type="date" v-model="date"><br/>
        <p>Payee</p>
        <select v-if="budgetStore.payees.length != 0" v-model="payee">
            <option v-for="payee in budgetStore.filterPayees" :key="payee?.id" :value="payee"> {{ payee?.name }}</option>
        </select><br/>
        <p>Category</p>
        <select v-model="category" v-if="budgetStore.categories.length != 0">
            <option v-for="cat in budgetStore.categories" :key="cat.id" :value="cat">{{ cat.name }}</option>
        </select><br/>
        <p>memo</p>
        <input type="text"><br/>
        <p>outflow</p>
        <input type="text"><br/>
        <p>inflow</p>
        <input type="text"><br/>
    </div>
</template>