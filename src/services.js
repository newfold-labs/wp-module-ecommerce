import apiFetch from '@wordpress/api-fetch';

export const Endpoints = {
  WP_SETTINGS: '/wp/v2/settings',
  WC_ONBOARDING: '/wc-admin/onboarding/profile',
  BOOTSTRAP: '/newfold-ecommerce/v1/experience/bootstrap',
  PLUGIN_STATUS: '/newfold-ecommerce/v1/plugins/status',
  PLUGIN_INSTALL: '/newfold-onboarding/v1/plugins/install',
  WC_PRODUCTS: '/wc/v3/products',
};
export async function fetchWPSettings() {
  return apiFetch({ path: Endpoints.WP_SETTINGS });
}

export async function updateWPSettings(data) {
  return apiFetch({ path: Endpoints.WP_SETTINGS, method: 'POST', data }).catch(
    (error) => {}
  );
}

export async function updateWCOnboarding(data) {
  return apiFetch({
    path: Endpoints.WC_ONBOARDING,
    method: 'POST',
    data,
  }).catch((error) => {});
}

export async function syncPluginInstall(plugin, token) {
  return apiFetch({
    path: Endpoints.PLUGIN_INSTALL,
    method: 'POST',
    headers: { 'X-NFD-ONBOARDING': token.hash },
    data: { plugin, activate: true, queue: false },
  }).catch((error) => 'failed');
}

export async function queuePluginInstall(plugin, token, priority = 10) {
  return apiFetch({
    path: Endpoints.PLUGIN_INSTALL,
    method: 'POST',
    headers: { 'X-NFD-ONBOARDING': token.hash },
    data: { plugin, activate: true, queue: true, priority },
  }).catch((error) => 'failed');
}

export async function createProduct(data) {
  return apiFetch({
    path: Endpoints.WC_PRODUCTS,
    method: 'POST',
    data
  }).catch((error) => null);
}
