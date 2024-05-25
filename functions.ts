export function checkDoubleDigit(number: number): String {
    let r 
    if (number < 10 ) {
        r = '0' + number
        return r
    }
    return JSON.stringify(number)
}
export function useTimeShift(date: Date, day: 'month' | 'day', months: number, add: 'add' | 'subtrac'){
    let month 
    let deay 
    if (day == 'day') {
        let d: Date
        if (add) {
            d = new Date(date.setDate(date.getDate() + months));
        } else {
            d =  new Date(date.setDate(date.getDate() - months));
        }
        month = checkDoubleDigit(d.getMonth())
        deay = checkDoubleDigit(d.getDate())
        let formated = d.getFullYear() + '-' + month + '-' + deay
        return formated
    } else if(day === 'month') {
        let dl: Date
        if (add === 'add') {
            dl = new Date(date.setMonth(date.getMonth() + months!))
        } else {
            dl = new Date(date.setMonth(date.getMonth() - months!))
        }
        month = checkDoubleDigit(dl.getMonth())
        deay = checkDoubleDigit(dl.getDate())
        let formatted = dl.getFullYear() + '-' + month + '-' + deay
        return formatted
    }
}
export function findSymbol(date: boolean, id: boolean, data: String, replaceString: string) {
    if (date!= false){
        return data.replace(/(%.*%)/gm, replaceString)
    }else if (id != false) {
        return data.replace(/(@.*@)/gm, replaceString)
    }
}