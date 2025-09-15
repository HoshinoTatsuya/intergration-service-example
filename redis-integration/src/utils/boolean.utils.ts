export class BooleanUtils {
  public static isArgumentTrue(value: unknown): boolean {
    return value === true || String(value).toLowerCase() === 'true' || value === '1' || value === 1
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  public static strToBoolWithDefault(value: any, defaultValue = false): boolean {
    return value === undefined || value === null || value?.length === 0
      ? defaultValue
      : BooleanUtils.isArgumentTrue(value)
  }
}
