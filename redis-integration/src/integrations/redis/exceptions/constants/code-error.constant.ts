import { RedisExceptionEnum } from '../enums/redis-exception.enum'

export const errorCode: Record<keyof typeof RedisExceptionEnum, number> = {
  [RedisExceptionEnum.CREATE_USER_ERROR]: 1001,
}
