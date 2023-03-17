/* eslint-disable no-octal */
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { IDateProvider } from '../IDateProvider'

dayjs.extend(utc)

class DayjsDateProvider implements IDateProvider {
  compareInHours (start_date: Date, end_date: Date): number {
    const end_date_utc = this.convertToUTC(end_date)
    const start_date_utc = this.convertToUTC(start_date)

    return dayjs(end_date_utc).diff(start_date_utc, 'hours')
  }

  convertToUTC (date: Date): string {
    return dayjs(date).utc().local().format()
  }

  dateNow (): Date {
    return dayjs().toDate()
  }

  compareInDays (start_date: Date, end_date: Date): number {
    const end_date_utc = this.convertToUTC(end_date)
    const start_date_utc = this.convertToUTC(start_date)

    return dayjs(end_date_utc).diff(start_date_utc, 'days')
  }

  compareInMonths (start_date: Date, end_date: Date): number {
    const end_date_utc = this.convertToUTC(end_date)
    const start_date_utc = this.convertToUTC(start_date)

    try {
      return dayjs(end_date_utc).diff(start_date_utc, 'month')
    } catch {
      return 0
    }
  }

  addDays (days: number): Date {
    return dayjs().add(days, 'days').toDate()
  }

  addHours (hours: number): Date {
    return dayjs().add(hours, 'hour').toDate()
  }

  compareIfBefore (start_date: Date, end_date: Date): boolean {
    return dayjs(start_date).isBefore(end_date)
  }

  getNumberDaysOnMonth (date: Date = new Date()): number {
    return dayjs(date).daysInMonth()
  }

  calcDaysPropCurrentMonth (day?: Date): number {
    const totalDaysCurrentMonth = this.getNumberDaysOnMonth()
    let date = new Date()

    if (day) {
      date = new Date(day.getFullYear(), day.getMonth(), day.getDate())
    }

    const daysPast = this.compareInDays(
      new Date(date.getFullYear(), date.getMonth(), 1),
      date
    )

    return (daysPast + 1) / totalDaysCurrentMonth
  }

  isCurrentMonth (date: Date): boolean {
    const currentMonth = dayjs().get('month')

    const dateMonth = dayjs(date).get('month')
    if (currentMonth == dateMonth) {
      return true
    }
    return false
  }
}

export { DayjsDateProvider }
