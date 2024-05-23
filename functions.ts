export function useTimeShift(date: Date, day: 'month' | 'day', months: number, add: 'add' | 'subtrac'){
    if (day == 'day') {
        let d: Date
        if (add) {
            d = new Date(date.setDate(date.getDate() + months));
        } else {
            d =  new Date(date.setDate(date.getDate() - months));
        }
        let formated = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate()
        return formated
    } else if(day === 'month') {
        let dl: Date
        if (add === 'add') {
            dl = new Date(date.setMonth(date.getMonth() + months!))
        } else {
            dl = new Date(date.setMonth(date.getMonth() - months!))
        }
        let formatted = dl.getFullYear() + '-' + 28 + '-' + dl.getDate()
        return formatted
    }
}
export function findSymbol(date: boolean, id: boolean, data: String, replaceString: string) {
    if (date!= false){
        return data.replace(/(%.*%)/gm, replaceString)
    }else if (id != false) {
        // console.log('id: ', id,'date: ', date)
        return data.replace(/(@.*@)/gm, replaceString)
    }
}