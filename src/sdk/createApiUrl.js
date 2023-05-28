/**
 *
 * @param {string} url API Endpoint
 * @param {Record<string, any>} qs Query parameters
 *
 * @returns {string}
 */
export function createApiUrl(url, qs = {}) {
  `${window.NFDECOM?.rest_url}?${new URLSearchParams({
    rest_route: url,
    ...qs,
  })}`;
}
