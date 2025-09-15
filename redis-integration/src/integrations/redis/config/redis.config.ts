import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {RedisCustomModuleOptions, RedisCustomModuleOptionsFactory} from "./redis-options.interface";
import { BooleanUtils } from "src/utils/boolean.utils";


@Injectable()
export class RedisConfigService implements RedisCustomModuleOptionsFactory {
  public constructor(private readonly _configService: ConfigService) {}

  public createRedisCustomModuleOptions(): RedisCustomModuleOptions {
    const redisConfig = {
      config: {
        port: +this._configService.get<number>('REDIS_AUTH_PORT', undefined),
        host: this._configService.get<string>('REDIS_AUTH_HOST', undefined),
        flushAll: BooleanUtils.strToBoolWithDefault(
          this._configService.get<boolean>('REDIS_AUTH_FLUSH_ALL', undefined),
          undefined,
        ),
      },

        createUser: +this._configService.get<number>('REDIS_AUTH_EXPIRE_SESSION', undefined),
    }

    if (redisConfig.config.port === undefined) {
      throw new InternalServerErrorException('Variable "REDIS_AUTH_PORT" in "ms-auth" config is not found')
    }

    if (redisConfig.config.host === undefined) {
      throw new InternalServerErrorException('Variable "REDIS_AUTH_HOST" in "ms-auth" config is not found')
    }

    if (redisConfig.config.flushAll === undefined) {
      throw new InternalServerErrorException('Variable "REDIS_AUTH_FLUSH_ALL" in "ms-auth" config is not found')
    }

    if (redisConfig.createUser === undefined) {
      throw new InternalServerErrorException('Variable "REDIS_EXPIRE_CREATE_USER" in "<name ms>" config is not found')
    }


    redisConfig.config['url'] = `redis://${redisConfig.config.host}:${redisConfig.config.port}`

    return {
      ...redisConfig,
    }
  }
}
