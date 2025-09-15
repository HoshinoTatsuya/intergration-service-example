import { LanguagesEnum } from '../enums/languages.enum'
import { redisExceptionEn } from '../i18n/en/redis-en.exception'
import { redisExceptionRu } from '../i18n/ru/redis-ru.exception'
import { RedisConstantExceptionsType } from '../types/redis-constant-exceptions.type'

export const redisConstantExceptions: RedisConstantExceptionsType = {
  [LanguagesEnum.EN]: redisExceptionEn,
  [LanguagesEnum.RU]: redisExceptionRu,
}
