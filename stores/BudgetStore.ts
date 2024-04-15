import { defineStore } from "pinia";

export const useBudgetStore = defineStore('budgets', {
    state:  () => ({
      token: process.env.YNAB_TOKEN as string,
      budgets: [],
      categories: [],
      payees: [],
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
      async getCategories(id: string) {
        await $fetch(`https://api.ynab.com/v1/budgets/${id}/categories`, {
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
      }
    },
    getters: {
      filterPayees() {
        var name1 = "Starting Balance"
        var name2 = "Manual Balance Adjustment"
        var name3 = "Reconciliation Balance Adjustment"
        var retPayees: [] = []
        this.payees.forEach((payee) => {
          if(payee?.transfer_account_id == null && payee.name != name1 && payee.name != name2 && payee.name != name3) {
            retPayees.push(payee)
          }
        })
        return retPayees
      }
    },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBudgetStore, import.meta.hot))
}