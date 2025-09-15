import {RedisCustomException} from '../exceptions/redis.exception'

import {ICreateUser} from "../interfaces";
import {CreateUserModel} from "../models";

/**
 * This class describes possible methods for calling.
 *
 * @class IRedisService
 *
 * METHODS:
 * - Create user {@link IRedisService.createUser} - This is short description
 *
 * @abstract
 */
export abstract class IRedisServiceFactory {
  /**
   * This is description method
   * @param { ICreateUser } data - type is {@link ISetToken }
   * @return {CreateUserModel | RedisCustomException} data type is boolean | {@link RedisCustomException }
   * @method createUser
   * @public
   * @abstract
   */
  public abstract createUser(data: ICreateUser): Promise<CreateUserModel | RedisCustomException>
}
