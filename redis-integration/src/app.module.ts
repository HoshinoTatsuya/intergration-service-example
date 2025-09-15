import { Module } from '@nestjs/common';
import {IntegrationModule} from "./integrations/integration.module";

@Module({
  imports: [IntegrationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
