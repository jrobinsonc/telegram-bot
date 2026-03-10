import 'lodash-es';

declare module 'lodash-es' {
  /**
   * Gets the value at `path` of `object`. If the resolved value is
   * `undefined`, the `defaultValue` is returned in its place.
   *
   * ⚠️ Modified to return `unknown` instead of `any` to force the developer to
   * explicitly cast the return value to the desired type.
   *
   * @param object The object to query.
   * @param path The path of the property to get.
   * @param defaultValue The value returned for `undefined` resolved values.
   */
  export function get(
    object: unknown,
    path: string | readonly string[],
    defaultValue?: unknown,
  ): unknown;

  /**
   * Checks if value is a plain object, that is, an object created by the Object
   * constructor or one with a [[Prototype]] of null.
   *
   * Note: This method assumes objects created by the Object constructor have no
   * inherited enumerable properties.
   *
   * ⚠️ Modified to return a type guard instead of a boolean to allow TypeScript
   * to narrow the type of the value to a Record when the check passes.
   *
   * @param value The value to check.
   * @return Returns true if value is a plain object, else false.
   */
  export function isPlainObject(
    value: unknown,
  ): value is Record<string, unknown>;
}
