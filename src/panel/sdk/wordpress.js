import { NewfoldRuntime } from "./NewfoldRuntime";
import apiFetch from "@wordpress/api-fetch";
import { safeFetch } from "./safeFetch";

export const Endpoints = {
  SETTINGS: NewfoldRuntime.createApiUrl("/wp/v2/settings"),
  MEDIA: NewfoldRuntime.createApiUrl("/wp/v2/media"),
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
  media: {
    async get() {
      return apiFetch({ url: Endpoints.MEDIA });
    }
  },
};
