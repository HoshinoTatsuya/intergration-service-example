import {Global, Module} from '@nestjs/common'
import {ConfigModule} from '@nestjs/config'

import { configOptions } from "../config/app.config"
import {RedisConfigService} from "./redis/config/redis.config";
import {RedisCustomModule} from "./redis/redis.module";
import {IntegrationService} from "./integration.service";

@Global()
@Module({
    imports: [
        ConfigModule.forRoot(configOptions),
        RedisCustomModule.forRootAsync({
            useClass: RedisConfigService,
            imports: [ConfigModule],
        }),
    ],
    controllers: [],
    providers: [IntegrationService],
    exports: [IntegrationService]
})
export class IntegrationModule {
}
