
export function useTimeShift(date: Date, days: number | null, months: number | null, add: boolean) {
    const results = new Date(date)
    if (days != null) {
        if (add) {
            return date.setDate(date.getDate() + days);
        } else {
            return date.setDate(date.getDate() - days);
        }
    } else if (months != null) {
        if (add) {
            return date.setMonth(date.getMonth() + months)
        } else {
            return date.setMonth(date.getMonth() - months);
        }
    }
}