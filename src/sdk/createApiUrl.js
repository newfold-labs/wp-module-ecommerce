import { NewfoldRuntime } from "@newfold-labs/wp-module-runtime";

/** @deprecated Use NewfoldRuntime.createApiUrl */
export function createApiUrl(url, qs = {}) {
  return NewfoldRuntime.createApiUrl(url, qs);
}
