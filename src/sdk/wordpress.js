import apiFetch from "@wordpress/api-fetch";
import { createApiUrl } from "./createApiUrl";
import { safeFetch } from "./safeFetch";

export const Endpoints = {
  SETTINGS: createApiUrl("/wp/v2/settings"),
};

export const WordPressSdk = {
  settings: {
    async get() {
      return apiFetch({ path: Endpoints.SETTINGS });
    },
    async put(settings) {
      return safeFetch({
        url: Endpoints.SETTINGS,
        method: "POST",
        data: settings,
      });
    },
  },
};
