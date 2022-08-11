import apiFetch from '@wordpress/api-fetch';

export const Endpoints = {
  WP_SETTINGS: '/wp/v2/settings',
  WC_ONBOARDING: '/wc-admin/onboarding/profile',
  PLUGIN_SYNC_INSTALL: '/wp/v2/plugins',
  PLUGIN_ASYNC_INSTALL: '/newfold-onboarding/v1/plugins/install',
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

export async function syncPluginInstall(slug) {
  return apiFetch({
    path: Endpoints.PLUGIN_ASYNC_INSTALL,
    method: 'POST',
    headers: { 'X-NFD-ONBOARDING': token.hash },
    data: { slug, status: 'active' },
  }).catch((error) => {});
}

export async function queuePluginInstall(plugin, token) {
  return apiFetch({
    path: Endpoints.PLUGIN_ASYNC_INSTALL,
    method: 'POST',
    headers: { 'X-NFD-ONBOARDING': token.hash },
    data: { plugin, activate: true, queue: true },
  }).catch((error) => {});
}
