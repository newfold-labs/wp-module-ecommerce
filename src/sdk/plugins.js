import apiFetch from "@wordpress/api-fetch";
import { createApiUrl } from "./createApiUrl";

const Endpoints = {
  PLUGIN_STATUS: (plugins) =>
    createApiUrl("/newfold-ecommerce/v1/plugins/status", {
      plugins: plugins.join(),
    }),
  PLUGIN_INSTALL: createApiUrl("/newfold-installer/v1/plugins/install"),
};

const INSTALL_TOKEN = window.NFDECOM?.site.install_token;

export const PluginsSdk = {
  queries: {
    isPlugin(plugins, pluginNames, requiredState) {
      return pluginNames.every(
        (pluginName) => plugins?.details?.[pluginName].status === requiredState
      );
    },
    async status(...plugins) {
      return apiFetch({ url: Endpoints.PLUGIN_STATUS(plugins) });
    },
  },
  actions: {
    async installSync(plugin) {
      return apiFetch({
        url: Endpoints.PLUGIN_INSTALL,
        method: "POST",
        headers: { "X-NFD-INSTALLER": INSTALL_TOKEN },
        data: { plugin, activate: true, queue: false },
      }).catch((error) => "failed");
    },
    async queueInstall(plugin, priority = 10) {
      return apiFetch({
        url: Endpoints.PLUGIN_INSTALL,
        method: "POST",
        headers: { "X-NFD-INSTALLER": INSTALL_TOKEN },
        data: { plugin, activate: true, queue: true, priority },
      }).catch((error) => "failed");
    },
  },
};
