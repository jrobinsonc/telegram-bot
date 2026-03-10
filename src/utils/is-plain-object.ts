import { isPlainObject as _isPlainObject } from "lodash-es";

export function isPlainObject(value: unknown): value is Record<string, unknown> {
  return _isPlainObject(value);
}
