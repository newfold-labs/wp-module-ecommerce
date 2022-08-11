import apiFetch from '@wordpress/api-fetch';

export const Endpoints = {
  WP_SETTINGS: '/wp/v2/settings',
  WC_ONBOARDING: '/wc-admin/onboarding/profile',
  PLUGIN_INSTALL: '/newfold-onboarding/v1/plugins/install',
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

export async function queuePluginInstall(plugin) {
  return apiFetch({
    path: Endpoints.PLUGIN_INSTALL,
    method: 'POST',
    data: { plugin, activate: true, queue: true },
  }).catch((error) => {});
}
