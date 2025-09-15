import { Logger } from '@nestjs/common'

// eslint-disable-next-line @typescript-eslint/naming-convention
import * as RedisCustomErrors from './constants/redis.constant'
import { LanguagesEnum } from './enums/languages.enum'
import { ParseResponseErrorType } from './types/parse-response.type'
import { RedisConstantExceptionsType } from './types/redis-constant-exceptions.type'
import { RedisExceptionType } from './types/redis-exception.type'

export class RedisCustomException extends Error {
  public code?: number
  public message: string
  public stack?: string
  public errorName?: string
  public description?: string
  private readonly _logger = new Logger(RedisCustomException.name)

  public constructor(params?: RedisExceptionType, logger = true) {
    super()

    this.code = params?.code
    this.message = params?.message
    this.description = params?.description
    this.errorName = params?.errorName

    if (this.message && logger) {
      this._logger.error('Error: ' + this.message)
    }
  }

  public static get redis(): RedisConstantExceptionsType {
    return RedisCustomErrors.redisConstantExceptions
  }

  protected get _heap(): RedisConstantExceptionsType {
    return {
      ...RedisCustomErrors.redisConstantExceptions,
    }
  }

  public static checkErrorIntoData<TypeData>(data: TypeData & RedisCustomException): boolean {
    return !!Object.keys(data).includes('code')
  }

  public parse<T>(data: T & ParseResponseErrorType, language: keyof typeof LanguagesEnum): RedisCustomException | null {
    if (data.remark?.toUpperCase() == 'SUCCESS' || data.remark?.toUpperCase() == 'ACTIVE') {
      return
    }

    const errorCode = (data.providerErrorCode || data.errorCode || data.remark)?.trim()?.toUpperCase()

    const err = this._heap[language][errorCode]

    if (err) {
      throw new RedisCustomException(err)
    }

    throw new Error(`${RedisCustomException.name}, not found error constant - ${err}`)
  }
}
