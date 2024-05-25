interface Transaction {
    account_id: String,
    date: Date, 
    amount: Number,
    payee_id: String | null, 
    payee_name: String | null,
    category_id: Number,
    memo: String | null,
    cleared: 'cleared' | 'uncleared' | 'reconciled',
    approved: Boolean | null,
    flag_color: 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | null,
    import_id: String | null
}