import { format } from 'date-fns'

import { dateFormatConstant, expireToken } from './constants'
import { DateExpireTokenEnum } from './enums'

export function getDateNow(noMilliseconds = true): number {
  return noMilliseconds ? Math.trunc(Date.now() / dateFormatConstant.milliseconds) : Date.now()
}

export async function getFutureDays(days: number): Promise<number> {
  return Math.floor(Date.now() / dateFormatConstant.milliseconds) + days * expireToken[DateExpireTokenEnum.DAY]
}

export async function getFutureHours(hours: number): Promise<number> {
  return Math.floor(Date.now() / dateFormatConstant.milliseconds) + hours * expireToken[DateExpireTokenEnum.HOUR]
}

/**
 * This function is for calculating a date in the past.
 *
 * @param {Number} time - amount of time ago in timestamp format.
 * @param {Boolean} noMilliseconds - default true.
 *
 * @return The result of the execution is a Date of a date in the past.
 */
export async function getLastTime(time: number, noMilliseconds = true): Promise<Date> {
  const nowDate = noMilliseconds ? Math.trunc(Date.now() / dateFormatConstant.milliseconds) : Date.now()

  const resultDate = nowDate - time

  return new Date(resultDate * dateFormatConstant.milliseconds)
}

/**
 * This function is for calculating a date in the past.
 *
 * @param {Date} dateString - birthday date
 *
 * @return Returns age of person
 */
export function getAge(dateString: Date): number {
  const today = new Date()
  const birthDate = new Date(dateString)
  let age = today.getFullYear() - birthDate.getFullYear()
  const month = today.getMonth() - birthDate.getMonth()

  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }

  return age
}

/**
 * @description Formatted clientTime 'yyyy-mm-DD hh:mm:ss'
 * @returns {string} Return formatted time
 */
export function getTimeFromDatabaseTimestamp(time: Date): string {
  return format(time, 'yyyy-MM-dd hh:mm:ss.ms')
}
