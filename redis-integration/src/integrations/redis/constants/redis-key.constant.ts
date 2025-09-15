export const redisTokenKeyPath = 'users'
export const REDIS_TOKEN_KEY = (): string =>
    `${redisTokenKeyPath}`
