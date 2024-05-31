export default defineEventHandler(async (event) => {
   const body = await readBody(event)
   console.log('budget ID: ', body.budgetId)
   console.log('transaction: ', body.transaction)
   await $fetch(`https://api.ynab.com/v1/budgets/${body.budgetId}/transactions`, {
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${process.env.YNAB_TOKEN as String}`,
      },
      method: 'POST',
      body: {transaction: JSON.parse(body.transaction)}
   })
})