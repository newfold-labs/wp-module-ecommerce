import { NewfoldRuntime } from "@newfold-labs/wp-module-runtime";
import apiFetch from "@wordpress/api-fetch";
import { safeFetch } from "./safeFetch";

export const Endpoints = {
  SETTINGS: NewfoldRuntime.createApiUrl("/wp/v2/settings"),
};

export const WordPressSdk = {
  settings: {
    async get() {
      return apiFetch({ url: Endpoints.SETTINGS });
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
