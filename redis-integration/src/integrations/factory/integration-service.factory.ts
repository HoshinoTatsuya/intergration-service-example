import {IRedisServiceFactory} from "../redis/factory/redis-service.interface";

export abstract class IntegrationServiceFactory {
  public abstract accessor redis: IRedisServiceFactory;
}
