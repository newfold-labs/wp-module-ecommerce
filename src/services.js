import apiFetch from "@wordpress/api-fetch";

export const Endpoints = {
  WP_SETTINGS: "/wp/v2/settings",
  WC_ONBOARDING: "/wc-admin/onboarding/profile",
  BOOTSTRAP: "/newfold-ecommerce/v1/experience/bootstrap",
  WC_PRODUCTS: "/wc/v3/products",
  WC_CURRENCY: "/wc/v3/settings/general/woocommerce_currency",
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

export async function fetchJetpackAnalytics(period) {
  return await apiFetch({
    path: `/jetpack/v4/module/stats/data?range=${period}`,
  }).catch((error) => ({}));
}

export async function fetchReports(period) {
  try {
    let [reports] = await apiFetch({
      path: `/wc/v3/reports/sales?period=${period}`,
    });
    return reports;
  } catch {
    return {};
  }
}

export async function fetchStoreCurrency() {
  return apiFetch({ path: Endpoints.WC_CURRENCY });
}

export async function fetchUserCapabilities() {
  return apiFetch({
    path: `/newfold-ecommerce/v1/experience/capabilities`,
  });
}

export async function fetchProducts() {
  return apiFetch({
    path: Endpoints.WC_PRODUCTS,
  });
}

export async function createProduct(data) {
  return apiFetch({
    path: Endpoints.WC_PRODUCTS,
    method: "POST",
    data,
  }).catch((error) => null);
}
