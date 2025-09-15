import { RedisExceptionEnum } from '../enums/redis-exception.enum'

import { RedisExceptionType } from './redis-exception.type'

export type RedisBaseExceptionType = Record<keyof typeof RedisExceptionEnum, RedisExceptionType>
