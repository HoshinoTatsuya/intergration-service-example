import {Global, Injectable} from '@nestjs/common';

import {IntegrationServiceFactory} from "./factory/integration-service.factory";
import {RedisService} from "./redis/redis.service";
import {IRedisServiceFactory} from "./redis/factory/redis-service.interface";

@Injectable()
export class IntegrationService implements IntegrationServiceFactory {
    public constructor(
        private readonly _redisService: RedisService,
    ) {
    }

    public get redis(): IRedisServiceFactory {
        return this._redisService;
    }
}
