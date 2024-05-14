import { defineStore } from "pinia";

export const useBudgetStore = defineStore('budgets', {
    state:  () => ({
      token: process.env.YNAB_TOKEN as String,
      budgets: [],
      categories: [],
      payees: [],
      months: [],
      transactions: [],
      accounts: [],
      selectedBudget: null
    }), 
    actions: {
      async postTransaction(transaction: any, budgetId: any) {
        await $fetch(`https://api.ynab.com/v1/budgets/${budgetId}/transactions`, {
        headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`},
        method: 'POST',
        body: {transaction: transaction}
        }).then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log("error: ", error)
        })
      },
      async postTransactions(transnactions: any, budgetId: any) {
        await $fetch(`https://api.ynab.com/v1/budgets/${budgetId}/transactions`, {
        headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`},
        method: 'POST',
        body: {transactions: transnactions}
        }).then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log("error: ", error)
        })
      },
      async getBudgets() {
        await $fetch('https://api.ynab.com/v1/budgets', {
          headers: { Authorization: `Bearer ${this.token}` }
        }).then((response) => {
          this.budgets.length = 0
          response.data.budgets.forEach((element) => this.budgets.push(element));
        })
      },
      async getTransactions(budgetId: String) {
        await $fetch(`https://api.ynab.com/v1/budgets/${budgetId}/transactions`, {
          headers: { Authorization: `Bearer ${this.token}`}
        }).then((response) => {
          this.transactions.length = 0
          response.data.transactions.forEach((element) => this.transactions.push(element))
        })
      },
      async getCategories(budgetId: String) {
        await $fetch(`https://api.ynab.com/v1/budgets/${budgetId}/categories`, {
          headers: { Authorization: `Bearer ${this.token}`}
        }).then((response) => {
          this.categories.length = 0
          response.data.category_groups.forEach((element) => this.categories.push(element))
        })
      },
      async getAccounts(budgetId: string) {
        await $fetch(`https://api.ynab.com/v1/budgets/${budgetId}/accounts`, {
          headers: {Authorization: `Bearer ${this.token}`}
        }).then((response) => {
          this.payees.length=0
          response.data.accouonts.forEach((element) => this.payees.push(element))
        })
      },
      async getPayees(budgetId: String) {
        await $fetch(`https://api.ynab.com/v1/budgets/${budgetId}/payees`, {
          headers: {Authorization: `Bearer ${this.token}`}
        }).then((response) => {
          this.payees.length=0
          response.data.payees.forEach((element) => this.payees.push(element))
        })
      },
      async getBalance(budgetId: String) {
        await $fetch(`https://api.ynab.com/v1/budgets/${budgetId}/balance`,{
          headers: {Authorization: `Bearer ${this.token}`}
        }).then((response)=> {
          this.getBalance.length=0
          response.data.balance.forEach((element) => this.getBalance.push(element))
        })
      },
      async getMonths(budgetId: String) {
        await $fetch(`https://api.ynab.com/v1/budgets/${budgetId}/months`, {
          headers: {Authorization: `Bearer ${this.token}`}
        }).then((response) => {
          this.months.length=0
          response.data.months.forEach((element) => this.months.push(element))
        })
      },
      async getUsers(budgetId: String) {
        await $fetch(`https://api.ynab.com/v1/budgets/${budgetId}/accounts`, {
          headers: {Authorization: `Bearer ${this.token}`}
        }).then((response) => {
          this.accounts.length = 0
          response.data.accounts.forEach((account) => this.accounts.push(account))
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