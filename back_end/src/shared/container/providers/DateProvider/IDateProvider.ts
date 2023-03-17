interface IDateProvider {
  compareInHours: (start_date: Date, end_date: Date) => number
  convertToUTC: (date: Date) => string
  dateNow: () => Date
  compareInDays: (start_date: Date, end_date: Date) => number
  compareInMonths: (start_date: Date, end_date: Date) => number
  addDays: (days: number) => Date
  addHours: (hours: number) => Date
  compareIfBefore: (start_date: Date, end_date: Date) => boolean
  getNumberDaysOnMonth: (date: Date) => number
  calcDaysPropCurrentMonth: () => number
  isCurrentMonth: (date: Date) => boolean
}

export { IDateProvider }
