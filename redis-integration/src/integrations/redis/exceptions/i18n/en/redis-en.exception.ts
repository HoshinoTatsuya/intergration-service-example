import { errorCode } from '../../constants/code-error.constant'
import { RedisExceptionEnum } from '../../enums/redis-exception.enum'
import { RedisBaseExceptionType } from '../../types/redis-base-exception.type'

export const redisExceptionEn: RedisBaseExceptionType = {
  [RedisExceptionEnum.CREATE_USER_ERROR]: {
    code: errorCode[RedisExceptionEnum.CREATE_USER_ERROR],
    errorName: RedisExceptionEnum.CREATE_USER_ERROR,
    message: 'Method createUser exited with error!',
    description: 'Method createUser exited with error: ',
  },
}
