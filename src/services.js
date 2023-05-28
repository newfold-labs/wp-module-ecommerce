import apiFetch from "@wordpress/api-fetch";

export const Endpoints = {
  WP_SETTINGS: "/wp/v2/settings",
  WC_ONBOARDING: "/wc-admin/onboarding/profile",
  BOOTSTRAP: "/newfold-ecommerce/v1/experience/bootstrap",
};
export async function fetchWPSettings() {
  return apiFetch({ path: Endpoints.WP_SETTINGS });
}

export async function updateWPSettings(data) {
  return apiFetch({ path: Endpoints.WP_SETTINGS, method: "POST", data }).catch(
    (error) => {}
  );
}

export async function updateWCOnboarding(data) {
  return apiFetch({
    path: Endpoints.WC_ONBOARDING,
    method: "POST",
    data,
  }).catch((error) => {});
}

export async function fetchUserCapabilities() {
  return apiFetch({
    path: `/newfold-ecommerce/v1/experience/capabilities`,
  });
}