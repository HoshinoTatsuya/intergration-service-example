import { LanguagesEnum } from '../enums/languages.enum'

import { RedisBaseExceptionType } from './redis-base-exception.type'

export type RedisConstantExceptionsType = Record<keyof typeof LanguagesEnum, RedisBaseExceptionType>
