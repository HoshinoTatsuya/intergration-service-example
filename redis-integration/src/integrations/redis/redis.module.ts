import { DynamicModule, Module, Provider } from '@nestjs/common'
import { Redis } from 'ioredis'

import { REDIS_CUSTOM_MODULE_OPTIONS, REDIS_MODULE_CONNECTION_TOKEN } from './constants'
import {
  RedisCustomModuleAsyncOptions,
  RedisCustomModuleOptions,
  RedisCustomModuleOptionsFactory,
} from './config/redis-options.interface'
import { RedisService } from './redis.service'
import { createRedisConnection } from './utils/redis.utils'

@Module({})
export class RedisCustomModule {
  public static forRoot(options: RedisCustomModuleOptions): DynamicModule {
    return {
      module: RedisCustomModule,
      providers: [
        RedisService,
        this._getRedisSyncOptionsProvider(options),
        this._getRedisSyncConnectionProvider(options),
        { provide: REDIS_CUSTOM_MODULE_OPTIONS, useValue: options },
      ],
      exports: [
        RedisService,
        this._getRedisSyncOptionsProvider(options),
        this._getRedisSyncConnectionProvider(options),
      ],
      global: options?.isGlobal ?? true,
    }
  }

  public static forRootAsync(options: RedisCustomModuleAsyncOptions): DynamicModule {
    return {
      module: RedisCustomModule,
      imports: options.imports ?? [],
      providers: [RedisService, ...this._createAsyncProviders(options)],
      exports: [RedisService],
      global: options?.isGlobal ?? true,
    }
  }

  private static _createAsyncProviders(options: RedisCustomModuleAsyncOptions): Provider[] {
    if (!(options.useExisting || options.useFactory || options.useClass)) {
      throw new Error('Invalid configuration. Must provide useFactory, useClass or useExisting')
    }

    if (options.useExisting || options.useFactory) {
      return [this._createAsyncOptionsProvider(options), this._getRedisAsyncConnectionProvider(options)]
    }

    return [
      this._createAsyncOptionsProvider(options),
      this._getRedisAsyncConnectionProvider(options),
      {
        provide: options.useClass!,
        useClass: options.useClass!,
      },
    ]
  }

  private static _createAsyncOptionsProvider(options: RedisCustomModuleAsyncOptions): Provider {
    if (!(options.useExisting || options.useFactory || options.useClass)) {
      throw new Error('Invalid configuration. Must provide useFactory, useClass or useExisting')
    }

    if (options.useFactory) {
      return {
        provide: REDIS_CUSTOM_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject,
      }
    }

    return {
      provide: REDIS_CUSTOM_MODULE_OPTIONS,
      useFactory: async (optionsFactory: RedisCustomModuleOptionsFactory) =>
        await optionsFactory.createRedisCustomModuleOptions(),
      inject: [options.useExisting! || options.useClass!],
    }
  }

  private static _getRedisSyncOptionsProvider(options: RedisCustomModuleOptions): Provider {
    return {
      provide: REDIS_MODULE_CONNECTION_TOKEN,
      useValue: options,
    }
  }

  private static _getRedisSyncConnectionProvider(options: RedisCustomModuleOptions): Provider {
    return {
      provide: REDIS_MODULE_CONNECTION_TOKEN,
      useValue: createRedisConnection(options),
    }
  }
  private static _getRedisAsyncConnectionProvider(options: RedisCustomModuleAsyncOptions): Provider {
    if (!(options.useExisting || options.useFactory || options.useClass)) {
      throw new Error('Invalid configuration. Must provide useFactory, useClass or useExisting')
    }

    if (options.useFactory) {
      return {
        provide: REDIS_MODULE_CONNECTION_TOKEN,
        useFactory: options.useFactory,
        inject: options.inject,
      }
    }

    return {
      provide: REDIS_MODULE_CONNECTION_TOKEN,
      useFactory: async (optionsConnectionFactory: RedisCustomModuleOptionsFactory): Promise<Redis> => {
        const config = await optionsConnectionFactory.createRedisCustomModuleOptions()
        return await createRedisConnection(config)
      },
      inject: [options.useExisting! || options.useClass!],
    }
  }
}
