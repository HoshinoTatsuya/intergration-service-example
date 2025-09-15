import { getDateNow } from './date.functions'

export function validRequestTimeCheck(data: { startRequest: number; limitTime: number }): boolean {
  return getDateNow() - data.startRequest < data.limitTime
}
