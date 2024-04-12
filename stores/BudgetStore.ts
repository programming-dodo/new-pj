import { useFetch } from "nuxt/app";
import { defineStore } from "pinia";

export const useBudgetStore = defineStore('budgets', {
    state:  () => ({
      token: process.env.YNAB_TOKEN as string,
      budgets: []
    }), 
    actions: {
      async getBudgets() {
        await $fetch('https://api.ynab.com/v1/budgets', {
          headers: { Authorization: `Bearer ${this.token}` }
        }).then((response) => {
          console.log({tb: this.budgets, r: response.data.budgets})
          this.budgets.length = 0
          response.data.budgets.forEach((element) => this.budgets.push(element));
        })
      }
    },
    getters: {},
})
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBudgetStore, import.meta.hot))
}