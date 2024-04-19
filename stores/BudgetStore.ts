import { defineStore } from "pinia";

export const useBudgetStore = defineStore('budgets', {
    state:  () => ({
      token: process.env.YNAB_TOKEN as string,
      budgets: [],
      categories: [],
      payees: [],
      months: [],
      selectedBudget: null
    }), 
    actions: {
      async getBudgets() {
        await $fetch('https://api.ynab.com/v1/budgets', {
          headers: { Authorization: `Bearer ${this.token}` }
        }).then((response) => {
          this.budgets.length = 0
          response.data.budgets.forEach((element) => this.budgets.push(element));
        })
      },
      async getCategories(budgetId: string) {
        await $fetch(`https://api.ynab.com/v1/budgets/${budgetId}/categories`, {
          headers: { Authorization: `Bearer ${this.token}`}
        }).then((response) => {
          this.categories.length = 0
          response.data.category_groups.forEach((element) => this.categories.push(element))
        })
      },
      async getPayee(budgetId: string) {
        await $fetch(`https://api.ynab.com/v1/budgets/${budgetId}/payees`, {
          headers: {Authorization: `Bearer ${this.token}`}
        }).then((response) => {
          this.payees.length=0
          response.data.payees.forEach((element) => this.payees.push(element))
        })
      },
      async getBalance(budgetId: string) {
        await $fetch(`https://api.ynab.com/v1/budgets/${budgetId}/balance`,{
          headers: {Authorization: `Bearer ${this.token}`}
        }).then((response)=> {
          this.getBalance.length=0
          response.data.balance.forEach((element) => this.getBalance.push(element))
        })
      },
      async getMonth(budgetId: string) {
        await $fetch(`https://api.ynab.com/v1/budgets/${budgetId}/months`, {
          headers: {Authorization: `Bearer ${this.token}`}
        }).then((response) => {
          this.months.length=0
          response.data.months.forEach((element) => this.months.push(element))
        })
      },
    },
    getters: {
      filterPayees() {
        var notIncluding = ["Starting Balance","Manual Balance Adjustment","Reconciliation Balance Adjustment"]
        var retPayees: [] = []
        this.payees.forEach((payee) => {
          var contained = filterItemsOut(payee.name, notIncluding)
          if (!contained && payee?.transfer_account_id == null) {
            retPayees.push(payee)
          }
        })
        return retPayees
      }
    },
})

function filterItemsOut(checkItem: any, againstArray: [any]) {
   var contained: boolean = false
   againstArray.forEach(item => {
    if (checkItem == item) {
      contained = true
    }
  })
  return contained
}

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBudgetStore, import.meta.hot))
}