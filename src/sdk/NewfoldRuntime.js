import { addQueryArgs } from "@wordpress/url";

/** @type {import("../index").RuntimeSdk}  */
export const NewfoldRuntime = {
  hasCapability(name) {
    return window.NewfoldRuntime?.capabilities[name] === true;
  },
  adminUrl(path) {
    return window.NewfoldRuntime?.adminUrl + path;
  },
  createApiUrl(url, qs = {}) {
    return addQueryArgs(window.NewfoldRuntime?.base_url, {
      rest_route: url,
      ...qs,
    });
  },
  get siteUrl() {
    return window.NewfoldRuntime?.siteUrl;
  },
  get isWoo() {
    return window.NewfoldRuntime?.isWoocommerceActive
  },
  get isJet() {
    return window.NewfoldRuntime?.isJetpackBoostActive
  },
  get homeUrl() {
    return window.NewfoldRuntime?.homeUrl
  },
  get currentTheme() {
    return (window.NewfoldRuntime?.currentTheme);
  },
  get plugin() {
    return (window.NewfoldRuntime?.plugin);
  },
  get ecommerce() {
    return (window.NewfoldRuntime?.ecommerce);
  }
};