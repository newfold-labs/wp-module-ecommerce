import { NewfoldRuntime } from "./NewfoldRuntime";

export const RuntimeSdk = {
  brandSettings: NewfoldRuntime.ecommerce?.brand_settings,
  adminUrl(path, backToNfd = false) {
    let href = NewfoldRuntime.adminUrl(path);
    if (backToNfd === false) {
      return href;
    }
    let [page, qs] = href.split("?");
    let query = new URLSearchParams(qs);
    query.set("return_to_nfd", window.location.hash.replace("#", ""));
    return `${page}?${query}`;
  },
  nonce(name) {
    return NewfoldRuntime.ecommerce.nonces?.[name];
  },
};
