/**
 * @description Return the old string stored at key, or nil if key did not exist. An error is returned and
 * SET aborted if the value stored at key is not a string.
 * This is described in the official {@link https://redis.io/commands/set/ documentation}.
 *
 */
export enum DefaultSettingsResultEnum {
  GET = 'GET',
}
