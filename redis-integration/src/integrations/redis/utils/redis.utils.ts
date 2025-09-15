import { Logger } from '@nestjs/common'
import { default as Redis, Redis as RedisType } from 'ioredis'

import { IRedisCustomModuleOptionsFactory } from '../redis-options.interface'

export async function createRedisConnection(options: IRedisCustomModuleOptionsFactory): Promise<Redis> {
  const { config } = options

  Logger.verbose(
    `A connection is made to the REDIS system with the following parameters: ${JSON.stringify(config, null, 2)}`,
  )

  let redis: RedisType

  if (config.url) {
    redis = new Redis(config.url, config)
  } else {
    redis = new Redis(config)
  }

  if (redis.status === 'connecting') {
    Logger.verbose('This service has been successfully connected to the REDIS system!')
  } else {
    Logger.verbose('Connection to the REDIS system failed!')
  }

  return redis
}
