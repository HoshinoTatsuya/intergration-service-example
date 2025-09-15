import { InjectionToken, ModuleMetadata, OptionalFactoryDependency, Type } from '@nestjs/common'
import { RedisOptions } from 'ioredis'

export interface IRedisCustomModuleOptionsFactory {
  config: RedisOptions & {
    url?: string
  }
  createUser: number
  logger: {
    axios: boolean
    nats: boolean
  }
}

export interface RedisCustomModuleOptionsFactory {
  createRedisCustomModuleOptions(): Promise<IRedisCustomModuleOptionsFactory> | IRedisCustomModuleOptionsFactory
}

export interface RedisCustomModuleOptions extends IRedisCustomModuleOptionsFactory {
  isGlobal?: boolean
}

export interface RedisCustomModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<RedisCustomModuleOptionsFactory>
  useClass?: Type<RedisCustomModuleOptionsFactory>
  useFactory?: (...args: any[]) => Promise<IRedisCustomModuleOptionsFactory> | IRedisCustomModuleOptionsFactory
  inject?: (InjectionToken | OptionalFactoryDependency)[]
  isGlobal?: boolean
}
