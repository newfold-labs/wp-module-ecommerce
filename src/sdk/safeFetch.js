import apiFetch from "@wordpress/api-fetch";

/**
 *
 * @param {import("@wordpress/api-fetch").APIFetchOptions} options
 * @returns {Promise<{data?: any; error?: Error}>}
 */
export function safeFetch(options) {
  return apiFetch(options).then(
    (data) => ({ data, error: null }),
    (error) => ({ error })
  );
}
