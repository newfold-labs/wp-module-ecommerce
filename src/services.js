import apiFetch from "@wordpress/api-fetch";

export const Endpoints = {
  WP_SETTINGS: "/wp/v2/settings",
};

export async function updateWPSettings(data) {
  return apiFetch({ path: Endpoints.WP_SETTINGS, method: "POST", data }).catch(
    (error) => {}
  );
}