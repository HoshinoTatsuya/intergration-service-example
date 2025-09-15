import { Inject, Injectable } from '@nestjs/common'
import { Redis as RedisType } from 'ioredis'

import {
  REDIS_CUSTOM_MODULE_OPTIONS,
  REDIS_MODULE_CONNECTION_TOKEN,
  REDIS_TOKEN_KEY,
} from './constants'
import { DefaultResultCallbackEnum, DefaultTokenExpireName } from './enums'
import { RedisCustomException } from './exceptions/redis.exception'
import {
    ICreateUser,
} from './interfaces'
import {
    CreateUserModel,
} from './models'
import { IRedisCustomModuleOptionsFactory } from './config/redis-options.interface'
import {IRedisServiceFactory} from "./factory/redis-service.interface";

@Injectable()
export class RedisService implements IRedisServiceFactory {
  public constructor(
    @Inject(REDIS_CUSTOM_MODULE_OPTIONS)
    private readonly _optionsRedis: IRedisCustomModuleOptionsFactory,
    @Inject(REDIS_MODULE_CONNECTION_TOKEN)
    private readonly _redisService: RedisType,
  ) {}

  /**
   * This is description method
   * @param { ISetToken } data - type is {@link ISetToken }
   * @return {boolean | RedisCustomException} data type is boolean | {@link RedisCustomException }
   * @method setTokens
   * @public
   * @abstract
   */
  public async createUser(data: ICreateUser): Promise<CreateUserModel | RedisCustomException> {
    try {
      const result = await this._redisService.set(
        REDIS_TOKEN_KEY(),
        JSON.stringify({
          ...data,
        }),
        DefaultTokenExpireName.EX,
        this._optionsRedis.createUser,
      )

      if (result !== DefaultResultCallbackEnum.OK) {
        return new RedisCustomException(RedisCustomException.redis.EN.CREATE_USER_ERROR)
      }

      return new CreateUserModel({result: true})
    } catch (error) {
      const customError = RedisCustomException.redis.EN.CREATE_USER_ERROR
      customError.description += error.description ?? error.message
      new RedisCustomException(customError)
      return new RedisCustomException(RedisCustomException.redis.EN.CREATE_USER_ERROR, false)
    }
  }
}
